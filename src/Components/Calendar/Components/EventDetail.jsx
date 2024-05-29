import deleteIcon from "../../../assets/delete-icon.png";
import updateIcon from "../../../assets/update-icon.png";

export default function EventDetail({
  color,
  eventName,
  eventTime,
  inviteeMail,
  onDeleteEvent,
  onUpdateEvent,
}) {
  function convertEventTime() {
    let timeSplit = eventTime.split(":");
    let hours = parseInt(timeSplit[0], 10);
    let minutes = timeSplit[1];
    let meridiem = hours < 12 ? "AM" : "PM";

    hours = hours > 12 ? hours - 12 : hours;
    if (hours === 0) {
      hours = 12;
    }

    return hours + ":" + minutes + " " + meridiem;
  }

  return (
    <div className="eventbox" style={{ backgroundColor: color }}>
      <div className="iconsContainer">
        <img src={updateIcon} alt="update" onClick={onUpdateEvent} />
        <img src={deleteIcon} alt="delete" onClick={onDeleteEvent} />
      </div>
      <div>{eventName}</div>
      <div>{inviteeMail}</div>
      <div>{convertEventTime()}</div>
    </div>
  );
}
