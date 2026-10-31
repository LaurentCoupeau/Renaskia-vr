let gun = document.getElementById('gunShipOne');
let ship = document.querySelector('.ship');
let victimShip = document.getElementById('ship-victime');
// I think I heard a shot !!!
let orbit = document.querySelector('#orbit');

let salve=[];


let posXInit = 0;
let posYInit = 0;
let posZInit = 0;


let xDir = 0;
let yDir = 0.06;
let zDir = 0;

let count=0;


// fonction pour faire avancer les vaisseau
function moveShip (el) {
    setInterval(() => {
            el.object3D.rotation.y += 0.01;
    }, 12);
}

function escape(el) {
    setInterval(() => {
        el.object3D.position.y += yDir;

        if (el.object3D.position.y >= 3){
            yDir = -0.06;
        } else if (el.object3D.position.y <= -2) {
            yDir = 0.06;
        }
    }, 6);
}

//appuyer pour faire feu
function Shoot(){

    setInterval(() => {    
        
        //on instancie un tir (cylindre)
        let shot = document.createElement('a-cylinder');
        // taille du tir
        shot.setAttribute('geometry', {
            height:0.5,
            radius: 0.09
        });
        // position du tir
        shot.setAttribute('position', {
            x: posXInit,
            y: posYInit,
            z: posZInit
        })
        // couleur du tir
        shot.setAttribute('emissive', 'red');
        shot.setAttribute('emissive-intensity', 1);
        //les lasers sortent du gun
        gun.append(shot);
        // bruit du son        
        gun.components.sound.playSound();
        //les lasers bougent
        moveShot(shot);
        // soundFire.play(); 
        
        setTimeout(() => {
            shot.parentNode.removeChild(shot);
            
        }, 1000);

    }, 400);
  
}


//faire bouger les projectiles
function moveShot(el) {
    setInterval(() => { el.object3D.position.y += 0.5; }, 30); 
}


function update() {    
    moveShip(orbit);
    escape(victimShip);
    Shoot();    
}

if (scene.hasLoaded) {
    update();

} else {
    scene.addEventListener('loaded', update);
}