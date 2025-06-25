import { FileText, Home as HomeIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div
      className="flex min-h-screen flex-col bg-gray-50 font-sans"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <header className="bg-blue-600 py-4 text-white shadow">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <FileText className="h-7 w-7" />
            <h1 className="font-bold text-2xl">Mini Blog Viewer</h1>
          </div>
          <nav className="flex gap-2">
            <Link
              className="flex items-center gap-1 rounded px-3 py-2 transition hover:bg-blue-700"
              to="/"
            >
              <HomeIcon className="h-5 w-5" /> Home
            </Link>
            <Link
              className="flex items-center gap-1 rounded px-3 py-2 transition hover:bg-blue-700"
              to="/posts"
            >
              <FileText className="h-5 w-5" /> Posts
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
