import GameObject from "./GameObject";
import Component from "./Component";

type ClassOf<T> = new (...args: any[]) => T

export default abstract class System {
	static create1<T extends Component>(requiredComponents: [ClassOf<T>], fn: (dt: number, components: [T]) => void): (dt: number) => void {
		return function system(dt: number) {
			GameObject.forEach((gameObject: GameObject) => {
				const t = gameObject.getComponentOptional(requiredComponents[0]);
				if (t) {
					fn(dt, [t])
				}
			})
		}
	}

	static create2<T extends Component, U extends Component>(requiredComponents: [ClassOf<T>, ClassOf<U>], fn: (dt: number, components: [T, U]) => void): (dt: number) => void {
		return function system(dt: number) {
			GameObject.forEach((gameObject: GameObject) => {
				const t = gameObject.getComponentOptional(requiredComponents[0]);
				const u = gameObject.getComponentOptional(requiredComponents[1]);
				if (t && u) {
					fn(dt, [t, u])
				}
			})
		}
	}
}