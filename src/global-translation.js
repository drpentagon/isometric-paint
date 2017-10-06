class GlobalTranslation {
  constructor (key_) {
    this.zoomLevel = 1
    this.p = {x: 0, y: 0}
  }

  set zoom (zoom_) {
    this.zoomLevel = zoom_
  }

  get zoom () {
    return this.zoomLevel
  }

  set pan (p_) {
    this.p.x = p_.x
    this.p.y = p_.y

    console.log(this.p)
  }

  get pan () {
    return this.p
  }

  toScreen (p_) {
    return [p_.x * this.zoom, p_.y * this.zoom]
  }

  toGlobal (x_, y_) {
    return {x: x_ / this.zoom, y: y_ / this.zoom}
  }
}

export default new GlobalTranslation()
