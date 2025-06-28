import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { fetchJson } from '../utils';
import PostList from './post-list';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const NEXT_REGEX = /Next/i;
const PREVIOUS_REGEX = /Previous/i;
const SORT_BY_REGEX = /Sort by/i;

describe('PostList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock for fetchJson to avoid unhandled requests
    vi.spyOn(fetchJson, 'fetchJson').mockImplementation((url: string) => {
      if (url.includes('/posts/tag-list')) {
        return Promise.resolve(['tag1', 'tag2']);
      }
      return Promise.resolve({
        posts: [],
        total: 0,
        skip: 0,
        limit: 10,
      });
    });
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('should render loading state', () => {
    vi.spyOn(fetchJson, 'fetchJson').mockReturnValue(
      new Promise(() => {
        /* empty */
      })
    ); // Never resolves

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <PostList />
        </QueryClientProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('Loading posts...')).toBeInTheDocument();
  });

  it('should render error state', async () => {
    vi.spyOn(fetchJson, 'fetchJson')
      .mockRejectedValueOnce(new Error('Posts error'))
      .mockResolvedValueOnce(['tag1', 'tag2']); // For tags

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <PostList />
        </QueryClientProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Error loading posts.')).toBeInTheDocument();
    });
  });

  it('should render "No posts available." when no posts are returned', async () => {
    vi.spyOn(fetchJson, 'fetchJson')
      .mockResolvedValueOnce({
        posts: [],
        total: 0,
        skip: 0,
        limit: 10,
      })
      .mockResolvedValueOnce(['tag1', 'tag2']); // For tags

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <PostList />
        </QueryClientProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No posts available.')).toBeInTheDocument();
    });
  });

  it('should render posts', async () => {
    vi.spyOn(fetchJson, 'fetchJson')
      .mockResolvedValueOnce({
        posts: [
          {
            id: 1,
            title: 'Post 1',
            body: 'Body 1',
            reactions: { likes: 5, dislikes: 0 },
            tags: ['tag1'],
            userId: 1,
          },
          {
            id: 2,
            title: 'Post 2',
            body: 'Body 2',
            reactions: { likes: 10, dislikes: 0 },
            tags: ['tag2'],
            userId: 2,
          },
        ],
        total: 2,
        skip: 0,
        limit: 10,
      })
      .mockResolvedValueOnce(['tag1', 'tag2']); // For tags

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <PostList />
        </QueryClientProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Post 1')).toBeInTheDocument();
      expect(screen.getByText('Post 2')).toBeInTheDocument();
    });
  });

  it('should handle pagination', async () => {
    vi.spyOn(fetchJson, 'fetchJson')
      .mockResolvedValueOnce({
        posts: [
          {
            id: 1,
            title: 'Post 1',
            body: 'Body 1',
            reactions: { likes: 5, dislikes: 0 },
            tags: ['tag1'],
            userId: 1,
          },
        ],
        total: 20,
        skip: 0,
        limit: 10,
      })
      .mockResolvedValueOnce(['tag1', 'tag2']) // For tags
      .mockResolvedValueOnce({
        posts: [
          {
            id: 11,
            title: 'Post 11',
            body: 'Body 11',
            reactions: { likes: 5, dislikes: 0 },
            tags: ['tag1'],
            userId: 1,
          },
        ],
        total: 20,
        skip: 10,
        limit: 10,
      });

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <PostList />
        </QueryClientProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Post 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: NEXT_REGEX }));

    await waitFor(() => {
      expect(screen.getByText('Post 11')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: PREVIOUS_REGEX }));

    await waitFor(() => {
      expect(screen.getByText('Post 1')).toBeInTheDocument();
    });
  });

  it('should handle search', async () => {
    vi.spyOn(fetchJson, 'fetchJson')
      .mockResolvedValueOnce({
        posts: [
          {
            id: 1,
            title: 'Post 1',
            body: 'Body 1',
            reactions: { likes: 5, dislikes: 0 },
            tags: ['tag1'],
            userId: 1,
          },
        ],
        total: 1,
        skip: 0,
        limit: 10,
      })
      .mockResolvedValueOnce(['tag1', 'tag2']) // For tags
      .mockResolvedValueOnce({
        posts: [
          {
            id: 3,
            title: 'Search Post',
            body: 'Body 3',
            reactions: { likes: 5, dislikes: 0 },
            tags: ['tag1'],
            userId: 1,
          },
        ],
        total: 1,
        skip: 0,
        limit: 10,
      });

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <PostList />
        </QueryClientProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Post 1')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Search posts...'), {
      target: { value: 'Search' },
    });

    await waitFor(() => {
      expect(screen.getByText('Search Post')).toBeInTheDocument();
    });
  });

  it('should handle sorting', async () => {
    vi.spyOn(fetchJson, 'fetchJson')
      .mockResolvedValueOnce({
        posts: [
          {
            id: 1,
            title: 'Post A',
            body: 'Body A',
            reactions: { likes: 5, dislikes: 0 },
            tags: ['tag1'],
            userId: 1,
          },
        ],
        total: 1,
        skip: 0,
        limit: 10,
      })
      .mockResolvedValueOnce(['tag1', 'tag2']) // For tags
      .mockResolvedValueOnce({
        posts: [
          {
            id: 2,
            title: 'Post B',
            body: 'Body B',
            reactions: { likes: 10, dislikes: 0 },
            tags: ['tag2'],
            userId: 2,
          },
        ],
        total: 1,
        skip: 0,
        limit: 10,
      });

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <PostList />
        </QueryClientProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Post A')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByRole('combobox', { name: SORT_BY_REGEX }), {
      target: { value: 'reactions' },
    });

    await waitFor(() => {
      expect(screen.getByText('Post B')).toBeInTheDocument();
    });
  });

  it('should handle tag filtering', async () => {
    vi.spyOn(fetchJson, 'fetchJson')
      .mockResolvedValueOnce({
        posts: [
          {
            id: 1,
            title: 'Post 1',
            body: 'Body 1',
            reactions: { likes: 5, dislikes: 0 },
            tags: ['tag1'],
            userId: 1,
          },
        ],
        total: 1,
        skip: 0,
        limit: 10,
      })
      .mockResolvedValueOnce(['tag1', 'tag2']) // For tags
      .mockResolvedValueOnce({
        posts: [
          {
            id: 4,
            title: 'Tag Post',
            body: 'Body 4',
            reactions: { likes: 5, dislikes: 0 },
            tags: ['tag2'],
            userId: 1,
          },
        ],
        total: 1,
        skip: 0,
        limit: 10,
      });

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <PostList />
        </QueryClientProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Post 1')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByDisplayValue('All Tags'), {
      target: { value: 'tag2' },
    });

    await waitFor(() => {
      expect(screen.getByText('Tag Post')).toBeInTheDocument();
    });
  });
});
