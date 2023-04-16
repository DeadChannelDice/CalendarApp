const updateCalendar = (month, year, events) => {
 

  let theFirst = new Date();
  theFirst.setMonth(month);
  theFirst.setFullYear(year);

  console.log(theFirst.getDay());
  
}


const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();


updateCalendar(currentMonth, currentYear);