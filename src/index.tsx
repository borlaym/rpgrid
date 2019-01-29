import * as THREE from 'three';
import GameScene from './classes/GameScene';
import GameCamera from './classes/GameCamera';
import './index.css'
import { Vector3 } from 'three';
import GameWorld from './classes/GameWorld';
import GameObject from './classes/GameObject';
import Rendering from './classes/components/Rendering';
import InputController from './classes/InputController';
import Collision from './classes/components/Collision';
import Outline from './classes/components/Outline';
import Selectable from './classes/components/Selectable';

const gameScene = new GameScene()
GameCamera.position.y = 4
GameCamera.position.z = 7
GameCamera.position.x = 2.5
GameCamera.camera.lookAt(new Vector3(2.5, 0, 2.5))

const gameWorld = new GameWorld()
gameWorld.setup()

let lastTick: number = Date.now()

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function update() {
	const now = Date.now()
	const dt = now - lastTick
	lastTick = now

	// Update colliders
	GameObject.getComponentsOfType(Collision).forEach(c => c.update(dt))

	// Update InputController
	InputController.update()

	// Update camera
	GameCamera.update(dt)

	// Update gameObjects
	gameWorld.update(dt)

	// Update meshes
	GameObject.getComponentsOfType(Rendering).forEach(c => c.update(dt))

	// Update outlines
	GameObject.getComponentsOfType(Outline).forEach(c => c.update(dt))

	// Update selects
	GameObject.getComponentsOfType(Selectable).forEach(c => c.update())
	Selectable.checkClear()

	// Reset InputController
	InputController.reset()

	// Render
	renderer.render(gameScene.scene, GameCamera.camera);
	requestAnimationFrame(update)
}

update()