import React, { useRef, useState } from 'react';
import { MONTHS } from './const';
import {
	CalendarBody,
	CalendarHead,
	HeadDay,
	SevenColGrid,
	StyledDay,
	StyledEvent,
	Wrapper,
} from './styles';
import {
	areDatesTheSame,
	getDateObj,
	getDaysInMonth,
	getRandomDarkColor,
	getSortedDays,
	range,
} from './ulties';

export default function Calendar({
	startingDate,
	eventsArr,
	addEvent,
	onDragEvents,
}) {
	const [currentMonth, setCurrentMonth] = useState(startingDate.getMonth());
	const [currentYear, setCurrentYear] = useState(startingDate.getFullYear());

	const DAYSINAMONTH = getDaysInMonth(currentMonth, currentYear);

	const draggedElDateRef = useRef();
	const draggedElIdRef = useRef();

	const onDragStart = (id) => {
		draggedElIdRef.current = id;
	};

	const onDragEnter = (e, date) => {
		e.preventDefault();
		draggedElDateRef.current = date;
	};

	const onDragEnd = (e) => {
		e.preventDefault();

		const updatedEvents = eventsArr.map((event) => {
			if (event.id === draggedElIdRef.current) {
				event.date = draggedElDateRef.current;
			}
			return event;
		});
		onDragEvents(updatedEvents);
	};

	const nextMonth = () => {
		if (currentMonth < 11) {
			setCurrentMonth((prev) => prev + 1);
		} else {
			setCurrentMonth(0);
			setCurrentYear((prev) => prev + 1);
		}
	};

	const prevMonth = () => {
		if (currentMonth > 0) {
			setCurrentMonth((prev) => prev - 1);
		} else {
			setCurrentMonth(11);
			setCurrentYear((prev) => prev - 1);
		}
	};

	const onAddEvent = (date, e) => {
		if (e.currentTarget === e.target) {
			addEvent(date, getRandomDarkColor());
		}
	};

	return (
		<Wrapper>
			<CalendarHead>
				<i onClick={prevMonth} className="fa fa-arrow-left"></i>
				<p>
					{MONTHS[currentMonth]} {currentYear}
				</p>
				<i onClick={nextMonth} className="fa fa-arrow-right"></i>
			</CalendarHead>
			<SevenColGrid>
				{getSortedDays(currentMonth, currentYear).map((day) => (
					<HeadDay>{day}</HeadDay>
				))}
			</SevenColGrid>
			<CalendarBody fourCol={DAYSINAMONTH === 28}>
				{range(DAYSINAMONTH).map((day) => (
					<StyledDay
						onDragEnter={(e) =>
							onDragEnter(e, getDateObj(day, currentMonth, currentYear))
						}
						onDragEnd={onDragEnd}
						onClick={(e) =>
							onAddEvent(getDateObj(day, currentMonth, currentYear), e)
						}
						active={areDatesTheSame(
							new Date(),
							getDateObj(day, currentMonth, currentYear),
						)}
					>
						<p> {day}</p>
						{eventsArr.map(
							(ev) =>
								areDatesTheSame(
									getDateObj(day, currentMonth, currentYear),
									new Date(ev.date),
								) && (
									<StyledEvent
										draggable
										onDragStart={() => onDragStart(ev.id)}
										bgColor={ev?.color}
									>
										{ev.title}
									</StyledEvent>
								),
						)}
					</StyledDay>
				))}
			</CalendarBody>
		</Wrapper>
	);
}
