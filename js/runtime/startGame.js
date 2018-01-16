import DataBus from '../databus.js'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let databus = new DataBus()

const _ = {
  timer: Symbol('timer') 
}

export default class StartGame {

  constructor() {
    this.time     = 3
    this[_.timer] = null
    this.startTime()
  }

  startTime() {
    this[_.timer] = setInterval(() => {
      this.time--
      if (this.time < 0) {
        clearInterval(this[_.timer])
        databus.startGame = true
      }
    }, 1000)
  }

  render(ctx) {
    ctx.fillStyle = "#000"
    ctx.font = "50px Arial"

    ctx.fillText(
      this.time,
      screenWidth / 2 -25,
      screenHeight / 2 -25
    )
  }
}