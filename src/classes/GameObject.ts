import * as uuid from 'uuid'
import Component from './Component';
import Transform from './components/Transform';
import GameEvent from './GameEvent';
import Events from './Events';
import ComponentAddedEvent from './events/ComponentAddedEvent';
import { LineSegments } from 'three';
import ComponentRemovedEvent from './events/ComponentRemovedEvent';

export default class GameObject {
	public static getById<T extends GameObject>(uuid: string): GameObject | null {
		return GameObject.instances[uuid] || null
	}

	public static getObjectsOfType<T extends GameObject>(objectClass: new (...args: any[]) => T): T[] {
		const retVal: T[] = []
		Object.keys(GameObject.instances).forEach((uuid: string) => {
			const instance = GameObject.instances[uuid]
			if (instance instanceof objectClass) {
				retVal.push(instance)
			}
		})
		return retVal
	}

	public static getObjectsWithComponent<T extends Component>(componentClass: new (...args: any[]) => T): GameObject[] {
		const retVal: GameObject[] = []
		Object.keys(GameObject.instances).forEach((uuid: string) => {
			const instance = GameObject.instances[uuid]
			if (instance.components.find(c => c instanceof componentClass)) {
				retVal.push(instance)
			}
		})
		return retVal
	}

	public static getComponentsOfType<T extends Component>(componentClass: new (...args: any[]) => T): T[] {
		const retVal: T[] = []
		Object.keys(GameObject.instances).forEach((uuid: string) => {
			const gameObject = GameObject.instances[uuid]
			gameObject.components.forEach(component => {
				if (component instanceof componentClass) {
					retVal.push(component)
				}
			})
		})
		return retVal
	}

	public static forEach(fn: (gameObject: GameObject) => void) {
		Object.keys(GameObject.instances).forEach((uuid: string) => fn(GameObject.instances[uuid]))
	}

	private static instances: { [uuid: string]: GameObject } = {}

	public readonly uuid: string
	private components: Component[] = []

	constructor() {
		this.uuid = uuid.v4()
		GameObject.instances[this.uuid] = this
		this.addComponent(new Transform())
		Events.addListener(this.handleEvent.bind(this))
	}

	public getComponent<T extends Component>(componentClass: new (...args: any[]) => T): T {
		const component = this.getComponentOptional<T>(componentClass)
		if (!component) {
			throw new Error('Cant find component')
		}
		return component
	}

	public getComponentOptional<T extends Component>(componentClass: new (...args: any[]) => T): T | null {
		const component = this.components.find((component: Component) => component instanceof componentClass)
		if (!component || !(component instanceof componentClass)) {
			return null
		}
		return component
	}

	public addComponent(component: Component): void {
		this.components.push(component)
		component.gameObject = this
		Events.emit(new ComponentAddedEvent(component))
	}

	public removeComponent<T extends Component>(componentClass: new (...args: any[]) => T) {
		const component = this.getComponent(componentClass)
		this.components = this.components.filter(component => !(component instanceof componentClass));
		if (component) {
			Events.emit(new ComponentRemovedEvent(component))
		}
	}

	public update(dt: number) {
		return
	}

	public get transform(): Transform {
		return this.getComponent(Transform)
	}

	protected handleEvent(event: GameEvent): void {
		return
	}

}