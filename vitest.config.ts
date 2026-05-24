import { defineConfig } from 'vitest/config';
import path from 'path';

export interface VitestConfigProps {
  test: {
    globals: boolean;
    environment: 'node';
    include: string[];
    alias: Record<string, string>;
  };
}

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    // Hardcode the target path directly to avoid wildcard shell mapping loops
    include: ['./tests/**/*.test.ts'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
} as VitestConfigProps);