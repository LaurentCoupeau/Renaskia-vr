// Qualité d'image : filtrage anisotrope maximal (sols et murs nets en vue rasante)
AFRAME.registerComponent('quality', {
  init: function () {
    var scene = this.el;
    var apply = function () {
      var renderer = scene.renderer;
      if (!renderer) return;
      var max = renderer.capabilities.getMaxAnisotropy();
      scene.object3D.traverse(function (o) {
        if (o.material) {
          var mats = Array.isArray(o.material) ? o.material : [o.material];
          mats.forEach(function (m) {
            ['map', 'normalMap', 'emissiveMap'].forEach(function (k) {
              if (m[k] && m[k].anisotropy !== max) { m[k].anisotropy = max; m[k].needsUpdate = true; }
            });
          });
        }
      });
    };
    scene.addEventListener('loaded', function () { setTimeout(apply, 1200); setTimeout(apply, 5000); });
  }
});


/* Corrige les matériaux noirs d'un modèle OBJ (noms accentués mal lus dans le .mtl) */
AFRAME.registerComponent('fix-dark', {
  init: function () {
    var el = this.el;
    el.addEventListener('model-loaded', function () {
      var greens = [0x2f7d32, 0x3f8f3a, 0x2a6b2d], i = 0;
      el.object3D.traverse(function (o) {
        if (!o.isMesh) return;
        (Array.isArray(o.material) ? o.material : [o.material]).forEach(function (m) {
          if (m && m.color && (m.color.r + m.color.g + m.color.b) < 0.06) {
            m.color.setHex(i++ % 3 === 0 ? 0x5a3a24 : greens[i % 3]); m.needsUpdate = true;
          }
        });
      });
    });
  }
});
