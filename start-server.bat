@echo off
echo 正在启动风险等级判定器服务器...
echo.

REM 检查dist目录是否存在
if not exist "dist" (
    echo 错误: dist目录不存在！
    echo 请先运行构建命令: npm run build
    pause
    exit /b 1
)

REM 检查dist/index.html是否存在
if not exist "dist\index.html" (
    echo 错误: dist/index.html不存在！
    echo 请先运行构建命令: npm run build
    pause
    exit /b 1
)

echo ✅ 检查完成，正在启动服务器...
echo.

REM 启动Node.js服务器
node server.js

pause
