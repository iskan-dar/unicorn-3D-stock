import { useEffect, useRef } from "react";
import * as THREE from "three";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'

const ViewPort = () => {

  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( "#ffffff" )
    const camera = new THREE.PerspectiveCamera( 75, 500/500, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize( 500, 500 );
    mountRef.current.appendChild( renderer.domElement );

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );

    const light = new THREE.SpotLight()
        light.position.set(10, 10, 50)
        scene.add(light)

    const material = new THREE.MeshPhongMaterial({
        color: "#d3d3d3",    // red (can also use a CSS color string here)
        flatShading: true,
      });

    // const cube = new THREE.Mesh( geometry, material );
    
    const loader = new STLLoader()
        loader.load(
        '/Sentinel.stl',
        function (geometry) {
            const mesh = new THREE.Mesh(geometry, material)
            // const position = new THREE.Vector3();
            // position.x = 1
            // position.y = 1
            // position.z = 1
            // console.log("=====>",position)
            // console.log(mesh.computeBoundingBox())
            // mesh.position.set(0,0,0)
            
            scene.add(mesh)
            mesh.updateMatrixWorld(true);

            mesh.geometry.computeBoundingBox();

            var boundingBox = mesh.geometry.boundingBox;
            
            var position = new THREE.Vector3();
            position.subVectors( boundingBox.max, boundingBox.min );
            position.multiplyScalar( 0.5 );
            position.add( boundingBox.min );
            
            position.applyMatrix4( mesh.matrixWorld );
            
            console.log(position.x + ',' + position.y + ',' + position.z);

            mesh.position.set(-position.x, -position.y, -position.y)

            // camera.position.x(position.x)

            // camera.lookAt(position);


            const animate = function () {
                requestAnimationFrame( animate );
              //   cube.rotation.x += 0.01;
              mesh.rotation.y += 0.01;
                renderer.render( scene, camera );
              }

            animate();
        }
    )

    
    camera.position.z = 150;
    // camera.lookAt(SCENE.position);

    return () => mountRef.current.removeChild( renderer.domElement);
  }, []);

  return (
    <div ref={mountRef}/>
  );
}

export default ViewPort;