import * as components from './components';
export * from './components';
import { App } from 'vue';

export default {
  install: (app: App) => {
    for (const c in components) {
      // @ts-ignore
      app.use(components[c]);
    }
  },
};
