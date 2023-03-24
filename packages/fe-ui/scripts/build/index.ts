import { series, parallel, src, dest } from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import less from 'gulp-less';
import { resolve } from 'path';
import delPath from '../utils/delpath';
import run from '../utils/run';

// 组件库根目录
export const feUiPackage = resolve(__dirname, '../../');

// 删除构建产物
export const removeDist = () => {
  console.log(`==============删除目录${feUiPackage}/dist============`);
  return delPath(`${feUiPackage}/dist`);
};

// 打包样式
export const buildStyle = () => {
  console.log(`==============从${feUiPackage}/components构建样式============`);
  return src(`${feUiPackage}/components/**/style/**.less`)
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(dest(`${feUiPackage}/dist/lib/components`))
    .pipe(dest(`${feUiPackage}/dist/es/components`));
};

// 打包组件
export const buildComponent = async () => {
  await run('pnpm run build', feUiPackage);
};

async function task() {
  await removeDist();
  await buildComponent();
  buildStyle();
}

export default task;
