import { keepPreviousData, useQuery } from '@tanstack/react-query';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedTag, setSelectedTag] = useState('');
  const postsPerPage = 10; // DummyJSON default limit

  const {
    data: postsData,
    isLoading,
    isError,
  } = useQuery<PostsResponse>({
    queryKey: [
      'posts',
      currentPage,
      searchQuery,
      sortBy,
      sortOrder,
      selectedTag,
    ],
    queryFn: () => {
      let url = `${API_BASE_URL}/posts`;
      if (selectedTag) {
        url = `${API_BASE_URL}/posts/tag/${selectedTag}`;
      } else if (searchQuery) {
        url = `${API_BASE_URL}/posts/search?q=${searchQuery}`;
      }

      const params = new URLSearchParams();
      params.append('limit', String(postsPerPage));
      params.append('skip', String(currentPage * postsPerPage));
      if (sortBy) {
        params.append('sortBy', sortBy);
        params.append('order', sortOrder);
      }

      return fetchJson(`${url}${url.includes('?') ? '&' : '?'}${params}`);
    },
    placeholderData: keepPreviousData,
  });

  const { data: tags } = useQuery<string[]>({
    queryKey: ['tags'],
    queryFn: () => fetchJson(`${API_BASE_URL}/posts/tag-list`),
  });

  const posts = postsData?.posts || [];
  const totalPosts = postsData?.total ?? 0;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <input
          className="rounded border px-4 py-2"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search posts..."
          type="text"
          value={searchQuery}
        />
        <div className="flex items-center gap-4">
          <select
            className="rounded border px-4 py-2"
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
          >
            <option value="title">Sort by Title</option>
            <option value="reactions">Sort by Reactions</option>
            <option value="views">Sort by Views</option>
          </select>
          <select
            className="rounded border px-4 py-2"
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <select
          className="rounded border px-4 py-2"
          onChange={(e) => setSelectedTag(e.target.value)}
          value={selectedTag}
        >
          <option value="">All Tags</option>
          {tags?.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {isLoading && <Status message="Loading posts..." type="loading" />}
      {!isLoading && isError && (
        <Status message="Error loading posts." type="error" />
      )}
      {!(isLoading || isError) && (!posts || posts.length === 0) && (
        <Status message="No posts available." type="error" />
      )}
      {!(isLoading || isError) && posts && posts.length > 0 && (
        <>
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
        </>
      )}
    </div>
  );
}

export default function PostList() {
  return <PostListContent />;
}
