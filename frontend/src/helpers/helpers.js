export const parseDateTime = timestamp => {
	const dateTime = new Date(timestamp);
	const date = dateTime.toLocaleDateString();
	const time = dateTime.toLocaleTimeString();
	return `${date} ${time}`;
};
export const getDate = (datestamp) => {
    const date = new Date(datestamp);
    const year = date.getFullYear()
    const month = date.getMonth()+1
    const day = date.getDate()
   return `${month}/${day}/${year}`
}
export const getTime = (timestamp) => {
    let amOrPm;
    const time = new Date(timestamp);
    let hour = time.getHours().toLocaleString()
    if(hour>12){
        amOrPm = 'PM'
        hour -= 12
    }else{amOrPm = 'AM'}
    const min = time.getMinutes()
    const pad = (min < 10) ? '0' : '';
    const minutes = pad + min;
    return `${hour}:${minutes} ${amOrPm}`

}
export const getDateTime = (datetimestamp) => {
    let amOrPm;
    const datetime = new Date(datetimestamp);
    const year = datetime.getFullYear()
    const month = datetime.getMonth()+1
    const day = datetime.getDate()+1
    let hour = datetime.getHours().toLocaleString()
    if(hour>12){
        amOrPm = 'PM'
        hour -= 12
    }else{amOrPm = 'AM'}
    const min = datetime.getMinutes()
    const pad = (min < 10) ? '0' : '';
    const minutes = pad + min;
    return `${month}/${day}/${year}, ${hour}:${minutes} ${amOrPm}`
}

export const getIsPastDate = (datestamp) => {
    const date = new Date(datestamp);
    const today = new Date();
    console.log(today.toDateString)
    console.log(date.toDateString)
    return date < today && date.toDateString() !== today.toDateString();
};

export const getIsFutureDate = (datestamp) => {
    const date = new Date(datestamp);
    const today = new Date();
    return date > today && date.toDateString() !== today.toDateString();
};