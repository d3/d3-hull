function pointX(p) {
  return p[0];
}

function pointY(p) {
  return p[1];
}

function functor(x) {
  return function() {
    return x;
  };
}

function lexicographicOrder(a, b) {
  return a[0] - b[0]
      || a[1] - b[1];
}

// Returns the 2D cross product of AB and AC vectors, i.e., the z-component of
// the 3D cross product in a quadrant I Cartesian coordinate system (+x is
// right, +y is up). Returns a positive value if ABC is counter-clockwise,
// negative if clockwise, and zero if the points are collinear.
function cross2d(a, b, c) {
  return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
}

// Computes the upper convex hull per the monotone chain algorithm.
// Assumes points.length >= 3, is sorted by x, unique in y.
// Returns an array of indices into points in left-to-right order.
function computeUpperHullIndexes(points) {
  var n = points.length,
      indexes = [0, 1],
      size = 2;

  for (var i = 2; i < n; ++i) {
    while (size > 1 && cross2d(points[indexes[size - 2]], points[indexes[size - 1]], points[i]) <= 0) --size;
    indexes[size++] = i;
  }

  return indexes.slice(0, size); // remove popped points
}

export default function() {
  var x = pointX,
      y = pointY;

  function hull(data) {
    if ((n = data.length) < 3) return null;

    var fx = typeof x === "function" ? x : functor(x),
        fy = typeof y === "function" ? y : functor(y),
        i,
        n,
        points = new Array(n), // retains index into data
        flippedPoints = new Array(n);

    for (i = 0; i < n; ++i) points[i] = [+fx(data[i], i), +fy(data[i], i), i];
    points.sort(lexicographicOrder);
    for (i = 0; i < n; ++i) flippedPoints[i] = [points[i][0], -points[i][1]];

    var upperIndexes = computeUpperHullIndexes(points),
        lowerIndexes = computeUpperHullIndexes(flippedPoints);

    // Construct the polygon, removing possible duplicate endpoints.
    var skipLeft = lowerIndexes[0] === upperIndexes[0],
        skipRight = lowerIndexes[lowerIndexes.length - 1] === upperIndexes[upperIndexes.length - 1],
        polygon = [];

    // Add upper hull in right-to-l order.
    // Then add lower hull in left-to-right order.
    for (i = upperIndexes.length - 1; i >= 0; --i) polygon.push(data[points[upperIndexes[i]][2]]);
    for (i = +skipLeft; i < lowerIndexes.length - skipRight; ++i) polygon.push(data[points[lowerIndexes[i]][2]]);

    return polygon;
  }

  hull.x = function(_) {
    return arguments.length ? (x = _, hull) : x;
  };

  hull.y = function(_) {
    return arguments.length ? (y = _, hull) : y;
  };

  return hull;
};
