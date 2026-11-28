"use client";
import { useEffect, type RefObject } from "react";

/**
 * Garde aria-invalid et aria-describedby en phase avec :user-invalid
 * (guide Modern Web Guidance « validate-input-after-interaction »).
 *
 * - Chaque champ démarre à aria-invalid="false" : Firefox et Safari exposent
 *   sinon un champ requis vide comme invalide dès le chargement.
 * - Le message d'erreur (id dans data-error) n'est listé dans
 *   aria-describedby que pendant qu'il est affiché : un texte référencé est
 *   lu même masqué.
 * - Une seule région live polie annonce l'erreur quand on quitte un champ,
 *   un instant après, pour ne pas couvrir l'annonce du champ suivant. Après un
 *   envoi refusé, le navigateur place le focus sur le premier champ invalide,
 *   qui lit alors son erreur : ces erreurs-là ne sont pas annoncées.
 */
export function useUserInvalidAria(formRef: RefObject<HTMLFormElement | null>) {
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const isField = (el: EventTarget | null): el is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement =>
      el instanceof HTMLElement && el.matches("input, select, textarea");

    const linkError = (el: HTMLElement, shown: boolean) => {
      const errorId = el.dataset.error;
      if (!errorId) return;
      const ids = (el.getAttribute("aria-describedby") || "").split(/\s+/).filter((id) => id && id !== errorId);
      if (shown) ids.push(errorId);
      if (ids.length) el.setAttribute("aria-describedby", ids.join(" "));
      else el.removeAttribute("aria-describedby");
    };

    const announcer = document.createElement("div");
    announcer.setAttribute("aria-live", "polite");
    announcer.className = "sr-only";
    form.append(announcer);
    let announceTimer: ReturnType<typeof setTimeout> | undefined;
    let announcedField: Element | null = null;

    const spokenText = (node: Element) => {
      const copy = node.cloneNode(true) as Element;
      copy.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove());
      return (copy.textContent || "").replace(/\s+/g, " ").trim();
    };

    const announceError = (el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
      const error = el.dataset.error ? document.getElementById(el.dataset.error) : null;
      if (!error) return;
      const label = el.labels?.[0] ? `${spokenText(el.labels[0])}, ` : "";
      clearTimeout(announceTimer);
      announcer.textContent = "";
      announcedField = el;
      announceTimer = setTimeout(() => {
        announcer.textContent = label + spokenText(error);
      }, 500);
    };

    const flagged = new WeakSet<Element>();
    const announced = new WeakSet<Element>();

    const syncAria = (el: EventTarget | null, announce = false) => {
      if (!isField(el)) return;
      if (el.matches(":user-invalid")) {
        if (announce && !announced.has(el)) {
          announceError(el);
          announced.add(el);
        }
        el.setAttribute("aria-invalid", "true");
        linkError(el, true);
        flagged.add(el);
      } else if (flagged.has(el) || el.getAttribute("aria-invalid") !== "true") {
        el.setAttribute("aria-invalid", "false");
        linkError(el, false);
        flagged.delete(el);
        announced.delete(el);
        if (announcedField === el) {
          clearTimeout(announceTimer);
          announcer.textContent = "";
        }
      }
    };

    form.querySelectorAll("input, select, textarea").forEach((el) => syncAria(el));

    const onBlur = (e: Event) => syncAria(e.target, true);
    const onInput = (e: Event) => {
      if (e.target instanceof HTMLElement && e.target.hasAttribute("aria-invalid")) syncAria(e.target);
    };
    const onChange = (e: Event) => syncAria(e.target, true);
    const onInvalid = (e: Event) => {
      if (e.target instanceof Element) announced.add(e.target);
      syncAria(e.target);
    };
    const onReset = () => {
      setTimeout(() => Array.from(form.elements).forEach((el) => syncAria(el)));
    };

    form.addEventListener("blur", onBlur, true);
    form.addEventListener("input", onInput);
    form.addEventListener("change", onChange, true);
    form.addEventListener("invalid", onInvalid, true);
    form.addEventListener("reset", onReset, true);

    return () => {
      clearTimeout(announceTimer);
      form.removeEventListener("blur", onBlur, true);
      form.removeEventListener("input", onInput);
      form.removeEventListener("change", onChange, true);
      form.removeEventListener("invalid", onInvalid, true);
      form.removeEventListener("reset", onReset, true);
      announcer.remove();
    };
  }, [formRef]);
}
