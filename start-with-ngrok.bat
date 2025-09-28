@echo off
echo 🚀 启动风险等级判定器 + 内网穿透服务
echo.

REM 检查dist目录
if not exist "dist" (
    echo 错误: dist目录不存在！
    echo 请先运行构建命令: npm run build
    pause
    exit /b 1
)

if not exist "dist\index.html" (
    echo 错误: dist/index.html不存在！
    echo 请先运行构建命令: npm run build
    pause
    exit /b 1
)

echo ✅ 检查完成，正在启动服务器...
echo.

REM 启动本地服务器（后台运行）
start /b node server.js

REM 等待服务器启动
timeout /t 3 /nobreak >nul

REM 检查ngrok
where ngrok >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo ⚠️  ngrok未安装，正在使用本地模式...
    echo 📱 本地访问: http://localhost:3000
    echo 🌐 网络访问: http://198.18.0.1:3000 (仅限同网络)
    echo.
    echo 💡 要获得公网访问，请安装ngrok:
    echo    1. 访问 https://ngrok.com/download
    echo    2. 下载并解压ngrok.exe到此目录
    echo    3. 重新运行此脚本
    echo.
    pause
    exit /b 1
)

echo 🌐 正在启动内网穿透服务...
echo 📋 请复制下面显示的网址分享给任何人！
echo.

REM 启动ngrok
ngrok http 3000

pause
