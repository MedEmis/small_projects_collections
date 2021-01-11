import React, { useState } from 'react'



export const PopUpforTime = () => {
	// DRAGABBLE POPUP
	const [error, setError] = useState()
	const formFandler = (e) => {
		e.preventDefault();
		if (e.target[1].value !== '') {
			console.log(e.target[0].value)
			console.log(e.target[1].value)
		} else {
			setError("no empty event!")
			console.log(error)
		}
	}
	const formReset = () => setError(prev => null)
	const dragModal = (e) => {
		const element = e.target.offsetParent
		element.onmousedown = function (event) {
			let shiftX = event.clientX - element.getBoundingClientRect().left;
			let shiftY = event.clientY - element.getBoundingClientRect().top;
			document.body.append(element);
			moveAt(event.pageX, event.pageY);
			// taking initial shifts into account
			function moveAt(pageX, pageY) {
				element.style.left = pageX - shiftX + 'px';
				element.style.top = pageY - shiftY + 'px';
			}
			function onMouseMove(event) {
				moveAt(event.pageX, event.pageY);
			}
			document.addEventListener('mousemove', onMouseMove);
			element.onmouseup = function () {
				document.removeEventListener('mousemove', onMouseMove);
				element.onmouseup = null;
			};
		};
		element.ondragstart = function () {
			return false;
		};

	}

	return (
		<div className="calendar__popup">
			<div className="calendar__popup_drag"
				onMouseDownCapture={(e) => dragModal(e)}
				// onMouseOver={(e) => dragModal(e)}
			/>
			<form
				onSubmit={(e) => formFandler(e)} className="calendar__popup_form"
				onReset={(e) => formReset(e)}
			>
				<div style={{ userSelect: "none" }} >Please set the event time and description for it</div>
				{error && <span className="error-span">{error}</span>}
				<div className="calendar__popup_inputs">
					<input className="calendar__popup_inputs__input" name="eventTime" type="time" placeholder="event time" />
					<textarea className="calendar__popup_inputs__input" name="eventText" type="text" placeholder="event text" />
				</div>
				<div className="calendar__popup_buttons">
					<button className="calendar__popup_buttons__button" type="submit">Submit</button>
					<button className="calendar__popup_buttons__button" type="reset">Reset</button>
					<button className="calendar__popup_buttons__button" type="reset">Close</button>
				</div>
			</form>
		</div>
	)
}