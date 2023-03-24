import { src, dest } from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import less from 'gulp-less';
import { resolve } from 'path';
import delPath from '../utils/delpath';
import run from '../utils/run';

// 组件库根目录
export const uiPackage = resolve(__dirname, '../../');

// 删除构建产物
export const removeDist = () => {
  console.log(`==============删除目录${uiPackage}/dist============`);
  return delPath(`${uiPackage}/dist`);
};

// 打包样式
export const buildStyle = () => {
  console.log(`==============从${uiPackage}/components构建样式============`);
  return src(`${uiPackage}/components/**/style/**.less`)
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(dest(`${uiPackage}/dist/lib/components`))
    .pipe(dest(`${uiPackage}/dist/es/components`));
};

// 打包组件
export const buildComponent = async () => {
  await run('pnpm run build', uiPackage);
};

async function task() {
  await removeDist();
  await buildComponent();
  buildStyle();
}

export default task;
