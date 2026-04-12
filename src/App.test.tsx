import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';

Object.defineProperty(window, 'fetch', {
  writable: true,
  value: vi.fn()
});

test('renders without crashing', () => {
  render(<App />);
  expect(screen.getByText(/pure and authentic jeet kune do/i)).toBeInTheDocument();
  expect(screen.getByText(/virtual sifu console/i)).toBeInTheDocument();
});
