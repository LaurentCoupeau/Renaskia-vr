// Décor extérieur : Perpignan (version stylisée), la place du Castillet au crépuscule.
// Le Castillet ferme la perspective d'une place bordée de maisons catalanes,
// avec palmiers, lampadaires, drapeaux catalans et le Canigou à l'horizon (dans le ciel).
AFRAME.registerComponent('perpignan', {
  init: function () {
    var root = this.el, seed = 7;
    var rnd = function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    function mk(tag, attrs, parent) {
      var e = document.createElement(tag);
      for (var k in attrs) e.setAttribute(k, attrs[k]);
      (parent || root).appendChild(e); return e;
    }
    function flat(src, rx, ry, extra) {
      return 'shader: flat; src: #' + src + '; repeat: ' + rx.toFixed(2) + ' ' + ry.toFixed(2) + (extra ? '; ' + extra : '');
    }

    /* ---------- Le Castillet (z = -95, façade vers la place) ---------- */
    var CZ = -64;
    mk('a-box', { position: '0 12 ' + CZ, width: 16, height: 24, depth: 11, material: flat('brique', 4.6, 6.9) });
    mk('a-plane', { position: '0 12 ' + (CZ + 5.52), width: 16, height: 24, material: 'shader: flat; src: #castilletface' });
    [-1, 1].forEach(function (s) {
      mk('a-box', { position: (s * 11) + ' 8.5 ' + (CZ + 0.5), width: 6, height: 17, depth: 9, material: flat('brique', 1.7, 4.9) });
      mk('a-plane', { position: (s * 11) + ' 8.5 ' + (CZ + 5.02), width: 6, height: 17, material: flat('brique', 1.7, 4.9) });
      // créneaux des ailes
      for (var z = -3.6; z <= 4.6; z += 2.1) {
        [-1, 1].forEach(function (t) {
          mk('a-box', { position: (s * 11 + t * 2.7) + ' 17.8 ' + (CZ + 0.5 + z - 0.5), width: 1, height: 1.6, depth: 1.2, material: flat('brique', .3, .45) });
        });
      }
      for (var x = -2.4; x <= 2.4; x += 2.1) {
        [-1, 1].forEach(function (t) {
          mk('a-box', { position: (s * 11 + x) + ' 17.8 ' + (CZ + 0.5 + t * 4.2), width: 1.2, height: 1.6, depth: 1, material: flat('brique', .3, .45) });
        });
      }
    });
    // chemin de ronde + créneaux du corps central
    mk('a-box', { position: '0 24.5 ' + CZ, width: 16.8, height: 1, depth: 11.8, material: flat('brique', 4.8, .3) });
    for (var x = -7.4; x <= 7.5; x += 2.1) {
      [-1, 1].forEach(function (t) {
        mk('a-box', { position: x + ' 25.8 ' + (CZ + t * 5.6), width: 1.3, height: 1.6, depth: 1, material: flat('brique', .4, .45) });
      });
    }
    for (var z = -4.4; z <= 4.5; z += 2.1) {
      [-1, 1].forEach(function (t) {
        mk('a-box', { position: (t * 8.2) + ' 25.8 ' + (CZ + z), width: 1, height: 1.6, depth: 1.3, material: flat('brique', .3, .45) });
      });
    }
    // tourelles d'angle
    [-1, 1].forEach(function (sx) {
      [-1, 1].forEach(function (sz) {
        var px = sx * 8.3, pz = CZ + sz * 5.7;
        mk('a-cylinder', { position: px + ' 14.5 ' + pz, radius: 1.5, height: 29, 'segments-radial': 14, material: flat('brique', 3, 8) });
        mk('a-cone', { position: px + ' 30.9 ' + pz, 'radius-bottom': 2.1, 'radius-top': 0, height: 3.8, 'segments-radial': 14, material: flat('toit', 2, 1) });
      });
    });

    /* ---------- Maisons catalanes de chaque côté de la place ---------- */
    function house(x, z, w, d, h, tex, roof) {
      mk('a-box', { position: x + ' ' + (h / 2 - 0.05) + ' ' + z, width: w, depth: d, height: h, material: flat('ville' + tex, Math.max(1, d / 9), h / 9) });
      if (roof) {
        var r = Math.max(w, d) * 0.72;
        mk('a-cone', { position: x + ' ' + (h + 1.7) + ' ' + z, 'radius-bottom': r, 'radius-top': 0, height: 3.4, 'segments-radial': 4, rotation: '0 45 0', material: flat('toit', 3, 1.5) });
      }
    }
    for (var side = -1; side <= 1; side += 2) {
      var z = -20;
      while (z > -100) {
        var d = 11 + rnd() * 5, h = 13 + rnd() * 9;
        house(side * (22 + 6.1), z - d / 2, 12, d, h, 1 + Math.floor(rnd() * 4), rnd() < 0.8);
        z -= d + 0.3;
      }
    }
    // enseigne Renaskia sur une façade de la place
    mk('a-plane', { position: '-21.8 11 -42', rotation: '0 90 0', width: 11, height: 4.47, material: 'shader: flat; src: #enseigne' });
    mk('a-light', { type: 'point', color: '#ff9a50', intensity: 0.5, position: '-15 11 -42', distance: 30 });

    /* ---------- Reste de la ville (anneau de maisons plus basses) ---------- */
    for (var i = 0; i < 46; i++) {
      var a = rnd() * Math.PI * 2, rr = 55 + rnd() * 210;
      var px = Math.cos(a) * rr, pz = Math.sin(a) * rr;
      if (Math.abs(px) < 50 && pz < 8 && pz > -150) continue;   // on garde la place dégagée
      var w = 11 + rnd() * 9, d2 = 11 + rnd() * 9, h2 = 11 + rnd() * 16;
      house(px, pz, w, d2, h2, 1 + Math.floor(rnd() * 4), true);
    }

    /* ---------- Palmiers et lampadaires ---------- */
    for (var p = 0; p < 16; p++) {
      var sx = (p % 2 ? 1 : -1), pz2 = -14 - Math.floor(p / 2) * 6.2, px2 = sx * (18.5 + rnd() * 1.5);
      mk('a-cylinder', { position: px2 + ' 4 ' + pz2, radius: 0.24, height: 8, material: 'shader: flat; color: #5a4636' });
      [0, 60, 120].forEach(function (ry) {
        mk('a-plane', { position: px2 + ' 8.6 ' + pz2, rotation: '0 ' + ry + ' 0', width: 9, height: 9, material: 'shader: flat; src: #palmier; transparent: true; alphaTest: 0.4; side: double' });
      });
    }
    for (var l = 0; l < 12; l++) {
      var lx = (l % 2 ? 1 : -1) * 14.5, lz = -12 - Math.floor(l / 2) * 8;
      mk('a-cylinder', { position: lx + ' 2.2 ' + lz, radius: 0.08, height: 4.4, material: 'shader: flat; color: #1a1a2c' });
      mk('a-sphere', { position: lx + ' 4.6 ' + lz, radius: 0.34, material: 'shader: flat; color: #ffd9a0' });
      mk('a-sphere', { position: lx + ' 4.6 ' + lz, radius: 0.9, material: 'shader: flat; color: #ffb760; transparent: true; opacity: 0.16' });
    }
  }
});
