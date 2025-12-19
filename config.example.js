/**
 * 配置示例文件
 * 
 * 如果您想使用配置文件而不是UI配置，可以：
 * 1. 复制此文件为 config.js
 * 2. 填入您的API配置
 * 3. 在 index.html 中引入此文件（在 script.js 之前）
 * 
 * 注意：config.js 已在 .gitignore 中，不会被提交到git
 */

const CONFIG = {
    // 默认AI服务商: 'deepseek', 'openai', 'anthropic'
    defaultProvider: 'deepseek',
    
    // API密钥（不推荐硬编码，建议使用UI配置）
    apiKeys: {
        deepseek: '',
        openai: '',
        anthropic: ''
    },
    
    // 自定义API地址（可选）
    baseUrls: {
        deepseek: 'https://api.deepseek.com/v1',
        openai: 'https://api.openai.com/v1',
        anthropic: 'https://api.anthropic.com/v1'
    },
    
    // 生成参数
    generation: {
        // 默认难度: 'simple', 'medium', 'hard'
        defaultDifficulty: 'simple',
        
        // 默认题目数量
        defaultProblemCount: 10,
        
        // API调用参数
        temperature: 0.7,
        maxTokens: 4000,
        
        // 超时设置（毫秒）
        timeout: 60000
    },
    
    // UI设置
    ui: {
        // 粒子数量
        particleCount: 80,
        
        // 主题颜色
        theme: {
            primary: '#6366f1',
            secondary: '#8b5cf6'
        },
        
        // 动画速度（毫秒）
        animationDuration: 300
    },
    
    // 日志设置
    logging: {
        // 是否启用控制台日志
        enableConsole: true,
        
        // 日志级别: 'debug', 'info', 'warning', 'error'
        level: 'info',
        
        // 最大日志条数
        maxEntries: 100
    }
};

// 如果在浏览器环境中
if (typeof window !== 'undefined') {
    window.APP_CONFIG = CONFIG;
}

// 如果在Node.js环境中
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

