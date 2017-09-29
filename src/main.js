import gtr from './global-translation.js'
import IsometricGrid from './isometric-grid.js'
import GridInteraction from './grid-interaction.js'

class Application {
  constructor () {
    gtr.zoom = 80
    gtr.pan = {x: 0, y: 0}

    this.background = new IsometricGrid()
    this.interactionLayer = new GridInteraction()
  }

  start () {
    this.background.render()
    this.loop()
  }

  loop () {
    this.interactionLayer.render()
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
