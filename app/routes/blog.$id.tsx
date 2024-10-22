import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import sql from "~/db.server";

export const meta: MetaFunction = ({params}) => {
  return [
    { title: "Blog Entry "+params.id },
    { name: "description", content: "Welcome to Blog!" },
  ];
};

export async function loader({params}: LoaderFunctionArgs) {
  const post = await sql`select * from posts p
  left join authors a on p.author_id = a.id
  where p.id = ${params.id || 0}`;
  return json(post);
}

export default function BlogEntry() {
  const data = useLoaderData<typeof loader>();
  const post = data[0];
  return (
    <article>
      <h1 className="text-4xl font-bold mb-4">{post.title }</h1>
      <div className="flex items-start gap-3">
        <p className="text-gray-500 mb-6">Published on August 28, 2024 {post.created_at} by <a href="/" className="text-blue-600">{post.name}</a></p>
        <img className="rounded-full" height="100" width="100" alt="" src={post.profile_image_url} />
      </div>
      <div className="prose prose-lg max-w-none">
        <p>{post.content}</p>
        <h2 className="text-2xl font-bold mb-2">Section Heading</h2>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-600">&quot;This is a quote from someone famous or an important statement related to the topic.&quot;</blockquote>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      </div>
    </article>
  );
}
