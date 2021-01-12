import React from 'react'
import "./calendarViev.scss"
var _ = require('lodash');

const Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const Months = [
	{
		name: "January",
		short: "Jan",
		number: "01",
		days: 31
	},
	{
		name: "February",
		short: "Feb",
		number: "02",
		days: 28
	},
	{
		name: "March",
		short: "Mar",
		number: "03",
		days: 31
	},
	{
		name: "April",
		short: "Apr",
		number: "04",
		days: 30
	},
	{
		name: "May",
		short: "May",
		number: "05",
		days: 31
	},
	{
		name: "June",
		short: "Jun",
		number: "06",
		days: 30
	},
	{
		name: "July",
		short: "Jul",
		number: "07",
		days: 31
	},
	{
		name: "August",
		short: "Aug",
		number: "08",
		days: 31
	},
	{
		name: "September",
		short: "Sep",
		number: "9",
		days: 30
	},
	{
		name: "October",
		short: "Oct",
		number: "10",
		days: 31
	},
	{
		name: "November",
		short: "Nov",
		number: "11",
		days: 30
	},
	{
		name: "December",
		short: "Dec",
		number: "12",
		days: 31
	}
];

export class CalendarView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedDate: this.props.defaultDate ? new Date(this.props.defaultDate) : new Date(),
			currentView: new Date(),
			events: this.props.events ? this.props.events : []

		};
		this.eventIndex = {}
		this.updateEventIndex = this.updateEventIndex.bind(this)
		this.renderDays = this.renderDays.bind(this);
	}
	updateEventIndex() {
		this.eventIndex = {}
		this.eventDateIndex = {}
		this.state.events.forEach(x => {
			let splits = x.date.split("-").map(x => parseInt(x))
			//////////////////////////////////console.log(splits)
			this.eventIndex["E" + splits[0]] = this.eventIndex["E" + splits[0]] ? this.eventIndex["E" + splits[0]] : {}
			this.eventIndex["E" + splits[0]]["E" + splits[1]] = this.eventIndex["E" + splits[0]]["E" + splits[1]] ? this.eventIndex["E" + splits[0]]["E" + splits[1]] : []
			this.eventIndex["E" + splits[0]]["E" + splits[1]].push(x)

			this.eventDateIndex["E" + splits[0]] = this.eventDateIndex["E" + splits[0]] ? this.eventDateIndex["E" + splits[0]] : {}
			this.eventDateIndex["E" + splits[0]]["E" + splits[1]] = this.eventDateIndex["E" + splits[0]]["E" + splits[1]] ? this.eventDateIndex["E" + splits[0]]["E" + splits[1]] : []
			this.eventDateIndex["E" + splits[0]]["E" + splits[1]].push(x.date)
		})
		//////////////////////////////console.log("eventIndex", this.eventIndex)
	}
	componentDidMount() {
		this.updateEventIndex()
		this.props.getDataTime(this.state.selectedDate.toLocaleDateString())
	}
	renderDays() {
		let currentMonth = parseInt(this.state.currentView.getMonth())
		let currentMonthInfo = Months[currentMonth];
		let prevMonthInfo = Months[currentMonth - 1 < 0 ? Months.length - 1 : currentMonth - 1]
		let nextMonthInfo = Months[currentMonth + 1 > Months.length - 1 ? 0 : currentMonth + 1]
		let currentYear = this.state.currentView.getFullYear();
		let prevMonthYear = currentYear
		let nextMonthYear = currentYear
		const total = 42

		if (currentMonthInfo.name == "February") {
			currentMonthInfo.days = (new Date(currentYear + "-" + "Feb-29").getMonth() == 2 ? false : true) | currentMonthInfo.days
		}
		else if (prevMonthInfo.name == "February") {
			prevMonthInfo.days = (new Date(currentYear + "-" + "Feb-29").getMonth() == 2 ? false : true) | prevMonthInfo.days
		}
		else if (nextMonthInfo.name == "February") {
			nextMonthInfo.days = (new Date(currentYear + "-" + "Feb-29").getMonth() == 2 ? false : true) | nextMonthInfo.days
		}

		if (currentMonthInfo.name == "January") {
			prevMonthYear = currentYear - 1
		}
		if (currentMonthInfo.name == "December") {
			nextMonthYear = currentYear + 1
		}

		let tempday = new Date(currentYear + "-" + currentMonthInfo.name + "-01").getDay()
		/////////////////////////////console.log("days", tempday)
		let requiredprev = (7) - (7 - tempday);
		let requirednext = 42 - (requiredprev + currentMonthInfo.days);
		/////////////////////////////console.log(requiredprev, requirednext)

		let prevdays = requiredprev > 0 ? Array(requiredprev).fill({}).map((x, key) => {
			x = {}
			let day = prevMonthInfo.days - key
			x.day = day
			x.monthType = "prev"
			x.year = prevMonthYear;
			let dateString = (day < 10 ? "0" + day : day) + "-" + prevMonthInfo.name + "-" + prevMonthYear
			x.dateString = dateString
			let date = new Date(dateString)
			x.date = date
			x.dayName = Days[date.getDay()]
			return x;
		}) : [];
		prevdays.reverse()
		let nextdays = requirednext > 0 ? Array(requirednext).fill({}).map((x, key) => {
			x = {}
			let day = 1 + key
			x.day = day
			x.monthType = "next"
			x.year = nextMonthYear;
			let dateString = (day < 10 ? "0" + day : day) + "-" + nextMonthInfo.name + "-" + nextMonthYear
			x.dateString = dateString
			let date = new Date(dateString)
			x.date = date
			x.dayName = Days[date.getDay()]
			return x;
		}) : [];

		let calendar = []
		calendar.push(...prevdays)
		let days = Array(currentMonthInfo.days).fill({}).map((x, key) => {
			x = {}
			let day = 1 + key
			x.day = day
			x.monthType = "current"
			x.year = currentYear;
			let dateString = (day < 10 ? "0" + day : day) + "-" + currentMonthInfo.name + "-" + currentYear
			x.dateString = dateString
			let date = new Date(dateString)
			x.date = date
			x.dayName = Days[date.getDay()]
			return x;
		})
		/////////////////////////////console.log(currentMonthInfo.days, days)
		calendar.push(...days)
		calendar.push(...nextdays)
		let result = _.chunk(calendar, 7)
		result = result.filter(x => {
			return x.length == 7
		})
		let selectedDate = this.state.selectedDate.toLocaleDateString()

		/////////////////////////////console.log(this.eventIndex)

		return result.map((x, key) => {
			return <tr key={key}>{x.map((y, key) => {
				let event = false;
				let classList = "calendar-day calendar-month-" + y.monthType

				if (y.dayName == "Sun") {
					classList += " calendar-holiday-" + y.monthType
				}
				if (selectedDate == y.date.toLocaleDateString()) {
					classList += " calendar-selected-date"
				}
				if (this.eventDateIndex) {
					let year = y.date.getFullYear()
					if (this.eventDateIndex["E" + year]) {
						let month = y.date.getMonth() + 1;
						if (this.eventDateIndex["E" + year]["E" + month]) {
							if (this.eventDateIndex["E" + year]["E" + month] && this.eventDateIndex["E" + year]["E" + month].includes(y.dateString)) {
								event = true
							}
						}
					}
				}
				return <td key={key} align="center" className={classList} onClick={() => {
					let sd = new Date(y.dateString);
					/////////////////////////////console.log(y)
					this.setState({ selectedDate: y.date }, () => {
						if (this.props.getDataTime) {
							this.props.getDataTime(y.date.toLocaleDateString())
						}
					})
				}}>
					<div>
						{event ? <div className="day"><div className="event-round">{y.day}</div></div> : <div className="day">{y.day}</div>}
					</div>
				</td>
			})}</tr>
		})
	}

	render() {
		let date = "";
		let month = "";
		let year = ""
		let selectedDate = ""
		try {
			date = this.state.selectedDate
				.toISOString()
				.substr(0, 10)
				.split("-")
				.reverse()
				.join("-");
			month = Months[this.state.currentView.getMonth()].name
			year = this.state.currentView.getFullYear()
			selectedDate = this.state.selectedDate.toLocaleDateString("en-gb")
			selectedDate = selectedDate.split("/").join("-")
			/////////////////////////////console.log("selectedDate", selectedDate)
		} catch (e) { console.log(e); }
		return (
			<div className="cks-calendar">
				<div className="calendar-toolbar">
					<table>
						<tr>
							<td width="100" align="left">
								<h5>{month} <small style={{ fontSize: "5px", verticalAlign: "middle" }}>&#9899;</small> {year}</h5>
							</td>
							<td width="100" align="right">
								<div className="button-group">
									<input type="text" disabled value={selectedDate} style={{ width: "35%" }} ></input>
									<button className="btn px-2" onClick={() => {
										this.setState(prev => {
											prev.currentView.setMonth(prev.currentView.getMonth() - 1)
											return prev;
										})
									}}><i className="button-group_button">{"<MONTH"}</i></button>
									<button className="button-group_button btn today " onClick={() => {
										this.setState({ currentView: new Date(), selectedDate: new Date() })
										this.props.getDataTime(this.state.selectedDate)
									}}><i className="button-group_button">TODAY</i></button>
									<button className="btn px-2" onClick={() => {
										this.setState(prev => {
											prev.currentView.setMonth(prev.currentView.getMonth() + 1)
											return prev;
										})
									}}><i className="button-group_button">{"MONTH>"}</i></button></div>
							</td>
						</tr>
					</table>
				</div>
				<table className="calendar-table">
					<tr className="calendar-days-tr">
						{Days.map((x, key) => (
							<td className="calendar-days-td" key={key} align="center">
								<div width="500">{x}</div></td>
						))}
					</tr>
					{this.renderDays()}
				</table>
				<div className="row mt-3" style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }} >
					<div className="col-sm-3">
						<div className="calendar-selected-date" />
						<h5 style={{ fontSize: "14px", color: "#212121" }}>Selected Date</h5>
					</div>
					<div className="col-sm-3">
						<div className="calendar-holiday-current" />
						<h5 style={{ fontSize: "14px", color: "#212121" }}>Holiday</h5>
					</div>
					<div className="col-sm-3 day">
						<div style={{ height: "35px", width: "35px", borderRadius: "17px", backgroundColor: "#4285f4", lineHeight: "35px", color: "#fff" }}><center>#</center></div>
						<h5 style={{ fontSize: "14px", color: "#212121" }}>Event Dot</h5>
					</div>
				</div>
			</div>
		);
	}
}

/* demo code */

Date.prototype.addDays = function (days) {
	this.setDate(this.getDate() + parseInt(days));
	return this;
}
let eventDate = new Date()
eventDate.addDays(5);
eventDate = eventDate.toISOString().substr(0, 10)
/////////////////////////////console.log(eventDate)
/*  */

