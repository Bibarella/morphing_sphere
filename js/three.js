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
