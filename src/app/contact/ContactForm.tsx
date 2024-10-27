"use client";

import { TextArea } from "@/components/TextArea";
import { TextField } from "@/components/TextField";
import { FormEvent, useRef } from "react";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    console.log(data);
  }

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-6 border p-6 sm:p-8 rounded bg-white"
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
        className="bg-foreground text-background px-4 py-2 rounded hover:bg-zinc-800 transition-colors mt-4"
      >
        Oтправить
      </button>
    </form>
  );
}
