import {format, parseISO} from "date-fns"

export const formattedDate = (date:string | undefined) => {

if (!date) return ""; 

 const dateformat = parseISO(date);
 // Tarihi istediğiniz formata çevir
 return format(dateformat, "yyyy-MM-dd");


};
