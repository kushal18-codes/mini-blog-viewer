import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="bg-blue-600 py-4 text-white shadow">
        <div className="container mx-auto flex items-center justify-between px-4">
          <h1 className="font-bold text-2xl">Mini Blog Viewer</h1>
          <nav>
            <Link
              className="rounded px-3 py-2 transition hover:bg-blue-700"
              to="/"
            >
              Home
            </Link>
            <Link
              className="rounded px-3 py-2 transition hover:bg-blue-700"
              to="/posts"
            >
              Posts
            </Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto flex-1 px-4 py-8">{children}</main>
      <footer className="mt-8 bg-gray-800 py-4 text-center text-gray-200">
        &copy; {new Date().getFullYear()} Mini Blog Viewer
      </footer>
    </div>
  );
}
