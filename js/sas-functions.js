// gestion du sas piece principale
AFRAME.registerComponent('open-sas', {

	init: function () {

        // positions initiales
        let yState = -1;
        let zState = 0;
        // état du sas
        let stateSas = true;
        // compteur de position
        let zCount = 0;
        // on instancie les parties visuelle du sas 
        let sas = document.querySelector('#sas');
        let controlSas = document.getElementById('control-sas');

        // fonction d'ouverture ou de fermeture de porte
        function moveDoor(ySens, yValueFinal, zValueInit, zValueFinal){
            // systeme virtuel de balancier
            let count = 0;
            // toutes les 60 milisecondes
            let myInterval = setInterval(() => {
                // si les conditions sont remplies, on lance la repetition
                if ( count < 200 ) {
                    // on modifie les valeurs de positions
                    yState = yState + ySens;
                    zState = zValueInit;
                    // la balancier virtuel commence à bouger
                    count += 1;
                    // MAJ position du sas
                    sas.setAttribute('position', {
                        x: 0,
                        y:yState,
                        z:zState
                    });
                // sinon
                } else {
                    // on stoppe la repetition
                    clearInterval(myInterval);
                    // MAJ position finale de la porte du sas
                    sas.setAttribute('position', {
                        x: 0,
                        y:yValueFinal,
                        z:zValueFinal
                    });
                }
            },0.4);  
        }               

            // on écoute les panneaux de controle du sas
            controlSas.addEventListener('click', function() {
                // si le sas opérationnel
                if (stateSas === true) { 
                    // le sas change d'état
                    stateSas = false;
                    if (zCount == 20) {
                        // la porte descend
                        moveDoor(-0.02,-1, -0.02, 0);
                        // le sas change d'état
                        stateSas = true;
                        zCount=0;
                    // si la porte est fermée
                    } else if ( zCount == 0) {
                        // le sas change d'état
                        stateSas = false;
                        // la porte monte
                        moveDoor(0.02,1, -0.02, -0.02);    
                        // le sas change d'état
                        stateSas = true;
                        zCount=20;
                    // sinon
                    }    
                     
                } else {            
                    console.log('Arrêtes, tu vas tout casser !!!');      
                }  
            });
               
    }
})


// gestion du sas couloir
AFRAME.registerComponent('open-sas-couloir', {

	init: function () {

        // positions initiales
        let xDoorState = 0;
        // état du sas
        let stateSas = true;
        // compteur de position
        let zCount = 0;
        // on instancie les parties visuelle du sas 
        let door = document.querySelector('#door-room');
        let controlSas = document.getElementById('control-sas-couloir');

        // fonction d'ouverture ou de fermeture de porte
        function moveDoor(xSens){
            // systeme virtuel de balancier
            let count = 0;
            // toutes les 60 milisecondes
            let myInterval = setInterval(() => {
                // si les conditions sont remplies
                if ( count < 300 ) {
                    // on modifie les valeurs de positions                    
                    xDoorState = xDoorState + xSens;
                    // la balancier virtuel commence à bouger
                    count += 1;
                    // MAJ position du sas
                    door.setAttribute('position', {
                        x: xDoorState,
                        y: 1,
                        z: 0.025
                    });
                // sinon
                } else {
                    // on stoppe la repetition
                    clearInterval(myInterval);
                    // MAJ position finale de la porte du sas
                    door.setAttribute('position', {
                        x: xDoorState,
                        y: 1,
                        z: 0.025
                    });
                }
            },0.4);  
        }               

            // on écoute les panneaux de controle du sas
            controlSas.addEventListener('click', function() {
                // si le sas opérationnel
                if (stateSas === true) { 
                    // le sas change d'état
                    stateSas = false;
                    if (zCount == 23) {
                        // la porte bouge
                        moveDoor(0.01);
                        // le sas change d'état
                        stateSas = true;
                        zCount=0;
                    // si la porte est fermée
                    } else if ( zCount == 0) {
                        // le sas change d'état
                        stateSas = false;
                        // la porte bouge
                        moveDoor(-0.01);    
                        // le sas change d'état
                        stateSas = true;
                        zCount=23;
                    // sinon
                    }                     
                } else {            
                    console.log('Arrêtes, tu vas tout casser !!!');      
                }  
            });
               
    }
})


