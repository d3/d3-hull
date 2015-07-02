var tape = require("tape"),
    hull = require("../");

tape("hull() has the expected defaults", function(test) {
  var h = hull.hull();
  test.equal(h.x()([42, 43]), 42);
  test.equal(h.y()([42, 43]), 43);
  test.end();
});

tape("hull.x(x) sets the x-accessor", function(test) {
  var h = hull.hull().x(function(d) { return d.x; });
  test.equal(h.x()({x: 42}), 42);
  test.deepEqual(h([{x: 200, 1: 200}, {x: 760, 1: 300}, {x: 500, 1: 500}, {x: 400, 1: 400}]), [{x: 760, 1: 300}, {x: 200, 1: 200}, {x: 500, 1: 500}]);
  test.end();
});

tape("hull.y(y) sets the y-accessor", function(test) {
  var h = hull.hull().y(function(d) { return d.y; });
  test.equal(h.y()({y: 42}), 42);
  test.deepEqual(h([{0: 200, y: 200}, {0: 760, y: 300}, {0: 500, y: 500}, {0: 400, y: 400}]), [{0: 760, y: 300}, {0: 200, y: 200}, {0: 500, y: 500}]);
  test.end();
});

tape("hull(points) returns null if points has fewer than three elements", function(test) {
  var h = hull.hull();
  test.equal(h([]), null);
  test.equal(h([[0, 1]]), null);
  test.equal(h([[0, 1], [1, 0]]), null);
  test.end();
});

tape("hull(points) returns the convex hull of the specified points", function(test) {
  var h = hull.hull();
  test.deepEqual(h([[200, 200], [760, 300], [500, 500]]), [[760, 300], [200, 200], [500, 500]]);
  test.deepEqual(h([[200, 200], [760, 300], [500, 500], [400, 400]]), [[760, 300], [200, 200], [500, 500]]);
  test.end();
});

tape("hull(points) handles points with duplicate ordinates", function(test) {
  var h = hull.hull();
  test.deepEqual(h([[-10, -10], [10, 10], [10, -10], [-10, 10]]), [[10, 10], [10, -10], [-10, -10], [-10, 10]]);
  test.end();
});

tape("hull(points) handles overlapping upper and lower hulls", function(test) {
  var h = hull.hull();
  test.deepEqual(h([[0, -10], [0, 10], [0, 0], [10, 0], [-10, 0]]), [[10, 0], [0, -10], [-10, 0], [0, 10]]);
  test.end();
});

// Cases below taken from http://uva.onlinejudge.org/external/6/681.html
tape("hull(points) handles various non-trivial hulls", function(test) {
  var h = hull.hull();
  test.deepEqual(h([[60,20], [250,140], [180,170], [79,140], [50,60], [60,20]]), [[250,140], [60,20], [50,60], [79,140], [180,170]]);
  test.deepEqual(h([[50,60], [60,20], [70,45], [100,70], [125,90], [200,113], [250,140], [180,170], [105,140], [79,140], [60,85], [50,60]]), [[250,140], [60,20], [50,60], [79,140], [180,170]]);
  test.deepEqual(h([[30,30], [50,60], [60,20], [70,45], [86,39], [112,60], [200,113], [250,50], [300,200], [130,240], [76,150], [47,76], [36,40], [33,35], [30,30]]), [[300,200], [250,50], [60,20], [30,30], [47,76], [76,150], [130,240]]);
  test.end();
});
