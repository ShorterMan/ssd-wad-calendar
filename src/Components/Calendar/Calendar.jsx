import CalendarDetail from "./Components/CalendarDetail";
import { useState, useEffect } from "react";
import { ColorData } from "./ColorData";
import "./Calendar.css";

export default function Calendar({ date }) {
  let calendarDataStorage = JSON.parse(
    localStorage.getItem("calendarDataState")
  );
  if (!calendarDataStorage) {
    calendarDataStorage = [];
  }
  const [calendarDataState, setCalendarDataState] =
    useState(calendarDataStorage);

  function setLocalStorageCalendarData() {
    useEffect(() => {
      localStorage.setItem(
        "calendarDataState",
        JSON.stringify(calendarDataState)
      );
    }, [calendarDataState]);
  }

  function createEvent(key, event, colorList) {
    let keyArr = String(key).split(" ");
    if (calendarDataState[keyArr[0]][keyArr[1]].eventList.length < 3) {
      let randomColorNum = Math.floor(Math.random() * 10);
      if (colorList.length > 0)
        while (colorList.includes(ColorData[randomColorNum])) {
          randomColorNum = Math.floor(Math.random() * 10);
        }
      event.color = ColorData[randomColorNum];
      let tempArr = [];
      tempArr = tempArr.concat(calendarDataState);
      tempArr[keyArr[0]][keyArr[1]].eventList.push(event);
      setCalendarDataState(tempArr);
    }
  }

  function deleteEvent(key, eventIndex) {
    let keyArr = String(key).split(" ");
    let tempArr = [];
    tempArr = tempArr.concat(calendarDataState);
    tempArr[keyArr[0]][keyArr[1]].eventList.splice(eventIndex, 1);
    setCalendarDataState(tempArr);
  }

  function updateEvent(key, eventIndex, event) {
    let keyArr = String(key).split(" ");
    let tempArr = [];
    tempArr = tempArr.concat(calendarDataState);
    tempArr[keyArr[0]][keyArr[1]].eventList[eventIndex] = event;
    setCalendarDataState(tempArr);
  }

  function makeCalendarData(dateNumber, id) {
    return {
      id: id,
      dateNumber: dateNumber,
      eventList: [],
    };
  }

  if (calendarDataState.length == 0) {
    let firstDate = new Date(date.getTime());
    firstDate.setDate(1);
    let firstDay = firstDate.getDay();
    let lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    //adjust firstDay
    if (firstDay + 1 == 8) firstDay = 1;
    else firstDay = firstDay + 1;

    //make calendar data
    let calendarData = [];
    let firstweek = true;
    let day = 1;
    for (let i = 0; i < Math.ceil(lastDay / 7); i++) {
      let calendarDataWeek = [];
      let keyi = i;
      for (let j = 1; j <= 7; j++) {
        let keyj = j - 1;
        if ((j < firstDay && firstweek) || day > lastDay) {
          calendarDataWeek.push(
            makeCalendarData(0, String(keyi) + " " + String(keyj))
          );
        } else {
          calendarDataWeek.push(
            makeCalendarData(day, String(keyi) + " " + String(keyj))
          );
          day++;
        }
      }
      if (firstweek) firstweek = false;
      calendarData.push(calendarDataWeek);
    }
    setCalendarDataState(calendarData);
  }
  setLocalStorageCalendarData();

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>
        </thead>
        <tbody>
          {calendarDataState.map((data, index) => (
            <tr key={index}>
              {data.map((rowData) => (
                <CalendarDetail
                  key={rowData.id}
                  {...rowData}
                  onCreateEvent={createEvent}
                  onDeleteEvent={deleteEvent}
                  onUpdateEvent={updateEvent}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
