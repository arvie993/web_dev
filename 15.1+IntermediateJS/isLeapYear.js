function isLeapYear(year) {
  // A year is a leap year if it is divisible by 4,
  // except for end-of-century years, which must be divisible by 400.
if (year % 4 !== 0) {
    return "Not Leap year";
} else if (year % 100 !== 0) {
    return "Leap year";
} else if (year % 400 === 0) {
    return "Leap year";
} else {
    return "Not Leap year";
}
}
console.log(isLeapYear(2020)); // Leap year
console.log(isLeapYear(1900)); // Not Leap year
console.log(isLeapYear(2000)); // Leap year
console.log(isLeapYear(2021)); // Not Leap year