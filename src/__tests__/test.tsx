import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

test('renders learn react link', () => {
  render(<Home />);
  const linkElement = screen.getByText(/learn/i);
  expect(linkElement).toBeInTheDocument();
});
