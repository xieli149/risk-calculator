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

echo ✅ 构建完成！
echo.

REM 初始化git仓库（如果不存在）
if not exist ".git" (
    echo 正在初始化Git仓库...
    git init
    git add .
    git commit -m "Initial commit"
)

REM 创建gh-pages分支
echo 正在创建gh-pages分支...
git checkout -b gh-pages 2>nul

REM 只保留dist目录的内容
echo 正在准备部署文件...
for /f "delims=" %%i in ('dir /b /ad') do (
    if not "%%i"=="dist" if not "%%i"==".git" (
        rmdir /s /q "%%i" 2>nul
    )
)

REM 将dist目录内容移到根目录
xcopy /E /Y dist\* .
rmdir /s /q dist

REM 提交更改
git add .
git commit -m "Deploy to GitHub Pages"

echo.
echo 📋 接下来的步骤:
echo 1. 在GitHub上创建一个新仓库
echo 2. 将代码推送到GitHub:
echo    git remote add origin https://github.com/您的用户名/仓库名.git
echo    git push -u origin gh-pages
echo 3. 在GitHub仓库设置中启用Pages:
echo    - 进入仓库的Settings
echo    - 找到Pages选项
echo    - 选择Source为"Deploy from a branch"
echo    - 选择Branch为"gh-pages"
echo    - 点击Save
echo 4. 几分钟后获得网址: https://您的用户名.github.io/仓库名
echo.

pause
