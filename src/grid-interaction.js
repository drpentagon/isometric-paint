import gtr from './global-translation.js'
import GraphicsHandler from './graphics-handler.js'
import MouseHandler from './mouse-handler.js'
import {getIsometricCoordinate} from './isometric-math.js'

const CONTAINER = document.querySelector('.graphics-wrapper')
export default class GridInteraction {
  constructor () {
    this.gh = new GraphicsHandler(CONTAINER)
    this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints
  }

  clear () {
    this.gh.clearCanvas()
  }

  render () {
    const x = MouseHandler.position().x
    const y = MouseHandler.position().y
    if (!this.isTouchDevice && x !== this.oldX && y !== this.oldY) {
      this.oldX = x
      this.oldY = y
      const gPos = gtr.toGlobal(x, y)
      const isoCoord = getIsometricCoordinate(gPos.x, gPos.y)

      this.gh.clearCanvas()
      this.gh.fillStyle = 'rgba(0, 0, 0, 0.2)'
      this.gh.drawTriangle(isoCoord.a1, isoCoord.a2, isoCoord.right)
    }
  }
}
