import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";
import sql from '../db.server';

export async function action ({request}: ActionFunctionArgs){
  const body = await request.formData();
  const post  = {
    title: body.get('title')?.toString(),
    content: body.get('content')?.toString(),
    slug: body.get('title')?.toString().replaceAll(" ", "-"),
    author_id: 1
  };
  const res = await sql`
  insert into posts ${
    sql(post, 'title', 'content', 'slug', 'author_id')
  }`;
  console.log(res);
  return redirect(`/`);
}

export default function AdminPosts(){

  return <div>
    <h1 className="text-2xl mb-4">Blog Entry</h1>
    <Form method="post">
      <label htmlFor="Title" className="block text-sm font-medium text-gray-700"> Title </label>
      <input
        type="text"
        id="Title"
        name="title"
        placeholder="Blog entry title"
        className="mt-1 mb-3 w-full rounded-md p-3 border border-gray-200 shadow-sm sm:text-sm"
      />
      <label htmlFor="Content" className="block text-sm font-medium text-gray-700"> Content </label>
      <textarea
        id="Content"
        name="content"
        className="mt-1 w-full rounded-lg p-3 border border-gray-200 align-top shadow-sm sm:text-sm"
        rows={4}
        placeholder="Enter blog entry content..."
      ></textarea>
      
      <button type="submit" className="mt-3 py-2 px-3 rounded-md border border-blue-500 bg-white shadow-sm">Create Blog Entry</button>
    </Form>
  </div>
}