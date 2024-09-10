import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import sql from "../db.server";

export const loader = async ({ params,}: LoaderFunctionArgs) => {
  console.log("params", params)
  //invariant(params.contactId, "Missing contactId param");
  const posts = await sql`select * from posts`;
  console.log(posts)
  return json(posts);
};

export const meta: MetaFunction = () => {
  return [
    { title: "Blog List" },
    { name: "description", content: "Welcome to Blog!" },
  ];
};

export default function BlogList() {
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Welcome to Blog</h1>
      <ul className="list-disc mt-4 pl-6 space-y-2">
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            href="/blog/1"
          >
            Entry 1
          </a>
        </li>
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            href="/blog/2"
          >
            Entry 2
          </a>
        </li>
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            href="/blog/1"
          >
            Entry 3
          </a>
        </li>
      </ul>
    </div>
  );
}
