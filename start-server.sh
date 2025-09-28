#!/bin/bash

echo "正在启动风险等级判定器服务器..."
echo

# 检查dist目录是否存在
if [ ! -d "dist" ]; then
    echo "错误: dist目录不存在！"
    echo "请先运行构建命令: npm run build"
    exit 1
fi

# 检查dist/index.html是否存在
if [ ! -f "dist/index.html" ]; then
    echo "错误: dist/index.html不存在！"
    echo "请先运行构建命令: npm run build"
    exit 1
fi

echo "✅ 检查完成，正在启动服务器..."
echo

# 启动Node.js服务器
node server.js
