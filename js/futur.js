// Monde futuriste : par défaut, un panorama photo à 360° (assets/img/sky-futur.jpg), sans aucun polygone.
// ?monde=maquette = ancienne maquette 3D, ?monde=perpignan = Perpignan. Ajouter ?monde=perpignan à l'adresse pour revoir Perpignan.
AFRAME.registerComponent('futur', {
  init: function () {
    var q = (location.search.match(/monde=(\w+)/) || [])[1];
    if (q === 'perpignan') return;
    var scene = this.el.sceneEl, root = this.el, seed = 11;
    var rnd = function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    function mk(tag, attrs, parent) {
      var e = document.createElement(tag);
      for (var k in attrs) e.setAttribute(k, attrs[k]);
      (parent || root).appendChild(e); return e;
    }
    if (q !== 'maquette') {
      var o = document.getElementById('exterieur'); if (o) o.setAttribute('visible', 'false');
      var s = document.getElementById('ciel'); if (s) s.setAttribute('src', '#ciel-futur');
      scene.setAttribute('fog', 'type: exponential; color: #1a1030; density: 0.00005');
      // Image IA photoréaliste en toile de fond incurvée, face à la fenêtre (-Z)
      return;
    }
    root.setAttribute('position', '0 -60 0');   // on est en haut d'une tour : la ville s'étend en contrebas
    var old = document.getElementById('exterieur'); if (old) old.setAttribute('visible', 'false');
    var sky = document.getElementById('ciel'); if (sky) sky.setAttribute('src', '#ciel-futur');
    scene.setAttribute('fog', 'type: exponential; color: #3a1a66; density: 0.0027');

    // sol brillant
    mk('a-plane', { src: '#sol-futur', repeat: '75 75', width: 1200, height: 1200, rotation: '-90 0 0', position: '0 -0.06 0', material: 'shader: flat; src: #sol-futur; repeat: 75 75' });
    // voies lumineuses
    [-9, 9, -24, 24].forEach(function (x, i) {
      mk('a-plane', { rotation: '-90 0 0', position: x + ' -0.04 -150', width: 0.5, height: 420, material: 'shader: flat; color: ' + (i < 2 ? '#00e5ff' : '#ff3cac') });
    });
    // tours
    var tex = ['tour1', 'tour2', 'tour3'], neon = ['#00e5ff', '#ff3cac', '#ffa63c'];
    function tower(x, z, w, d, h, k) {
      var f = 'shader: flat; src: #' + tex[k] + '; repeat: ' + Math.max(1, w / 24).toFixed(2) + ' ' + Math.max(1, h / 48).toFixed(2);
      mk('a-box', { position: x + ' ' + (h / 2) + ' ' + z, width: w, depth: d, height: h, material: f });
      mk('a-box', { position: x + ' ' + (h + 0.5) + ' ' + z, width: w + 0.4, depth: d + 0.4, height: 1, material: 'shader: flat; color: #0b0d1c' });
      if (rnd() < 0.5) mk('a-cylinder', { position: x + ' ' + (h + 9) + ' ' + z, radius: 0.25, height: 18, material: 'shader: flat; color: #ff2a2a' });
    }
    for (var i = 0; i < 160; i++) {
      var a = rnd() * Math.PI * 2, r = 130 + rnd() * 200;
      var x = Math.cos(a) * r, z = Math.sin(a) * r;
      if (Math.abs(x) < 20 && z < 15) continue;          // axe dégagé devant la fenêtre
      if (Math.abs(x) < 70 && z > -190 && z < 15) continue;
      tower(x, z, 14 + rnd() * 16, 14 + rnd() * 16, r > 260 ? 60 + rnd() * 80 : 20 + rnd() * 40, Math.floor(rnd() * 3));
    }
    // allées de tours de part et d'autre de la voie
    for (var s = -1; s <= 1; s += 2) {
      for (var zz = -20; zz > -190; zz -= 30) tower(s * (80 + rnd() * 10), zz, 18, 18, 18 + rnd() * 34, s < 0 ? 0 : 1);
    }
    // tour centrale Renaskia
    mk('a-box', { position: '0 75 -200', width: 36, depth: 36, height: 150, material: 'shader: flat; src: #tour1; repeat: 1.5 3.1' });
    mk('a-box', { position: '0 151 -200', width: 37, depth: 37, height: 2, material: 'shader: flat; color: #ff7a28' });
    mk('a-plane', { position: '0 62 -181.8', width: 32, height: 13, material: 'shader: flat; src: #enseigne' });
    mk('a-torus', { position: '0 45 -200', radius: 40, 'radius-tubular': 0.5, 'segments-tubular': 64, rotation: '90 0 0', material: 'shader: flat; color: #00e5ff' });
    mk('a-torus', { position: '0 85 -200', radius: 34, 'radius-tubular': 0.4, 'segments-tubular': 64, rotation: '90 0 0', material: 'shader: flat; color: #ff3cac' });
    // véhicules volants
    for (var v = 0; v < 18; v++) {
      var y = 14 + rnd() * 60, zv = -rnd() * 220 + 10, dir = rnd() < 0.5 ? 1 : -1, c = rnd() < 0.5 ? '#ffffff' : (rnd() < 0.5 ? '#00e5ff' : '#ff3cac');
      var e = mk('a-box', { position: (-120 * dir) + ' ' + y + ' ' + zv, width: 3.4, height: 0.7, depth: 1.2, material: 'shader: flat; color: ' + c });
      e.setAttribute('animation', 'property: position; to: ' + (120 * dir) + ' ' + y + ' ' + zv + '; dur: ' + (14000 + Math.floor(rnd() * 16000)) + '; easing: linear; loop: true');
    }
  }
});
