// Cập nhật đồng hồ
function updateClock() {
    const now = new Date();
    const sec = now.getSeconds();
    const min = now.getMinutes();
    const hr = now.getHours();

    const secDeg = (sec / 60) * 360;
    const minDeg = (min / 60) * 360 + (sec / 60) * 6;
    const hrDeg = (hr / 12) * 360 + (min / 60) * 30;

    document.getElementById('second').style.transform = `rotate(${secDeg}deg)`;
    document.getElementById('minute').style.transform = `rotate(${minDeg}deg)`;
    document.getElementById('hour').style.transform = `rotate(${hrDeg}deg)`;
}

// Tạo lịch đơn giản cho tháng hiện tại
function renderCalendar() {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    
    document.getElementById('month-year').innerText = `${year}年${month + 1}月`;
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const daysContainer = document.getElementById('calendar-days');
    daysContainer.innerHTML = '';

    // Ô trống cho những ngày đầu tuần
    for(let i=0; i<firstDay; i++) {
        daysContainer.innerHTML += `<div></div>`;
    }

    // Điền ngày vào
    for(let d=1; d<=daysInMonth; d++) {
        const isToday = d === now.getDate() ? 'class="today"' : '';
        daysContainer.innerHTML += `<div ${isToday}>${d}</div>`;
    }
}

setInterval(updateClock, 1000);
updateClock();
renderCalendar();