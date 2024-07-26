import {format, parseISO} from "date-fns"
 
export const formattedDate = (date:string | undefined ) => {

if (!date) return ""; 

 const dateformat = parseISO(date);
 // Tarihi istediğiniz formata çevir
 return format(dateformat, "yyyy-MM-dd");


};

export const formatDateTwo = (date:string | undefined)=>{
if (!date) return ""; 
const dateFormat = new Date(date);
const formattedDate = format(dateFormat, "d MMM yyyy");
return formattedDate
}



export const formatPrice = (price: number): string => {
  const tl = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(price);
  return tl;
};
export const formatPercentage = (percentage: number): string => {
  const formattedPercentage = new Intl.NumberFormat("tr-TR", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(percentage / 100);
  return formattedPercentage;
};