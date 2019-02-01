import GameEvent from '../GameEvent';
import Component from '../Component';

export default class ComponentAddedEvent extends GameEvent {
	type = 'ComponentAddedEvent';
	constructor(
		public readonly component: Component
	) {
		super()
	}
}