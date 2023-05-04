/**
 * @reference https://commitlint.js.org/#/
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'wip',
        'style',
        'refactor',
        'docs',
        'build',
        'ci',
        'test',
        'perf',
        'chore',
        'revert',
        'conflict',
        'font',
        'delete',
        'stash',
      ],
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
};