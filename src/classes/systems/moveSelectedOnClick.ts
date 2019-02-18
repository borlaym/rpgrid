import System from "../System";
import Transform from "../components/Transform";
import InputController from "../InputController";
import Selectable from "../components/Selectable";

export default System.create1<Transform>([Transform], (dt: number, components: [Transform]) => {
	const [transform] = components
	if (InputController.mousePointingAt === transform.gameObject && InputController.click && Selectable.current !== null) {
		const position = transform.position;
		Selectable.current.transform.position.x = position.x
		Selectable.current.transform.position.z = position.z
	}
});