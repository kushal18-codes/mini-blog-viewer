import { Link } from 'react-router-dom';
import type { Post } from '../types';
import { truncateText } from '../utils';

export default function PostItem({ post }: Readonly<{ post: Post }>) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <h3 className="mb-2 font-bold text-gray-900 text-xl tracking-tight">
        {post.title}
      </h3>
      <p className="mb-4 text-gray-600">{truncateText(post.body, 100)}</p>
      <Link
        className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        to={`/posts/${post.id}`}
      >
        Read more
      </Link>
    </div>
  );
}
