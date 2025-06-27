import { Link } from 'react-router-dom';
import type { Post } from '../types';

export default function PostItem({ post }: Readonly<{ post: Post }>) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 60)}...</p>
      <Link to={`/posts/${post.id}`}>Read more</Link>
    </div>
  );
}
