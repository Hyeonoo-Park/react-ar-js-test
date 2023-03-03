import React, { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import * as THREEx from '@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js';
import { TestLoader } from "../components/TestLoader";

function ThreeComponent()
{
  //-----------------------------------
  const animMixers = useRef([]);

  const _deviceOrientationControls = useRef(null);
  const _canvas = useRef(null);
  const _scene = useRef(null);
  const _camera = useRef(null);
  const _webcam = useRef(null);
  const _renderer = useRef(null);
  const _arjs = useRef(null);
  const _previousTimeRef = useRef();
  const _initOnce = useRef(false);

  //-----------------------------------
  function init_arjs_lbs(obj3d) {
    const canvas = _canvas.current = document.getElementById('canvas1');
    const scene = _scene.current = new THREE.Scene();
    const camera = _camera.current = new THREE.PerspectiveCamera(60, 1.33, 0.1, 10000);
    const renderer = _renderer.current = new THREE.WebGLRenderer({canvas: canvas});
    const arjs = _arjs.current = new THREEx.LocationBased(scene, camera);

    _deviceOrientationControls.current = new THREEx.DeviceOrientationControls(camera);
    _webcam.current = new THREEx.WebcamRenderer(renderer);
   
    _scene.current.add(new THREE.AmbientLight(0x404040));
    _scene.current.add(new THREE.DirectionalLight(0xa0a0a0, 0.5));

    arjs.add(obj3d, -0.7202, 51.0501);
    arjs.fakeGps(-0.72, 51.05);
  }
  //-----------------------------------
  function update_arjs_lbs(currentTime) {
    const canvas = _canvas.current;
    const renderer = _renderer.current;
    const camera = _camera.current;
    const webcam = _webcam.current;

    if(canvas.width != canvas.clientWidth || canvas.height != canvas.clientHeight) {
      console.log('canvas client:', canvas.clientWidth, canvas.clientHeight, 'wh:', canvas.width, canvas.height);
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
      const aspect = canvas.clientWidth/canvas.clientHeight;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      console.log('reset render aspect:', aspect);
    }
    _deviceOrientationControls.current.update();
    webcam.update();
    renderer.render(_scene.current, camera);
    const deltaTime = 0.001 * (currentTime - _previousTimeRef.current);
    _previousTimeRef.current = currentTime;
    animMixers.current.forEach(element => { ; element.update(deltaTime); });
    requestAnimationFrame(update_arjs_lbs);
  }

  //-----------------------------------
  useEffect(() => {
    if(false === _initOnce.current) {
      _initOnce.current = true;
      TestLoader.LoadCharacter().then(r => {
        const animixer = new THREE.AnimationMixer(r.ani);
        animixer.clipAction(r.ani.animations[0]).play();
        animMixers.current.push(animixer);
        console.log('results', r);
        //r.o3d.scale.setScalar(0.01);
        init_arjs_lbs(r.o3d);
        update_arjs_lbs();
      });
      console.log('scene', _scene.current);
    }
  }, []);
  return ( <></>);
}

//-----------------------------------------------------------------------------

function TestThree() {

  return (
    <canvas id='canvas1' className='webcam'>
      <ThreeComponent />
    </canvas>
  )
}

export default TestThree;