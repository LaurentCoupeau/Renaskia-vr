

// declanchement de starwars
AFRAME.registerComponent('starwars', {

	init: function () {
        
        let button = document.getElementById('button-starwars');
        let trajectory = document.getElementById('ship-trajectory');
        let gun = document.getElementById('gunShipOne');
        let posInit = -200;
        let posFinal = 400;
        let speed = 0.5;
        let stateWars = true;
        let ships = document.querySelectorAll('ship');

        function shipsPositioning() {

            trajectory.setAttribute('position', {
                x:trajectory.object3D.position.x,
                y:trajectory.object3D.position.y,
                z: posInit

            })

        }

        function shipsMove() {
            // si stateWars est true
            if (stateWars){                  
                // toutes les 6 milisecondes
                let time = setInterval(() => {
                    // si la position z de l'entité trajectory est inférieure à 400
                    if (trajectory.object3D.position.z < posFinal) {
                        // stateWars devient false
                        stateWars = false;
                        // l'entité bouge sur l'axe z
                        trajectory.setAttribute('position', {
                            x:trajectory.object3D.position.x,
                            y:trajectory.object3D.position.y,
                            z:trajectory.object3D.position.z + speed
                        })
                        for (let i=0;i<ships.length; i++){
                            ships[i].components.sound.playSound();
                        }
                    } else {
                        // on enleve l'interval
                        clearInterval(time);
                        // on repositionne les vaisseaux
                        shipsPositioning();
                        // stateWars redevient true
                        stateWars = true;
                    }            
                }, 6);
            }                    
        }

        function shot() {
            // toutes les 120 milisecondes
            let time = setInterval(() => {
                // si stateWars est false
                if (! stateWars) {
                    // si la salve est vide
                    if (gun.childNodes.length <= 18) {

                        //on instancie un tir (cylindre)
                        let shot = document.createElement('a-cylinder');
                        shot.name = 'tir';
                        // setting des parametres du tir
                        shot.setAttribute('geometry', { height:0.5, radius: 0.09 });
                        shot.setAttribute('position', { x: 0, y: 0, z: 0 })
                        shot.setAttribute('segmentsRadial', 6 )
                        shot.setAttribute('emissive', 'red');
                        shot.setAttribute('emissive-intensity', 1);
                        shot.className='shot';
                        //on ajoute le tir à l'arme
                        gun.append(shot);
                        // I think I heard a shot...     
                        gun.components.sound.playSound();    
                        // le tir part en direction de l'ennemi
                        moveShot(shot);
                    // s'il y a eu 20 tirs
                    } else {
                        // pour chacun des tir de la salve
                        for (let i=0;i<gun.childNodes.length; i++) {
                            // on retire la douille de l'arme
                            removeShots()
                        }
                    }            
                } else {
                    clearInterval(time);
                }    
            }, 120);
        }
        
        //faire bouger les projectiles
        function moveShot(el) {

            setInterval(() => { 

                    el.object3D.position.y += 2;
            
            }, 200); 
        }

        //supprimer les projectiles
        function removeShots() {
            let shots = document.querySelectorAll('.shot');

            for (let i=0;i<shots.length;i++) {
                gun.removeChild(shots[i]);
            }
        }
     
        button.addEventListener('click', function() {

            if (stateWars) {
                shipsMove();
                shot()

            } else {
                console.log('attend!')
            }
	    })
}
})