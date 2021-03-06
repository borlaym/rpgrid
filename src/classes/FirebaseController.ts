import Firebase from 'firebase';
import GameEvent from './GameEvent';
import Events from './Events';
import ObjectMoveEvent, { SerializedObjectMoveEvent } from './events/ObjectMoveEvent';

Firebase.initializeApp({
	apiKey: "AIzaSyAv5o-yIyYekaqQJPJ3PqNVbR2k5EzzID4",
	authDomain: "rpgrid-4b639.firebaseapp.com",
	databaseURL: "https://rpgrid-4b639.firebaseio.com",
	projectId: "rpgrid-4b639",
	storageBucket: "",
	messagingSenderId: "679119560825"
});

const database = Firebase.database();
const eventsRef = database.ref('/events')

function addEvent(event: GameEvent) {
	switch (event.type) {
		case 'ObjectMoveEvent':
			console.log(JSON.stringify(event))
			eventsRef.push(JSON.stringify(event))
			break;
		default:
			return
	}
}
Events.addListener(addEvent);

function parseEvent(eventJSON: { type: string }): GameEvent | void {
	switch(eventJSON.type) {
		case 'ObjectMoveEvent':
			return ObjectMoveEvent.parse((eventJSON as SerializedObjectMoveEvent))
	}
}

eventsRef.on('value', eventJSON => {
	if (eventJSON) {
		const event = parseEvent(eventJSON.val())
		if (event) {
			Events.emit(event);
		}
	}
});