import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal, Button, Label, TextInput, Textarea } from "flowbite-react";
import Nav from "../../Navbar/Navbar";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
    allDay: true,
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const isProfessor = user?.role === "professor";

  // Sample academic events
  useEffect(() => {
    setEvents([
      {
        title: "Fall Semester Start",
        start: "2024-08-26",
        allDay: true,
        color: "#4F46E5",
      },
      {
        title: "Midterm Week",
        start: "2024-10-14",
        end: "2024-10-18",
        color: "#DC2626",
      },
      {
        title: "Spring Break",
        start: "2024-03-11",
        end: "2024-03-15",
        color: "#059669",
      },
      // Add more events as needed
    ]);
  }, []);

  const handleDateClick = (arg) => {
    if (isProfessor) {
      setSelectedDate(arg.date);
      setNewEvent({
        ...newEvent,
        start: arg.dateStr,
        end: arg.dateStr,
      });
      setShowModal(true);
    }
  };

  const handleEventAdd = () => {
    if (newEvent.title) {
      setEvents([
        ...events,
        {
          ...newEvent,
          color: "#4F46E5",
        },
      ]);
      setShowModal(false);
      setNewEvent({
        title: "",
        description: "",
        start: "",
        end: "",
        allDay: true,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Nav />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          <h1 className="text-3xl font-bold text-white mb-6">
            Academic Calendar
          </h1>

          <div className="calendar-container bg-white rounded-lg p-4">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              events={events}
              dateClick={handleDateClick}
              height="auto"
              themeSystem="standard"
              dayMaxEvents={true}
              weekends={true}
              selectable={isProfessor}
              editable={isProfessor}
            />
          </div>

          {/* Event Add Modal */}
          <Modal show={showModal} onClose={() => setShowModal(false)}>
            <Modal.Header>Add Academic Event</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="title" value="Event Title" />
                  <TextInput
                    id="title"
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description" value="Description" />
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, description: e.target.value })
                    }
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="start" value="Start Date" />
                  <TextInput
                    id="start"
                    type="date"
                    value={newEvent.start}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, start: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="end" value="End Date" />
                  <TextInput
                    id="end"
                    type="date"
                    value={newEvent.end}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, end: e.target.value })
                    }
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleEventAdd}>Add Event</Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
