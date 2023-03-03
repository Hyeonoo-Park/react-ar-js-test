import { TestLoader } from "./TestLoader";

AFRAME.registerComponent('character', {
    init: function () {
        this.isEntityAdded = false;

        TestLoader.LoadCharacter().then(r => {
            this.animixer = new THREE.AnimationMixer(r.ani);
            this.animixer.clipAction(r.o3d.animations[0]).play();
            const obj3d = new THREE.Object3D();
            obj3d.add(r.o3d);
            this.el.setObject3D('character', obj3d);
            console.log("Character Object:", obj3d);
        });

        const el = document.querySelector("[gps-new-camera]");
        el.addEventListener("gps-camera-update-position", e => {
            if(!this.isEntityAdded) {
                this.el.setAttribute('gps-new-entity-place', {
                    latitude: e.detail.position.latitude + 0.002,
                    longitude: e.detail.position.longitude - 0.001
                });

                this.isEntityAdded = true;
                console.log('scene:', this.el.sceneEl.object3D);
            }
        });
    },

    tick: function (time, timeDelta) {
        if(this.animixer) this.animixer.update(timeDelta*0.001);
    }, 
    remove: function () {
        this.el.removeObject3D('character');
    }
});
