
AFRAME.registerComponent('day', {


    init: function () {
        let earth= document.getElementById('earth');
    },


    tick: function() {
        let date = new Date();
        let heure = date.getHours();
        let minute = date.getMinutes();
        let seconde = date.getSeconds();

        let translateTime = (( heure * 3600 ) + (minute * 60) + seconde); 
        
        earth.setAttribute('rotation', {
            x:0,
            y:0,
            z: translateTime * 0.004
        })
    }


})