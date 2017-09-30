const ALPHA = Math.tan(30 * Math.PI / 180)

export function getIsometricCoordinate (x_, y_) {
  const a1 = getDiagonalOffset(x_, y_, ALPHA)
  const a2 = getDiagonalOffset(x_, y_, -ALPHA)
  const vh = Math.floor(2 * x_ * ALPHA)
  const right = (a1 + a2) % 2 === vh % 2

  return {a1: a1, a2: a2, right: right}
}

function getDiagonalOffset (x_, y_, angle_) {
  return Math.floor(y_ - angle_ * x_)
}
