import System from "../System";
import InputController from "../InputController";
import Rendering from "../components/Rendering";

/**
 * Morphs an object into another on hover, if it has a mesh tagged as 'hover' in its Rendering component
 */
export default System.create1<Rendering>([Rendering], (dt: number, components: [Rendering]) => {
	const [rendering] = components
	const gameObject = rendering.gameObject
	const { hover, ...otherMeshes } = rendering.meshes
	if (InputController.mousePointingAt === gameObject && hover) {
		Object.values(otherMeshes).forEach(mesh => { mesh.visible = false })
		hover.visible = true
		
	} else if (hover) {
		Object.values(otherMeshes).forEach(mesh => { mesh.visible = false })
		hover.visible = false
		otherMeshes['default'].visible = true
	} else {
		Object.values(otherMeshes).forEach(mesh => { mesh.visible = false })
		otherMeshes['default'].visible = true
	}
});