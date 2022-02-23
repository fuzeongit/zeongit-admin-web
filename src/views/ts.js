

function r(e, t) {
  var r = e.substr(t, 2)
  return parseInt(r, 16)
}

function n(n, c) {
  for (var o = "", a = r(n, c), i = c + 2; i < n.length; i += 2) {
    var l = r(n, i) ^ a
    o += String.fromCharCode(l)
  }
  try {
    o = decodeURIComponent(escape(o))
  } catch (u) {
    e(u)
  }
  return o
}

console.log(n("fa9e939b949fba9b998ed79b89939bd4999597", 0))