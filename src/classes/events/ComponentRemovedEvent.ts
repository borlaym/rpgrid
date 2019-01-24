import GameEvent from '../GameEvent';
import Component from '../Component';

export default class ComponentRemovedEvent extends GameEvent {
	constructor(
		public readonly component: Component
	) {
		super()
	}
}