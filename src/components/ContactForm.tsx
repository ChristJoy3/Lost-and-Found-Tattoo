"use client";

import { useState, type FormEvent } from "react";
import { artistOptions, interests, site } from "@/content/site";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const field =
  "mt-2 w-full border border-bone/25 bg-panel px-4 py-3.5 text-bone placeholder:text-bone/40 transition-colors focus:border-gold focus:outline-none aria-[invalid=true]:border-blood-text";
const label = "text-xs font-semibold uppercase tracking-[0.2em] text-bone/85";

/**
 * No backend yet: validates, then opens the visitor's email app with the
 * enquiry pre-filled. Attachments can't travel through mailto, so the file
 * picker only reminds them to attach the image in their email.
 */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const next: Errors = {};
    if (!get("name")) next.name = "Please enter your name.";
    if (!get("email")) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email"))) next.email = "Please enter a valid email address.";
    if (!get("message")) next.message = "Please tell us a little about what you want.";
    setErrors(next);

    const firstBad = Object.keys(next)[0];
    if (firstBad) {
      setStatus(`Please fix ${Object.keys(next).length} field${Object.keys(next).length > 1 ? "s" : ""}.`);
      form.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }

    const picked = data.getAll("interest").map(String);
    const file = data.get("reference") as File | null;
    const lines = [`Name: ${get("name")}`, `Email: ${get("email")}`];
    if (get("phone")) lines.push(`Phone: ${get("phone")}`);
    if (picked.length) lines.push(`Interested in: ${picked.join(", ")}`);
    lines.push(`Artist preference: ${get("artist") || "Any"}`, "", get("message"));
    if (file && file.size) lines.push("", `(I'll attach my reference image: ${file.name})`);
    const body = lines.join("\n");

    const subject = `Website enquiry: ${picked[0] ?? "Tattoo / piercing"} from ${get("name")}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus(
      file && file.size
        ? "Opening your email app. Remember to attach your reference image before you send."
        : "Opening your email app. Hit send and we’ll get back to you.",
    );
  };

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-2 text-sm font-medium text-blood-text">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form noValidate onSubmit={onSubmit} aria-labelledby="form-title" className="border border-gold/30 bg-panel/60 p-6 md:p-10">
      <h3 id="form-title" className="text-3xl md:text-4xl">Send us a message</h3>
      <p className="mt-2 text-sm text-bone-dim">Fields marked * are required. Or just walk in, 7 days, 1–7pm.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>Name *</label>
          <input id="cf-name" name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} className={field} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>Email *</label>
          <input id="cf-email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} className={field} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="cf-phone" className={label}>Phone</label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" className={field} />
        </div>
        <div>
          <label htmlFor="cf-artist" className={label}>Artist preference</label>
          <select id="cf-artist" name="artist" defaultValue="Any" className={`${field} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23B89A5E' stroke-width='1.5'/%3E%3C/svg%3E")] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat`}>
            {artistOptions.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>

      <fieldset className="mt-7">
        <legend className={label}>I’m interested in</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {interests.map((i) => (
            <label key={i} className="cursor-pointer">
              <input type="checkbox" name="interest" value={i} className="peer sr-only" />
              <span className="inline-block border border-bone/30 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-bone peer-checked:border-blood peer-checked:bg-blood peer-checked:text-bone peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold">
                {i}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-7">
        <label htmlFor="cf-message" className={label}>Message *</label>
        <textarea id="cf-message" name="message" rows={5} required aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} className={`${field} resize-y`} />
        {err("message")}
      </div>

      <div className="mt-7">
        <label htmlFor="cf-ref" className={label}>Reference image (optional)</label>
        <input
          id="cf-ref"
          name="reference"
          type="file"
          accept="image/*"
          aria-describedby="cf-ref-note"
          className="mt-2 block w-full text-sm text-bone-dim file:mr-4 file:cursor-pointer file:border file:border-bone/30 file:bg-transparent file:px-4 file:py-2.5 file:text-xs file:font-bold file:uppercase file:tracking-[0.18em] file:text-bone hover:file:border-bone"
        />
        <p id="cf-ref-note" className="mt-2 text-sm text-bone-dim">
          This opens your email app. Attach the image there before you send.
        </p>
      </div>

      <button type="submit" className="btn btn-red mt-9 w-full sm:w-auto">Send message</button>
      <p role="status" aria-live="polite" className="mt-4 min-h-6 text-sm text-bone/85">{status}</p>
    </form>
  );
}
