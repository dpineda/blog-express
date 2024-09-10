import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Contact" },
    { name: "description", content: "Contact Us" },
  ];
};

export default function Contact() {
  return (
    <div>
      <h1>Contact</h1>
    </div>
  );
}
