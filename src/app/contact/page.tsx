import { ContactForm } from "./ContactForm";

export default async function ContactPage() {
  return (
    <div className="page-container">
      <h1 className="h1">Оставьте Сообщение</h1>

      <ContactForm />
    </div>
  );
}
