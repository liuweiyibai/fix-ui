import DefaultTheme from 'vitepress/theme';
import feui from '@fe-ui/ui';

export default {
  ...DefaultTheme,
  enhanceApp: async ({ app }) => {
    app.use(feui);
  },
};
