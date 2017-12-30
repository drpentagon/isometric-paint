const ALPHA = Math.tan(30 * Math.PI / 180)

const getIsometricCoordinate = (x_, y_) => {
  const coord = getExactIsometricCoordinate(x_, y_)
  coord.a1 = Math.floor(coord.a1)
  coord.a2 = Math.floor(coord.a2)
  const vh = Math.floor(2 * x_ * ALPHA)
  coord.right = Math.abs((coord.a1 + coord.a2) % 2) === vh % 2

  return coord
}

const getExactIsometricCoordinate = (x_, y_) => {
  const a1 = getDiagonalOffset(x_, y_, ALPHA)
  const a2 = getDiagonalOffset(x_, y_, -ALPHA)

  return {a1: a1, a2: a2}
}

const getDiagonalOffset = (x_, y_, angle_) => {
  return y_ - angle_ * x_
}

export {getIsometricCoordinate, getExactIsometricCoordinate}
