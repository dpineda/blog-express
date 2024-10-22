import type { MetaFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Admin" },
    { name: "description", content: "Welcome to Tec Blog!" },
  ];
};

export default function Admin() {
  return <>
  <div className="mb-10 mt-5">
    <Link className="border border-gray-200 shadow-md rounded-md m-2 py-2 px-3" to={'posts'}>Posts</Link>
    <Link className="border border-gray-200 shadow-md rounded-md m-2 py-2 px-3" to={'authors'}>Authors</Link>
  </div>
  <Outlet />
  </>
}