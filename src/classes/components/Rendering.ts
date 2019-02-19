import Component from '../Component';
import { Object3D } from 'three';
import Transform from './Transform';
import GameEvent from '../GameEvent';

export default class Rendering extends Component {
	public readonly meshes: { [tag: string]: Object3D }
	constructor(
		meshes: Object3D | { [tag: string]: Object3D }
	) {
		super()
		if (meshes instanceof Object3D) {
			this.meshes = {
				default: meshes
			}
		} else {
			this.meshes = meshes
		}
	}

	public update(dt: number): void {
		const { position, rotation } = this.gameObject.getComponent(Transform)
		Object.values(this.meshes).forEach(mesh => {
			mesh.position.set(position.x, position.y, position.z)
			mesh.rotation.set(rotation.x, rotation.y, rotation.z)
		})
	}

	protected handleEvent(event: GameEvent): void {
		return
	}
}