import Pool from './base/pool.js'

let instance

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if (instance) return instance
    
    instance  = this

    this.pool = new Pool()

    this.reset()
  }

  reset() {
    // 当前的帧数
    this.frame      = 0

    // 当前的得分数
    this.score      = 0

    // 需要执行动画
    this.animations = []

    // 游戏开始和结束
    this.gameOver   = false
    this.startGame  = false

    // 所有墙的集合
    this.walls      = []
    
  }

  /**
   * 回收墙，进入对象池
   * 此后不进入帧循环
   */
  removeWall(wall) {
    let temp = this.walls.shift()

    temp.visible = false

    this.pool.recover('wall', wall)
  }
}
