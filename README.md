# d3-hull

An implementation of [Andrew’s monotone chain algorithm](http://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain) for computing the [convex hull](https://en.wikipedia.org/wiki/Convex_hull) of a set of two-dimensional points.

<a href="http://bl.ocks.org/mbostock/4341699"><img src="http://bl.ocks.org/mbostock/raw/4341699/thumbnail.png" width="202"></a>

## Installing

If you use NPM, `npm install d3-hull`. Otherwise, download the [latest release](https://github.com/d3/d3-hull/releases/latest).

## API Reference

<a name="hull" href="#hull">#</a> <b>hull</b>()

Creates a new hull factory with the default [*x*-](#hull_x) and [*y*-](#hull_y)accessors.

<a name="_hull" href="#_hull">#</a> <i>hull</i>(<i>points</i>)

Returns the convex hull for the specified *points*, using the current [*x*-](#hull_x) and [*y*-](#hull_y)accessors. The returned convex hull is represented as an array containing a subset of the input *points* arranged in counterclockwise order. Returns null if *points* has fewer than three elements.

<a name="x" href="#x">#</a> <i>hull</i>.<b>x</b>([<i>x</i>])

If *x* is specified, sets the x-coordinate accessor. If *x* is not specified, returns the current x-coordinate accessor, which defaults to:

```js
function x(d) {
  return d[0];
}
```

<a name="y" href="#y">#</a> <i>hull</i>.<b>y</b>([<i>y</i>])

If *y* is specified, sets the y-coordinate accessor. If *y* is not specified, returns the current y-coordinate accessor, which defaults to:

```js
function y(d) {
  return d[1];
}
```

## Changes from D3 3.x:

* Removed deprecated constructor.
