import GameObject from '../GameObject';
import Rendering from '../components/Rendering';
import { PlaneGeometry, Mesh, MeshBasicMaterial } from 'three';
import Collision from '../components/Collision';
import * as THREE from 'three';
import InputController from '../InputController';
import Transform from '../components/Transform';
import Outline from '../components/Outline';

const tileGeometry = new PlaneGeometry(1, 1);
const tileMaterial = new MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
const highlightedMaterial = new MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });

export default class Tile extends GameObject {
	constructor(
		public readonly row: number,
		public readonly col: number
	) {
		super()
		const mesh = new Mesh(tileGeometry, tileMaterial)
		this.addComponent(new Rendering(mesh))
		this.addComponent(new Collision(mesh))
		this.addComponent(new Outline(this))
		this.transform.position.x = row
		this.transform.position.z = col
		this.transform.rotation.x = -Math.PI / 2
	}

	public update() {
		const mesh = this.getComponent(Rendering).mesh as Mesh
		if (InputController.mousePointingAt === this) {
			mesh.material = highlightedMaterial
			if (InputController.click) {
				console.log(this.getComponent(Transform).position)
			}
		} else {
			mesh.material = tileMaterial
		}
	}
}