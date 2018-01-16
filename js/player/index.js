import Animation from '../base/animation.js'
import DataBus from '../databus.js'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const PLAYER_IMG_SRC = 'images/niao/up10.png'
const PLAYER_WIDTH = 60
const PLAYER_HEIGHT = 60

let databus = new DataBus()

export default class Player extends Animation {
  constructor () {
    super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT, 60)

    this.touchstartAfter()

    // 鸟的位置,默认处于左侧中间
    this.x = screenWidth / 10
    this.y = screenHeight / 2 + 30

    // 设置鸟的最低飞行距离
    this.minFly = screenHeight - PLAYER_HEIGHT

    // 触摸屏幕的时间
    this.touchTime = 0

    // 设置小鸟的上升距离
    this.playerUpDistance = 20

    // 距离上一次点击下落的时间
    this.fallenTime = 0

    // 设置当前下落的时候小鸟图片的下标
    this.setIndex(10)

    // 是否已经绑定触摸开始事件
    this.touchStartBlog = false
  }

  update() {
    if (!this.touchStartBlog && databus.startGame && !databus.gameOver) {
      this.touchTime            = new Date().getTime()
      this.playerTouchHandler   = this.touchStartFun.bind(this)
      this.touchStartBlog       = true

      this.playAnimation(10)

      canvas.addEventListener('touchstart', this.playerTouchHandler)
    }
    // 更新下落时间
    this.fallenTime = (new Date().getTime() - this.touchTime) / 1000

    // 判断
    if (this.y >= this.minFly) {
      // 如果下落高度小于最小飞行高度，就让高度等于最小飞行高度
      this.y = this.minFly

      // 设置游戏状态为结束
      databus.gameOver = true
    } else if (this.y <= 0) {
      // 如果小鸟冲出上边界，判定为撞墙
      this.y = 0

      // 设置游戏状态为结束
      databus.gameOver = true
    } else {
      // 自由落体计算  s = gt方 / 2
      this.y = this.y + 9.8 * Math.pow(this.fallenTime, 2) / 2
    }
  }

  // 游戏结束的时候删除鼠标事件
  removetouchStart() {
    canvas.removeEventListener('touchstart', this.playerTouchHandler)
    this.touchStartBlog = false
  }

  /**
   * 玩家响应手指的触摸事件
   * 改变鸟的位置 上升一段距离
   */
  touchStartFun() {
    this.touchTime = new Date().getTime()

    this.y        -= this.playerUpDistance
    
    // 停止没有完成的动画，重新开始动画
    this.stop()
    this.playAnimation(0)
  }

  /*
   * 定义手指点击过后鸟的动画
   */
  touchstartAfter() {
    let p = []

    const niaoImgNumber = 31 // 动画图片的总张数
    const niaoImg = 'images/niao/up' // 动画图片的基本路径

    for (let i = 0; i < niaoImgNumber; i++) {
      p.push(niaoImg + i + '.png')
    }

    this.initFrames(p)
  }
}
