
export const monthLater = (month, monthafter) => {
   if(month + monthafter > 11) {
    month = month + monthafter - 12
   }
   else {
    month = month + monthafter
   }
   return month
} 

export const yearLater = (month, currentYear) => {
    if(!month) {
        return currentYear + 1
    } else {
        return currentYear
    }
}

const dayLater = (today, dayafter) => {

    let day = today.getDate()
    let month = today.getMonth()
    let year = today.getFullYear()
    const lastday = new Date (year, month+1, 0)
  	const monthLength = lastday.getDate()
    if(day+dayafter > monthLength) {
    	if(month+1 === 12) {
            month = 0
            year = year + 1
        } else {
            month = month + 1
        }
        day = day + dayafter - monthLength
    }  else {
    day = day + dayafter 
    }
    const res =  new Date(year, month, day)
    return res
}

export default dayLater

 