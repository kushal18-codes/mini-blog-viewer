import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Post } from '../types';
import AuthorInfo from './author-info';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <AuthorInfo userId={post.userId} />
    </div>
  );
}
