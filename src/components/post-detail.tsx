import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../constants';
import type { Post } from '../types';
import { fetchJson } from '../utils';
import AuthorInfo from './author-info';
import Status from './status';

function PostDetailContent() {
  const { id } = useParams();
  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<Post>({
    queryKey: ['post', id],
    queryFn: () => fetchJson(`${API_BASE_URL}/posts/${id}`),
  });

  if (isLoading) {
    return <Status message="Loading post..." type="loading" />;
  }

  if (isError) {
    return <Status message="Error loading post." type="error" />;
  }

  if (!post) {
    return <Status message="Post not found." type="info" />;
  }

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="mb-4 font-bold text-3xl text-gray-900 tracking-tight">
        {post.title}
      </h2>
      <p className="mb-6 text-gray-600 text-lg">{post.body}</p>
      <AuthorInfo userId={post.userId} />
    </div>
  );
}

export default function PostDetail() {
  return <PostDetailContent />;
}
