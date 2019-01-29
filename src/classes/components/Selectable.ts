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
	public static checkClear() {
		// Clicking on empty space clears selection
		if (!InputController.mousePointingAt && InputController.click) {
			Selectable.current = null
		}
	}
	public update(): void {
		if (InputController.mousePointingAt === this.gameObject && InputController.click) {
			Selectable.current = this.gameObject
		}
	}
	protected handleEvent(event: GameEvent): void {
		return
	}
}