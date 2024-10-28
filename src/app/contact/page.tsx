import { ContactForm } from "./ContactForm";

export function generateMetadata() {
  return {
    title: "Cообщение | Казни женщин в России ",
    description: ``,
  };
}

export default async function ContactPage() {
  return (
    <div className="page-container page-section">
      <h1 className="h1">Оставьте Сообщение</h1>

      <ContactForm />
    </div>
  );
}
