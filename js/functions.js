let scene= document.querySelector('a-scene');

AFRAME.registerComponent('raycaster-listen', {
	init: function () {
    // Use events to figure out what raycaster is listening so we don't have to
    // hardcode the raycaster.
    this.el.addEventListener('raycaster-intersected', evt => {
      this.raycaster = evt.detail.el;
    });
    this.el.addEventListener('raycaster-intersected-cleared', evt => {
      this.raycaster = null;
    });
  },

  tick: function () {
    if (!this.raycaster) { return; }  // Not intersecting.

    let intersection = this.raycaster.components.raycaster.getIntersection(this.el);
    if (!intersection) { return; }
    console.log(intersection.point);
  }
});

// hover clickables object functions
let clickableObjects = document.querySelectorAll('.clickable');
for (let i=0; i<clickableObjects.length; i++){
  let initialColor = clickableObjects[i].getAttribute('material', 'color');
  clickableObjects[i].addEventListener('mouseenter', function(){
    clickableObjects[i].setAttribute('material', 'color', 'lime');
  });

  clickableObjects[i].addEventListener('mouseleave', function() {
    clickableObjects[i].setAttribute('material', 'color', 'aqua');
  });
}

