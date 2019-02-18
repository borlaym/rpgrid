import System from "../System";
import Outline from "../components/Outline";
import Selectable from "../components/Selectable";
import InputController from "../InputController";

export default System.create1<Outline>([Outline], (dt: number, components: [Outline]) => {
	const [outline] = components
	if (InputController.mousePointingAt === outline.gameObject || Selectable.current === outline.gameObject) {
		outline.outlineMesh.visible = true
	} else {
		outline.outlineMesh.visible = false
	}

})