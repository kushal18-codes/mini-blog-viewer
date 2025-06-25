import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/posts">Posts</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}
