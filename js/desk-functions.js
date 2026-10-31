// interaction pour les tiroirs du bureau
let bureau = [];
let tiroir1 = document.querySelector('#tiroir1');
let tiroir2 = document.querySelector('#tiroir2');
let tiroir3 = document.querySelector('#tiroir3');
let tiroir4 = document.querySelector('#tiroir4');
let tiroir5 = document.querySelector('#tiroir5');
let tiroir6 = document.querySelector('#tiroir6');

let sonOuvert = document.querySelector('#tiroir-ouvert');
let sonFerme = document.querySelector('#tiroir-ferme'); 

bureau.push(tiroir1, tiroir2, tiroir3, tiroir4, tiroir5, tiroir6);

bureau.forEach(element => {

    let stateTiroir = false;

    element.addEventListener('click', function(){
        let pos = element.getAttribute('position');
        let posX = pos['x'];
        let posY = pos['y'];
        let posZ= pos['z'];

        if (stateTiroir) {    
            sonFerme.play();

            element.setAttribute('position', {

                x: posX,
                y: posY,
                z: posZ - 0.3

            })
            stateTiroir = false;

        } else {
            sonOuvert.play();
            element.setAttribute('position', {

                x: posX,
                y: posY,
                z: posZ + 0.3
    
            })
            stateTiroir = true;
        }


        


		

    })
    
});
