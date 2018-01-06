
export default class Color {
  constructor (id_, name_, r_, g_, b_) {
    this.id = id_
    this.name = name_
    this.color = `rgb(${r_}, ${g_}, ${b_})`
  }

  get color () {
    return this.color
  }
}
