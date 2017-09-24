import gtr from './global-translation.js'
import IsometricGrid from './isometric-grid.js'

class Game {
  constructor () {
    gtr.zoom = 80
    gtr.pan = {x: 0, y: 0}

    this.background = new IsometricGrid()
  }

  start () {
    this.background.render()
  }
}

const game = new Game()
game.start()
