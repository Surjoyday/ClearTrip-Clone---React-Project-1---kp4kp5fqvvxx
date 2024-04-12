export const base_URL =
  "https://academics.newtonschool.co/api/v1/bookingportals";

export const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;

export const headers = {
  "Content-Type": "application/json",
  projectId: process.env.REACT_APP_PROJECT_ID,
};

export function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // ensuring that month have always has 2 digits
  const day = String(currentDate.getDate()).padStart(2, "0"); // ensuring that day have always has 2 digits
  return `${year}-${month}-${day}`;
}
