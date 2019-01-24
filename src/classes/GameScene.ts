import { Scene } from 'three';
import Events from './Events';
import ComponentAddedEvent from './events/ComponentAddedEvent';
import Component from './Component';
import Rendering from './components/Rendering';
import Collision from './components/Collision';
import Outline from './components/Outline';
import ComponentRemovedEvent from './events/ComponentRemovedEvent';

export default class GameScene {
	public readonly scene = new Scene()
	constructor() {
		Events.addListener((event) => {
			switch (event.constructor) {
				case ComponentAddedEvent: {
					const component: Component = (event as ComponentAddedEvent).component
					switch (component.constructor) {
						case Rendering:
							this.scene.add((component as Rendering).mesh)
							break;
						case Collision:
							this.scene.add((component as Collision).collider)
							break;
						case Outline:
							this.scene.add((component as Outline).outlineMesh)
							break;
					}
					break;
				}
				case ComponentRemovedEvent: {
					const component: Component = (event as ComponentRemovedEvent).component
					switch (component.constructor) {
						case Rendering:
							this.scene.remove((component as Rendering).mesh)
							break;
						case Collision:
							this.scene.remove((component as Collision).collider)
							break;
						case Outline:
							this.scene.remove((component as Outline).outlineMesh)
							break;
					}
					break;
				}
			}
		})
	}
}