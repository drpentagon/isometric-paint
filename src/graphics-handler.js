import gtr from './global-translation.js'

const ALPHA = Math.tan(30 * Math.PI / 180)

export default class GraphicsHandler {
  constructor (parent_) {
    const width = parent_.offsetWidth
    const height = parent_.offsetHeight

    this.canvas = document.createElement('canvas')
    this.canvas.className = 'canvas'
    this.canvas.setAttribute('width', width)
    this.canvas.setAttribute('height', height)
    this.canvas.style.width = width + 'px'
    this.canvas.style.height = height + 'px'

    parent_.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d')
    this.ctx.lineWidth = 0.5
    this.ctx.font = `20px Miso`
    this.ctx.textBaseline = 'top'
  }

  clearCanvas () {
    const {ctx, canvas} = this
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
  }

  set strokeStyle (style_) {
    this.ctx.strokeStyle = style_
  }

  set fillStyle (style_) {
    this.ctx.fillStyle = style_
  }

  drawLine (l_) {
    const {ctx} = this
    ctx.beginPath()
    ctx.moveTo(...gtr.toScreen(l_.p1))
    ctx.lineTo(...gtr.toScreen(l_.p2))
    ctx.stroke()
  }

  drawTriangle (a1, a2, right) {
    const poly = []
    poly.push(this.getIntersection(a1, a2))
    poly.push(this.getIntersection(a1 + 1, a2 + 1))
    if (right) {
      poly.push(this.getIntersection(a1, a2 + 1))
    } else {
      poly.push(this.getIntersection(a1 + 1, a2))
    }

    this.drawPolygon(poly)
  }

  drawPolygon (pts_) {
    const {ctx} = this
    ctx.beginPath()
    ctx.moveTo(...gtr.toScreen(pts_[0]))
    for (let i = 1; i < pts_.length + 1; i++) {
      ctx.lineTo(...gtr.toScreen(pts_[i % pts_.length]))
    }
    ctx.stroke()
    ctx.fill()
  }

  writeText (text_, x_, y_) {
    const {ctx} = this

    ctx.fillText(text_, x_, y_)
  }

  getIntersection (a1, a2) {
    const x = (a2 - a1) / (2 * ALPHA)
    const y = a1 + ALPHA * x
    return {x: x, y: y}
  }
}
