export default function convertHourToMinute(time: string) {
    
    //Transforma Hora em array
    const [hour, minutes] = time.split(':').map(Number);
    const timeInMinutes = (hour * 60) + minutes
    
    return timeInMinutes;

}