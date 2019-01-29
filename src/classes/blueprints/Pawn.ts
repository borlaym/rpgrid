import GameObject from '../GameObject';
import Rendering from '../components/Rendering';
import { PlaneGeometry, Mesh, MeshBasicMaterial, BufferGeometry, Geometry, Vector3, LineBasicMaterial, LineSegments, Line, DoubleSide, BoxGeometry, MeshLambertMaterial } from 'three';
import Collision from '../components/Collision';
import * as THREE from 'three';
import InputController from '../InputController';
import Transform from '../components/Transform';
import Outline from '../components/Outline';
import Selectable from '../components/Selectable';

const pawnGeometry = new BoxGeometry(1, 1, 2);
const pawnMaterial = new MeshLambertMaterial({ color: 0x0ffff00, side: DoubleSide });
const hitBoxMaterial = new THREE.MeshBasicMaterial({ visible: false })

export default class Pawn extends GameObject {
	private mesh = new Mesh(pawnGeometry, pawnMaterial)
	constructor(
		public readonly row: number,
		public readonly col: number
	) {
		super()
		this.addComponent(new Rendering(this.mesh))
		this.addComponent(new Collision(new Mesh(pawnGeometry, hitBoxMaterial)))
		this.addComponent(new Outline(this))
		this.addComponent(new Selectable())
		this.transform.position.x = row
		this.transform.position.z = col
		this.transform.position.y = 1
		this.transform.rotation.x = -Math.PI / 2
	}

	public update() {
		const outline = this.getComponent(Outline);
		if (InputController.mousePointingAt === this) {
			outline.outlineMesh.visible = true
		} else {
			outline.outlineMesh.visible = false
		}
	}
}