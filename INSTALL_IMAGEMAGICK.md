# ImageMagick 安装指南

## 完成WebP转换的必要步骤

### 1. 下载ImageMagick

访问 [ImageMagick官网](https://imagemagick.org/script/download.php#windows) 下载Windows版本：

- 推荐下载：**ImageMagick-7.1.2-Q16-HDRI-x64-dll.exe**
- 或者选择最新稳定版本

### 2. 安装步骤

1. 运行下载的安装程序
2. 选择"Install ImageMagick 7.x.x"（安装ImageMagick）
3. 勾选"Add application directory to your system path"（将应用目录添加到系统路径）
4. 点击"Install"开始安装
5. 安装完成后点击"Finish"

### 3. 验证安装

打开PowerShell或命令提示符，输入以下命令验证安装：

```powershell
magick -version
```

如果显示版本信息，说明安装成功。

### 4. 执行WebP转换

安装完成后，在项目目录中运行转换脚本：

```powershell
cd "c:\hukaichao\learn\suki\code"
powershell -ExecutionPolicy Bypass -File "convert-to-webp.ps1"
```

或者使用简化版本：

```powershell
cd "c:\hukaichao\learn\suki\code"
powershell -ExecutionPolicy Bypass -File "simple-convert-webp.ps1"
```

### 5. 转换完成后

转换脚本会自动：
- 创建图片备份目录
- 将所有JPG/PNG图片转换为WebP格式
- 显示压缩统计信息
- 保留原始文件作为备份

### 6. 手动转换（可选）

如果您想手动转换特定图片，可以使用以下命令：

```powershell
# 转换单张图片
magick input.jpg -quality 80 output.webp

# 批量转换整个目录
magick images/*.jpg -quality 80 images/*.webp
```

## WebP转换的优势

- **文件大小减少**：平均减少30-50%
- **加载速度提升**：更快的页面加载
- **现代浏览器支持**：Chrome、Firefox、Edge、Safari等
- **透明通道支持**：类似PNG的alpha透明度

## 注意事项

- 转换前会自动创建备份，确保数据安全
- 建议在转换后测试页面在不同浏览器中的显示效果
- 如果遇到问题，可以恢复备份目录中的原始文件

## 技术支持

如果安装或转换过程中遇到问题，请检查：
1. ImageMagick是否正确安装并添加到系统路径
2. 是否有足够的磁盘空间
3. 图片文件是否可读
4. 防火墙或安全软件是否阻止了转换操作