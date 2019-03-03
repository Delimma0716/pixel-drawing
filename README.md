# 洛谷前端考核项目

------------------
## 项目目标

请您根据提供的后端接口，复刻 [Bilibili 夏日绘板](https://live.bilibili.com/pages/1702/pixel-drawing) 的前端部分。

绘板是一个 200x100 的画布，有黑白灰三种颜色可选，默认全黑。

用户可在颜色选择器中选择颜色，并点击画布上的像素进行绘制。

绘板上的画布可放大（通过鼠标滚轮）、拖动。

倒计时冷却功能无需实现。

## 如何启动开发服务器

`yarn dev` 监听 `:3003` 端口。

## 颜色代码对应

- `0` 黑色
- `1` 白色
- `2` 灰色

## 接口文档

_具体请阅读 `app.js` 。_

`GET /board`

获取当前画布，是一串以 `0` `1` `2` 组成的字符串，表示画板的每个像素。

`POST /paint` `x=?&y=?&color=?`

在画布的指定坐标上绘制指定颜色。绘制成功后，会通过 Socket.IO 服务器，推送一条消息 `io.emit('matrix_update', { x, y, color })` 。

## 提交方式

请 Clone 这个代码库到本地，完成时自己创建一个新的库并提交至 GitHub 。

（为保护您的隐私，我们不建议直接 Fork 该库。）

我们同时会考察您的项目管理水平，所以请保持良好的代码和版本管理习惯。

## 声明

本项目仅供考核使用，洛谷不会使用您的代码进行任何考核以外的商业和非商业用途。
