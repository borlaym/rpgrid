import Component from '../Component';
import GameEvent from '../GameEvent';
import InputController from '../InputController';
import GameObject from '../GameObject';

/**
 * Note: game object needs a collider component for it to be selectable
 * How do I enforce that?
 */
export default class Selectable extends Component {
	public static current: GameObject | null = null
	public update(): void {
		if (InputController.mousePointingAt === this.gameObject && InputController.click) {
			Selectable.current = this.gameObject
		}
	}
	protected handleEvent(event: GameEvent): void {
		return
	}
}