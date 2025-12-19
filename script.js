// ==================== 全局状态管理 ====================
const AppState = {
    apiProvider: 'deepseek',
    apiKey: '',
    baseUrl: '',
    isGenerating: false
};

// ==================== 粒子动画系统 ====================
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 更新和绘制粒子
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // 边界检测
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // 绘制粒子
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        // 绘制连接线
        this.particles.forEach((p1, i) => {
            this.particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - distance / 150)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// ==================== 日志系统 ====================
class Logger {
    constructor(logArea) {
        this.logArea = logArea;
    }
    
    log(message, type = 'info') {
        const time = new Date().toLocaleTimeString('zh-CN', { hour12: false });
        const entry = document.createElement('p');
        entry.className = `log-entry log-${type}`;
        entry.innerHTML = `
            <span class="log-time">[${time}]</span>
            <span class="log-message">${message}</span>
        `;
        this.logArea.appendChild(entry);
        this.logArea.scrollTop = this.logArea.scrollHeight;
    }
    
    info(message) {
        this.log(message, 'info');
    }
    
    success(message) {
        this.log(message, 'success');
    }
    
    warning(message) {
        this.log(message, 'warning');
    }
    
    error(message) {
        this.log(message, 'error');
    }
    
    clear() {
        this.logArea.innerHTML = '';
        this.info('日志已清空');
    }
}

// ==================== API调用模块 ====================
class AIService {
    constructor(provider, apiKey, baseUrl = '') {
        this.provider = provider;
        this.apiKey = apiKey;
        this.baseUrl = baseUrl || this.getDefaultBaseUrl();
    }
    
    getDefaultBaseUrl() {
        const urls = {
            deepseek: 'https://api.deepseek.com/v1',
            openai: 'https://api.openai.com/v1',
            anthropic: 'https://api.anthropic.com/v1'
        };
        return urls[this.provider] || urls.deepseek;
    }
    
    async generateProblems(topic, difficulty) {
        const prompt = this.buildPrompt(topic, difficulty);
        
        switch (this.provider) {
            case 'anthropic':
                return await this.callAnthropic(prompt);
            default:
                return await this.callOpenAICompatible(prompt);
        }
    }
    
    buildPrompt(topic, difficulty) {
        const difficultyMap = {
            simple: '简单',
            medium: '中等',
            hard: '困难'
        };
        
        return `请你作为一个数学教育专家，针对"${topic}"这个知识点，生成10道${difficultyMap[difficulty]}难度的例题。

要求：
1. 题目应该循序渐进，从基础到略微提升
2. 每道题都要有完整的解答过程
3. 使用标准的LaTeX数学公式格式
4. 输出格式必须是可直接编译的完整LaTeX文档

请直接输出LaTeX代码，包含以下结构：
\\documentclass[12pt, a4paper]{article}
\\usepackage{ctex}
\\usepackage{amsmath, amssymb}
\\usepackage{geometry}
\\geometry{left=2.5cm, right=2.5cm, top=2.5cm, bottom=2.5cm}

\\title{${topic} 练习题}
\\author{}
\\date{}

\\begin{document}
\\maketitle

\\section*{例题练习}

\\begin{enumerate}
    \\item 第一题题目
    \\textbf{解：} 解答过程...
    
    \\item 第二题题目
    \\textbf{解：} 解答过程...
    
    % ... 继续到第10题
\\end{enumerate}

\\end{document}

请只输出LaTeX代码，不要有任何其他说明文字。`;
    }
    
    async callOpenAICompatible(prompt) {
        const response = await fetch(`${this.baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: this.provider === 'deepseek' ? 'deepseek-chat' : 'gpt-4',
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 4000
            })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || `API请求失败: ${response.status}`);
        }
        
        const data = await response.json();
        return data.choices[0].message.content;
    }
    
    async callAnthropic(prompt) {
        const response = await fetch(`${this.baseUrl}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 4000,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || `API请求失败: ${response.status}`);
        }
        
        const data = await response.json();
        return data.content[0].text;
    }
}

// ==================== LaTeX处理 ====================
function cleanLatexOutput(text) {
    // 移除markdown代码块标记
    text = text.replace(/```latex\n/g, '');
    text = text.replace(/```\n/g, '');
    text = text.replace(/```/g, '');
    
    // 确保文档完整性
    if (!text.includes('\\documentclass')) {
        text = `\\documentclass[12pt, a4paper]{article}
\\usepackage{ctex}
\\usepackage{amsmath, amssymb}
\\usepackage{geometry}
\\geometry{left=2.5cm, right=2.5cm, top=2.5cm, bottom=2.5cm}

\\title{数学练习题}
\\author{}
\\date{}

\\begin{document}
\\maketitle

${text}

\\end{document}`;
    }
    
    return text.trim();
}

// ==================== UI控制器 ====================
class UIController {
    constructor() {
        this.elements = {
            apiProvider: document.getElementById('api-provider'),
            apiKey: document.getElementById('api-key'),
            baseUrl: document.getElementById('base-url'),
            baseUrlGroup: document.getElementById('base-url-group'),
            toggleKeyVisibility: document.getElementById('toggle-key-visibility'),
            saveConfig: document.getElementById('save-config'),
            mathTopic: document.getElementById('math-topic'),
            difficultyLevel: document.getElementById('difficulty-level'),
            generateButton: document.getElementById('generate-button'),
            statusArea: document.getElementById('status-area'),
            statusText: document.getElementById('status-text'),
            progressBar: document.getElementById('progress-bar'),
            resultCard: document.getElementById('result-card'),
            latexOutput: document.getElementById('latex-output'),
            copyButton: document.getElementById('copy-button'),
            downloadButton: document.getElementById('download-button'),
            logArea: document.getElementById('log-area'),
            clearLog: document.getElementById('clear-log')
        };
        
        this.logger = new Logger(this.elements.logArea);
        this.latexContent = '';
        
        this.initEventListeners();
        this.loadConfig();
    }
    
    initEventListeners() {
        // API提供商变更
        this.elements.apiProvider.addEventListener('change', (e) => {
            AppState.apiProvider = e.target.value;
            this.logger.info(`切换AI服务商: ${e.target.value}`);
        });
        
        // 显示/隐藏API密钥
        this.elements.toggleKeyVisibility.addEventListener('click', () => {
            const input = this.elements.apiKey;
            if (input.type === 'password') {
                input.type = 'text';
                this.elements.toggleKeyVisibility.textContent = '🙈';
            } else {
                input.type = 'password';
                this.elements.toggleKeyVisibility.textContent = '👁️';
            }
        });
        
        // 保存配置
        this.elements.saveConfig.addEventListener('click', () => this.saveConfig());
        
        // 生成例题
        this.elements.generateButton.addEventListener('click', () => this.generateProblems());
        
        // 复制LaTeX
        this.elements.copyButton.addEventListener('click', () => this.copyLatex());
        
        // 下载LaTeX
        this.elements.downloadButton.addEventListener('click', () => this.downloadLatex());
        
        // 清空日志
        this.elements.clearLog.addEventListener('click', () => this.logger.clear());
        
        // 回车键触发生成
        this.elements.mathTopic.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !AppState.isGenerating) {
                this.generateProblems();
            }
        });
    }
    
    loadConfig() {
        const savedConfig = localStorage.getItem('math-generator-config');
        if (savedConfig) {
            try {
                const config = JSON.parse(savedConfig);
                this.elements.apiProvider.value = config.provider || 'deepseek';
                this.elements.apiKey.value = config.apiKey || '';
                this.elements.baseUrl.value = config.baseUrl || '';
                
                AppState.apiProvider = config.provider || 'deepseek';
                AppState.apiKey = config.apiKey || '';
                AppState.baseUrl = config.baseUrl || '';
                
                this.logger.success('配置已从本地加载');
            } catch (e) {
                this.logger.error('配置加载失败');
            }
        }
    }
    
    saveConfig() {
        const config = {
            provider: this.elements.apiProvider.value,
            apiKey: this.elements.apiKey.value,
            baseUrl: this.elements.baseUrl.value
        };
        
        localStorage.setItem('math-generator-config', JSON.stringify(config));
        
        AppState.apiProvider = config.provider;
        AppState.apiKey = config.apiKey;
        AppState.baseUrl = config.baseUrl;
        
        this.logger.success('配置已保存到本地浏览器');
    }
    
    async generateProblems() {
        // 验证输入
        if (!AppState.apiKey) {
            this.logger.error('请先配置API密钥');
            alert('请先配置API密钥');
            return;
        }
        
        const topic = this.elements.mathTopic.value.trim();
        if (!topic) {
            this.logger.error('请输入数学知识点');
            alert('请输入数学知识点');
            return;
        }
        
        if (AppState.isGenerating) {
            this.logger.warning('正在生成中，请稍候...');
            return;
        }
        
        AppState.isGenerating = true;
        this.elements.generateButton.disabled = true;
        this.elements.statusArea.style.display = 'block';
        this.elements.resultCard.style.display = 'none';
        
        const difficulty = this.elements.difficultyLevel.value;
        this.logger.info(`开始生成"${topic}"的例题，难度：${difficulty}`);
        
        // 模拟进度
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 90) progress = 90;
            this.elements.progressBar.style.width = `${progress}%`;
        }, 500);
        
        try {
            const aiService = new AIService(
                AppState.apiProvider,
                AppState.apiKey,
                AppState.baseUrl
            );
            
            this.elements.statusText.textContent = `正在使用 ${AppState.apiProvider} 生成例题...`;
            
            const result = await aiService.generateProblems(topic, difficulty);
            
            clearInterval(progressInterval);
            this.elements.progressBar.style.width = '100%';
            
            // 清理和显示结果
            this.latexContent = cleanLatexOutput(result);
            this.elements.latexOutput.textContent = this.latexContent;
            
            setTimeout(() => {
                this.elements.statusArea.style.display = 'none';
                this.elements.resultCard.style.display = 'block';
                this.elements.progressBar.style.width = '0%';
                this.logger.success('例题生成成功！');
            }, 500);
            
        } catch (error) {
            clearInterval(progressInterval);
            this.elements.statusArea.style.display = 'none';
            this.elements.progressBar.style.width = '0%';
            
            this.logger.error(`生成失败: ${error.message}`);
            alert(`生成失败: ${error.message}`);
            console.error(error);
        } finally {
            AppState.isGenerating = false;
            this.elements.generateButton.disabled = false;
        }
    }
    
    async copyLatex() {
        try {
            await navigator.clipboard.writeText(this.latexContent);
            this.logger.success('LaTeX代码已复制到剪贴板');
            
            // 临时改变按钮文本
            const originalText = this.elements.copyButton.innerHTML;
            this.elements.copyButton.innerHTML = '<span class="icon">✅</span>已复制';
            setTimeout(() => {
                this.elements.copyButton.innerHTML = originalText;
            }, 2000);
        } catch (error) {
            this.logger.error('复制失败，请手动复制');
            alert('复制失败，请手动选择文本复制');
        }
    }
    
    downloadLatex() {
        const topic = this.elements.mathTopic.value.trim() || '数学练习题';
        const filename = `${topic}_${new Date().getTime()}.tex`;
        
        const blob = new Blob([this.latexContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        
        this.logger.success(`文件已下载: ${filename}`);
    }
}

// ==================== 应用初始化 ====================
document.addEventListener('DOMContentLoaded', () => {
    // 初始化粒子系统
    const canvas = document.getElementById('particles-canvas');
    new ParticleSystem(canvas);
    
    // 初始化UI控制器
    new UIController();
    
    console.log('%c🎉 数学例题生成器已就绪！', 'color: #6366f1; font-size: 16px; font-weight: bold;');
});

