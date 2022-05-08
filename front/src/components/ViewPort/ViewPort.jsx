import { useEffect, useRef } from "react";
import * as THREE from "three";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const ViewPort = () => {

  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( "#141517" )
    const camera = new THREE.PerspectiveCamera( 20, 500/500, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const controls = new OrbitControls( camera, renderer.domElement );

    renderer.setSize( 700, 700 );
    mountRef.current.appendChild( renderer.domElement );

    const light2 = new THREE.DirectionalLight( 0xffffff );
        light2.position.set( 1, 1, 1 );
        scene.add( light2 );

    const light3 = new THREE.DirectionalLight( 0xffffff );
        light3.position.set( -1, -1, -1 );
        scene.add( light3 );

    const light4 = new THREE.AmbientLight( 0x222222 );
        scene.add( light4 );

    const material = new THREE.MeshPhongMaterial({
        color: "#a6a6a6",    // red (can also use a CSS color string here)
        flatShading: true,
      });

    const loader = new STLLoader()
        loader.load(
        '/Full test.stl',
        function (geometry) {
            const mesh = new THREE.Mesh(geometry, material)

            scene.add(mesh)
            mesh.geometry.center();

            const animate = function () {
                requestAnimationFrame( animate );
                mesh.rotation.x = - Math.PI / 2;
                mesh.rotation.z += 0.01;
                renderer.render( scene, camera );
              }

            animate();
        }
    )

    console.log(loader)

    camera.position.z = 350;
    return () => mountRef?.current?.removeChild( renderer.domElement);
  }, []);

  return (
    <div ref={mountRef}/>
  );
}

export default ViewPort;
