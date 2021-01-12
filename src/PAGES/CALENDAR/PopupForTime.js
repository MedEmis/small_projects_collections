import React, { useState } from 'react'



export const PopUpforTime = ({ getData, close }) => {
	// DRAGABBLE POPUP
	const [error, setError] = useState()
	const formFandler = (e) => {
		e.preventDefault();
		if (e.target[1].value !== '') {
			getData(e.target[0].value, e.target[1].value)
			close()
		} else {
			setError("no empty event!")
		}
	}
	const formReset = () => setError(prev => null)
	const dragModal = (e) => {
		const element = e.target.offsetParent
		element.onmousedown = function (event) {
			let shiftX = event.clientX - element.offsetLeft;
			let shiftY = event.clientY - element.offsetTop;
			e.target.offsetParent.offsetParent.appendChild(element);
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
		<div className="calendar__popup" id="card_id" >
			<div className="calendar__popup_drag" onMouseDown={dragModal} />
			<form
				onSubmit={(e) => { formFandler(e) }} className="calendar__popup_form"
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
					<button className="calendar__popup_buttons__button" type="reset" onClick={close} >Close</button>
				</div>
			</form>
		</div>
	)
}