import { func } from "prop-types";
import React from "react";

export function FullDateCheck(props) {
  const date = new Date(props);
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const dateAt = formatter.format(date);
  return dateAt;
}
export function HourCheck(props) {
  const date = new Date(props);
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const dateAt = formatter.format(date);
  return dateAt;
}
export function DayCheck(props) {
  const date = new Date(props);
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
  const [dateAt, timeAt] = formatter.format(date).split("-");
  const formattedDate = dateAt.replace(/\./g, "."); // "22.03.23"
  return formattedDate;
}

export function ShortCheck(props){
const date = new Date(props);
const formattedDate = `${date.getDate()}.${date.getMonth()+1}.${String(date.getFullYear()).slice(2)} ${date.getHours()}:${date.getMinutes()}`;
return formattedDate
}