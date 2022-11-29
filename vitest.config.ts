import { resolve } from 'path'
import { defineConfig } from 'vitest/config'
const path = resolve(__dirname)

export default defineConfig({
  test: {
    coverage: {
      functions: 80,
      branches: 80,
      statements: 80,
      lines: 80
    },
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**', 
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress}.config.*',
      'src/**'
    ]
  },
  resolve: {
    alias: {
      '@': `${path}/src`
    }
  }
})