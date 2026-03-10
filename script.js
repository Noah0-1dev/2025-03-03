// Cập nhật kim đồng hồ
function updateClock() {
    const now = new Date();
    const s = now.getSeconds();
    const m = now.getMinutes();
    const h = now.getHours();

    const sDeg = s * 6;
    const mDeg = m * 6 + s * 0.1;
    const hDeg = h * 30 + m * 0.5;

    document.getElementById('second').style.transform = `translateX(-50%) rotate(${sDeg}deg)`;
    document.getElementById('minute').style.transform = `translateX(-50%) rotate(${mDeg}deg)`;
    document.getElementById('hour').style.transform = `translateX(-50%) rotate(${hDeg}deg)`;
}

// Logic Lịch
let currentViewDate = new Date();
let selectedDate = null;

function renderCalendar() {
    const year = currentViewDate.getFullYear();
    const month = currentViewDate.getMonth();
    const monthNames = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];

    document.getElementById('monthDisplay').innerText = `${monthNames[month]}, ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysContainer = document.getElementById('calendarDays');
    daysContainer.innerHTML = "";

    for (let i = 0; i < firstDay; i++) {
        daysContainer.appendChild(document.createElement('div'));
    }

    const realToday = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.innerText = i;

        if (i === realToday.getDate() && month === realToday.getMonth() && year === realToday.getFullYear()) {
            daySquare.classList.add("today");
        }

        if (selectedDate && i === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
            daySquare.classList.add("selected-day");
        }

        daySquare.addEventListener('click', () => {
            selectedDate = new Date(year, month, i);
            document.getElementById('selectedDateText').innerText = `Đang chọn: ${i} ${monthNames[month]} ${year}`;
            renderCalendar();
        });

        daysContainer.appendChild(daySquare);
    }
}

document.getElementById('prevMonth').addEventListener('click', () => {
    currentViewDate.setMonth(currentViewDate.getMonth() - 1);
    renderCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentViewDate.setMonth(currentViewDate.getMonth() + 1);
    renderCalendar();
});

setInterval(updateClock, 1000);
updateClock();
renderCalendar();