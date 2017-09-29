import gtr from './global-translation.js'
import GraphicsHandler from './graphics-handler.js'
import MouseHandler from './mouse-handler.js'

const CONTAINER = document.querySelector('.graphics-wrapper')

export default class GridInteraction {
  constructor () {
    this.gh = new GraphicsHandler(CONTAINER)
    this.gh.fillStyle = '#222222'
  }

  render () {
    const gPos = gtr.toGlobal(MouseHandler.position().x, MouseHandler.position().y)

    this.gh.clearCanvas()

    this.gh.writeText(`zoom: ${gtr.zoom}`, 20, 20)
    this.gh.writeText(`x: ${gPos.x}`, 100, 20)
    this.gh.writeText(`y: ${gPos.y}`, 180, 20)
  }
}
