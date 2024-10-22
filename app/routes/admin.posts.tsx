import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Admin Blog Management" },
    { name: "description", content: "Welcome to Tec Blog!" },
  ];
};

export default function AdminPostManagement() {
  return <Outlet />
}