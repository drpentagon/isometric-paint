// import {createCanvas, clearCanvas, square} from './graphics-handler.js';
const ALPHA = Math.tan(30 * Math.PI / 180)

export default class IsometricGrid {
  constructor () {
    const width = window.innerWidth
    const height = window.innerHeight

    const canvas = document.createElement('canvas')
    canvas.className = 'canvas'
    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'

    document.querySelector('.graphics-wrapper').appendChild(canvas)
    this.ctx = canvas.getContext('2d')
  }

  render () {
    this.renderUpwardDiagonals()
    this.renderDownwardDiagonals()
    this.renderVerticals()
  }

  renderUpwardDiagonals () {
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
    const zoom = 40
    var startX

    this.ctx.strokeStyle = '#ff0000'
    for (startX = -1 * screenWidth; startX < screenWidth; startX += zoom) {
      let width = screenWidth - startX
      this.ctx.beginPath()
      this.ctx.moveTo(startX, screenHeight)
      this.ctx.lineTo(screenWidth, screenHeight - (width * ALPHA))
      this.ctx.stroke()
    }
  }

  renderDownwardDiagonals () {
    console.log('render downward diagonals')
  }

  renderVerticals () {
    console.log('render verticals')
  }
}
