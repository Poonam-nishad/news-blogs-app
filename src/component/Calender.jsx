import React, { useState } from "react";
import "./Calender.css";
const Calender = () => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "thu", "Fri"];
  const monthOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();
  // const [currDate, setCurrDate] = useState(currentDate.getDate());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())
  const daysInMonth = new Date(currentYear, currentMonth+1,0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth,1).getDay()
  // console.log( currentMonth, currentYear, daysInMonth, firstDayOfMonth);

  const prevMonth = ()=>{
    setCurrentMonth((prevMonth)=>(prevMonth===0?11:prevMonth-1))
    setCurrentYear((prevYear) => (currentMonth===0? prevYear-1:prevYear ))
  }
  const nextMonth = ()=>{
    setCurrentMonth((prevMonth)=>(prevMonth===11?0:prevMonth+1))
    setCurrentYear((prevYear) => (currentMonth===11? prevYear+1:prevYear ))
  }
  return (
    <div className="calender">
      <div className="navigate-date">
        <h3 className="month">{monthOfYear[currentMonth]}</h3>
        <h3 className="year">{currentYear}</h3>
        <div className="button">
          <i className="bx bx-chevron-left" onClick={prevMonth} ></i>
          <i className="bx bx-chevron-right" onClick={nextMonth}></i>
        </div>
      </div>
      <div className="weekdays">
        {daysOfWeek.map((day)=>(
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="days">
        {[...Array(firstDayOfMonth).keys()].map((_, index)=>(
          <span key={`empty-${index}`}></span> 
        ))}
        {[...Array(daysInMonth).keys()].map((date) => (
          <span className={date+1 === currentDate.getDate()&& currentMonth===currentDate.getMonth() && currentYear===currentDate.getFullYear()? 'current-day': ''} key={date}>{date+1}</span>
        ))}
        
      </div>
    </div>
  );
};

export default Calender;
