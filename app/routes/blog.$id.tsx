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
      <div className="flex items-center gap-3">
        <img className="rounded-full" height="40" width="40" alt="" src={post.profile_image_url} />
        <p className="text-gray-500">Published on {(new Date(post.created_at)).toLocaleDateString(
          'en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })} by <a href="/" className="text-blue-600">{post.name}</a></p>
      </div>
      <hr className="my-8" />
      <div className="prose prose-lg max-w-none whitespace-pre-line">
        {post.content}
      </div>
    </article>
  );
}
