import {palette} from './resources/copic.js'

class Palette {
  constructor () {
    this.palette = document.querySelector('.palette')
    const wrapper = document.createElement('section')
    wrapper.className = `palette__section`

    palette.forEach((s) => {
      s.colors.forEach((c) => {
        wrapper.appendChild(this.createColor(c))
      })
    })

    this.palette.appendChild(wrapper)
    this.currentColor = 'rgb(49, 43, 43)'
  }

  addSection (section_) {
    const {colors} = section_

    const colorWrapper = document.createElement('div')
    colorWrapper.className = `palette__section-colors`
    colors.forEach((c) => {
      colorWrapper.appendChild(this.createColor(c))
    })
  }

  createColor (color_) {
    const rgb = this.hexToRgb(color_.color)
    let textModifier = 'tool__label--light'
    const rgbValue = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
    if (this.getLuminance(rgb.r, rgb.g, rgb.b) > 128) {
      textModifier = 'tool__label--dark'
    }

    const label = document.createElement('label')
    label.className = `tool__label ${textModifier}`
    label.innerHTML = color_.id

    const name = document.createElement('label')
    name.className = `tool__name ${textModifier}`
    name.innerHTML = color_.name

    const color = document.createElement('a')
    color.className = 'palette__color'
    color.dataset.color = rgbValue
    color.style.backgroundColor = rgbValue
    color.appendChild(label)
    color.appendChild(name)
    color.addEventListener('click', (e) => this.pickColor(e))

    return color
  }

  hexToRgb (hex_) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex_)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  get color () {
    return this.currentColor
  }

  pickColor (e) {
    const color = e.currentTarget
    const previous = document.querySelector('.tools-menu--colors .tool--active')
    if (previous) {
      previous.classList.remove('tool--active')
    }

    color.classList.add('tool--active')
    this.currentColor = color.dataset.color
  }

  getLuminance (r_, g_, b_) {
    return 0.299 * r_ + 0.587 * g_ + 0.114 * b_
  }
}

export default new Palette()
