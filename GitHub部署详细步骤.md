# 🚀 GitHub Pages 详细部署步骤

## 📋 第一步：创建GitHub仓库

1. **访问GitHub**：打开 https://github.com
2. **登录账号**：如果没有账号，先注册一个（免费）
3. **创建新仓库**：
   - 点击右上角的 "+" 号
   - 选择 "New repository"
   - 仓库名称：`risk-calculator`（或您喜欢的名字）
   - 选择 "Public"（免费用户只能部署公开仓库）
   - 不要勾选 "Add a README file"
   - 点击 "Create repository"

## 📋 第二步：上传代码

### 方法A：使用命令行（推荐）

1. **打开命令行**，在项目目录下运行：
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/您的用户名/仓库名.git
git push -u origin main
```

### 方法B：使用GitHub Desktop（简单）

1. 下载GitHub Desktop：https://desktop.github.com
2. 安装后登录您的GitHub账号
3. 选择 "Clone a repository from the Internet"
4. 输入仓库地址，选择本地文件夹
5. 将项目文件复制到该文件夹
6. 在GitHub Desktop中提交并推送

## 📋 第三步：启用GitHub Pages

1. **进入仓库页面**
2. **点击 "Settings" 标签**（在仓库名称旁边）
3. **找到 "Pages" 选项**（在左侧菜单中）
4. **设置部署源**：
   - Source 选择 "Deploy from a branch"
   - Branch 选择 "main"
   - Folder 选择 "/ (root)"
5. **点击 "Save"**

## 📋 第四步：等待部署

1. **等待几分钟**（通常2-5分钟）
2. **刷新页面**，您会看到绿色的勾号
3. **获得网址**：`https://您的用户名.github.io/仓库名`

## 🎉 完成！

现在您就有了一个永久的网址，可以分享给任何人！

---

## 🔧 常见问题解决

### Q: 页面显示404错误
A: 检查仓库是否为Public，免费用户只能部署公开仓库

### Q: 页面显示空白
A: 确保dist目录中有index.html文件

### Q: 样式不显示
A: 检查所有静态资源是否正确上传

### Q: 如何更新网站
A: 修改代码后，推送新代码到GitHub，网站会自动更新

---

## 💡 专业提示

1. **自定义域名**：在Pages设置中可以添加自定义域名
2. **自动部署**：每次推送代码都会自动更新网站
3. **版本控制**：可以回退到之前的版本
4. **团队协作**：可以邀请其他人一起维护

现在就开始吧！🚀
