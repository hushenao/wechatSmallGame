import DataBus from '../databus.js'

const screenWidth   = window.innerWidth
const screenHeight  = window.innerHeight

let atlas = new Image()
atlas.src = 'images/Common.png'

let databus = new DataBus()

export default class Gameinfo {

  renderGameScore(ctx) {
    ctx.fillStyle = '#000'
    ctx.font      = '20px Arial'
    ctx.fillText(
      databus.score,
      10,
      30
    )
  }

  renderGameOver(ctx) {
    ctx.drawImage(
      atlas,
      0,
      0,
      119,
      108,
      screenWidth / 2 - 150,
      screenHeight / 2 - 150,
      300,
      300
    )

    ctx.fillStyle = '#fff'
    ctx.font = '20px Arial'

    ctx.fillText(
      '游戏结束',
      screenWidth / 2 - 40,
      screenHeight / 2 - 10 -80
    )

    ctx.fillText(
      '得分：' + databus.score,
      screenWidth / 2 - 35,
      screenHeight / 2 - 10
    )

    ctx.drawImage(
      atlas,
      120,
      6,
      39,
      24,
      screenWidth / 2 - 60,
      screenHeight / 2 + 20 + 10,
      120,
      40
    )

    ctx.fillText(
      '重新开始',
      screenWidth / 2 - 40,
      screenHeight / 2 + 10 + 45
    )

    /*
     * 定义一个按钮方便点击
     */
    this.area = {
      startX: screenWidth / 2 - 60,
      startY: screenHeight / 2 + 20 + 10,
      endX: screenWidth / 2 + 60,
      endY: screenHeight / 2 + 20 + 10 + 40
    }
  }
}