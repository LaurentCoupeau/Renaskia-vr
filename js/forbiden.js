    // ALERTE LENART !!!!

    AFRAME.registerComponent('foo', {
        init: function () {
            let panel = document.getElementById('panels');
            let borders = document.getElementById('borders');
            let speed = 0.05;
            
            setInterval(() => {
            
                let rotPanel = panel.getAttribute('rotation');
                let rotBorders = borders.getAttribute('rotation');
                panel.setAttribute('position', {
                    x:0,
                    y:0,
                    z:0.3
                })
                borders.setAttribute('position', {
                    x:0,
                    y:0,
                    z:0.3
                })
                
                panel.setAttribute('rotation', {
                    x:0,
                    y:rotPanel['y'] - speed,
                    z:0
                })
                borders.setAttribute('rotation', {
                    x:0,
                    y:rotBorders['y'] + speed,
                    z:0
                })
                
            }, 6);
        }
      });
