export const formateCurrency = (number) =>{
    return "$" + number.toFixed(1)
}



export const formateTotal = (a,b) =>{
    const total = a * b;
    return "$" + total.toFixed(1)
}