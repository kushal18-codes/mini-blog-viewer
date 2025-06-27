import { Link } from 'react-router-dom';
import type { Post } from '../types';
import { truncateText } from '../utils';

export default function PostItem({ post }: Readonly<{ post: Post }>) {
  return (
    <div className="mb-4">
      <h3>{post.title}</h3>
      <p>{truncateText(post.body, 60)}</p>
      <Link to={`/posts/${post.id}`}>Read more</Link>
    </div>
  );
}
