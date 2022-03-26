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
    const day = date.getDate()+1
   return `${month}/${day}/${year}`
}
export const getTime = (timestamp) => {
    const time = new Date(timestamp);
    const hour = time.getHours().toLocaleString()
    const min = time.getMinutes()
    return `${hour}:${min}`

}
export const getDateTime = (datetimestamp) => {
    const datetime = new Date(datetimestamp);
    const year = datetime.getFullYear()
    const month = datetime.getMonth()+1
    const day = datetime.getDate()+1
    const hour = datetime.getHours().toLocaleString()
    const min = datetime.getMinutes()
    return `${month}/${day}/${year}, ${hour}:${min}`
}

export const getIsPastDate = (datestamp) => {
    const date = new Date(datestamp);
    const today = new Date();
    return date < today && date.toDateString() !== today.toDateString();
};

export const getIsFutureDate = (datestamp) => {
    const date = new Date(datestamp);
    const today = new Date();
    return date > today && date.toDateString() !== today.toDateString();
};