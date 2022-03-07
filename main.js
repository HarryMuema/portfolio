//import './style.css'
import * as THREE from './assets/three-js/build/three.module.js'

import { GLTFLoader } from './assets/three-js/examples/jsm/loaders/GLTFLoader.js'

import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js'

let root
const canvas = document.querySelector('.webgl')

const loader = new GLTFLoader()
    // Load a glTF resource
loader.load(
    // resource URL
    'assets/scene.gltf',
    // called when the resource is loaded
    function(gltf) {
        root = gltf.scene
        root.scale.set(5, 1, 5)
        scene.add(gltf.scene);

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

    },
    // called while loading is progressing
    function(xhr) {

        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    // called when loading has errors
    function(error) {

        console.log('An error happened');

    }
);

//create constants for scene, camera and a renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })



//camera.rotation.y=45/180*Math.PI
//camera.position.set(0,60,100)
scene.add(camera)
camera.position.set(0, 100, 40);
camera.up.set(0, 0, -1);
camera.lookAt(0, 0, 0);


//set a renderer size
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
    //renderer.outputEncoding = true
    //document.body.appendChild(renderer.domElement)



//add a light to the scene
// const toplight = new THREE.DirectionalLight(0xffffff, 100)
// toplight.position.set(0, 10, 1000)
// toplight.castShadow = true
// scene.add(toplight)

const light0 = new THREE.AmbientLight(0xffffff, 0)
scene.add(light0)

const light1 = new THREE.PointLight(0xc4c4c4, 10)
light1.position.set(100000, 2000, 5000)
scene.add(light1)

const light2 = new THREE.PointLight(0xc4c4c4, 10)
light2.position.set(-100000, 6000, 3000)
scene.add(light2)

const light3 = new THREE.PointLight(0xc4c4c4, 10)
light3.position.set(-100000, 6000, -3000)
scene.add(light3)

const light4 = new THREE.PointLight(0xc4c4c4, 10)
light4.position.set(100000, 2000, -5000)
scene.add(light4)

//add orbit controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.minPolarAngle = ((Math.PI / 2) / 1.5)
controls.maxPolarAngle = ((Math.PI / 2) * 1.33)
controls.minAzimuthAngle = -((Math.PI / 2) / 1.5) / 4
controls.maxAzimuthAngle = ((Math.PI / 2) / 1.5) / 4
controls.enableDamping = true
controls.dampingFactor = 0.01
controls.enablePan = false
controls.enableZoom = false

function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)


}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener('resize', onWindowResize, false)


animate()