import gtr from './global-translation.js'
import GraphicsHandler from './graphics-handler.js'

const CONTAINER = document.querySelector('.graphics-wrapper')

export default class GridInteraction {
  constructor () {
    this.gh = new GraphicsHandler(CONTAINER)

    this.gh.fillStyle = '#222222'
  }

  render () {
    setTimeout(() => {
      this.gh.writeText('x: 324', 20, 20)
      this.gh.writeText('y: 24', 20, 45)
    }, 0)
  }
}
