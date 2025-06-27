import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../constants';
import type { Post } from '../types';
import { fetchJson } from '../utils';
import AuthorInfo from './author-info';

function PostDetailContent() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    fetchJson<Post>(`${API_BASE_URL}/posts/${id}`).then(setPost);
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

export default function PostDetail() {
  return (
    <Suspense fallback={<p>Loading post...</p>}>
      <PostDetailContent />
    </Suspense>
  );
}
