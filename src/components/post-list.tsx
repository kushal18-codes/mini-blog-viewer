import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { API_BASE_URL } from '../constants';
import type { Post } from '../types';
import { fetchJson } from '../utils';
import PostItem from './post-item';
import Status from './status';

interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

function PostListContent() {
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 10; // DummyJSON default limit

  const {
    data: postsData,
    isLoading,
    isError,
  } = useQuery<PostsResponse>({
    queryKey: ['posts', currentPage],
    queryFn: () =>
      fetchJson(
        `${API_BASE_URL}/posts?limit=${postsPerPage}&skip=${
          currentPage * postsPerPage
        }`
      ),
  });

  const posts = postsData?.posts || [];
  const totalPosts = postsData?.total || 0;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

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
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
      <div className="flex items-center justify-center space-x-4">
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentPage === 0}
          onClick={handlePreviousPage}
          type="button"
        >
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentPage === totalPages - 1}
          onClick={handleNextPage}
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default function PostList() {
  return <PostListContent />;
}
