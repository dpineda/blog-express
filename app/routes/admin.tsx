import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Admin" },
    { name: "description", content: "Welcome to Tec Blog!" },
  ];
};

export default function Admin() {
  return <Outlet />;
}