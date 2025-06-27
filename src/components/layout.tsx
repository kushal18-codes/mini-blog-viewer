import { FileText, Home as HomeIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="font-sans">
      <header className="border-gray-200 border-b bg-white py-3">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <span className="font-semibold text-gray-900 text-lg tracking-tight">
              Blog Viewer
            </span>
          </div>
          <nav className="flex gap-1">
            <Link
              className="flex items-center gap-1 rounded px-3 py-1.5 text-gray-700 transition hover:bg-gray-100 hover:text-blue-600"
              to="/"
            >
              <HomeIcon className="h-5 w-5" /> Home
            </Link>
            <Link
              className="flex items-center gap-1 rounded px-3 py-1.5 text-gray-700 transition hover:bg-gray-100 hover:text-blue-600"
              to="/posts"
            >
              <FileText className="h-5 w-5" /> Posts
            </Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto flex-1 px-4 py-8">{children}</main>
      <footer className="mt-8 border-gray-200 border-t bg-white py-4 text-center text-gray-400 text-sm">
        {new Date().getFullYear()} Blog Viewer
      </footer>
    </div>
  );
}
