@echo off
echo 🚀 GitHub Pages 简单部署
echo.

echo ✅ 项目已构建完成！
echo 📁 dist目录包含以下文件:
dir dist
echo.

echo 📋 接下来的步骤:
echo.
echo 1️⃣ 创建GitHub仓库:
echo    - 访问 https://github.com/new
echo    - 仓库名: risk-calculator
echo    - 选择 Public
echo    - 点击 Create repository
echo.

echo 2️⃣ 上传代码:
echo    - 复制以下命令到命令行执行:
echo.
echo    git init
echo    git add .
echo    git commit -m "Initial commit"
echo    git branch -M main
echo    git remote add origin https://github.com/您的用户名/risk-calculator.git
echo    git push -u origin main
echo.

echo 3️⃣ 启用GitHub Pages:
echo    - 进入仓库的 Settings
echo    - 找到 Pages 选项
echo    - Source 选择 "Deploy from a branch"
echo    - Branch 选择 "main"
echo    - 点击 Save
echo.

echo 4️⃣ 等待部署完成:
echo    - 几分钟后获得网址: https://您的用户名.github.io/risk-calculator
echo.

echo 💡 提示: 如果遇到问题，请查看 "GitHub部署详细步骤.md" 文件
echo.

pause
