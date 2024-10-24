import { json, type MetaFunction } from "@remix-run/node";
import sql from "../db.server";
import { Link, useLoaderData } from "@remix-run/react";

export const loader = async () => {
  //invariant(params.contactId, "Missing contactId param");
  const posts = await sql`select * from posts`;
  return json(posts);
};

export const meta: MetaFunction = () => {
  return [
    { title: "Blog List Home" },
    { name: "description", content: "Welcome to Blog!" },
  ];
};

const truncate = (input: string) => input.length > 150 ? `${input.substring(0, 150)}...` : input;

export default function BlogList () {
  const posts = useLoaderData<typeof loader>();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Latest Blog Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id}>
            <Link to={`/blog/${post.id}`}>
            <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                className="h-56 w-full object-cover"
              />
              <div className="bg-white p-4 sm:p-6">
                <time dateTime="2022-10-10" className="block text-xs text-gray-500"> {(new Date(post.created_at)).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} </time>
                <h3 className="mt-0.5 text-lg text-gray-900">{post.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                  {truncate(post.content) || "N/A"}
                </p>
              </div>
            </article>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
