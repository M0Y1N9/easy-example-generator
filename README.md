# 数学例题生成器 📐

一个美观、交互式的Web应用，用于生成给定数学知识点相关的十道简单例题，并输出可直接编译的LaTeX代码。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

## ✨ 功能特点

### 主要功能
- 🤖 **多AI服务商支持** - 支持Deepseek、OpenAI、Anthropic Claude
- 📜 **智能题目生成** - 自动生成10道相关例题，循序渐进
- 📄 **LaTeX格式输出** - 生成可直接编译的完整LaTeX文档
- 🎯 **难度选择** - 支持简单、中等、困难三种难度级别
- 💾 **便捷操作** - 一键复制和下载功能
- 📊 **完整日志** - 实时显示操作日志和状态

### 视觉效果
- 🌌 **背景粒子动画** - 动态粒子连接效果
- 🎨 **现代化界面** - 深色主题，渐变色彩
- ⚡ **流畅动画** - 状态转换和交互动画
- 📱 **响应式设计** - 适配各种屏幕尺寸

### 隐私安全
- 🔒 **纯前端运行** - 无需后端服务器
- 💻 **本地存储** - API密钥仅在本地浏览器存储
- 🛡️ **数据安全** - 不上传任何数据到第三方

## 🚀 快速开始

### 在线使用

1. 下载本项目文件
2. 直接用浏览器打开 `index.html` 文件
3. 配置您的API密钥
4. 开始生成例题！

### 本地部署

```bash
# 克隆仓库
git clone https://github.com/yourusername/easy-example-generator.git

# 进入目录
cd easy-example-generator

# 用浏览器打开 index.html
# 或者使用简单的HTTP服务器
python -m http.server 8000
# 然后访问 http://localhost:8000
```

## 📖 使用指南

### 1. 配置API

首次使用需要配置AI服务商的API密钥：

1. **选择AI服务商**
   - Deepseek（推荐，性价比高）
   - OpenAI（功能强大）
   - Anthropic Claude（理解能力强）

2. **输入API密钥**
   - 密钥仅存储在本地浏览器
   - 点击眼睛图标可显示/隐藏密钥
   - 支持自定义API地址（高级选项）

3. **保存配置**
   - 点击"保存配置"按钮
   - 配置将保存在浏览器本地存储中

### 2. 生成例题

1. **输入知识点**
   - 在"数学知识点"输入框中输入主题
   - 例如：一元二次方程、三角函数、导数、向量等

2. **选择难度**
   - 简单：基础概念题
   - 中等：综合应用题
   - 困难：复杂问题和证明

3. **生成**
   - 点击"生成例题"按钮
   - 等待AI生成（通常10-30秒）
   - 查看实时状态和进度

### 3. 使用结果

生成完成后，您可以：

- **📋 复制代码** - 一键复制LaTeX代码到剪贴板
- **⬇️ 下载文件** - 下载为 `.tex` 文件
- **👀 预览查看** - 在页面中直接查看生成的代码

### 4. 编译LaTeX

将生成的代码保存为 `.tex` 文件，然后使用LaTeX编译器编译：

```bash
# 使用 xelatex 编译（支持中文）
xelatex your-file.tex

# 或使用 pdflatex
pdflatex your-file.tex
```

**在线编译工具：**
- [Overleaf](https://www.overleaf.com/) - 在线LaTeX编辑器
- [TeXPage](https://www.texpage.com/) - 免费在线编译

## 🔑 获取API密钥

### Deepseek（推荐）

1. 访问 [Deepseek开放平台](https://platform.deepseek.com/)
2. 注册并登录账号
3. 在"API密钥"页面创建新密钥
4. 复制密钥到应用中

**优势：**
- 💰 价格便宜（¥1/百万tokens）
- 🚀 响应快速
- 🎓 数学能力强

### OpenAI

1. 访问 [OpenAI Platform](https://platform.openai.com/)
2. 注册并登录账号
3. 在"API Keys"页面创建密钥
4. 复制密钥到应用中

**优势：**
- 🌟 技术成熟
- 📚 生态完善
- 🔧 功能强大

### Anthropic Claude

1. 访问 [Anthropic Console](https://console.anthropic.com/)
2. 注册并登录账号
3. 在"API Keys"页面创建密钥
4. 复制密钥到应用中

**优势：**
- 🧠 理解能力强
- 📖 上下文长
- ✍️ 输出质量高

## 🎯 示例

### 输入示例

```
知识点：一元二次方程
难度：简单
```

### 输出示例

生成的LaTeX文档将包含：
- 完整的文档结构
- 10道相关例题
- 详细的解题过程
- 标准的数学公式格式

```latex
\documentclass[12pt, a4paper]{article}
\usepackage{ctex}
\usepackage{amsmath, amssymb}
...

\begin{enumerate}
    \item 解方程：$x^2 - 5x + 6 = 0$
    \textbf{解：} 
    因式分解得：$(x-2)(x-3)=0$
    所以：$x_1=2, x_2=3$
    
    \item ...
\end{enumerate}
```

## 🛠️ 技术栈

- **前端框架：** 纯原生 JavaScript（无依赖）
- **样式：** CSS3（动画、渐变、响应式）
- **API调用：** Fetch API
- **存储：** LocalStorage
- **动画：** Canvas API（粒子系统）

## 📁 项目结构

```
easy-example-generator/
├── index.html          # 主HTML文件
├── styles.css          # 样式文件
├── script.js           # JavaScript逻辑
├── README.md           # 项目文档
├── LICENSE             # MIT许可证
└── .gitignore          # Git忽略文件
```

## 🔧 高级配置

### 自定义API地址

如果您使用代理或自建服务，可以自定义API地址：

```
Deepseek默认: https://api.deepseek.com/v1
OpenAI默认: https://api.openai.com/v1
Anthropic默认: https://api.anthropic.com/v1
```

### 修改生成参数

编辑 `script.js` 中的 `AIService` 类，可以调整：
- `temperature` - 创造性（0-1）
- `max_tokens` - 最大token数
- 提示词模板

## ⚠️ 注意事项

1. **API费用**
   - 使用API会产生费用
   - 建议设置使用额度限制
   - Deepseek价格最优惠

2. **网络要求**
   - 需要访问AI服务商API
   - 部分地区可能需要代理
   - 建议使用稳定网络

3. **浏览器兼容**
   - 推荐使用现代浏览器
   - Chrome、Firefox、Safari、Edge
   - 需要支持ES6+

4. **密钥安全**
   - 不要分享您的API密钥
   - 定期更换密钥
   - 设置使用限额

## 🤝 贡献

欢迎贡献代码、报告问题或提出建议！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 更新日志

### v1.0.0 (2024-12-19)

- ✨ 初始版本发布
- 🤖 支持三大AI服务商
- 🎨 美观的深色主题界面
- 🌌 粒子动画背景效果
- 📊 完整的日志系统
- 💾 一键复制和下载功能

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 💬 联系方式

如有问题或建议，欢迎通过以下方式联系：

- 📧 Email: your.email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/easy-example-generator/issues)

## 🙏 致谢

感谢以下项目和服务的支持：

- [Deepseek](https://www.deepseek.com/) - 高性价比AI服务
- [OpenAI](https://openai.com/) - GPT系列模型
- [Anthropic](https://www.anthropic.com/) - Claude模型

---

⭐ 如果这个项目对您有帮助，请给个星标支持一下！

