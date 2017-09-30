import gtr from './global-translation.js'
import IsometricGrid from './isometric-grid.js'
import Layer from './layer.js'
import MouseHandler from './mouse-handler.js'
import GridInteraction from './grid-interaction.js'
import {getIsometricCoordinate} from './isometric-math.js'
import Palette from './palette.js'

class Application {
  constructor () {
    gtr.zoom = 80
    gtr.pan = {x: 0, y: 0}

    this.background = new IsometricGrid()
    this.layer = new Layer()
    this.hud = new GridInteraction()

    document.querySelector('body').addEventListener('click', () => this.handleMouseCLick())
  }

  handleMouseCLick () {
    const gPos = gtr.toGlobal(MouseHandler.position().x, MouseHandler.position().y)
    const isoCoord = getIsometricCoordinate(gPos.x, gPos.y)
    this.layer.addTriangle(isoCoord.a1, isoCoord.a2, isoCoord.right, '#000000')
    this.layer.render()
  }

  start () {
    this.background.render()
    this.loop()
  }

  loop () {
    this.hud.render()
    requestAnimationFrame(() => this.loop())
  }

  /*
  this.now = Date.now()
  if (this.then !== null) {
    let delta = (this.now - this.then) / 1000
    Data.instance.update(delta)
  }
  this.then = this.now
  */
}

const game = new Application()
game.start()
