import "./CalendarDetail.css";
import EventDetail from "./EventDetail";
import { useState } from "react";
import addIcon from "../../../assets/add-icon.png";

export default function CalendarDetail({
  id,
  dateNumber,
  eventList,
  onCreateEvent,
  onDeleteEvent,
  onUpdateEvent,
}) {
  const [updateMode, setUpdateMode] = useState(false);
  const [inputEventName, setInputEventName] = useState("");
  const [inputMail, setInputMail] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isEditIndex, setIsEditIndex] = useState(-1);

  const handleInputEventName = (event) => {
    setInputEventName(event.target.value);
  };

  const handleInputMail = (event) => {
    setInputMail(event.target.value);
  };

  const handleInputTime = (event) => {
    setInputTime(event.target.value);
  };

  function createEvent() {
    if (validateEmail()) {
      let event = {
        eventName: inputEventName,
        inviteeMail: inputMail,
        eventTime: inputTime,
      };
      onCreateEvent(id, event, getColorList());
      setUpdateMode(false);
      setInputEventName("");
      setInputMail("");
      setInputTime("");
    } else alert("You have entered an invalid email address!");
  }

  function deleteEvent(eventIndex) {
    onDeleteEvent(id, eventIndex);
  }

  function getColorList() {
    let colorList = [];
    for (const eventData of eventList) {
      colorList.push(eventData.color);
    }
    return colorList;
  }

  function updateEvent(eventIndex) {
    setIsEditIndex(eventIndex);
    setUpdateMode(true);
    setInputEventName(eventList[eventIndex].eventName);
    setInputMail(eventList[eventIndex].inviteeMail);
    setInputTime(eventList[eventIndex].eventTime);
    setIsEdit(true);
  }

  function doneUpdateEvent() {
    let updatedEvent = structuredClone(eventList[isEditIndex]);
    updatedEvent.eventName = inputEventName;
    updatedEvent.inviteeMail = inputMail;
    updatedEvent.eventTime = inputTime;
    onUpdateEvent(id, isEditIndex, updatedEvent);
    setIsEditIndex(-1);
    setUpdateMode(false);
    setInputEventName("");
    setInputMail("");
    setInputTime("");
    setIsEdit(false);
  }

  function cancelInput() {
    setIsEditIndex(-1);
    setUpdateMode(false);
    setInputEventName("");
    setInputMail("");
    setInputTime("");
    setIsEdit(false);
  }

  function checkAllFieldFilled() {
    return inputEventName != "" && inputMail != "" && inputTime != "";
  }

  function validateCreate() {
    if (eventList.length == 3) alert("Events on a day cannot be more than 3!");
    else setUpdateMode(true);
  }

  function validateEmail() {
    return inputMail.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

  return (
    <td className={dateNumber != 0 ? "filledData" : ""}>
      <div className={!updateMode ? "divAll" : ""}>
        {dateNumber != 0 && (
          <>
            <div className="iconsContainer">
              <img src={addIcon} alt="create" onClick={validateCreate} />
            </div>
            <div>
              <div>{dateNumber}</div>
              <div>
                {eventList.map((eventData, index) => (
                  <EventDetail
                    key={index}
                    {...eventData}
                    onDeleteEvent={() => deleteEvent(index)}
                    onUpdateEvent={() => updateEvent(index)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      {updateMode && dateNumber != 0 && (
        <div className="inputBox">
          <div>
            <input
              type="text"
              name="inputName"
              id="inputName"
              placeholder="Input Event Name"
              value={inputEventName}
              onChange={handleInputEventName}
            />
          </div>
          <div>
            <input
              type="text"
              name="inputMail"
              id="inputMail"
              placeholder="Input Invitee"
              value={inputMail}
              onChange={handleInputMail}
            />
          </div>
          <div>
            <input
              type="time"
              name="inputTime"
              id="inputTime"
              placeholder="Input Time"
              value={inputTime}
              onChange={handleInputTime}
            />
          </div>
          <div>
            {!isEdit && (
              <button onClick={createEvent} disabled={!checkAllFieldFilled()}>
                Create Event
              </button>
            )}
            {isEdit && (
              <button
                onClick={doneUpdateEvent}
                disabled={!checkAllFieldFilled()}
              >
                Update Event
              </button>
            )}
            <button className="buttonCancel" onClick={cancelInput}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </td>
  );
}
