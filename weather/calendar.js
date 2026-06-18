// ================= FESTIVAL DATA =================

let festivals = {

    "1-1": "New Year 🎉",

    "14-1": "Makar Sankranti 🪁",

    "26-1": "Republic Day 🇮🇳",

    "14-2": "Vasant Panchami 🌼",

    "8-3": "Holi 🎨",

    "2-4": "Ram Navami 🚩",

    "22-4": "Hanuman Jayanti",

    "1-5": "Labour Day",

    "21-6": "Yoga Day",

    "15-8": "Independence Day 🇮🇳",

    "7-9": "Ganesh Chaturthi 🐘",

    "2-10": "Gandhi Jayanti 🕊",

    "12-10": "Dussehra ⚔",

    "10-11": "Diwali 🪔",

    "25-12": "Christmas 🎄"
};


// ================= GLOBAL =================

let date = new Date();

let events =
JSON.parse(localStorage.getItem("events")) || {};


// ================= RENDER CALENDAR =================

function renderCalendar() {

    let month = date.getMonth();

    let year = date.getFullYear();

    document.getElementById("monthYear").innerText =

    date.toLocaleString('default', {

        month: 'long'

    }) + " " + year;

    let firstDay =
    new Date(year, month, 1).getDay();

    let lastDate =
    new Date(year, month + 1, 0).getDate();

    let days = "";

    // ================= EMPTY CELLS =================

    for(let i = 0; i < firstDay; i++){

        days += `<div></div>`;
    }

    // ================= MAIN LOOP =================

    for(let i = 1; i <= lastDate; i++){

        let dayName =

        new Date(year, month, i)

        .toLocaleString('default', {

            weekday: 'long'
        });

        let key =
        i + "-" + (month + 1);

        let festivalText = festivals[key]

        ? `<div class="festival">${festivals[key]}</div>`

        : "";

        let eventKey =
        i + "-" + (month + 1) + "-" + year;

        let eventText = events[eventKey]

        ? `<div class="event">🎉 ${events[eventKey]}</div>`

        : "";

        let today = new Date();

        let isToday = (

            i === today.getDate() &&

            month === today.getMonth() &&

            year === today.getFullYear()
        );

        days += `

        <div class="day ${isToday ? "today" : ""}"

        onclick="addEvent(${i}, ${month}, ${year})">

            <div class="date">${i}</div>

            <div class="day-name">${dayName}</div>

            ${festivalText}

            ${eventText}

        </div>
        `;
    }

    document.getElementById("calendarDays").innerHTML =
    days;

    // ================= TOTAL EVENTS =================

    let total =
    document.getElementById("total");

    if(total){

        total.innerText =
        Object.keys(events).length;
    }
}


// ================= ADD EVENT =================

function addEvent(day, month, year) {

    let key =
    day + "-" + (month + 1) + "-" + year;

    // ================= IF EVENT EXISTS =================

    if(events[key]){

        let action = prompt(

        "Type 'delete' to remove or 'edit' to change:"
        );

        // ================= DELETE =================

        if(action === "delete"){

            delete events[key];

            alert("Event Deleted ❌");
        }

        // ================= EDIT =================

        else if(action === "edit"){

            let newText = prompt(

            "Edit event:",
            events[key]
            );

            if(newText){

                events[key] = newText;

                alert("Event Updated ✅");
            }
        }
    }

    // ================= NEW EVENT =================

    else{

        let eventText =
        prompt("Enter event:");

        if(eventText){

            events[key] = eventText;

            alert("Event Added ✅");
        }
    }

    localStorage.setItem(

    "events",

    JSON.stringify(events)
    );

    renderCalendar();
}


// ================= TODAY EVENT ALERT =================

function checkTodayEvent(){

    let today = new Date();

    let key =

    today.getDate() + "-" +

    (today.getMonth() + 1) + "-" +

    today.getFullYear();

    if(events[key]){

        alert("🎉 Today: " + events[key]);
    }
}


// ================= PREVIOUS MONTH =================

function prevMonth(){

    date.setMonth(date.getMonth() - 1);

    renderCalendar();
}


// ================= NEXT MONTH =================

function nextMonth(){

    date.setMonth(date.getMonth() + 1);

    renderCalendar();
}


// ================= TOTAL EVENTS =================

function totalEvents(){

    return Object.keys(events).length;
}


// ================= RESET CALENDAR =================

function resetCalendar(){

    let confirmReset =

    confirm("Delete all events?");

    if(confirmReset){

        events = {};

        localStorage.removeItem("events");

        renderCalendar();

        alert("All Events Deleted ❌");
    }
}


// ================= EXPORT EVENTS =================

function exportEvents(){

    console.log(JSON.stringify(events));
}


// ================= EXTRA FUNCTIONS =================

function extra1(){console.log("extra1")}
function extra2(){console.log("extra2")}
function extra3(){console.log("extra3")}
function extra4(){console.log("extra4")}
function extra5(){console.log("extra5")}
function extra6(){console.log("extra6")}
function extra7(){console.log("extra7")}
function extra8(){console.log("extra8")}
function extra9(){console.log("extra9")}
function extra10(){console.log("extra10")}


// ================= LOOPS =================

for(let i = 0; i < 50; i++){

    console.log("Loop1:", i);
}

for(let i = 0; i < 50; i++){

    console.log("Loop2:", i);
}

for(let i = 0; i < 50; i++){

    console.log("Loop3:", i);
}

for(let i = 0; i < 50; i++){

    console.log("Loop4:", i);
}


// ================= INIT =================

renderCalendar();

checkTodayEvent();