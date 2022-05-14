import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ViewPort = () => {
    const mountRef = useRef(null);

    const model = useSelector((store) => store.model);
    const stlPath = model['PreviewModels.previewModelLink'];
    const [count, setCount] = useState(null)
    const [buffer, setBuffer] = useState(null)
    console.log('start========>',buffer)
    //console.log("model======>", model)

    // let geometry;

    const getLoadedStl = async () => {
        const res = await axios({
            method: 'post',
            url: 'http://localhost:4000/items/stl',
            data: { stlPath },
            responseType: 'arraybuffer',
        });
        const loadedStl = res.data;

        console.log('fromBack=====>',loadedStl)
        setBuffer(loadedStl)
        setCount(1)
        // return renderer.domElement;
    };

    
    if (buffer === null) {
      getLoadedStl()
    }
    useEffect(() => {
      
      if (buffer !== null ) {
        
        console.log("!!!!!!!!!!!!!!!!")
      const scene = new THREE.Scene();
        scene.background = new THREE.Color('#141517');
        const camera = new THREE.PerspectiveCamera(20, 500 / 500, 0.1, 1000);

        let renderer = new THREE.WebGLRenderer({ antialias: true });
        const controls = new OrbitControls(camera, renderer.domElement);
        
        renderer.setSize(700, 700);
        mountRef.current.appendChild(renderer.domElement);

        const light2 = new THREE.DirectionalLight(0xffffff);
        light2.position.set(1, 1, 1);
        scene.add(light2);

        const light3 = new THREE.DirectionalLight(0xffffff);
        light3.position.set(-1, -1, -1);
        scene.add(light3);

        const light4 = new THREE.AmbientLight(0x222222);
        scene.add(light4);

        const geometry = new STLLoader().parse(buffer);
        const material = new THREE.MeshPhongMaterial({
            color: '#a6a6a6', // red (can also use a CSS color string here)
            flatShading: true,
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        mesh.geometry.center();

        const animate = function () {
            requestAnimationFrame(animate);
            mesh.rotation.x = -Math.PI / 2;
            mesh.rotation.z += 0.01;
            renderer.render(scene, camera);
        };

        animate();
        
        camera.position.z = 350;
        // getLoadedStl();
        // return () => mountRef?.current?.removeChild(x);
        // console.log(mountRef);
        // console.log(mountRef.current.children);
        // console.log(renderer.domElement);
        // return () => mountRef?.current?.removeChild(x);
        // buffer 
        
        console.log('final',buffer)
        return () => {
          //setBuffer(null)
          setBuffer(null)
          //mountRef?.current?.removeChild(renderer.domElement)
          console.log("willUnmount=====>", buffer)
        }

      }

    }, [count, model.id]);

    

    return <div ref={mountRef} />;
};


export default ViewPort;








const light2 = new THREE.DirectionalLight(0xffffff);
light2.position.set(1, 1, 1);
scene.add(light2);

const light3 = new THREE.DirectionalLight(0xffffff);
light3.position.set(-1, -1, -1);
scene.add(light3);

const light4 = new THREE.AmbientLight(0x222222);
scene.add(light4);

