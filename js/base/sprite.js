/**
 * 游戏基础的精灵类
 */
export default class {
    constructor(imgSrc = '', width = 0, height = 0, x = 0, y = 0) {
        this.img = new Image()
        this.img.src = imgSrc

        this.width = width
        this.height = height

        this.x = x
        this.y = y

        this.visible = true  // 判断动画是否在执行中
    }

    // 将图绘制在canvas上
    drawToCanvas(ctx) {
        if (!this.visible) return false

        ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }

    // 简易的碰撞检测
    isCollideWith(sp) {
        // 可优化空间很大
        return !!(
            (this.x + this.width) > (sp.x)
            && (this.x + this.width / 2) < (sp.x + sp.width)
            && (this.y + this.height - 5) > (sp.y)
            && (this.y + 5) < (sp.y + sp.height)
        )
    }

    // 得分检测
    scoreUp(sp) {
        const r = !!(this.x > sp.top.x + sp.top.width)

        if (sp.scoreY) {
            return false
        }

        if (r) {
            sp.scoreY = true
            return r
        }

        return false

    }
}