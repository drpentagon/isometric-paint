import GraphicsHandler from './graphics-handler.js'
const CONTAINER = document.querySelector('.graphics-wrapper')

export default class Layer {
  constructor (name) {
    this.gh = new GraphicsHandler(CONTAINER)
    this.gh.lineWidth = 1
    this.triangles = localStorage.painting ? JSON.parse(localStorage.painting) : []
    this.render()
  }

  addTriangle (a1, a2, right, color) {
    this.triangles.push({
      a1: a1,
      a2: a2,
      right: right,
      color: color
    })

    localStorage.painting = JSON.stringify(this.triangles)
  }

  render () {
    this.gh.clearCanvas()
    this.triangles.forEach((t) => {
      const {a1, a2, right, color} = t
      this.gh.fillStyle = color
      this.gh.strokeStyle = color
      this.gh.drawTriangle(a1, a2, right)
    })
  }
}
