import Sprite from '../base/sprite.js'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC   = 'images/bg1.jpg'
const BG_WIDTH     = 1194
const BG_HEIGHT    = 800
/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends Sprite {
  constructor(ctx) {
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)

    this.render(ctx)

    this.top = 0
  }

  update() {
    this.top += 2

    if (this.top >= screenWidth)
      this.top = 0
  }
  
  /**
   * 背景图重绘函数
   * 绘制两张图片，两张图片大小和屏幕一致
   * 第一张漏出高度为top部分，其余的隐藏在屏幕上面
   * 第二张补全除了top高度之外的部分，其余的隐藏在屏幕下面
   */
  render(ctx) {
    ctx.drawImage(
      this.img,                       // 图片
      0,                              // 开始剪切的 x 坐标位置
      0,                              // 开始剪切的 y 坐标位置
      this.width,                     // 被剪切图像的宽度
      this.height,                    // 被剪切图像的高度
      screenWidth - this.top,         // 在画布上放置图像的 x 坐标位置
      0,                              // 在画布上放置图像的 y 坐标位置
      screenWidth,                    // 要使用的图像的宽度（伸展或缩小图像）
      screenHeight                    // 要使用的图像的高度（伸展或缩小图像）
    )

    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      -this.top,
      0,
      screenWidth,
      screenHeight
    )
  }
}