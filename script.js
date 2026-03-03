// 1. Cập nhật kim đồng hồ
function updateClock() {
    const now = new Date();
    const s = now.getSeconds();
    const m = now.getMinutes();
    const h = now.getHours();

    // Tính toán góc quay
    const sDeg = s * 6;
    const mDeg = m * 6 + s * 0.1;
    const hDeg = h * 30 + m * 0.5;

    document.getElementById('second').style.transform = `translateX(-50%) rotate(${sDeg}deg)`;
    document.getElementById('minute').style.transform = `translateX(-50%) rotate(${mDeg}deg)`;
    document.getElementById('hour').style.transform = `translateX(-50%) rotate(${hDeg}deg)`;
}

// 2. Quản lý lịch
let currentViewDate = new Date(); // Ngày đang hiển thị trên lịch

function renderCalendar() {
    const year = currentViewDate.getFullYear();
    const month = currentViewDate.getMonth();

    // Hiển thị tiêu đề tháng/năm
    document.getElementById('monthDisplay').innerText = `${year}年${month + 1}月`;

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const daysContainer = document.getElementById('calendarDays');
    daysContainer.innerHTML = "";

    // Thêm các ô trống cho đầu tuần
    for (let i = 0; i < firstDayOfMonth; i++) {
        daysContainer.innerHTML += `<div></div>`;
    }

    // Thêm các ngày thực tế
    const realToday = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
        const isToday = (i === realToday.getDate() && month === realToday.getMonth() && year === realToday.getFullYear()) 
                        ? 'class="today"' : '';
        
        // Xác định màu sắc cho T7/CN
        const dayOfWeek = new Date(year, month, i).getDay();
        let dayClass = "";
        if (dayOfWeek === 0) dayClass = "sun";
        if (dayOfWeek === 6) dayClass = "sat";

        // Gộp class nếu có cả today và sat/sun
        let finalClass = isToday ? `class="today ${dayClass}"` : `class="${dayClass}"`;

        daysContainer.innerHTML += `<div ${finalClass}>${i}</div>`;
    }
}

// Sự kiện nút bấm lịch
document.getElementById('prevMonth').addEventListener('click', () => {
    currentViewDate.setMonth(currentViewDate.getMonth() - 1);
    renderCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentViewDate.setMonth(currentViewDate.getMonth() + 1);
    renderCalendar();
});

// Khởi chạy
setInterval(updateClock, 1000);
updateClock();
renderCalendar();