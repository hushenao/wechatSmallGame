import Sprite from '../../base/sprite.js'
import TopWall from './top.js'
import BottomWall from './bottom.js'
import DataBus from '../../databus.js'

const screenWidth   = window.innerWidth
const screenHeight  = window.innerHeight

const WALL_IMG_SRC  = 'images/wall.jpg'
const WALL_WIDTH    = screenWidth / 10

const wallConf = {
  ok: 20,       // 中间可通过的距离
  min: 10,      // 阻挡物距离上下最少不能少于
  max: 10       // 单位都是 % 
}

// 计算可随机的范围
const goHeight = 100 - wallConf.ok - wallConf.min - wallConf.max

function rnd() {
  let s = Math.floor(Math.random() * goHeight - goHeight / 2)
  return [
    goHeight / 2 + s + 10,
    goHeight / 2 - s + 10
  ]
}

const _ = {
  speed: Symbol('speed')
}

let databus = new DataBus()

export default class Wall {
  constructor() {
    this.top    = new TopWall(WALL_IMG_SRC, WALL_WIDTH)
    this.bottom = new BottomWall(WALL_IMG_SRC, WALL_WIDTH)
  }

  init(speeds) {
    const height = rnd()
    this.top.height         = height[0] * screenHeight / 100
    this.top.x              = screenWidth + WALL_WIDTH
    this.top.y              = 0
    this.top[_.speed]       = speeds

    this.bottom.height      = height[1] * screenHeight / 100
    this.bottom.x           = screenWidth + WALL_WIDTH
    this.bottom.y           = screenHeight - this.bottom.height
    this.bottom[_.speed]    = speeds

    this.scoreY             = false
  }

  // 每一帧更新墙位置
  update() {
    this.top.x    -= this.top[_.speed]
    this.bottom.x -= this.bottom[_.speed]

    // 对象回收
    if (this.top.x < 0 - WALL_WIDTH) {
      databus.removeWall(this)
    }
  }
}