export default function getDate(): string {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const currentHour = currentDate.getHours();
    let currentMinutes: string | number = currentDate.getMinutes();

    if (currentMinutes.toString().length === 1) {
        currentMinutes = '0' + currentMinutes
    }

    return `${currentDay}-${currentMonth}-${currentYear} ${currentHour}:${currentMinutes}`;
}