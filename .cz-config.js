module.exports = {
  // 可选类型
  types: [
    { value: 'feat', name: '特性:    一个新的特性' },
    { value: 'fix', name: '修复:    修复一个Bug' },
    { value: 'docs', name: '文档:    变更的只有文档' },
    { value: 'style', name: '格式:    空格, 分号等格式修复' },
    { value: 'refactor', name: '重构:    代码重构，注意和特性、修复区分开' },
    { value: 'perf', name: '性能:    提升性能' },
    { value: 'test', name: '测试:    添加一个测试' },
    { value: 'build', name: '构建:    影响构建系统或外部依赖项的更改' },
    { value: 'ci', name: 'ci:    更改为我们的CI配置文件和脚本' },
  ],

  // 步骤
  messages: {
    type: '请选择提交的类型：:',
    scope: '选择一个scope (可选):',
    customScope: '请输入修改的范围(可选)',
    subject: '请简要描述提交(必填)',
    body: '长描述，使用"|"换行(可选)：\n',
    breaking: '非兼容性说明 (可选):\n',
    footer: '关联关闭的issue，例如：#1, #2(可选):\n',
    confirmCommit: '确认要使用以上信息提交?(Enter/n)',
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  // 默认长度 100
  subjectLimit: 100,
};
