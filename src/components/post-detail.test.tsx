import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import { vi } from 'vitest';
import { fetchJson } from '../utils';
import PostDetail from './post-detail';

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}));

describe('PostDetail', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
    (useParams as vi.Mock).mockReturnValue({ id: '1' });
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('should render loading state for post', () => {
    vi.spyOn(fetchJson, 'fetchJson').mockImplementation((url: string) => {
      if (url.includes('/users/')) {
        return Promise.resolve({
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          company: { name: 'Example Corp' },
        });
      }
      return new Promise(() => {
        /* empty */
      }); // Never resolves for post
    });

    render(
      <QueryClientProvider client={queryClient}>
        <PostDetail />
      </QueryClientProvider>
    );
    expect(screen.getByText('Loading post...')).toBeInTheDocument();
  });

  it('should render error state for post', async () => {
    vi.spyOn(fetchJson, 'fetchJson').mockImplementation((url: string) => {
      if (url.includes('/users/')) {
        return Promise.resolve({
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          company: { name: 'Example Corp' },
        });
      }
      return Promise.reject(new Error('Post error'));
    });

    render(
      <QueryClientProvider client={queryClient}>
        <PostDetail />
      </QueryClientProvider>
    );

    await screen.findByText('Error loading post.');
  });

  it('should render "Post not found" when post is null', async () => {
    vi.spyOn(fetchJson, 'fetchJson').mockImplementation((url: string) => {
      if (url.includes('/users/')) {
        return Promise.resolve({
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          company: { name: 'Example Corp' },
        });
      }
      return Promise.resolve(null);
    });

    render(
      <QueryClientProvider client={queryClient}>
        <PostDetail />
      </QueryClientProvider>
    );

    await screen.findByText('Post not found.');
  });

  it('should render post details and loading state for comments', async () => {
    vi.spyOn(fetchJson, 'fetchJson').mockImplementation((url: string) => {
      if (url.includes('/users/')) {
        return Promise.resolve({
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          company: { name: 'Example Corp' },
        });
      }
      if (url.includes('/posts/1/comments')) {
        return new Promise(() => {
          /* empty */
        }); // Comments never resolve
      }
      return Promise.resolve({
        id: 1,
        title: 'Test Post',
        body: 'This is a test post body.',
        reactions: { likes: 10, dislikes: 0 },
        tags: ['test'],
        userId: 1,
      });
    });

    render(
      <QueryClientProvider client={queryClient}>
        <PostDetail />
      </QueryClientProvider>
    );

    await screen.findByText('Test Post');
    expect(screen.getByText('Loading comments...')).toBeInTheDocument();
  });

  it('should render post details and error state for comments', async () => {
    vi.spyOn(fetchJson, 'fetchJson').mockImplementation((url: string) => {
      if (url.includes('/users/')) {
        return Promise.resolve({
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          company: { name: 'Example Corp' },
        });
      }
      if (url.includes('/posts/1/comments')) {
        return Promise.reject(new Error('Comments error'));
      }
      return Promise.resolve({
        id: 1,
        title: 'Test Post',
        body: 'This is a test post body.',
        reactions: { likes: 10, dislikes: 0 },
        tags: ['test'],
        userId: 1,
      });
    });

    render(
      <QueryClientProvider client={queryClient}>
        <PostDetail />
      </QueryClientProvider>
    );

    await screen.findByText('Test Post');
    await screen.findByText('Error loading comments.');
  });

  it('should render post details and comments', async () => {
    vi.spyOn(fetchJson, 'fetchJson').mockImplementation((url: string) => {
      if (url.includes('/users/')) {
        return Promise.resolve({
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          company: { name: 'Example Corp' },
        });
      }
      if (url.includes('/posts/1/comments')) {
        return Promise.resolve({
          comments: [
            { id: 1, body: 'Comment 1', user: { username: 'user1' } },
            { id: 2, body: 'Comment 2', user: { username: 'user2' } },
          ],
        });
      }
      return Promise.resolve({
        id: 1,
        title: 'Test Post',
        body: 'This is a test post body.',
        reactions: { likes: 10, dislikes: 0 },
        tags: ['test'],
        userId: 1,
      });
    });

    render(
      <QueryClientProvider client={queryClient}>
        <PostDetail />
      </QueryClientProvider>
    );

    await screen.findByText('Test Post');
    expect(screen.getByText('Comment 1')).toBeInTheDocument();
    expect(screen.getByText('- user1')).toBeInTheDocument();
    expect(screen.getByText('Comment 2')).toBeInTheDocument();
    expect(screen.getByText('- user2')).toBeInTheDocument();
  });

  it('should render post details and "No comments yet." when no comments', async () => {
    vi.spyOn(fetchJson, 'fetchJson').mockImplementation((url: string) => {
      if (url.includes('/users/')) {
        return Promise.resolve({
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          company: { name: 'Example Corp' },
        });
      }
      if (url.includes('/posts/1/comments')) {
        return Promise.resolve({
          comments: [],
        });
      }
      return Promise.resolve({
        id: 1,
        title: 'Test Post',
        body: 'This is a test post body.',
        reactions: { likes: 10, dislikes: 0 },
        tags: ['test'],
        userId: 1,
      });
    });

    render(
      <QueryClientProvider client={queryClient}>
        <PostDetail />
      </QueryClientProvider>
    );

    await screen.findByText('Test Post');
    expect(screen.getByText('No comments yet.')).toBeInTheDocument();
  });
});
