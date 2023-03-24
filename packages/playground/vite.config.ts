import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import DefineOptions from 'unplugin-vue-define-options/vite';
import Components from 'unplugin-vue-components/vite';
import { FeUiResolver } from './resolvers';

export default defineConfig({
  plugins: [
    vue(),
    DefineOptions(),
    Components({
      resolvers: [FeUiResolver()],
    }),
  ],
});
