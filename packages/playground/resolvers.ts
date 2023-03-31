import {
  ComponentResolver,
  kebabCase,
  SideEffectsInfo,
} from 'unplugin-vue-components';

type FixUiResolverOptions = {
  exclude?: RegExp;
};

function getSideEffects(partialName: string): SideEffectsInfo | undefined {
  return [`@fix-ui/ui/components/${partialName}/style/index.less`];
}

/**
 * 本地测试的 resolver
 * Resolver for fix-ui
 * @link https://element.eleme.cn/#/zh-CN
 * @version @fix-ui ^1.0.0, @vue ^3.2.0
 * @author @liuweiyibai
 */
export function FixUiResolver(
  options: FixUiResolverOptions = {}
): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (options.exclude && name.match(options.exclude)) return;

      if (/^Fix[A-Z]/.test(name)) {
        const compName = name.slice(3);
        const partialName = kebabCase(compName);

        return {
          from: `@fix-ui/ui/components/${partialName}`,
          sideEffects: getSideEffects(partialName),
        };
      }
    },
  };
}
