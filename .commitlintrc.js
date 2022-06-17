/** @type {import('cz-git').UserConfig} */

const fs  =   require('fs');
const path = require('path');

const packages = fs.readdirSync(path.resolve(__dirname, 'src/packages'))

const { execSync } = require('child_process');
// precomputed scope
const scopeComplete = execSync('git status --porcelain || true')
  .toString()
  .trim()
  .split('\n')
  .find((r) => ~r.indexOf('M  src'))
  ?.replace(/(\/)/g, '%%')
  ?.match(/src%%((\w|-)*)/)?.[1];

module.exports = {
  rules: {
    "scope-enum": [2, "always", [ ...packages ]]
  },
  prompt: {
    messages: {
      type: "选择你要提交的类型 :",
      scope: "选择一个提交范围（可选）:",
      customScope: "请输入自定义的提交范围 :",
      subject: "填写简短精炼的变更描述 :\n",
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixsSelect: "选择关联issue前缀（可选）:",
      customFooterPrefixs: "输入自定义issue前缀 :",
      footer: "列举关联issue (可选) 例如: #31, #I3244 :\n",
      confirmCommit: "是否提交或修改commit ?"
    },
    // types: [
    //   {value: 'feat',     name: 'feat:     新增功能 | A new feature'},
    //   {value: 'fix',      name: 'fix:      修复缺陷 | A bug fix'},
    //   {value: 'docs',     name: 'docs:     文档更新 | Documentation only changes'},
    //   {value: 'style',    name: 'style:    代码格式 | Changes that do not affect the meaning of the code'},
    //   {value: 'refactor', name: 'refactor: 代码重构 | A code change that neither fixes a bug nor adds a feature'},
    //   {value: 'perf',     name: 'perf:     性能提升 | A code change that improves performance'},
    //   {value: 'test',     name: 'test:     测试相关 | Adding missing tests or correcting existing tests'},
    //   {value: 'build',    name: 'build:    构建相关 | Changes that affect the build system or external dependencies'},
    //   {value: 'ci',       name: 'ci:       持续集成 | Changes to our CI configuration files and scripts'},
    //   {value: 'revert',   name: 'revert:   回退代码 | Revert to a commit'},
    //   {value: 'chore',    name: 'chore:    其他修改 | Other changes that do not modify src or test files'},
    // ],
    types: [
      { value: "feat",    name: "feat:     ✨    新增功能 | A new feature", emoji: ":sparkles:" },
      { value: "fix",     name: "fix:      🐛    修复缺陷 | A bug fix", emoji: ":bug:" },
      { value: "docs",    name: "docs:     📝    文档更新 | Documentation only changes", emoji: ":memo:" },
      { value: "style",   name: "style:    💄    代码格式 | Changes that do not affect the meaning of the code", emoji: ":lipstick:" },
      { value: 'chore',   name: "chore:    ⏪️     其他修改 | everts a previous commit", emoji: ":rewind:" },
      { value: "refactor",name: "refactor: ♻️    代码重构 | A code change that neither fixes a bug nor adds a feature", emoji: ":recycle:" },
      { value: "perf",    name: "perf:     ⚡️    性能提升 | A code change that improves performance", emoji: ":zap:" },
      { value: "test",    name: "test:     ✅    测试相关 | Adding missing tests or correcting existing tests", emoji: ":white_check_mark:" },
      { value: "build",   name: "build:    📦️    构建相关 | Changes that affect the build system or external dependencies", emoji: ":package:" },
      { value: "ci",      name: "ci:       🎡    持续集成 | Changes to our CI configuration files and scripts", emoji: ":ferris_wheel:" },
      { value: 'revert',  name: "revert:   🔨    回退代码 | Other changes that don't modify src or test files", emoji: ":hammer:" },
    ],
    useEmoji: true,
    themeColorCode: "",
  // scopes: [...packages] ,
  defaultScope: scopeComplete,
  customScopesAlign: !scopeComplete ? 'top-bottom' : 'bottom',
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: "bottom",
    customScopesAlias: "custom",
    emptyScopesAlias: "empty",
    upperCaseSubject: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: "|",
    skipQuestions: [],
    customIssuePrefixsAlign: "top",
    emptyIssuePrefixsAlias: "skip",
    customIssuePrefixsAlias: "custom",
    allowCustomIssuePrefixs: true,
    allowEmptyIssuePrefixs: true,
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: "",
    defaultIssues: "",
    defaultScope: "",
    defaultSubject: ""
  }
};
