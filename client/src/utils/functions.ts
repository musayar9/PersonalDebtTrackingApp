import {format, parseISO} from "date-fns"
 
export const formattedDate = (date:string | undefined ) => {

if (!date) return ""; 

 const dateformat = parseISO(date);
 // Tarihi istediğiniz formata çevir
 return format(dateformat, "yyyy-MM-dd");


};

export const formatDateTwo = (date:string | undefined | Date)=>{

if (!date) return ""; 
const dateFormat = new Date(date);
const formattedDate = format(dateFormat, "d MMM yyyy");
return formattedDate
}


export const formatPrice = (price: number | undefined): string => {
  if (price === undefined || price === null) {
    return ""; // veya uygun bir varsayılan değer döndürebilirsiniz
  }

  // String türündeki price'ı sayıya çevir
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  // NaN olup olmadığını kontrol et
  if (isNaN(numericPrice)) {
    return ""; // veya uygun bir varsayılan değer döndürebilirsiniz
  }

  const tl = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(numericPrice);

  return tl;
};
export const formatPercentage = (percentage: number | undefined): string => {
  if (percentage === undefined || percentage === null) {
    return ""; // veya uygun bir varsayılan değer döndürebilirsiniz
  }

  const formattedPercentage = new Intl.NumberFormat("tr-TR", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(percentage / 100);
  return formattedPercentage;
};

// yüzde hesablama 

interface CalculatePercentage {
count:number | undefined;
total:number | undefined
}
export const calculatePercentage = ({ count, total }: CalculatePercentage): number => {
if(count === undefined || total=== undefined){
return 0

}
  return (count / total) * 100;
};


export  const calculateAge = ({birthDate}:{birthDate:string})=>{
  const today = new Date();
  const birthDateObj = new Date(birthDate);

  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDifference = today.getMonth() - birthDateObj.getMonth();

  // Adjust age if birth date has not occurred yet this year
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }


  return  age;
}