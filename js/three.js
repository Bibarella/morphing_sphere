import * as THREE from "https://cdn.skypack.dev/three@0.133.1";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls.js";
import openSimplexNoise from 'https://cdn.skypack.dev/open-simplex-noise';

//Scene
let scene = new THREE.Scene();
//Camera
let camera = new THREE.PerspectiveCamera( 75, innerWidth / innerHight, 0.1, 1000);
camera.position.set(1.5, -0.5, 6);
//Renderer
let renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setSize(innerWidth, innerHeight);
//Append our renderer to the webpage. Basically, this appends the 'canvas' to our webpage.
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

//Creates geometry
let sphereGeometry = new THREE.SphereGeometry(1.5, 100, 100);
//Accessing the geometry vertices and their locations
sphereGeometry.positionData = [];
let v3 = new THREE.Vector3();
for (let i=0; i < sphereGeometry.attributes.position.count; i++){
    v3.fromBufferAttribute(sphereGeometry.attributes.position, i);
    sphereGeometry.positionData.push(v3.clone());
}

//A material uses the coordinates of of an object to calculate its color
let sphereMesh = new THREE.ShaderMaterial({
    uniforms: {
        colorA: {type: 'vec3', value: new THREE.Vector3(0.5, 0.5, 0.5)},

    },
    vertexShader: document.getElementById('vertex').textContent,
    fragmentShader: document.getElementById('fragment').textContent,
});
//Combine both, and add it to the scene
let sphere = new THREE.Mesh(sphereGeometry, sphereMesh);
scene.add(sphere);

//Manipulating Sphere's Geometry
let noise = openSimplexNoise.makeNoise4D(Date.now());
let clock = new THREE.Clock();

renderer.setAnimationLoop(() => {
    //Get the time
    let t = clock.getElapsedTime();
        sphereGeometry.positionData.forEach((p, idx) => {
            //Create noise for each point in the sphere
            let setNoise = noise(p.x, p.y, p.z, t * 1.05);
            //Using the Vector3 function, copy the point data, and multiply it by the noise
            //multiplying noise by the position at each verticle
            v3.copy(p).addScaledVector(p. setNoise);
            //Update of the positions
            sphereGeometry.attributes.position.setXYZ(idx, v3.x, v3.y, v3.z);
        })
    sphereGeometry.computeVertexNormals();
    sphereGeometry.attributes.position.needsUpdate = true;
    //Render the sphere onto the page again
  renderer.render(scene, camera);
});