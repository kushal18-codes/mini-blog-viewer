import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { Post } from '../types';
import PostItem from './post-item';

const mockPost: Post = {
  id: 1,
  title: 'Test Post',
  body: 'This is a test post body.',
  reactions: { likes: 10, dislikes: 0 },
  tags: ['test', 'react'],
  userId: 1,
};

const BODY_REGEX = /This is a test post body./;
const REACTIONS_REGEX = /10 Reactions/;
const READ_MORE_REGEX = /Read more/i;

describe('PostItem', () => {
  it('should render the post title', () => {
    render(
      <MemoryRouter>
        <PostItem post={mockPost} />
      </MemoryRouter>
    );
    expect(screen.getByText('Test Post')).toBeInTheDocument();
  });

  it('should render the truncated post body', () => {
    render(
      <MemoryRouter>
        <PostItem post={mockPost} />
      </MemoryRouter>
    );
    expect(screen.getByText(BODY_REGEX)).toBeInTheDocument();
  });

  it('should render the post reactions', () => {
    render(
      <MemoryRouter>
        <PostItem post={mockPost} />
      </MemoryRouter>
    );
    expect(screen.getByText(REACTIONS_REGEX)).toBeInTheDocument();
  });

  it('should render the post tags', () => {
    render(
      <MemoryRouter>
        <PostItem post={mockPost} />
      </MemoryRouter>
    );
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('react')).toBeInTheDocument();
  });

  it('should have a "Read more" link', () => {
    render(
      <MemoryRouter>
        <PostItem post={mockPost} />
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: READ_MORE_REGEX });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/posts/1');
  });
});
