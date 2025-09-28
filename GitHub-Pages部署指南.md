# 🚀 GitHub Pages 部署指南

## 方法一：GitHub Actions自动部署（推荐）

### 步骤：
1. **创建GitHub仓库**
   - 访问 https://github.com/new
   - 创建新仓库（如：`risk-calculator`）
   - 选择"Public"（免费用户只能部署公开仓库）

2. **上传代码**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/您的用户名/仓库名.git
   git push -u origin main
   ```

3. **启用GitHub Pages**
   - 进入仓库的"Settings"
   - 找到"Pages"选项
   - 选择"Source"为"GitHub Actions"
   - 保存设置

4. **自动部署**
   - 每次推送代码到main分支
   - GitHub Actions会自动构建和部署
   - 几分钟后获得网址：`https://您的用户名.github.io/仓库名`

---

## 方法二：手动部署（简单）

### 步骤：
1. **运行脚本**
   ```bash
   .\deploy-github-pages.bat
   ```

2. **创建GitHub仓库**
   - 访问 https://github.com/new
   - 创建新仓库

3. **推送代码**
   ```bash
   git remote add origin https://github.com/您的用户名/仓库名.git
   git push -u origin gh-pages
   ```

4. **启用Pages**
   - 仓库Settings → Pages
   - Source选择"Deploy from a branch"
   - Branch选择"gh-pages"
   - 保存

---

## 🎯 优势对比

| 方案 | 难度 | 自动化 | 更新方式 | 推荐度 |
|------|------|--------|----------|--------|
| GitHub Actions | ⭐⭐⭐ | ✅ | 推送代码 | ⭐⭐⭐⭐⭐ |
| 手动部署 | ⭐⭐ | ❌ | 手动运行脚本 | ⭐⭐⭐ |

---

## 💡 使用建议

### 立即部署：
1. 使用**手动部署**方案
2. 运行 `deploy-github-pages.bat`
3. 按照提示完成GitHub设置

### 长期使用：
1. 使用**GitHub Actions**方案
2. 一次设置，永久自动部署
3. 每次修改代码后自动更新网站

---

## 🔧 常见问题

**Q: 免费用户可以使用吗？**
A: 可以！GitHub Pages对公开仓库完全免费

**Q: 网址是什么样的？**
A: `https://您的用户名.github.io/仓库名`

**Q: 如何更新网站？**
A: 推送新代码到GitHub，网站会自动更新

**Q: 可以自定义域名吗？**
A: 可以！在仓库Settings中添加自定义域名

---

## 🚀 立即开始

选择您喜欢的方案，几分钟后就能获得一个永久网址！
