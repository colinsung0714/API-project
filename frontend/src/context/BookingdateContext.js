import { createContext, useState, useContext } from "react";
import dayLater from "../helper/dateCalculator";
import { userTime } from "../components/helper";
export const BookingdateContext = createContext()

export const useBookingDate = ( ) => useContext(BookingdateContext)

const BookingdateProvider = ( props) => {
    const currentDate = new Date(userTime)
    
    const defaultStartDate = dayLater(currentDate, 7)
    const defaultEndDate = dayLater(currentDate, 12)
    const monthString = (month) => {

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
    
    const [startDay, setStartDay] = useState(defaultStartDate.getDate())
    const [startMonth, setStartMonth] = useState(monthString(defaultStartDate.getMonth()).slice(0,3))
    const [startYear, setStartYear] = useState(defaultStartDate.getFullYear())
    const [endDay, setEndDay] = useState(defaultEndDate.getDate())
    const [endMonth, setEndMonth] = useState(monthString(defaultEndDate.getMonth()).slice(0,3))
    const [endYear, setEndYear] = useState(defaultEndDate.getFullYear())
    const [count, setCount] = useState(0)
    
    return (
        <BookingdateContext.Provider value={{defaultStartDate, defaultEndDate, startDay , setStartDay, startMonth, setStartMonth, endDay , setEndDay , endMonth, setEndMonth, startYear, setStartYear, endYear, setEndYear,count, setCount}}>
            {props.children}
        </BookingdateContext.Provider>
    )
}

export default BookingdateProvider 