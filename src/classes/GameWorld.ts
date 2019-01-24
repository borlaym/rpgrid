import GameObject from './GameObject';
import Tile from './blueprints/Tile';
import Pawn from './blueprints/Pawn';

export default class GameWorld {
	private readonly gameObjects: GameObject[] = []
	public addObject(gameObject: GameObject) {
		this.gameObjects.push(gameObject)
	}

	public setup() {
		for (let row = 0; row < 5; row++) {
			for (let col = 0; col < 5; col++) {
				this.addObject(new Tile(row, col))
			}
		}

		this.addObject(new Pawn(1, 3))
	}

	public update(dt: number) {
		this.gameObjects.forEach(o => o.update(dt))
	}
}