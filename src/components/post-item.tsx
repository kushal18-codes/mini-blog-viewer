import { Link } from 'react-router-dom';
import type { Post } from '../types';
import { truncateText } from '../utils';

export default function PostItem({ post }: Readonly<{ post: Post }>) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <h3 className="mb-2 font-bold text-gray-900 text-xl tracking-tight">
        {post.title}
      </h3>
      <p className="mb-2 text-gray-600">{truncateText(post.body, 100)}</p>
      <div className="mb-4 flex items-center text-gray-500 text-sm">
        <span className="mr-2">❤️ {post.reactions.likes} Reactions</span>
        <span className="mr-2">👀 {post.views} Views</span>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.tags.map((tag) => (
              <span
                className="rounded-full bg-gray-200 px-2 py-0.5 text-gray-700 text-xs"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <Link
        className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        to={`/posts/${post.id}`}
      >
        Read more
      </Link>
    </div>
  );
}
