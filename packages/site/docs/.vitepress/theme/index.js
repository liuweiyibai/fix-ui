import DefaultTheme from 'vitepress/theme';
import fe from 'fe-ui';
export default {
  ...DefaultTheme,
  enhanceApp: async ({ app }) => {
    app.use(fe);
  },
};
