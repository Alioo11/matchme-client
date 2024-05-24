import moment from "moment";
import { Nullable } from "ts-wiz";

class DateHelper {
    static formatToReadableDateFromNow = (date:Nullable<string>)=>{
        if(date === null) return "--"
        const now = moment();
        const diffInDays = now.diff(date , "days");
        if(diffInDays === 0) return "today"
        return `${diffInDays} day(s) ago`
    }
}


export default DateHelper;