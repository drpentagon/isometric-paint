import GraphicsHandler from './graphics-handler.js'
const CONTAINER = document.querySelector('.graphics-wrapper')

export default class Layer {
  constructor () {
    this.gh = new GraphicsHandler(CONTAINER)
    this.triangles = []
  }

  addTriangle (a1, a2, right, color) {
    this.triangles.push({
      a1: a1,
      a2: a2,
      right: right,
      color: color
    })
  }

  render () {
    this.gh.clearCanvas()
    this.triangles.forEach((t) => {
      const {a1, a2, right, color} = t
      this.gh.fillStyle = color
      this.gh.drawTriangle(a1, a2, right)
    })
  }
}
