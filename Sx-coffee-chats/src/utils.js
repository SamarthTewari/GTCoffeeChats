export function formatWords(input) {
  if (typeof input !== 'string') {
      throw new TypeError('Input must be a string');
  }
  return input.split(' ').map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
}

export function formatDateString(dateString) {
  const dateObject = new Date(dateString);

  const year = dateObject.getFullYear(); // Extract year
  const month = dateObject.getMonth() + 1; // Extract month (+1 because getMonth() returns zero-based index)
  const day = dateObject.getDate(); // Extract day

  const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

  return formattedDate;
}