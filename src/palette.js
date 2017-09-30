class Palette {
  constructor () {
    this.palette = document.querySelector('.palette')
    this.addColor('Black', 49, 43, 43, '100')
    this.addColor('Yellow', 254, 245, 108, 'Y06')
    this.addColor('Chrome Orange', 254, 195, 105, 'YR04')
    this.addColor('Cadmium Orange', 242, 111, 57, 'YR07')
    this.addColor('Cadmium Red', 241, 80, 98, 'R27')
    this.addColor('Prussian Blue', 43, 100, 169, 'B39')
  }

  addColor (name_, r_, g_, b_) {
    let textModifier = 'color__label--light'

    if (this.getLuminance(r_, g_, b_) > 128) {
      textModifier = 'color__label--dark'
    }

    const color = document.createElement('article')
    color.className = 'color'

    const example = document.createElement('figure')
    example.className = 'color__example'
    example.style.backgroundColor = `rgb(${r_}, ${g_}, ${b_})`

    const label = document.createElement('label')
    label.className = `color__label ${textModifier}`
    label.innerHTML = name_

    example.appendChild(label)
    color.appendChild(example)

    color.addEventListener('click', (e) => this.pickColor(e))

    this.palette.appendChild(color)
  }

  pickColor (e) {
    console.log('color clicked', e.target)
  }

  getLuminance (r_, g_, b_) {
    return 0.299 * r_ + 0.587 * g_ + 0.114 * b_
  }
}

export default new Palette()
