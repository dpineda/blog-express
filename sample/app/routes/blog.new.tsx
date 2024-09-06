import { ActionFunctionArgs } from "@remix-run/node"
import { prisma } from "../db.server"
import { Form, useLoaderData } from "@remix-run/react"

export async function action({
  request,
}: ActionFunctionArgs) {
  
  const body = await request.formData();
  await prisma.post.create({
    data: {
      title: body.get('title'),
      draftId: (new Date()).toISOString(),
      description: "Sample description"
    },
  })
  return {
    success: true,
  }
}
export const loader = async () => {  
  const data = {
    posts: await prisma.post.findMany(),
  };  
  return data;
}
// Define a type for a single post
type Post = {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
};

// Define a type for the data returned by the loader
type LoaderData = {
  posts: Post[];
};

export default function Index() {
  const { posts } = useLoaderData<LoaderData>()
  return <div>
      <h1> New Item </h1>      
      <Form method="POST">
        <div className="mb-6">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
          <input type="text" id="title" name="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>
        <input type="submit" value="Submit" />
      </Form>
      <hr />
      <h2>List Entries</h2>
      <ul>
        {posts &&  posts.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  
}