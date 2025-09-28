@echo off
echo 🌐 使用Netlify Drop - 最简单的部署方式
echo.

echo ✅ 正在构建项目...
npm run build

if %errorlevel% neq 0 (
    echo 构建失败！
    pause
    exit /b 1
)

echo ✅ 构建完成！
echo.
echo 📋 部署步骤:
echo 1. 访问 https://app.netlify.com/drop
echo 2. 将 'dist' 文件夹拖拽到页面中
echo 3. 等待部署完成
echo 4. 获得一个类似 https://xxx.netlify.app 的网址
echo 5. 分享这个网址给任何人！
echo.
echo 💡 这是最简单的方式，无需注册账号！
echo.

REM 打开dist文件夹
explorer dist

pause
