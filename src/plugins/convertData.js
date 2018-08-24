/* eslint-disable */
export default function convertData(value){
  let c = value
  let d = c.substring(0,2)
  let m = c.substring(3,5)
  let y = c.substring(6,10)
  let dia = parseInt(d)
  let mes = parseInt(m)
  
  if(dia > 31 || mes > 12){
    Toast.create("Verifique a data, está fora do intervalo")
    return
  }
  
  let data = new Date(y + '-' + m + '-' + d + 'T00:00:00').toISOString()
  
  return data

}