import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'vitest-axe';
import Layout from './layout';
import '@testing-library/jest-dom/vitest';
import 'vitest-axe/extend-expect';
import { describe, expect, it } from 'vitest';

const BLOG_TITLE = /blog viewer/i;
const HOME_LINK = /home/i;
const POSTS_LINK = /posts/i;

describe('Layout component', () => {
  const renderLayout = (children = <div>Test Content</div>) =>
    render(
      <MemoryRouter>
        <Layout>{children}</Layout>
      </MemoryRouter>
    );

  it('renders the app title "Blog Viewer"', () => {
    renderLayout();
    const titles = screen.getAllByText(BLOG_TITLE);
    expect(titles.length).toBeGreaterThan(0);
  });

  it('renders navigation links for Home and Posts', () => {
    renderLayout();
    expect(screen.getByRole('link', { name: HOME_LINK })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: POSTS_LINK })).toBeInTheDocument();
  });

  it('renders passed children content', () => {
    renderLayout(<div>Custom Test Content</div>);
    expect(screen.getByText('Custom Test Content')).toBeInTheDocument();
  });

  it('shows current year in footer', () => {
    renderLayout();
    const currentYear = new Date().getFullYear();
    const yearMatcher = (content: string) =>
      content.includes(currentYear.toString());
    expect(screen.getByText(yearMatcher)).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <Layout>Test</Layout>
      </MemoryRouter>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
