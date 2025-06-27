import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL, POSTS_PER_PAGE } from '../constants';
import type { Post } from '../types';
import { fetchJson } from '../utils';
import PostItem from './post-item';
import Status from './status';

function PostListContent() {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: () => fetchJson(`${API_BASE_URL}/posts`),
  });

  if (isLoading) {
    return <Status message="Loading posts..." type="loading" />;
  }

  if (isError) {
    return <Status message="Error loading posts." type="error" />;
  }

  if (!posts || posts.length === 0) {
    return <Status message="No posts available." type="error" />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.slice(0, POSTS_PER_PAGE).map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}

export default function PostList() {
  return <PostListContent />;
}
