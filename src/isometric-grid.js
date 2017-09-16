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
    this.zoom = 100
    this.pan = {x: 0, y: 0}
  }

  render () {
    this.vpMin = {x: this.pan.x / this.zoom, y: this.pan.y / this.zoom}
    this.vpMax = {
      x: this.vpMin.x + (window.innerWidth / this.zoom),
      y: this.vpMin.y + (window.innerHeight / this.zoom)
    }

    this.ctx.strokeStyle = '#999999'
    this.ctx.lineWidth = 1
    this.renderUpwardDiagonals()
    this.renderDownwardDiagonals()
    this.renderVerticals()
  }

  renderUpwardDiagonals () {
    for (let a = -100; a <= 200; a++) {
      this.drawLine(this.getLineIntersections(a, ALPHA))
    }
  }

  renderDownwardDiagonals () {
    for (let a = -0; a <= 200; a++) {
      this.drawLine(this.getLineIntersections(a, -ALPHA))
    }
  }

  renderVerticals () {
    for (let a = 0; a <= 100 / ALPHA; a += 0.5 / ALPHA) {
      const l = {
        p1: {x: a, y: this.vpMin.y},
        p2: {x: a, y: this.vpMax.y}
      }
      this.drawLine(l)
    }
  }

  // Line written in the format y = a + b * x
  getLineIntersections (a, b) {
    const l = {p1: {}, p2: {}}
    l.p1.y = a + b * this.vpMin.x
    l.p1.y = Math.max(l.p1.y, this.vpMin.y)
    l.p1.y = Math.min(l.p1.y, this.vpMax.y)
    l.p1.x = (l.p1.y - a) / b

    l.p2.y = a + b * this.vpMax.x
    l.p2.y = Math.max(l.p2.y, this.vpMin.y)
    l.p2.y = Math.min(l.p2.y, this.vpMax.y)
    l.p2.x = (l.p2.y - a) / b

    return l
  }

  drawLine (l) {
    this.ctx.beginPath()
    this.ctx.moveTo(l.p1.x * this.zoom, l.p1.y * this.zoom)
    this.ctx.lineTo(l.p2.x * this.zoom, l.p2.y * this.zoom)
    this.ctx.stroke()
  }
}
