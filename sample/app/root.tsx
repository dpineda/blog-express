import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-100 text-gray-800">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <a href="/" className="text-2xl font-bold text-blue-600">TechBlog</a>
                <ul className="flex space-x-6">
                    <li><a href="/" className="text-gray-600 hover:text-blue-600">Home</a></li>
                    <li><a href="/about" className="text-gray-600 hover:text-blue-600">About</a></li>
                    <li><a href="/blog" className="text-gray-600 hover:text-blue-600">Blog</a></li>
                    <li><a href="/contact" className="text-gray-600 hover:text-blue-600">Contact</a></li>
                </ul>
            </div>
        </nav>
        
        <main className="container mx-auto px-4 py-10">
          <div className="bg-white p-6 rounded-lg shadow-md">
            {children}
          </div>
        </main>
        <ScrollRestoration />
        <Scripts />
        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6 mt-10">
            <div className="container mx-auto px-4 text-center">
                <p>&copy; 2024 TechBlog. All Rights Reserved.</p>
                <p>Follow us on:
                    <a href="/" className="text-blue-400">Twitter</a>,
                    <a href="/" className="text-blue-400">Facebook</a>,
                    <a href="/" className="text-blue-400">LinkedIn</a>.
                </p>
            </div>
        </footer>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
