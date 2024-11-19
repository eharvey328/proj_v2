"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { TextArea } from "@/components/TextArea";
import { TextField } from "@/components/TextField";
import { StatusMessage } from "@/components/StatusMessage";
import clsx from "clsx";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<boolean | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setResult(null);
    event.preventDefault();
    setIsSending(true);
    const response = await sendEmail(event.currentTarget);
    if (response.success) {
      event.currentTarget.reset();
    }
    setResult(response.success);
    setIsSending(false);
  }

  return (
    <form ref={formRef} className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <TextField label="Ваше имя*" required name="name" />
      <TextField
        label="Адрес электронной почты*"
        type="email"
        name="email"
        required
      />
      <TextField
        label="Имя убитой женщины"
        name="subject"
        helperText="Если это имя уже есть в списках, пожалуйста, укажите список"
      />
      <TextArea label="Сообщение*" name="message" required />

      <button
        type="submit"
        className={clsx(
          "bg-foreground text-background px-4 py-2 hover:bg-stone-800 disabled:!bg-black/60 transition-colors mt-4 min-w-48 disabled:cursor-not-allowed"
        )}
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
