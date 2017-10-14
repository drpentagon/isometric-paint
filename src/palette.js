class Palette {
  constructor () {
    this.palette = document.querySelector('.main-menu')
    this.currentColor = 'rgb(49, 43, 43)'

    this.addColor('Black', 49, 43, 43, '100')
    this.addColor('Yellow', 254, 245, 108, 'Y06')
    this.addColor('Chrome Orange', 254, 195, 105, 'YR04')
    this.addColor('Cadmium Orange', 242, 111, 57, 'YR07')
    this.addColor('Cadmium Red', 241, 80, 98, 'R27')
    this.addColor('Prussian Blue', 43, 100, 169, 'B39')
  }

  get color () {
    return this.currentColor
  }

  addColor (name_, r_, g_, b_, number_) {
    let textModifier = 'button__label--light'
    const rgb = `rgb(${r_}, ${g_}, ${b_})`

    if (this.getLuminance(r_, g_, b_) > 128) {
      textModifier = 'button__label--dark'
    }

    const label = document.createElement('label')
    label.className = `button__label ${textModifier}`
    label.innerHTML = number_

    const color = document.createElement('article')
    color.className = 'tool'
    color.dataset.color = rgb
    color.style.backgroundColor = rgb
    color.appendChild(label)
    color.addEventListener('click', (e) => this.pickColor(e))

    this.palette.appendChild(color)
  }

  pickColor (e) {
    const color = e.currentTarget
    const previous = document.querySelector('.color--active')
    if (previous) {
      previous.classList.remove('color--active')
    }

    color.classList.add('color--active')
    this.currentColor = color.dataset.color
  }

  getLuminance (r_, g_, b_) {
    return 0.299 * r_ + 0.587 * g_ + 0.114 * b_
  }
}

export default new Palette()
