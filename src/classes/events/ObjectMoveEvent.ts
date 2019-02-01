import GameEvent from '../GameEvent';
import GameObject from '../GameObject';

export interface SerializedObjectMoveEvent {
	type: 'ObjectMoveEvent',
	component: string
}

export default class ObjectMoveEvent extends GameEvent {
	type = 'ObjectMoveEvent';
	constructor(
		public readonly gameObject: GameObject
	) {
		super()
	}

	toJSON(): SerializedObjectMoveEvent {
		return {
			type: 'ObjectMoveEvent',
			component: this.gameObject.uuid
		}
	}

	static parse(data: SerializedObjectMoveEvent) {
		const go = GameObject.getById(data.component);
		if (!go) {
			throw new Error('Unable to find game object with id')
		}
		return new ObjectMoveEvent(go)
	}
}