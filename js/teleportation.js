AFRAME.registerComponent('tel', {

    init: function(){
        let pointsOfTeleportations = document.querySelectorAll('.teleport');
        let cam = document.querySelector('#cam-rig');
        let soundOfTeleportation = document.querySelector('#teleport');
        
        for (let i=0; i<pointsOfTeleportations.length; i++) {
        
            pointsOfTeleportations[i].addEventListener('click', function() {
                let positionCamera= cam.object3D.position;
                let position = pointsOfTeleportations[i].object3D.position;
                cam.setAttribute('position', position);
                soundOfTeleportation.volume="0.2";
                soundOfTeleportation.play();
        
            })
            pointsOfTeleportations[i].addEventListener('mouseenter', function() {
                pointsOfTeleportations[i].setAttribute('material', 'color', 'lime');
        
            })
            pointsOfTeleportations[i].addEventListener('mouseleave', function() {
                pointsOfTeleportations[i].setAttribute('material', 'color', 'aqua');
        
            })
        
        }
    }

})




AFRAME.registerComponent('clck', {


    init: function () {
        let redButton = document.querySelector('#red-button');
        let clickSound = document.querySelector('#clic');        
        redButton.addEventListener('click', function() {

            clickSound.volume="1";
            clickSound.play();
        })
        redButton.addEventListener('mouseenter', function() {
            
            redButton.setAttribute('color', 'lime');
        })
        redButton.addEventListener('mouseleave', function() {
            
            redButton.setAttribute('color', 'red');
        })
    }




})