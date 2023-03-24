import {
  ComponentResolver,
  kebabCase,
  SideEffectsInfo,
} from 'unplugin-vue-components';

type FeUiResolverOptions = {
  exclude?: RegExp;
};

function getSideEffects(partialName: string): SideEffectsInfo | undefined {
  return [`@fe-ui/ui/components/${partialName}/style/index.less`];
}

/**
 * 本地测试的 resolver
 * Resolver for fe-ui
 * @link https://element.eleme.cn/#/zh-CN
 * @version @element-ui ^2.15.3, @vue ^3.2.0
 * @author @nabaonan
 */
export function FeUiResolver(
  options: FeUiResolverOptions = {}
): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (options.exclude && name.match(options.exclude)) return;

      if (/^Fe[A-Z]/.test(name)) {
        const compName = name.slice(2);
        const partialName = kebabCase(compName);

        return {
          from: `@fe-ui/ui/components/${partialName}`,
          sideEffects: getSideEffects(partialName),
        };
      }
    },
  };
}
