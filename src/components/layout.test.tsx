import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Layout from './layout';
import '@testing-library/jest-dom/vitest';

const BLOG_VIEWER_REGEX = /blog viewer/i;
const HOME_REGEX = /home/i;
const POSTS_REGEX = /posts/i;

describe('Layout', () => {
  it('renders the app name', () => {
    render(
      <MemoryRouter>
        <Layout>Test Content</Layout>
      </MemoryRouter>
    );
    const elements = screen.getAllByText(BLOG_VIEWER_REGEX);
    expect(elements.length).toBeGreaterThan(0);
  });

  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Layout>Test Content</Layout>
      </MemoryRouter>
    );
    const homeLinks = screen.getAllByRole('link', { name: HOME_REGEX });
    const postsLinks = screen.getAllByRole('link', { name: POSTS_REGEX });
    expect(homeLinks.length).toBeGreaterThan(0);
    expect(postsLinks.length).toBeGreaterThan(0);
  });

  it('renders children', () => {
    render(
      <MemoryRouter>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </MemoryRouter>
    );
    const elements = screen.getAllByText('Test Content');
    expect(elements.length).toBeGreaterThan(0);
  });

  it('renders footer with current year', () => {
    render(
      <MemoryRouter>
        <Layout>Test Content</Layout>
      </MemoryRouter>
    );
    const year = new Date().getFullYear();
    const elements = screen.getAllByText(new RegExp(`${year}`));
    expect(elements.length).toBeGreaterThan(0);
  });
});
