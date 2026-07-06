import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function initCarModel() {
	const container = document.getElementById("car-model-container");


	// Scene, Camera, and Renderer
	const scene = new THREE.Scene();
	scene.background = null;
	// scene.background = new THREE.Color(0x000000); // Black background

	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		100
	);
	camera.position.set(0, 1, 3); // Adjust camera position for a better view

	const renderer = new THREE.WebGLRenderer({ antialias: true });
	// renderer.setSize(1280,720);
	renderer.setSize((window.innerWidth / window.innerHeight) * 600, 600);
	container.appendChild(renderer.domElement);

	// Add OrbitControls
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true; // Enable smooth damping
	controls.dampingFactor = 0.05; // Adjust damping effect
	controls.target.set(0, 0.5, 0); // Focus on the car
	controls.enableZoom = true; // Allow zooming
	controls.maxPolarAngle = Math.PI / 1.95; // Allow full vertical rotation
	controls.minPolarAngle = 0; // Allow looking up and down freely

	let resetZRotation = false;

	// // Mouse Events
	// document.addEventListener("mousedown", () => {
	// 	resetZRotation = false; // Allow interaction when mouse is pressed
	// });

	// document.addEventListener("mouseup", () => {
	// 	resetZRotation = true; // Trigger reset when mouse is released
	// });

	// Load Car Model
	const loader = new GLTFLoader();
	let car; // To store the car object

	loader.load(
		"/src/assets/bmw_m4_f82.glb", // Path to your car model
		(gltf) => {
			car = gltf.scene;
			car.scale.set(1.0, 1.0, 1.0); // Adjust car size
			car.position.set(0, 0.1, 0); // Slightly above the ground
			scene.add(car);
		},
		(xhr) => {
			// console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
		},
		(error) => {
			console.error("An error occurred loading the car model:", error);
		}
	);

	// Add Ground Plane
	const groundGeometry = new THREE.CircleGeometry(4, 64); // Larger ground size
	const groundMaterial = new THREE.MeshStandardMaterial({
		color: 0x111111,
		metalness: 1,
	});
	const ground = new THREE.Mesh(groundGeometry, groundMaterial);
	ground.rotation.x = -Math.PI / 2; // Rotate to make it flat
	ground.position.x = 0;
	ground.position.y = 0; // Position the ground
	scene.add(ground);

	// Lighting
	const light = new THREE.DirectionalLight(0xffffff, 10);
	light.position.set(0, 5, 0); // Position directly above the car
	scene.add(light);

	const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Slight ambient lighting
	scene.add(ambientLight);

	// Animate the Scene
	function animate() {
		requestAnimationFrame(animate);

		// Update OrbitControls for smooth rotation
		controls.update();

		// Reset Z rotation when mouse is released
		if (resetZRotation) {
			const rotation = controls.object.rotation;
			rotation.z = THREE.MathUtils.lerp(rotation.z, 0, 0.1); // Smoothly reset z rotation
		}

		renderer.render(scene, camera);
	}
	animate();

	// Resize Event
	window.addEventListener("resize", () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	});
}
