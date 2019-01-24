import GameObject from './GameObject';
import Events from './Events';
import GameEvent from './GameEvent';

export default abstract class Component {
	public _gameObject: GameObject | undefined
	constructor() {
		Events.addListener(this.handleEvent.bind(this))
	}
	public abstract update(dt: number): void
	protected abstract handleEvent(event: GameEvent): void
	public get gameObject(): GameObject {
		if (!this._gameObject) {
			throw new Error('Tried to access gameobject from component, but it was uninitialized');
		}
		return this._gameObject
	}

	public set gameObject(go: GameObject) {
		this._gameObject = go;
	}
}