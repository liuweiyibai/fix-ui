import DefaultTheme from 'vitepress/theme';
import feui from '@fix-ui/ui';

export default {
  ...DefaultTheme,
  enhanceApp: async ({ app }) => {
    app.use(feui);
  },
};
