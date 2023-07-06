import { DateTime } from "luxon";

const TODAY = DateTime.local();

export function formatDateDayMonthYear(date) {
  if (!date) return null;

  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

export function today() {
  return TODAY.toISODate();
}

export function nowMonthAndDay() {
  return TODAY.toFormat("LL-dd");
}

export function nowYear() {
  return TODAY.year;
}

export function nowMonth() {
  return TODAY.toFormat("LL");
}

export function nowMonthLong() {
  const value = TODAY.toLocaleString({
    month: "long"
  });
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function dayMonthLong(date) {
  if (!date) return null;

  return DateTime.fromISO(date).toFormat("dd 'de' LLLL");
}

export function plusHour(hours) {
  let hour = "00:00";
  if (hours) hour = hours;

  const data = hour.split(":");

  const newHour = DateTime.local(2020, 1, 1, parseInt(data[0])).plus({
    hours: 1
  }).hour;

  return `${newHour}:${data[1]}`;
}
