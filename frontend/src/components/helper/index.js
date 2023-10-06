export const stiringMonthtoNumber = (month) => {

    switch (month) {
        case 'Jan':
            return 1
        case 'Feb':
            return 2
        case 'Mar':
            return 3
        case 'Apr':
            return 4
        case 'May':
            return 5
        case 'Jun':
            return 6
        case 'Jul':
            return 7
        case 'Aug':
            return 8
        case 'Sep':
            return 9
        case 'Oct':
            return 10
        case 'Nov':
            return 11
        case 'Dec':
            return 12
        default:
            return;
    }
}

export const nightstoString1 = (currentMonthLength, startDay, endDay) => {
    const res = Math.abs(Math.abs(Number(currentMonthLength) - Number(startDay)) + Number(endDay))
    if (res === 1) {
        return `${res} night`
    } else {
        return `${res} nights`
    }
}

export const nightstoString2 = (startDay, endDay) => {
    const res = Number(Math.abs(Number(startDay) - Number(endDay)))
    if (res === 1) {
        return `${res} night`
    } else {
        return `${res} nights`
    }
}

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
export const userTime = new Date().toLocaleString("en-US", { timeZone: userTimeZone })

export const previousBookingList = (bookings) => {
    const currentTime = new Date(userTime).getTime()
    const ans = []
    for (let booking of bookings) {
        const bookingEndTime = new Date(booking.endDate).getTime()
        if (currentTime > bookingEndTime) ans.push(booking)
    }
    return ans
}

export const futureBookingList = (bookings, prevBookings) => {
    const res = []
    const prevBookingsIDmapping = prevBookings?.map(booking => booking?.id)
    for (let booking of bookings) {
        const bookingId = booking?.id
        if (prevBookingsIDmapping.indexOf(bookingId)) res.push(booking)
    }
    return res
}

export const weekslater = (week) => {
    const current = new Date(userTime)
    const afterWeek = current.getDate() + week * 7
    const weekslater = new Date(userTime)
    weekslater.setDate(afterWeek)
    return weekslater
}

export const weeksLaterStartDate = (start) => {
    const targetDate = new Date(start)
    const afterWeek = targetDate.getDate() - 7
    const weekslater = targetDate.setDate(afterWeek)
    const result = new Date(weekslater)
    const resultDate = result.getUTCDate()
    const resultMonth = result.getMonth()
    const resultMonthString = monthString(resultMonth).slice(0,3)
    return `${resultMonthString} ${resultDate}`
}

export const weeksfromNow = startDate => {
    const current = new Date(userTime)
    const target = new Date(startDate)
    let currentTime = current.getTime()
    const targetTime = target?.getTime()
    const oneWeekSeconds = 1000 * 60 * 60 * 24 * 7
    let i = 1;
    while (currentTime < targetTime) {
        currentTime += oneWeekSeconds * i
        i++
    }
    if (i <= 1) return `In a week`
    else return `In ${i} weeks`
}

export const periodStringReservation = (start, end) => {

    const startDate = new Date(start)
    const endDate = new Date(end)
    const startDateMonth = startDate.getMonth()
    const endDateMonth = startDate.getMonth()
    const startDateInt = startDate.getUTCDate()
    const endDateInt = endDate.getUTCDate()
    const startMonthString = monthString(startDateMonth)
    const endMonthStiring = monthString(endDateMonth)
    const startYear = startDate.getFullYear()
    const endYear = endDate.getFullYear()
    if (startDateMonth === endDateMonth) return `${startMonthString?.slice(0, 3)} ${startDateInt}-${endDateInt}, ${startYear}`
    else {
        if (startYear === endYear) return `${startMonthString?.slice(0, 3)} ${startDateInt}-${endMonthStiring?.slice(0, 3)} ${endDateInt}, ${startYear}`
        else return `${startMonthString?.slice(0, 3)} ${startDateInt}, ${startYear}-${endMonthStiring?.slice(0, 3)} ${endDateInt}, ${endYear}`
    }
}

export const upcomingMonth = (start, end) => {

    const startDate = new Date(start)
    const endDate = new Date(end)
    const startDateMonth = startDate.getMonth()
    const endDateMonth = endDate.getMonth()
    const startMonth = monthString(startDateMonth)
    const startDay = startDate.getDate()
    if (startDateMonth === endDateMonth) return startMonth?.slice(0, 3)
    else return `${startMonth?.slice(0, 3)} ${startDay} -`
}

export const upcomingDays = (start, end) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const startDateMonth = startDate.getMonth()
    const endDateMonth = endDate.getMonth()
    const startDay = startDate.getUTCDate()
    const endDay = endDate.getUTCDate()
    const endMonth = monthString(endDateMonth)
    if (startDateMonth === endDateMonth) return `${startDay} - ${endDay}`
    else return `${endMonth?.slice(0, 3)} ${endDay}`
}

export const upcomingYears = (start, end) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const startYear = startDate.getFullYear()
    const endYear = endDate.getFullYear()
    if (startYear === endYear) return startYear
    else return `${startYear}/${endYear}`
}


export const monthString = (month) => {
    switch (month) {
        case 0:
            return 'January'
        case 1:
            return 'Feburary'
        case 2:
            return 'March'
        case 3:
            return 'April'
        case 4:
            return 'May'
        case 5:
            return 'June'
        case 6:
            return 'July'
        case 7:
            return 'August'
        case 8:
            return 'September'
        case 9:
            return 'October'
        case 10:
            return 'November'
        case 11:
            return 'December'
        default:
            return;
    }
}

export const dayToString = (day) => {
    switch (day) {
        case 0:
            return 'Sunday'
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'
        default:
            return
    }
}

export const bookingDetailDateString = (dates) => {
    const targetTime = new Date(dates)
    const day = targetTime.getDay()
    const month = targetTime.getMonth()
    const date = targetTime.getUTCDate()
    const monthWord = monthString(month).slice(0, 3)
    const dayWord = dayToString(day).slice(0, 3)
    return `${dayWord}, ${monthWord} ${date}`
}

export const sortNewestBookingList = (list) => {

    return (list.sort((a, b) => {
        const startDateA = new Date(a.startDate)
        const startDateB = new Date(b.startDate)
        if (startDateA > startDateB) return 1
        else if (startDateB > startDateA) return -1
        return 0
    }))
}

export const datesChangeBooking = (year, month, day) => {
    return `${month} ${day}, ${year}`
}

export const currentMonthDateBoolean = (year, month , day, date) => {
    const targetDate = new Date(year, month, day)
    if(targetDate.getTime() < date.getTime()) return true
    else return false
}

export const nextMonthDateBoolean = (year, month, day, date) => {
    let targetDate;
    if(month === 0) {
        const targetYear = year + 1
        targetDate = new Date(targetYear, month, day)
        if(targetDate.getTime() < date.getTime()) return true
        else return false
    } else {
        targetDate = new Date(year, month, day)
        if(targetDate.getTime() < date.getTime()) return true
        else return false
    }
}