 const STORYBLOK_URL = "https://api-us.storyblok.com/v2/cdn/stories/?starts_with=events/&token=6ayrPOcPuJU8puAP8sIWywtt";

 
 const calendar = document.querySelector('#calendar');
 const monthElement = document.querySelector('#month');

 const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
 ];

 const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

 let events;

 const today = new Date();
 let currentMonth = today.getMonth();
 let currentYear = today.getFullYear();

 const loadEvents = async () => {
    const res = await fetch(STORYBLOK_URL);
    const data = await res.json();
    const stories = data.stories;
    events = stories.reduce((accumulator, story) => {
        const storyTime = new Date(story.content.time);
        const storyDate = new Date(storyTime.toDateString());
        accumulator[storyDate] = story.content;
        return accumulator;
    }, {});
 };

 loadEvents();

const drawBlankCalendar = () => {
    for(let i = 0; i < 42; i++) {
        const day = document.createElement('div');
        day.classList.add('day');
        

        const dayText = document.createElement('p');
        dayText.classList.add('day-text');
        dayText.innerText = days[i % 7];

        const dayNumber = document.createElement('p');
        dayNumber.classList.add('day-number');
        
        const eventName = document.createElement('small');
        eventName.classList.add('event-name');

        day.appendChild(dayText);
        day.appendChild(dayNumber);
        day.appendChild(eventName);

        calendar.appendChild(day);
    }
}

const updateCalendar = (month, year, events) => {
    let theFirst = new Date();
    theFirst.setDate(1);
    theFirst.setMonth(month);
    theFirst.setFullYear(year);

    const monthName = months[month];
    const monthWithYear = `${year} - ${monthName}`;
    monthElement.innerText = monthWithYear;

    // Asigning days dates and adding events
    const dayElements = document.querySelectorAll('.day');
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const theFirstDayOfWeek = theFirst.getDay();


    let dayCounter = 1;

  for (let i = 0; i < dayElements.length; i++) {
    const day = dayElements[i];
    const eventName = day.querySelector('.event-name')
    eventName.innerText = '';

    const dayNumber = day.querySelector('.day-number');
    if (i >= theFirstDayOfWeek && dayCounter <= daysInMonth) {
      const thisDate = new Date(year, month, dayCounter);

      if (events[thisDate]) {
        const event = events[thisDate];
        eventName.innerText = `* ${event.title}`;
      } else {
        eventName.innerText = ``;
      }

      dayNumber.innerText = dayCounter;
      dayCounter++;
    } else {
      dayNumber.innerText = '';
    }
  }
}


const previousMonth = () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentYear--,
        currentMonth = 11;
    }
    updateCalendar(currentMonth, currentYear, events);
}

const nextMonth = () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentYear++,
        currentMonth = 0;
    }
    updateCalendar(currentMonth, currentYear, events);
}

const load = async () => {
    await loadEvents();
    drawBlankCalendar();
    updateCalendar(currentMonth, currentYear, events);   
      
}

load();
