export const formatDateToBR = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(date.getTime() + userTimezoneOffset);
  const day = String(adjustedDate.getDate()).padStart(2, "0");
  const month = String(adjustedDate.getMonth() + 1).padStart(2, "0");
  const year = adjustedDate.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatDateToISO = (dateString) => {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) return null;
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
};
