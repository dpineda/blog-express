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
    { title: "Blog List Page" },
    { name: "description", content: "Welcome to Blog!" },
  ];
};

const truncate = (input: string) => input.length > 100 ? `${input.substring(0, 100)}...` : input;

interface BlogEntry {
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
      {data.map((author, index)=>
      <tr key={index}>
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{author.title}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{truncate(author.content)}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700"><img className="w-10 h-10 rounded-full" alt="" src={author.featured_image_url} /> </td>
      </tr>
      )}
    </tbody>
  </table>
</div>

<div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
  <ol className="flex justify-end gap-1 text-xs font-medium">
    <li>
      <a
        href="/"
        className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
      >
        <span className="sr-only">Prev Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </li>

    <li>
      <a
        href="/"
        className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
      >
        1
      </a>
    </li>

    <li className="block size-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white">
      2
    </li>

    <li>
      <a
        href="/"
        className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
      >
        3
      </a>
    </li>

    <li>
      <a
        href="/"
        className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
      >
        4
      </a>
    </li>

    <li>
      <a
        href="/"
        className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
      >
        <span className="sr-only">Next Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </li>
  </ol>
</div>
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
