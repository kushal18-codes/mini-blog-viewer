import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { fetchJson } from '../utils';
import AuthorInfo from './author-info';

describe('AuthorInfo', () => {
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
  });

  it('should render the loading state', () => {
    vi.spyOn(fetchJson, 'fetchJson').mockReturnValue(
      new Promise(() => {
        /* empty */
      })
    ); // Never resolves

    render(
      <QueryClientProvider client={queryClient}>
        <AuthorInfo userId={1} />
      </QueryClientProvider>
    );
    expect(screen.getByText('Loading author info...')).toBeInTheDocument();
  });

  it('should render the error state', async () => {
    vi.spyOn(fetchJson, 'fetchJson').mockRejectedValue(
      new Error('Network error')
    );

    render(
      <QueryClientProvider client={queryClient}>
        <AuthorInfo userId={1} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText('Error loading author info.')
      ).toBeInTheDocument();
    });
  });

  it('should render the author information', async () => {
    vi.spyOn(fetchJson, 'fetchJson').mockResolvedValue({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      company: { name: 'Example Corp' },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <AuthorInfo userId={1} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('Example Corp')).toBeInTheDocument();
  });

  it('should render "Author not found." when author is null', async () => {
    vi.spyOn(fetchJson, 'fetchJson').mockResolvedValue(null);

    render(
      <QueryClientProvider client={queryClient}>
        <AuthorInfo userId={1} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Author not found.')).toBeInTheDocument();
    });
  });
});
