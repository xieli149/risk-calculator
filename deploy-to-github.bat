@echo off
echo 🚀 部署到GitHub Pages - 免费永久网址
echo.

REM 检查git是否已安装
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo 错误: Git未安装！
    echo 请先安装Git: https://git-scm.com/downloads
    pause
    exit /b 1
)

echo ✅ 检查完成，正在构建项目...
npm run build

if %errorlevel% neq 0 (
    echo 构建失败！
    pause
    exit /b 1
)

echo ✅ 构建完成，正在准备部署...
echo.

REM 创建gh-pages分支并部署
git checkout -b gh-pages
git add dist/
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages

echo.
echo 🎉 部署完成！
echo 📱 您的网址: https://您的用户名.github.io/您的仓库名
echo 💡 在GitHub仓库设置中启用Pages功能
echo.

pause
