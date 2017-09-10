import IsometricGrid from './isometric-grid.js'

class Game {
  constructor () {
    this.background = new IsometricGrid()
  }

  start () {
    this.background.render()
  }
}

const game = new Game()
game.start()
