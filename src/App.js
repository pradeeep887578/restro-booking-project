import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2021, 6, 0),
    end: new Date(2021, 6, 0),
  },
  {
    title: "Vacation",
    start: new Date(2021, 6, 7),
    end: new Date(2021, 6, 10),
  },
  {
    title: "Conference",
    start: new Date(2021, 6, 20),
    end: new Date(2021, 6, 23),
  },
];

function App() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [print, setPrint] = useState(false);
  const [error, setError] = useState(false);
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    if (newEvent.start < new Date()) {
      setError(true);
    } else {
      setAllEvents([...allEvents, newEvent]);
    }

    if (newEvent.title === "" || newEvent.start === "" || newEvent.end === "") {
      setPrint(true);
      setError(false);
    }

    setNewEvent({ title: "", start: "", end: "" });
  }

  return (
    <div className="App">
      <h1>Restaurent</h1>
      {print ? (
        <h2 style={{ color: "green" }}>all the fields are neccessay</h2>
      ) : (
        <h2>Add calendar</h2>
      )}
      {error ? (
        <h2 style={{ color: "red" }}>Booking date cannot be in reverse</h2>
      ) : null}
      <div>
        <input
          type="text"
          placeholder="Add Name"
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          style={{ width: "20%", marginRight: "10px" }}
          value={newEvent.title}
        />
        <DatePicker
          placeholderText="Start Date"
          style={{ marginRight: "10px" }}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
          selected={newEvent.start}
        />
        <DatePicker
          onChange={(end) => setNewEvent({ ...newEvent, end })}
          placeholderText="End Date"
          selected={newEvent.end}
        />
        <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
          Book now
        </button>
      </div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
}

export default App;
