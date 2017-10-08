import gtr from './global-translation.js'
import GraphicsHandler from './graphics-handler.js'
import MouseHandler from './mouse-handler.js'
import {getIsometricCoordinate} from './isometric-math.js'

const CONTAINER = document.querySelector('.graphics-wrapper')

export default class GridInteraction {
  constructor () {
    this.gh = new GraphicsHandler(CONTAINER)
  }

  clear () {
    this.gh.clearCanvas()
  }

  render () {
    const gPos = gtr.toGlobal(MouseHandler.position().x, MouseHandler.position().y)
    const isoCoord = getIsometricCoordinate(gPos.x, gPos.y)

    this.gh.clearCanvas()
    this.gh.fillStyle = 'rgba(0, 0, 0, 0.2)'
    this.gh.drawTriangle(isoCoord.a1, isoCoord.a2, isoCoord.right)

    this.gh.fillStyle = '#222222'
    this.gh.writeText(`zoom: ${gtr.zoom}`, 20, 20)
  }
}
