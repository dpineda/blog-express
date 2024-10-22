import { ActionFunctionArgs, redirect } from '@remix-run/node';
import db from '../db.server';
import { Form } from '@remix-run/react';

export async function action({ request, }: ActionFunctionArgs) {
  const body = await request.formData();
  const todo =  body.get("title");
  console.log(todo)
  const res = await db.file('sql/create-tables.sql')
  //const res =  await create();
  console.log(res)
  return redirect(`/`);
}

export default function CreateDatabase () {

  return <div>
    <Form method="post">
      <input type="text" name="title" />
      <button type="submit">Create Database</button>
    </Form>
  </div>
}
