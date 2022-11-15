import Calendar from './component/Calendar';
import './App.css';

import { useState,useEffect } from 'react';
import { NewEventModal } from './component/NewEventModal';

function App() {

	const initialState = JSON.parse(localStorage.getItem("events")) || []
	const [events, setEvents] = useState(initialState);
	const [clicked,setClicked] = useState()

	useEffect(() => {
        localStorage.setItem("events", JSON.stringify(events))
    },[events])

	const eventForDate = date => events.find((e) => e.date === date)

	const addEvent = (date, color) => {
		const text = window.prompt('text');
		setEvents((prev) => [
			...prev,
			{ date, title: text, color, id: Math.random() },
		]);
	};

	const onDragEvents = (updatedEvents) => {
		setEvents(updatedEvents);
	};

	return (
		<div className="App">
			<Calendar
				onDragEvents={onDragEvents}
				startingDate={new Date()}
				eventsArr={events}
				addEvent={addEvent}
			/>
		
		</div>
	);
}

export default App;
