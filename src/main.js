import gtr from './global-translation.js'
import IsometricGrid from './isometric-grid.js'
import Layer from './layer.js'
import GridInteraction from './grid-interaction.js'
import {getIsometricCoordinate} from './isometric-math.js'
import Palette from './palette.js'

const CONTAINER = document.querySelector('.graphics-wrapper')
const BTN_ZOOM_IN = document.querySelector('.js_button__zoom-in')
const BTN_ZOOM_OUT = document.querySelector('.js_button__zoom-out')
const BTN_CLOSE_PALETTE = document.querySelector('.js_button__close-palette')
const BTN_OPEN_PALETTE = document.querySelector('.js_button__open-palette')

class Application {
  constructor () {
    gtr.zoom = 32
    gtr.pan = {x: 0, y: 0}

    this.background = new IsometricGrid()
    this.layer = new Layer()

    this.hud = new GridInteraction()

    var hammer = new Hammer(CONTAINER)

    hammer.on('tap', (ev) => this.handleMouseCLick(ev))
    hammer.on('panstart', (ev) => this.handlePanStart(ev))
    hammer.on('panmove', (ev) => this.updatePanPosition(ev))
    hammer.on('panend', (ev) => this.handlePanEnd(ev))

    var hammerManager = new Hammer.Manager(CONTAINER)
    hammerManager.add(new Hammer.Press({event: 'press', time: 500}))
    hammerManager.on('press', (ev) => this.handlePress(ev))

    BTN_ZOOM_IN.addEventListener('click', (e) => {
      gtr.zoomIn()
      this.renderAll()
    })

    BTN_ZOOM_OUT.addEventListener('click', (e) => {
      gtr.zoomOut()
      this.renderAll()
    })

    BTN_CLOSE_PALETTE.addEventListener('click', (e) => {
      document.querySelector('html').classList.remove('show-palette')
    })
/*
    BTN_OPEN_PALETTE.addEventListener('click', (e) => {
      document.querySelector('html').classList.add('show-palette')
    })
    */
  }

  handleMouseCLick (event) {
    const isoCoord = this.getIsometricCoordinate(event)
    this.layer.addTriangle(isoCoord.a1, isoCoord.a2, isoCoord.right, Palette.color)
    this.layer.render()
  }

  handlePress (event) {
    const isoCoord = this.getIsometricCoordinate(event)
    this.layer.removeTriangle(isoCoord.a1, isoCoord.a2, isoCoord.right)
    this.layer.render()
  }

  getIsometricCoordinate (event) {
    const x = event.center.x - CONTAINER.getBoundingClientRect().left
    const y = event.center.y - CONTAINER.getBoundingClientRect().top
    const gPos = gtr.toGlobal(x, y)
    return getIsometricCoordinate(gPos.x, gPos.y)
  }

  handlePanStart (event) {
    this.panStart = {x: gtr.pan.x, y: gtr.pan.y}
    this.panActive = true
    this.hud.clear()
    this.updatePanPosition(event)
  }

  handlePanEnd (event) {
    this.updatePanPosition(event)
    this.panActive = false
    this.renderAll()
  }

  updatePanPosition (event) {
    const delta = gtr.scaleToGlobal(event.deltaX, event.deltaY)
    gtr.pan.x = this.panStart.x + delta.x
    gtr.pan.y = this.panStart.y + delta.y
  }

  renderAll () {
    this.background.render()
    this.layer.render()
  }

  start () {
    this.background.render()
    this.loop()
  }

  loop () {
    if (this.panActive) {
      this.renderAll()
    } else {
      this.hud.render()
    }
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
