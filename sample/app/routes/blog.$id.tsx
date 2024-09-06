import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Blog Entry 1" },
    { name: "description", content: "Welcome to Blog!" },
  ];
};

export default function BlogEntry() {
  return (
    <article>
      <h1 className="text-4xl font-bold mb-4">Blog Post Title</h1>
      <p className="text-gray-500 mb-6">Published on August 28, 2024 by <a href="/" className="text-blue-600">Author Name</a></p>
      <div className="prose prose-lg max-w-none">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <h2 className="text-2xl font-bold mb-2">Section Heading</h2>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-600">&quot;This is a quote from someone famous or an important statement related to the topic.&quot;</blockquote>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      </div>
    </article>
  );
}
