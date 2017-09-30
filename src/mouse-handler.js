const CONTAINER = document.querySelector('.graphics-wrapper')

class MouseHandler {
  constructor () {
    CONTAINER.addEventListener('mousemove', (e) => this.handleMouseMove(e))
    this.pos = {x: 0, y: 0}
  }

  handleMouseMove (event) {
    this.pos = {x: event.clientX - CONTAINER.getBoundingClientRect().left, y: event.clientY - CONTAINER.getBoundingClientRect().top}
  }

  position () {
    return this.pos
  }
}

export default new MouseHandler()
