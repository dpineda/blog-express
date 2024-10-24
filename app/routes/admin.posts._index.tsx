import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import sql from "../db.server";
import { Link, useLoaderData } from "@remix-run/react";
import Pagination from "../components/pagination";

export const loader = async ({ params,}: LoaderFunctionArgs) => {
  console.log("params", params)
  //invariant(params.contactId, "Missing contactId param");
  const posts = await sql`select * from posts`;
  //console.log(posts)
  return json(posts);
};

export const meta: MetaFunction = () => {
  return [
    { title: "Blog List Page" },
    { name: "description", content: "Welcome to Blog!" },
  ];
};

const truncate = (input: string) => input.length > 100 ? `${input.substring(0, 100)}...` : input;

interface BlogEntry {
  id: number;
  title: string;
  content: string;
  featured_image_url: string;
}

const grid = (data: Array<BlogEntry>) =>     <div className="rounded-lg border mt-10 border-gray-200">
<div className="overflow-x-auto rounded-t-lg">
  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
    <thead className="ltr:text-left rtl:text-right">
      <tr>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Title</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Content</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Image</th>
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-200">
      {data.map((post, index)=>
      <tr key={index}>
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          <Link to={`/admin/posts/edit/${post.id}`}>
            {post.title}
          </Link>
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{truncate(post.content)}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          <img className="w-10 h-10 rounded-full" alt="" src={post.featured_image_url} /> 
        </td>
      </tr>
      )}
    </tbody>
  </table>
</div>
<Pagination />
</div>


export default function BlogsList () {
  const posts = useLoaderData<typeof loader>();
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center content-center">
        <h1 className="text-3xl font-bold text-center">Latest Blog Posts</h1>        
        <Link to={'create'} className="border border-gray-200 shadow-md rounded-md m-2 py-2 px-3" >Create Entry</Link>
      </div>
      {posts && grid(posts as Array<BlogEntry>)}
    </div>
  );
}
