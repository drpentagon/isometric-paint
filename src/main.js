import gtr from './global-translation.js'
import IsometricGrid from './isometric-grid.js'
import GridInteraction from './grid-interaction.js'

class Game {
  constructor () {
    gtr.zoom = 80
    gtr.pan = {x: 0, y: 0}

    this.background = new IsometricGrid()
    this.interactionLayer = new GridInteraction()
  }

  start () {
    this.background.render()
    this.interactionLayer.render()
  }
}

const game = new Game()
game.start()
