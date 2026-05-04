import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  company: string;
  sector: string;
  text: string;
  rating: number;
}

interface ClientTestimonialsProps {
  testimonials: Testimonial[];
  trustfolioUrl: string;
}

export default function ClientTestimonials({
  testimonials,
  trustfolioUrl,
}: ClientTestimonialsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, idx) => (
          <div
            key={idx}
            className="p-6 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-shadow"
          >
            <div className="flex gap-1 mb-3">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="fill-iter-chartreuse text-iter-chartreuse"
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              "{testimonial.text}"
            </p>
            <div className="border-t pt-3">
              <p className="font-semibold text-sm text-foreground">
                {testimonial.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {testimonial.company} • {testimonial.sector}
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-muted-foreground">
        Consultez l'intégralité de nos avis clients sur{" "}
        <a
          href={trustfolioUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-iter-violet hover:text-iter-violet/80 underline"
        >
          Trustfolio
        </a>
      </p>
    </div>
  );
}
