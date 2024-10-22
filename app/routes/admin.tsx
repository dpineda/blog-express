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

export default function Admin(){

  return <div>Blogs
    <Form method="post">
      <label htmlFor="title">Title</label>
      <input type="text" name="title" />
      <label htmlFor="constent">Content</label>
      <input type="area" name="content" />
      <button type="submit">Create Blog Entry</button>
    </Form>
  </div>
}