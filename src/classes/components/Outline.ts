import Component from '../Component';
import { MeshBasicMaterial, Mesh } from 'three';
import Transform from './Transform';
import Rendering from './Rendering';
import * as THREE from 'three';
import GameObject from '../GameObject';
import GameEvent from '../GameEvent';

const outlineMaterial = new MeshBasicMaterial( { color: 0xffffff, side: THREE.BackSide } );

export default class Outline extends Component {
	public outlineMesh: Mesh
	constructor(go: GameObject) {
		super()
		this.gameObject = go;
		const parentMesh = this.gameObject.getComponent(Rendering).meshes['default'];
		if (!(parentMesh instanceof Mesh)) {
			throw new Error('Tried to add outline to object without mesh');
		}
		this.outlineMesh = parentMesh.clone()
		this.outlineMesh.position.set(parentMesh.position.x, parentMesh.position.y, parentMesh.position.z)
		this.outlineMesh.material = outlineMaterial
		this.outlineMesh.scale.multiplyScalar(1.02);
	}

	public update(dt: number): void {
		const { position, rotation } = this.gameObject.getComponent(Transform)
		this.outlineMesh.position.set(position.x, position.y, position.z)
		this.outlineMesh.rotation.set(rotation.x, rotation.y, rotation.z)
	}
	protected handleEvent(event: GameEvent): void {
		return
	}
}