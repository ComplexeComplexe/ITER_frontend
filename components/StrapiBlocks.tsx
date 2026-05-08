/**
 * Renders Strapi v5 Blocks (rich text) as React elements.
 * Supports: paragraphs, headings (h1-h6), lists, quotes, images, links,
 * and inline formatting (bold, italic, underline, strikethrough, code).
 * When contactHref is provided, paragraphs that are only a CTA phrase
 * (e.g. "Prendre rendez-vous", "Book a meeting") are rendered as the contact CTA button.
 */

import Image from "next/image";
import { strapiMediaUrl } from "@/lib/strapi";
import type { StrapiBlock, StrapiInlineNode } from "@/lib/strapi";
import ContactCTAButton from "@/components/ContactCTAButton";

/** CTA phrases (all locales) that should render as the contact button. Comparison is normalized (lowercase, trim). */
const CTA_PHRASES = new Set([
  "prendre rendez-vous",
  "réserver un rendez-vous",
  "book a meeting",
  "book a call",
  "download the guide",
  "télécharger le guide",
  "descargar la guía",
  "concierte una cita",
  "reservar una cita",
  "contactez-nous",
  "get in touch",
  "contacto",
  "prendre contact",
]);

function getInlinePlainText(nodes: StrapiInlineNode[]): string {
  return nodes
    .map((n) => (n.type === "text" ? n.text : n.type === "link" ? getInlinePlainText(n.children) : ""))
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeForMatch(s: string): string {
  return s.replace(/\s+/g, " ").trim().toLowerCase();
}

interface StrapiBlocksProps {
  blocks: StrapiBlock[];
  /** Additional CSS classes for the wrapper */
  className?: string;
  /** Whether to use prose typography defaults */
  prose?: boolean;
  /** When set, paragraphs that are only a CTA phrase are rendered as the contact CTA button linking here */
  contactHref?: string;
}

export default function StrapiBlocks({ blocks, className = "", prose = false, contactHref }: StrapiBlocksProps) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className={`${prose ? "prose prose-lg max-w-none" : ""} ${className}`.trim()}>
      {blocks.map((block, i) => (
        <BlockNode key={i} block={block} contactHref={contactHref} />
      ))}
    </div>
  );
}

function BlockNode({ block, contactHref }: { block: StrapiBlock; contactHref?: string }) {
  switch (block.type) {
    case "paragraph": {
      const plain = getInlinePlainText(block.children);
      const isContactCTA =
        contactHref &&
        plain &&
        CTA_PHRASES.has(normalizeForMatch(plain));
      const isSingleLinkToContact =
        contactHref &&
        block.children.length === 1 &&
        block.children[0].type === "link" &&
        (block.children[0].url.includes("contact") || CTA_PHRASES.has(normalizeForMatch(getInlinePlainText(block.children[0].children))));
      if (isContactCTA || isSingleLinkToContact) {
        const label = plain || (block.children[0].type === "link" ? getInlinePlainText(block.children[0].children) : "") || "Contact";
        return <ContactCTAButton label={label} href={contactHref} />;
      }
      return (
        <p className="text-muted-foreground leading-relaxed mb-4">
          <InlineNodes nodes={block.children} />
        </p>
      );
    }

    case "heading": {
      const Tag = `h${block.level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      const sizeClasses: Record<number, string> = {
        1: "text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6",
        2: "text-2xl lg:text-3xl font-bold font-heading text-foreground mb-4 mt-10",
        3: "text-xl lg:text-2xl font-bold font-heading text-foreground mb-3 mt-8",
        4: "text-lg font-semibold font-heading text-foreground mb-3 mt-6",
        5: "text-base font-semibold font-heading text-foreground mb-2 mt-4",
        6: "text-sm font-semibold font-heading text-foreground mb-2 mt-4",
      };
      return (
        <Tag className={sizeClasses[block.level] || sizeClasses[3]}>
          <InlineNodes nodes={block.children} />
        </Tag>
      );
    }

    case "list": {
      const isOrdered = block.format === "ordered";
      const ListTag = isOrdered ? "ol" : "ul";
      return (
        <ListTag className={`mb-6 space-y-2 ${isOrdered ? "list-decimal" : "list-none"} pl-0`}>
          {block.children.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
              {!isOrdered && (
                <span className="mt-2 w-1.5 h-1.5 bg-iter-violet rounded-full flex-shrink-0" />
              )}
              <span>
                <InlineNodes nodes={item.children} />
              </span>
            </li>
          ))}
        </ListTag>
      );
    }

    case "quote":
      return (
        <blockquote className="border-l-4 border-iter-violet/30 pl-6 py-2 mb-6 text-muted-foreground italic">
          <InlineNodes nodes={block.children} />
        </blockquote>
      );

    case "image": {
      const src = strapiMediaUrl(block.image);
      if (!src) return null;
      return (
        <figure className="mb-6">
          <Image
            src={src}
            alt={block.image?.alternativeText || ""}
            width={block.image?.width || 800}
            height={block.image?.height || 450}
            className="rounded-2xl w-full h-auto"
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
          />
        </figure>
      );
    }

    default:
      return null;
  }
}

function InlineNodes({ nodes }: { nodes: StrapiInlineNode[] }) {
  return (
    <>
      {nodes.map((node, i) => (
        <InlineNode key={i} node={node} />
      ))}
    </>
  );
}

function InlineNode({ node }: { node: StrapiInlineNode }) {
  if (node.type === "link") {
    return (
      <a
        href={node.url}
        className="text-iter-violet underline underline-offset-2 hover:text-iter-violet/80 transition-colors"
        target={node.url.startsWith("http") ? "_blank" : undefined}
        rel={node.url.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        <InlineNodes nodes={node.children} />
      </a>
    );
  }

  // Text node with optional formatting
  let content: React.ReactNode = node.text;

  if (node.code) {
    content = (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{content}</code>
    );
  }
  if (node.bold) {
    content = <strong className="font-semibold text-foreground">{content}</strong>;
  }
  if (node.italic) {
    content = <em>{content}</em>;
  }
  if (node.underline) {
    content = <span className="underline">{content}</span>;
  }
  if (node.strikethrough) {
    content = <span className="line-through">{content}</span>;
  }

  return <>{content}</>;
}
