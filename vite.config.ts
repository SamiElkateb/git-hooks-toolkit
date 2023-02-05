import { defineConfig } from 'vitest/config';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  test: {
    testTimeout: 10000,
    silent: false,
    coverage: {
      branches: 70,
      include: ['lib/core', 'lib/utils'],
    },
  },
  plugins: [
    AutoImport({
      imports: ['vitest'],
      dts: true,
    }),
  ],
});
