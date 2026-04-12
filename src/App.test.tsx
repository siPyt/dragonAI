import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';

Object.defineProperty(window, 'fetch', {
  writable: true,
  value: vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ ok: true, hasGatewayKey: true })
  })
});

test('renders without crashing', async () => {
  render(<App />);
  expect(screen.getByText(/pure and authentic jeet kune do/i)).toBeInTheDocument();
  expect(screen.getByText(/virtual sifu console/i)).toBeInTheDocument();
  await waitFor(() => {
    expect(window.fetch).toHaveBeenCalled();
  });
});
