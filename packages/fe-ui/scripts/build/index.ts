import delPath from '../utils/delpath';
import { series, parallel, src, dest } from 'gulp';
import { pkgPath, componentPath } from '../utils/paths';
import less from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import run from '../utils/run';

// 删除构建产物
export const removeDist = () => {
  return delPath(`${pkgPath}/dist`);
};
console.log(componentPath);

// 打包样式
export const buildStyle = () => {
  return src(`${componentPath}/components/**/style/**.less`)
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(dest(`${pkgPath}/fe-ui/dist/lib/src`))
    .pipe(dest(`${pkgPath}/fe-ui/dist/es/src`));
};

// 打包组件
export const buildComponent = async () => {
  run('pnpm run build', componentPath);
};

export default series(
  async () => removeDist(),
  parallel(
    async () => buildStyle(),
    async () => buildComponent()
  )
);
