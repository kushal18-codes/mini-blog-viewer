import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../constants';
import type { Comment, Post } from '../types';
import { fetchJson } from '../utils';
import AuthorInfo from './author-info';
import Status from './status';

interface CommentsResponse {
  comments: Comment[];
  total: number;
  skip: number;
  limit: number;
}

function PostDetailContent() {
  const { id } = useParams();
  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useQuery<Post>({
    queryKey: ['post', id],
    queryFn: () => fetchJson(`${API_BASE_URL}/posts/${id}`),
  });

  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useQuery<CommentsResponse>({
    queryKey: ['comments', id],
    queryFn: () => fetchJson(`${API_BASE_URL}/posts/${id}/comments`),
    enabled: !!post, // Only fetch comments if post data is available
  });

  if (isPostLoading) {
    return <Status message="Loading post..." type="loading" />;
  }

  if (isPostError) {
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
      <div className="mb-4 flex items-center text-gray-500 text-sm">
        <span className="mr-2">❤️ {post.reactions.likes} Reactions</span>
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
      <AuthorInfo userId={post.userId} />

      <h3 className="mt-8 mb-4 font-bold text-2xl text-gray-900">Comments</h3>
      {isCommentsLoading && (
        <Status message="Loading comments..." type="loading" />
      )}
      {isCommentsError && (
        <Status message="Error loading comments." type="error" />
      )}
      {commentsData?.comments && commentsData.comments.length > 0 ? (
        <div className="space-y-4">
          {commentsData.comments.map((comment) => (
            <div
              className="rounded-r-lg border-blue-500 border-l-4 bg-gray-50 py-2 pl-4"
              key={comment.id}
            >
              <p className="text-gray-800">{comment.body}</p>
              <p className="mt-1 text-gray-600 text-sm">
                - {comment.user.username}
              </p>
            </div>
          ))}
        </div>
      ) : (
        !(isCommentsLoading || isCommentsError) && (
          <Status message="No comments yet." type="info" />
        )
      )}
    </div>
  );
}

export default function PostDetail() {
  return <PostDetailContent />;
}
