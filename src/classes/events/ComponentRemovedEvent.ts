import GameEvent from '../GameEvent';
import Component from '../Component';

export default class ComponentRemovedEvent extends GameEvent {
	type = 'ComponentRemovedEvent';
	constructor(
		public readonly component: Component
	) {
		super()
	}

	toJSON() {
		return ''
	}
}