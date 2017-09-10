// import {createCanvas, clearCanvas, square} from './graphics-handler.js';

export default class IsometricGrid {
  constructor () {
    const width = window.innerWidth
    const height = window.innerHeight

    const canvas = document.createElement('canvas')
    canvas.className = 'canvas'
    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'

    document.querySelector('.graphics-wrapper').appendChild(canvas)
    this.ctx = canvas.getContext('2d')
  }

  render () {
    this.renderUpwardDiagonals()
    this.renderDownwardDiagonals()
    this.renderVerticals()
  }

  renderUpwardDiagonals () {
    console.log('render upward diagonals')
  }

  renderDownwardDiagonals () {
    console.log('render downward diagonals')
  }

  renderVerticals () {
    console.log('render verticals')
  }
}
