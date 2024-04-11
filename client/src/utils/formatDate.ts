export const formatDate = (isoDate: string, time: boolean = false) => {
  const date = new Date(isoDate);


  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based in JavaScript
  const year = date.getUTCFullYear();
  
  const toReturn = `${day}.${month}.${year}`;

  if(time) {
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${toReturn} ${hours}:${minutes}`
  }

  return toReturn;
}