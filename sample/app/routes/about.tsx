import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "About" },
    { name: "description", content: "About Us" },
  ];
};

export default function About() {
  return (
    <div>
      <h1>About</h1>
    </div>
  );
}
