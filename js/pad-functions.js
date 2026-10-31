let pads = document.getElementsByClassName('pad');
//les bruitages
let soundPad = document.createElement('audio');
soundPad.src='assets/sounds/sound-pad.mp3';
//les pads tactiles
let tactilPad = document.getElementById('tactil-pad');
// ecran de la surface de controle
let screenPad = document.createElement('a-image');
let stateVisibility = false;
//mise en forme de l'ecran de la surface de controle
screenPad.setAttribute('geometry', {
    width:2.56,
    height:1.48
})
screenPad.setAttribute('position', {
    x: 0,y:0.5,z:-1
})
screenPad.setAttribute('material', {
    visible: false
})
screenPad.setAttribute('rotation', {
    x:-30,y:0,z:0
})

tactilPad.append(screenPad);

function showScreen(el) {

    let visibility = 0;
    el.setAttribute('opacity', 0);

    let time = setInterval(() => {

        if (el.getAttribute('opacity') <1) {

            el.setAttribute('opacity', visibility );
            visibility += 0.02;
        } else {
            clearInterval(time);
            el.setAttribute('opacity', 1 );
            stateVisibility = true;
        }        
    }, 10);
}

// ecouteur d'évènement
for (let i=0; i<pads.length; i++) {
    
    pads[i].addEventListener ('click', function() {
        soundPad.volume="0.3";
        soundPad.play();

        switch (i) {

            case 0: 
                screenPad.setAttribute('material', 'visible', 'true')
                screenPad.setAttribute('material' , 'src', 'assets/img/fiches/presentation.png');
                showScreen(screenPad);
                break;
            case 1:
                screenPad.setAttribute('material', 'visible', 'true')
                screenPad.setAttribute('material' , 'src', 'assets/img/fiches/engagements.png');
                showScreen(screenPad);
                break;
            case 2:
                screenPad.setAttribute('material', 'visible', 'true')
                screenPad.setAttribute('material' , 'src', 'assets/img/fiches/formations.png');
                showScreen(screenPad);
                break;
            case 3:
                screenPad.setAttribute('material', 'visible', 'true')
                screenPad.setAttribute('material' , 'src', 'assets/img/fiches/prestations.png');
                showScreen(screenPad);
                break;
            case 4:
                screenPad.setAttribute('material', 'visible', 'true')
                screenPad.setAttribute('material' , 'src', 'assets/img/fiches/partenaires.png');
                showScreen(screenPad);
                break;
            case 5:
                screenPad.setAttribute('material', 'visible', 'true')
                screenPad.setAttribute('material' , 'src', 'assets/img/fiches/infos.png');
                showScreen(screenPad);
                break;

        }
    })
}