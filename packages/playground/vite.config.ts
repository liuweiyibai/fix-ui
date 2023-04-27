import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import DefineOptions from 'unplugin-vue-define-options/vite';
import Components from 'unplugin-vue-components/vite';
import { FixUiResolver } from './resolvers';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [
    vue(),
    DefineOptions(),
    vueJsx(),
    Components({
      resolvers: [FixUiResolver()],
    }),
  ],
});
