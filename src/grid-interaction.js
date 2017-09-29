import gtr from './global-translation.js'
import GraphicsHandler from './graphics-handler.js'
import MouseHandler from './mouse-handler.js'

const ALPHA = Math.tan(30 * Math.PI / 180)
const CONTAINER = document.querySelector('.graphics-wrapper')

export default class GridInteraction {
  constructor () {
    this.gh = new GraphicsHandler(CONTAINER)

    this.gh.strokeStyle = '#ffdddd'

  }

  render () {
    const gPos = gtr.toGlobal(MouseHandler.position().x, MouseHandler.position().y)

    const a1 = this.getDiagonal(gPos, ALPHA)
    const a2 = this.getDiagonal(gPos, -ALPHA)

    const poly = []
    poly.push(this.getPoint(a1, a2))
    poly.push(this.getPoint(a1 + 1, a2))
    poly.push(this.getPoint(a1 + 1, a2 + 1))
    poly.push(this.getPoint(a1, a2 + 1))

    this.gh.clearCanvas()
    this.gh.fillStyle = 'rgba(0, 0, 0, 0.2)'
    this.gh.drawPolygon(poly)

    this.gh.fillStyle = '#222222'
    this.gh.writeText(`zoom: ${gtr.zoom}`, 20, 20)
    this.gh.writeText(`x: ${gPos.x}`, 100, 20)
    this.gh.writeText(`y: ${gPos.y}`, 180, 20)
    this.gh.writeText(`d1: ${a1}`, 20, 45)
    this.gh.writeText(`d2: ${a2}`, 20, 80)
  }

  getDiagonal (p, angle) {
    return Math.floor(p.y - angle * p.x)
  }

  getPoint (a1, a2) {
    const x = (a2 - a1) / (2 * ALPHA)
    const y = a1 + ALPHA * x

    return {x: x, y: y}
  }
}

/*
    y = a1 + ALPHA * x
    y = a2 - ALPHA * x
    a1 + ALPHA * x = a2 - ALPHA * x
    ALPHA * x = a2 - a1 - ALPHA * x
    x = (a2 - a1) / ALPHA - x
    2x = (a2 - a1) / ALPHA
    */

/*
    x = (a2 - a1) / (2 * ALPHA)
    y = a1 + ALPHA * x
    */
