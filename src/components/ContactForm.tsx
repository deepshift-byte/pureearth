"use client";
import { useState } from "react";
import { site } from "@/content";

/** Opens the visitor's email app with the message filled in. No server or API key needed. */
export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  return (
    <form
      className="form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const name = String(f.get("name") || "").trim();
        const email = String(f.get("email") || "").trim();
        const interest = String(f.get("interest") || "");
        const message = String(f.get("message") || "").trim();
        const next: Record<string, string> = {};
        if (!name) next.name = "Enter your name.";
        if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
        if (!message) next.message = "Tell us briefly how you would like to work with us.";
        setErrors(next);
        if (Object.keys(next).length) {
          document.getElementById(`f-${Object.keys(next)[0]}`)?.focus();
          return;
        }
        const body = `Name: ${name}\nEmail: ${email}\nInterested in: ${interest}\n\n${message}`;
        window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(`Partnership enquiry: ${interest}`)}&body=${encodeURIComponent(body)}`;
        setSent(true);
      }}
    >
      <div className="f">
        <label htmlFor="f-name">Your name</label>
        <input id="f-name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} />
        {errors.name && <p className="err" id="e-name">{errors.name}</p>}
      </div>
      <div className="f">
        <label htmlFor="f-email">Email address</label>
        <input id="f-email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "e-email" : undefined} />
        {errors.email && <p className="err" id="e-email">{errors.email}</p>}
      </div>
      <div className="f">
        <label htmlFor="f-interest">What interests you?</label>
        <select id="f-interest" name="interest" defaultValue={site.priorities[0].title}>
          {site.priorities.map((p) => <option key={p.title}>{p.title}</option>)}
          {site.ways.map((w) => <option key={w.title}>{w.title}</option>)}
          <option>Something else</option>
        </select>
      </div>
      <div className="f">
        <label htmlFor="f-message">Message</label>
        <textarea id="f-message" name="message" rows={5} aria-invalid={!!errors.message} aria-describedby={errors.message ? "e-message" : undefined} />
        {errors.message && <p className="err" id="e-message">{errors.message}</p>}
      </div>
      <button className="btn btn-primary" type="submit">Write the email</button>
      <p className="small grey" role="status" style={{ marginTop: 12 }}>{sent ? "Your email app should now be open with your message. Press send there to reach us." : "This opens your email app with your message ready to send."}</p>
    </form>
  );
}
