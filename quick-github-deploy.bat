@echo off
echo 🚀 一键部署到GitHub Pages
echo.

REM 检查git
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

echo ✅ 构建完成！
echo.

REM 初始化git（如果不存在）
if not exist ".git" (
    echo 正在初始化Git仓库...
    git init
    git add .
    git commit -m "Initial commit"
)

echo 📋 接下来的步骤:
echo.
echo 1. 访问 https://github.com/new 创建新仓库
echo 2. 复制仓库的HTTPS地址（如：https://github.com/用户名/仓库名.git）
echo 3. 按任意键继续...
pause

set /p REPO_URL="请输入GitHub仓库地址: "

echo.
echo 正在推送代码到GitHub...
git remote add origin %REPO_URL% 2>nul
git branch -M main
git push -u origin main

echo.
echo 🎉 代码已推送到GitHub！
echo.
echo 📋 最后步骤:
echo 1. 进入GitHub仓库页面
echo 2. 点击 "Settings" 标签
echo 3. 找到 "Pages" 选项
echo 4. 选择 "Source" 为 "Deploy from a branch"
echo 5. 选择 "Branch" 为 "main"
echo 6. 点击 "Save"
echo 7. 等待几分钟，获得网址: https://您的用户名.github.io/仓库名
echo.

pause
