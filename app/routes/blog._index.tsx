import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import sql from "../db.server";
import { Link, useLoaderData } from "@remix-run/react";

export const loader = async ({ params,}: LoaderFunctionArgs) => {
  console.log("params", params)
  //invariant(params.contactId, "Missing contactId param");
  const posts = await sql`select * from posts`;
  //console.log(posts)
  return json(posts);
};

export const meta: MetaFunction = () => {
  return [
    { title: "Blog List" },
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
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <Link to={`/blog/${post.id}`}>
            {post.image && (
              <img
                src="https://via.placeholder.com/400"
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600">{truncate(post.content) || "N/A"}</p>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
