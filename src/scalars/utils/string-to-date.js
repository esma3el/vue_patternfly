const stringToDate = (date)=>{
    const parsedData = new Date(date);
    if(!isNaN(parsedData.getTime()))
    {
        return parsedData
    }
}

export default stringToDate;