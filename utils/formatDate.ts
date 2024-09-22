/**
 * Formats the input date string to either "Month Day, Year" or "HH:MM AM/PM" based on the format type.
 *
 * @param {string} dateString - The input date string in the format "YYYY-MM-DDTHH:mm:ssZ".
 * @param {string} formatType - The desired format type: "date" for "Month Day, Year" or "time" for "HH:MM AM/PM".
 * @returns {string} - Returns the formatted date string based on the format type.
 */
export function formatDate(dateString: string, formatType: 'date' | 'time'): string {
  // Parse the input string to a Date object
  const parsedDate = new Date(dateString);

  if (formatType === 'date') {
    // Define options for formatting the date
    const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    // Format the parsed date to the desired format
    return parsedDate.toLocaleDateString('en-US', dateOptions);
  } else if (formatType === 'time') {
    // Define options for formatting the time
    const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    // Format the parsed time to the desired format
    return parsedDate.toLocaleTimeString('en-US', timeOptions);
  } else {
    throw new Error('Invalid format type. Use "date" or "time".');
  }
}

export const isDayOneSession = (date: string) => {
  try {
    return formatDate(date, 'date') === 'May 15, 2024';
  } catch {
    return false;
  }
};

export const isDayTwoSession = (date: string) => {
  try {
    return formatDate(date, 'date') === 'May 16, 2024';
  } catch {
    return false;
  }
};

/**
 * Calculates the difference in minutes between two Date objects.
 *
 * @param {Date} date1 - The first date.
 * @param {Date} date2 - The second date.
 * @returns {number} - Returns the difference in minutes between the two dates.
 */
export function differenceInMinutes(date1: Date, date2: Date): number {
  // Calculate the difference in milliseconds
  const differenceInMilliseconds = date1.getTime() - date2.getTime();

  // Convert milliseconds to minutes
  const differenceInMinutes = differenceInMilliseconds / (1000 * 60);

  return Math.abs(differenceInMinutes);
}
