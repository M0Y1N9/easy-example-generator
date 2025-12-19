# 贡献指南

感谢您考虑为数学例题生成器做出贡献！

## 如何贡献

### 报告问题

如果您发现了bug或有功能建议：

1. 检查 [Issues](https://github.com/yourusername/easy-example-generator/issues) 中是否已有相关问题
2. 如果没有，创建一个新的Issue
3. 清楚地描述问题或建议
4. 如果是bug，请提供：
   - 复现步骤
   - 预期行为
   - 实际行为
   - 浏览器和版本
   - 截图（如果适用）

### 提交代码

1. **Fork 仓库**
   ```bash
   # 点击GitHub页面上的Fork按钮
   ```

2. **克隆您的Fork**
   ```bash
   git clone https://github.com/your-username/easy-example-generator.git
   cd easy-example-generator
   ```

3. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

4. **进行修改**
   - 保持代码风格一致
   - 添加必要的注释
   - 确保代码可读性

5. **测试您的修改**
   - 在多个浏览器中测试
   - 测试不同的屏幕尺寸
   - 确保所有功能正常工作

6. **提交修改**
   ```bash
   git add .
   git commit -m "feat: 添加新功能"
   # 或
   git commit -m "fix: 修复某个bug"
   ```

7. **推送到您的Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **创建Pull Request**
   - 访问原仓库
   - 点击 "New Pull Request"
   - 选择您的分支
   - 详细描述您的修改

## 代码规范

### JavaScript

```javascript
// 使用驼峰命名法
const userName = 'John';

// 类名使用帕斯卡命名法
class UserController {}

// 常量使用大写下划线
const API_BASE_URL = 'https://api.example.com';

// 函数要有清晰的注释
/**
 * 生成数学例题
 * @param {string} topic - 数学知识点
 * @param {string} difficulty - 难度级别
 * @returns {Promise<string>} LaTeX代码
 */
async function generateProblems(topic, difficulty) {
    // ...
}

// 使用async/await而不是回调
async function fetchData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
```

### CSS

```css
/* 使用有意义的类名 */
.button-primary {}
.card-header {}

/* 使用CSS变量 */
:root {
    --color-primary: #6366f1;
    --spacing-base: 1rem;
}

/* 组织相关样式 */
.component {
    /* 布局 */
    display: flex;
    
    /* 尺寸 */
    width: 100%;
    height: auto;
    
    /* 样式 */
    background: var(--bg-primary);
    color: var(--text-primary);
    
    /* 其他 */
    transition: all 0.3s ease;
}
```

### HTML

```html
<!-- 使用语义化标签 -->
<header>
<main>
<section>
<article>
<footer>

<!-- 添加必要的属性 -->
<button 
    id="submit-button"
    class="button button-primary"
    aria-label="提交表单"
>
    提交
</button>

<!-- 图片添加alt属性 -->
<img src="logo.png" alt="项目Logo">
```

## 提交信息规范

使用清晰的提交信息：

```
类型: 简短描述

详细描述（可选）

相关Issue（可选）
```

**类型：**
- `feat`: 新功能
- `fix`: Bug修复
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试
- `chore`: 构建或辅助工具

**示例：**
```
feat: 添加题目收藏功能

实现了用户收藏喜欢的题目的功能，包括：
- 收藏按钮UI
- LocalStorage存储
- 收藏列表展示

Closes #123
```

## 开发环境

### 推荐工具

- **代码编辑器：** VS Code, Sublime Text, Atom
- **浏览器：** Chrome (推荐), Firefox Developer Edition
- **浏览器扩展：**
  - React Developer Tools
  - JSON Formatter
  - WhatFont

### 本地运行

```bash
# 简单HTTP服务器
python -m http.server 8000

# 或使用Node.js
npx http-server -p 8000

# 或使用PHP
php -S localhost:8000
```

然后访问 `http://localhost:8000`

## 测试清单

提交前请确保：

- [ ] 代码在Chrome中正常运行
- [ ] 代码在Firefox中正常运行
- [ ] 代码在Safari中正常运行（如果可能）
- [ ] 响应式设计在移动设备上正常
- [ ] 没有控制台错误
- [ ] 代码格式整洁
- [ ] 添加了必要的注释
- [ ] 更新了相关文档
- [ ] 遵循了项目的代码规范

## 需要帮助？

如果您有任何问题：

- 📖 查看 [README.md](README.md)
- 🐛 搜索现有的 [Issues](https://github.com/yourusername/easy-example-generator/issues)
- 💬 创建新的Issue询问
- 📧 发送邮件至 your.email@example.com

## 行为准则

### 我们的承诺

为了营造开放和友好的环境，我们承诺：

- 使用友好和包容的语言
- 尊重不同的观点和经验
- 优雅地接受建设性批评
- 关注对社区最有利的事情
- 对其他社区成员保持同理心

### 不可接受的行为

- 使用性化的语言或图像
- 挑衅、侮辱或贬损的评论
- 公开或私下的骚扰
- 未经许可发布他人的私人信息
- 其他在专业环境中被认为不适当的行为

## 许可

通过贡献代码，您同意您的贡献将在MIT许可证下授权。

---

再次感谢您的贡献！🎉

