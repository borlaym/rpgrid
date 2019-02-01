import Component from '../Component';
import { Object3D } from 'three';
import Transform from './Transform';
import GameEvent from '../GameEvent';

export default class Rendering extends Component {
	constructor(
		public readonly mesh: Object3D
	) {
		super()
	}

	public update(dt: number): void {
		const { position, rotation } = this.gameObject.getComponent(Transform)
		this.mesh.position.set(position.x, position.y, position.z)
		this.mesh.rotation.set(rotation.x, rotation.y, rotation.z)
	}

	protected handleEvent(event: GameEvent): void {
		return
	}
}