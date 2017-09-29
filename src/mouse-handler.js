class MouseHandler {
  constructor () {
    document.querySelector('body').addEventListener('mousemove', (e) => this.handleMouseMove(e))
    this.pos = {x: 0, y: 0}
  }

  handleMouseMove (event) {
    this.pos = {x: event.clientX, y: event.clientY}
  }

  position () {
    return this.pos
  }
}

export default new MouseHandler()
