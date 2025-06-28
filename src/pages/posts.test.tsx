import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Posts from './posts';

vi.mock('../components/post-list', () => ({
  default: () => <div>PostList</div>,
}));

describe('Posts', () => {
  it('should render the page title', () => {
    render(<Posts />);
    expect(screen.getByText('Explore Posts')).toBeInTheDocument();
  });

  it('should render the PostList component', () => {
    render(<Posts />);
    expect(screen.getByText('PostList')).toBeInTheDocument();
  });
});
