@echo off
echo 正在设置内网穿透服务...
echo.

REM 检查ngrok是否已安装
where ngrok >nul 2>nul
if %errorlevel% neq 0 (
    echo 正在下载ngrok...
    echo 请访问 https://ngrok.com/download 下载ngrok
    echo 或者运行: winget install ngrok
    echo.
    echo 下载完成后，请将ngrok.exe放在此目录下
    pause
    exit /b 1
)

echo ✅ ngrok已找到，正在启动内网穿透...
echo.

REM 启动ngrok
ngrok http 3000

pause
