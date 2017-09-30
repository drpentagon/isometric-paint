import gtr from './global-translation.js'
import GraphicsHandler from './graphics-handler.js'
import MouseHandler from './mouse-handler.js'

const ALPHA = Math.tan(30 * Math.PI / 180)
const CONTAINER = document.querySelector('.graphics-wrapper')

export default class GridInteraction {
  constructor () {
    this.gh = new GraphicsHandler(CONTAINER)
  }

  render () {
    const gPos = gtr.toGlobal(MouseHandler.position().x, MouseHandler.position().y)

    const a1 = this.getDiagonalOffset(gPos, ALPHA)
    const a2 = this.getDiagonalOffset(gPos, -ALPHA)

    const poly = []
    poly.push(this.getIntersection(a1, a2))
    poly.push(this.getIntersection(a1 + 1, a2 + 1))
    if (gPos.x > poly[0].x) {
      poly.push(this.getIntersection(a1, a2 + 1))
    } else {
      poly.push(this.getIntersection(a1 + 1, a2))
    }

    this.gh.clearCanvas()
    this.gh.fillStyle = 'rgba(0, 0, 0, 0.2)'
    this.gh.drawPolygon(poly)

    this.gh.fillStyle = '#222222'
    this.gh.writeText(`zoom: ${gtr.zoom}`, 20, 20)
    this.gh.writeText(`d1: ${a1}`, 100, 20)
    this.gh.writeText(`d2: ${a2}`, 180, 20)
  }

  getDiagonalOffset (p, angle) {
    return Math.floor(p.y - angle * p.x)
  }

  getIntersection (a1, a2) {
    const x = (a2 - a1) / (2 * ALPHA)
    const y = a1 + ALPHA * x
    return {x: x, y: y}
  }
}
