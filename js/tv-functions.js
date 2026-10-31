// TV RENASKIA
AFRAME.registerComponent('play-pause', {
	init: function () {
    let buttonTv = document.querySelector('#buttonTv');
    let pub = document.getElementById('video1');
    let stateTv = false;
    buttonTv.setAttribute('material', 'src', 'assets/icones/play.png');
    buttonTv.addEventListener('click', function() {
      if (stateTv == false){
        buttonTv.setAttribute('material', 'src', 'assets/icones/pause.png');     
        pub.volume='0.4';   
        pub.play();
        document.getElementById('idle1').setAttribute('visible', false);
        stateTv = true;
      } else {        
        let curent = pub.currentTime;
        buttonTv.setAttribute('material', 'src', 'assets/icones/play.png');
        pub.currentTime=curent;
        pub.pause();
        stateTv = false;
      } 
    });
	}
});

// TV ROOM
AFRAME.registerComponent('play-room', {
	init: function () {
    let buttonTvRoom = document.querySelector('#buttonTvRoom');
    let pubRenaskia = document.getElementById('video2');
    let stateTv = false;
    buttonTvRoom.setAttribute('material', 'src', 'assets/icones/play.png');

    buttonTvRoom.addEventListener('click', function() {
      if (stateTv == false){
        buttonTvRoom.setAttribute('material', 'src', 'assets/icones/pause.png');      
        pubRenaskia.volume='0.4';  
        pubRenaskia.play();
        document.getElementById('idle2').setAttribute('visible', false);
        stateTv = true;
      } else {        
        let curent = pubRenaskia.currentTime;
        buttonTvRoom.setAttribute('material', 'src', 'assets/icones/play.png');
        pubRenaskia.currentTime=curent;
        pubRenaskia.pause();
        stateTv = false;
      } 
    });
	}
});