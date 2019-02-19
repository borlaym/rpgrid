import GameObject from '../GameObject';
import Rendering from '../components/Rendering';
import { PlaneGeometry, Mesh, MeshBasicMaterial, BufferGeometry, Geometry, Vector3, LineBasicMaterial, LineSegments, Line } from 'three';
import Collision from '../components/Collision';
import * as THREE from 'three';
import InputController from '../InputController';
import Transform from '../components/Transform';
import Selectable from '../components/Selectable';
import Events from '../Events';
import ObjectMoveEvent from '../events/ObjectMoveEvent';

const tileGeometry = new PlaneGeometry(1, 1);
const tileMaterial = new LineBasicMaterial({ color: 0x00ff00 });
const tileOutline = new Geometry();
tileOutline.vertices.push(new Vector3(-0.5, 0.5, 0))
tileOutline.vertices.push(new Vector3(0.5, 0.5, 0))
tileOutline.vertices.push(new Vector3(0.5, -0.5, 0))
tileOutline.vertices.push(new Vector3(-0.5, -0.5, 0))
tileOutline.vertices.push(new Vector3(-0.5, 0.5, 0))
const highlightedMaterial = new MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const hitBoxMaterial = new THREE.MeshBasicMaterial({ visible: false })

export default class Tile extends GameObject {
	private outline = new Line(tileOutline, tileMaterial)
	private mesh = new Mesh(tileGeometry, highlightedMaterial)
	constructor(
		public readonly row: number,
		public readonly col: number
	) {
		super()
		this.addComponent(new Rendering({
			default: this.outline,
			hover: this.mesh
		}))
		this.addComponent(new Collision(new Mesh(tileGeometry, hitBoxMaterial)))
		this.transform.position.x = row
		this.transform.position.z = col
		this.transform.rotation.x = -Math.PI / 2
	}
}