const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

// MIME类型映射
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // 处理根路径，重定向到index.html
  let filePath = req.url === '/' ? '/index.html' : req.url;
  
  // 确保文件路径在dist目录中
  const fullPath = path.join(__dirname, 'dist', filePath);
  
  // 安全检查：确保文件在dist目录内
  if (!fullPath.startsWith(path.join(__dirname, 'dist'))) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  // 检查文件是否存在
  fs.access(fullPath, fs.constants.F_OK, (err) => {
    if (err) {
      // 文件不存在，返回404
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(`
        <html>
          <head><title>404 - 页面未找到</title></head>
          <body>
            <h1>404 - 页面未找到</h1>
            <p>请求的页面不存在。</p>
            <a href="/">返回首页</a>
          </body>
        </html>
      `);
      return;
    }

    // 读取文件
    fs.readFile(fullPath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('服务器内部错误');
        return;
      }

      // 获取文件扩展名并设置正确的Content-Type
      const ext = path.extname(fullPath).toLowerCase();
      const contentType = mimeTypes[ext] || 'application/octet-stream';

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`🚀 服务器已启动！`);
  console.log(`📱 本地访问地址: http://localhost:${PORT}`);
  console.log(`🌐 网络访问地址: http://0.0.0.0:${PORT}`);
  console.log(`\n💡 提示:`);
  console.log(`   - 在同一网络下的其他设备可以通过您的IP地址访问`);
  console.log(`   - 按 Ctrl+C 停止服务器`);
  console.log(`\n📋 获取您的IP地址:`);
  
  // 获取本机IP地址
  const os = require('os');
  const networkInterfaces = os.networkInterfaces();
  let ipAddress = 'localhost';
  
  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    for (const iface of interfaces) {
      if (iface.family === 'IPv4' && !iface.internal) {
        ipAddress = iface.address;
        break;
      }
    }
    if (ipAddress !== 'localhost') break;
  }
  
  console.log(`   网络访问地址: http://${ipAddress}:${PORT}`);
});

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n👋 正在关闭服务器...');
  server.close(() => {
    console.log('✅ 服务器已关闭');
    process.exit(0);
  });
});
