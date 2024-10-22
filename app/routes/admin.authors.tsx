import { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, redirect, useLoaderData } from "@remix-run/react";
import sql from '../db.server';

export async function action ({request}: ActionFunctionArgs){
  const body = await request.formData();
  const post  = {
    name: body.get('name')?.toString(),
    email: body.get('email')?.toString(),
    bio: body.get('bio')?.toString(),
    profile_image_url: body.get('profile_image_url')?.toString(),
  };
  const res = await sql`
  insert into authors ${
    sql(post, 'name', 'email', 'bio', 'profile_image_url')
  }`;
  console.log(res);
  return redirect(`/admin/authors`);
}

export async function loader() {
  const authors = await sql`select * from authors`;
  return json(authors);
}

export default function AdminPosts(){
  const data = useLoaderData<typeof loader>();
  return <div>
    <h1 className="text-2xl mb-4">Authors</h1>
    <Form method="post">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700"> Name </label>
      <input
        type="text"
        name="name"
        placeholder="Author name"
        className="mt-1 mb-3 w-full rounded-md p-3 border border-gray-200 shadow-sm sm:text-sm"
      />
      <label htmlFor="email" className="block text-sm font-medium text-gray-700"> Email </label>
      <input
        type="email"
        name="email"
        placeholder="Author email"
        className="mt-1 mb-3 w-full rounded-md p-3 border border-gray-200 shadow-sm sm:text-sm"
      />
      <label htmlFor="bio" className="block text-sm font-medium text-gray-700"> bio </label>
      <input
        type="text"
        name="bio"
        placeholder="Author bio"
        className="mt-1 mb-3 w-full rounded-md p-3 border border-gray-200 shadow-sm sm:text-sm"
      />
      <label htmlFor="profile_image_url" className="block text-sm font-medium text-gray-700"> Profile image url </label>
      <input
        type="text"
        name="profile_image_url"
        defaultValue={'https://placecats.com/neo_banana/300/200'}
        placeholder="Author profile image url"
        className="mt-1 mb-3 w-full rounded-md p-3 border border-gray-200 shadow-sm sm:text-sm"
      />
      
      <button type="submit" className="mt-3 py-2 px-3 rounded-md border border-blue-500 bg-white shadow-sm">Create Author</button>
    </Form>

    <div className="rounded-lg border mt-10 border-gray-200">
      <div className="overflow-x-auto rounded-t-lg">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Email</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Bio</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Image</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.map((author, index)=>
            <tr key={index}>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{author.name}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{author.email}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{author.bio}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700"><img className="w-10 h-10 rounded-full" alt="" src={author.profile_image_url} /> </td>
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
  </div>
}