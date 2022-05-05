import { useEffect, useRef } from "react";
import * as THREE from "three";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'

const ViewPort = () => {

  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, 500/500, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize( 500, 500 );
    mountRef.current.appendChild( renderer.domElement );

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );

    const light = new THREE.SpotLight()
        light.position.set(10, 10, 60)
        scene.add(light)

    const material = new THREE.MeshPhongMaterial({
        color: "#d3d3d3",    // red (can also use a CSS color string here)
        flatShading: true,
      });

    const cube = new THREE.Mesh( geometry, material );
    
    const loader = new STLLoader()
        loader.load(
        '/Skeleton5.stl',
        function (geometry) {
            const mesh = new THREE.Mesh(geometry, material)
            // mesh.position(0,0,0)
            scene.add(mesh)
            const animate = function () {
                requestAnimationFrame( animate );
              //   cube.rotation.x += 0.01;
              mesh.rotation.y += 0.01;
                renderer.render( scene, camera );
              }
              animate();
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log(error)
        }
    )

    camera.position.z = 70;
    camera.lookAt(0, 0, 0);

    return () => mountRef.current.removeChild( renderer.domElement);
  }, []);

  return (
    <div ref={mountRef}/>
  );
}

export default ViewPort;