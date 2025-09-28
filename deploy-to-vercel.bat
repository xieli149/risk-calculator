@echo off
echo 🌐 部署到Vercel - 获得永久网址
echo.

REM 检查是否已安装vercel CLI
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo 正在安装Vercel CLI...
    npm install -g vercel
    if %errorlevel% neq 0 (
        echo 安装失败，请手动安装: npm install -g vercel
        pause
        exit /b 1
    )
)

echo ✅ 检查完成，正在构建项目...
npm run build

if %errorlevel% neq 0 (
    echo 构建失败！
    pause
    exit /b 1
)

echo ✅ 构建完成，正在部署到Vercel...
echo.

REM 部署到Vercel
vercel --prod

echo.
echo 🎉 部署完成！
echo 📱 您的网址已生成，可以分享给任何人！
echo.

pause
