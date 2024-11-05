"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { TextArea } from "@/components/TextArea";
import { TextField } from "@/components/TextField";
import { StatusMessage } from "@/components/StatusMessage";

export function ContactForm() {
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<boolean | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setResult(null);
    event.preventDefault();
    setIsSending(true);
    const result = await sendEmail(event.currentTarget);
    setResult(result.success);
    setIsSending(false);
  }

  return (
    <form
      className="flex flex-col gap-6 border p-4 sm:p-6"
      onSubmit={handleSubmit}
    >
      <TextField label="Имя" required name="name" />
      <TextField
        label="Адрес электронной почты"
        type="email"
        name="email"
        required
      />
      <TextField
        label="Имя испытуемой женщины (необязательно)"
        name="subject"
        helperText="Если ваше сообщение касается конкретной женщины в наших записях"
      />
      <TextArea label="Сообщение" name="message" required />

      <button
        type="submit"
        className="bg-foreground text-background px-4 py-2 hover:bg-stone-300 transition-colors mt-4 min-w-48"
        disabled={isSending}
      >
        {isSending ? "Oтправка..." : "Oтправить"}
      </button>

      {result === true && <StatusMessage>Сообщение отправлено!</StatusMessage>}
      {result === false && (
        <StatusMessage type="error">
          Невозможно отправить сообщение
        </StatusMessage>
      )}
    </form>
  );
}

async function sendEmail(form: EventTarget & HTMLFormElement) {
  try {
    const result = await emailjs.sendForm(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ID!,
      form,
      process.env.EMAILJS_PUBLIC_KEY
    );

    if (result.status === 200) {
      return { success: true };
    }

    return { success: false };
  } catch {
    return { success: false };
  }
}
