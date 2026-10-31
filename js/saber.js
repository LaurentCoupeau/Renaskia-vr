
let stateSaber = false;
let stateLaser = false;

AFRAME.registerComponent('open-saber', {


	init: function () {

        let button = document.getElementById('button-saber');
        let laser = document.getElementById('laserOfSaber');
        let sabOn = document.getElementById('sabon');
        let sabOff = document.getElementById('saboff');

        let laserHeight = 0;
        let speedHeight = 0.03
        let laserPos = 0;
        let speedPos = 0.015;
        let laserOpacity = 0;
        let speedOpacity = 0.02;
        let count=0;


        button.addEventListener('click', function() {

                if (stateSaber) {

                        sabOff.play();

                        let timing =  setInterval(() => {

                                if (stateLaser) {
                                        laser.setAttribute('geometry', 'height', laserHeight -= speedHeight);
                                        laser.setAttribute('material', 'opacity', laserOpacity -= speedOpacity);
                                        laser.setAttribute('position', {
                                                x:0,
                                                y:laserPos-=speedPos,
                                                z:0
                                        });
                                        count -= 1;

                                        if (count == 0) {
                                                stateLaser = false;
                                        }

                                } else {
                                        stateLaser = false;
                                        laserHeight = 0;
                                        laserPos = 0;
                                        laserOpacity = 0;
                                        laser.setAttribute('geometry', 'height', laserHeight);
                                        laser.setAttribute('material', 'opacity', laserOpacity);
                                        laser.setAttribute('position', {
                                                x:0,
                                                y:laserPos,
                                                z:0
                                        });
                                        clearInterval(timing);
                                }
                        }, 0.6); 

                        stateSaber = false;
                        
                } else {

                        sabOn.play();
                        let timing =  setInterval(() => {

                                if (stateLaser == false) {
                                        laser.setAttribute('geometry', 'height', laserHeight += speedHeight);
                                        laser.setAttribute('material', 'opacity', laserOpacity += speedOpacity);
                                        laser.setAttribute('position', {
                                                x:0,
                                                y: laserPos+=speedPos,
                                                z:0
                                        });
                                        count += 1;

                                        if (count == 20) {
                                                stateLaser = true;
                                                laserHeight = 0.6;
                                                laserPos = 0.3;
                                                laserOpacity = 1;
                                        }
                                } else {

                                        stateLaser = true;
                                        laser.setAttribute('geometry', 'height', laserHeight);
                                        laser.setAttribute('material', 'opacity', laserOpacity);
                                        laser.setAttribute('position', {
                                                x:0,
                                                y:laserPos,
                                                z:0
                                        });
                                        clearInterval(timing);
                                }
                        }, 0.6);   
                        stateSaber = true;

                }

        })


    }

})