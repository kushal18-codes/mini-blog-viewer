import { render, screen } from '@testing-library/react';
import Status from './status';

describe('Status', () => {
  it('should render the loading state', () => {
    render(<Status message="Loading..." type="loading" />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('should render the info state', () => {
    render(<Status message="No data available." type="info" />);
    expect(screen.getByText('No data available.')).toBeInTheDocument();
    expect(document.querySelector('svg')).toHaveClass('text-blue-500');
  });

  it('should render the error state', () => {
    render(<Status message="An error occurred." type="error" />);
    expect(screen.getByText('An error occurred.')).toBeInTheDocument();
    expect(document.querySelector('svg')).toHaveClass('text-red-600');
  });
});
