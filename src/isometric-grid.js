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
    this.zoom = 40
    this.pan = {x: 0, y: 0}
  }

  render () {
    this.renderUpwardDiagonals()
    this.renderDownwardDiagonals()
    this.renderVerticals()
  }

  renderUpwardDiagonals () {
    let a
    this.ctx.strokeStyle = '#ff0000'
    for (a = -50 * 40; a <= 50 * 40; a += 40) {
      this.drawLine(this.getLineIntersections(a, ALPHA))
    }
  }

  renderDownwardDiagonals () {
    let a
    this.ctx.strokeStyle = '#ff0000'
    for (a = -50 * 40; a <= 50 * 40; a += 40) {
      this.drawLine(this.getLineIntersections(a, -ALPHA))
    }
  }

  renderVerticals () {
    console.log('render verticals')
  }

  // Line written in the format y = a + b * x
  getLineIntersections (a, b) {
    const vpMin = {x: this.pan.x, y: this.pan.y}
    const vpMax = {
      x: vpMin.x + (window.innerWidth),
      y: vpMin.y + (window.innerHeight)
    }
    const l = {p1: {}, p2: {}}

    l.p1.y = a + b * vpMin.x
    l.p1.y = Math.max(l.p1.y, vpMin.y)
    l.p1.y = Math.min(l.p1.y, vpMax.y)
    l.p1.x = (l.p1.y - a) / b

    l.p2.y = a + b * vpMax.x
    l.p2.y = Math.max(l.p2.y, vpMin.y)
    l.p2.y = Math.min(l.p2.y, vpMax.y)
    l.p2.x = (l.p2.y - a) / b

    return l
  }

  drawLine (l) {
    this.ctx.beginPath()
    this.ctx.moveTo(l.p1.x, l.p1.y)
    this.ctx.lineTo(l.p2.x, l.p2.y)
    this.ctx.stroke()
  }
}
