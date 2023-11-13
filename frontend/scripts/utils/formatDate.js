import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

const today = dayjs();

export const addDays = (daysToAdd) => {
  return today.add(daysToAdd, 'days').format('dddd, D, MMMM');
};

export const getTodayDate = () => {
  return today.format("MMMM D");
};