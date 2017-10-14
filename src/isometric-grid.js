import gtr from './global-translation.js'
import GraphicsHandler from './graphics-handler.js'

const ALPHA = Math.tan(30 * Math.PI / 180)
const CONTAINER = document.querySelector('.graphics-wrapper')

export default class IsometricGrid {
  constructor () {
    this.gh = new GraphicsHandler(CONTAINER)

    this.gh.strokeStyle = '#dddddd'
    this.gh.fillStyle = 'rgba(200, 0, 0, 0.02)'

    this.setViewort()
  }

  setViewort () {
    this.upperLeft = {}
    this.upperLeft.x = -gtr.pan.x
    this.upperLeft.y = -gtr.pan.y
    this.bottomRight = gtr.scaleToGlobal(CONTAINER.offsetWidth, CONTAINER.offsetHeight)
    this.bottomRight.x += this.upperLeft.x
    this.bottomRight.y += this.upperLeft.y
  }

  render () {
    this.gh.clearCanvas()
    this.setViewort()
    this.renderUpwardDiagonals()
    this.renderDownwardDiagonals()
    this.renderVerticals()
  }

  renderUpwardDiagonals () {
    for (let a = -100; a <= 200; a += 2) {
      const p1 = this.getLineIntersections(a, ALPHA)
      const p2 = this.getLineIntersections(a + 1, ALPHA)
      this.gh.drawPolygon([p1[0], p1[1], p2[1], p2[0]])
    }
  }

  renderDownwardDiagonals () {
    for (let a = -100; a <= 200; a += 2) {
      const p1 = this.getLineIntersections(a, -ALPHA)
      const p2 = this.getLineIntersections(a + 1, -ALPHA)
      this.gh.drawPolygon([p1[0], p1[1], p2[1], p2[0]])
    }
  }

  renderVerticals () {
    for (let a = -100 / ALPHA; a <= 100 / ALPHA; a += 1 / ALPHA) {
      const poly = [
        {x: a, y: this.upperLeft.y},
        {x: a, y: this.bottomRight.y},
        {x: a + 0.5 / ALPHA, y: this.bottomRight.y},
        {x: a + 0.5 / ALPHA, y: this.upperLeft.y}
      ]

      this.gh.drawPolygon(poly)
    }
  }

  // Line written in the format y = a + b * x
  getLineIntersections (a, b) {
    const l = [{}, {}]
    l[0].y = a + b * this.upperLeft.x
    l[0].y = Math.max(l[0].y, this.upperLeft.y)
    l[0].y = Math.min(l[0].y, this.bottomRight.y)
    l[0].x = (l[0].y - a) / b

    l[1].y = a + b * this.bottomRight.x
    l[1].y = Math.max(l[1].y, this.upperLeft.y)
    l[1].y = Math.min(l[1].y, this.bottomRight.y)
    l[1].x = (l[1].y - a) / b
    return l
  }
}
