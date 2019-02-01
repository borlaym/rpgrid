export default abstract class GameEvent {
	abstract type: string;
	abstract toJSON(): string;
}

