import Databus from './databus.js'
import Background from './runtime/background.js'
import Player from './player/index.js'
import StartGame from './runtime/startGame.js'
import Gameinfo from './runtime/gameinfo.js'
import Wall from './npc/wall/index.js'

let ctx = canvas.getContext('2d')

let databus = new Databus()

/**
 * 游戏主函数
 */
export default class Main {
    constructor() {
        this.restart()
    }
    // 游戏开始初始化函数
    restart() {
        databus.reset()

        canvas.removeEventListener('touchstart', this.touchHandler)

        this.bg = new Background(ctx)
        this.StartGame = new StartGame()
        this.gameinfo = new Gameinfo()
        this.player = new Player()
        this.wall = new Wall()

        window.requestAnimationFrame(
            this.loop.bind(this),
            canvas
        )
    }

    // 游戏结束后的触摸事件处理逻辑
    touchEventHandler(e) {

        const [x, y] = [e.touches[0].clientX, e.touches[0].clientY]

        const area = this.gameinfo.area

        if (
            x > area.startX
            && x < area.endX
            && y > area.startY
            && y < area.endY
        ) {
            this.restart()
        }
    }

    /**
     * 随着帧数变化的墙生成逻辑
     * 帧数取模定义成生成的频率
     */
    wallGenerate() {
        if (databus.frame % 140 === 0) {
            let wall = databus.pool.getItemByClass('wall', Wall)
            wall.init(2)
            databus.walls.push(wall)
        }
    }

    /*
     * 全局碰撞检测和得分检测
     */
    collisionDetection() {
        databus.walls.forEach((item) => {
            if (this.player.isCollideWith(item.top) || this.player.isCollideWith(item.bottom)) {
                databus.gameOver = true
            }
            if (this.player.scoreUp(item)) {
                databus.score++
            }
        })
    }

    /**
     * canvas重绘函数
     * 每一帧重新绘制所有的需要展示的元素
     */
    render() {
        this.bg.render(ctx)

        databus.walls.forEach((item) => {
            item.top.drawToCanvas(ctx)
            item.bottom.drawToCanvas(ctx)
        })

        this.player.aniRender(ctx)
    }

    // 游戏逻辑更新主函数
    update() {
        this.bg.update()
        this.player.update()

        databus.walls.forEach((item) => {
            item.update()
        })

        this.wallGenerate()

        this.collisionDetection()
    }

    // 游戏结束的处理函数
    gomeOverUpdate() {
        this.player.removetouchStart()
        this.gameinfo.renderGameOver(ctx)

        this.touchHandler = this.touchEventHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)
    }

    // 实现游戏帧循环
    loop() {
        if (databus.startGame) {

            databus.frame++

            this.update()
            this.render()

            if (databus.gameOver) {
                this.gomeOverUpdate()
                return false
            }
            this.gameinfo.renderGameScore(ctx)

        } else {

            this.render()
            this.StartGame.render(ctx)

        }

        window.requestAnimationFrame(
            this.loop.bind(this),
            canvas
        )
    }
}
