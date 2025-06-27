import { Suspense, useEffect, useState } from 'react';
import { API_BASE_URL, POSTS_PER_PAGE } from '../constants';
import type { Post } from '../types';
import { fetchJson } from '../utils';
import PostItem from './post-item';

function PostListContent() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchJson<Post[]>(`${API_BASE_URL}/posts`).then((data) =>
      setPosts(data.slice(0, POSTS_PER_PAGE))
    );
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}

export default function PostList() {
  return (
    <Suspense fallback={<p>Loading posts...</p>}>
      <PostListContent />
    </Suspense>
  );
}
