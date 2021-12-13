const labels =["Jan","Feb","Mar","Apr","May","June","July"];
const chartjs = require ('chart.js');
let returncount = 0;
let supersector = {
  "00": "Total nonfarm",
  "05": "Total private",
  //"06": "Goods-producing",
  //"07": "Service-providing",
  //"08": "Private service-providing",
  //"10": "Mining and logging",
  //"20": "Construction",
  //"30": "Manufacturing",
  //"31": "Durable Goods",
  //"32": "Nondurable Goods",
  //"40": "Trade, transportation and utilities",
  //"41": "Wholesale trade",
  //"42": "Retail Trade",
  //"43": "Transportaion and warehousing",
  //"44": "Utilities",
  //"50": "Information",
  //"55": "Financial activities",
  //"60": "Professional and business services",
  //"65": "Education and health services",
  //"70": "Leisure and hospitality",
  //"80": "Other services",
  //"90": "Government"}
}
let Supersector_Keys= Object.keys(Supersector_Code);
// These are colors from chart.js utils
    const CHART_COLORS = {
      red: 'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 205, 86)',
      green: 'rgb(75, 192, 192)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)',
      babypink:'rgb(255,191,191)',
      lightblue: 'rgb(30,162,255)',
      neonpink:'rgb(255,0,108)',
      coral: 'rgb(255,87,51)',
      darkgreen: 'rgb(49,152,20)',
      indigo:'rgb(53,20,152)',
      lightgrey: 'rgb(182,174,174)',
      maroon: 'rgb(150,75,75)',
      neongreen: 'rgb(0,255,18)',
      lightorange: 'rgb(255,193,115)',
      lightyellow: 'rgb(255,252,98)',
      darkgrey:'rgb(112,112,112)',
      lavender: 'rgb(210,191,250)',
      teal: 'rgb(0,255,249)',
      black: 'rgb(0,0,0)'
    };
//    console.dir(CHART_COLORS);
let CHART_COLORS_Keys= Object.keys(CHART_COLORS)
    const CHART_COLORS_50_Percent = {
      red: 'rgba(255, 99, 132, 0.5)',
      orange: 'rgba(255, 159, 64, 0.5)',
      yellow: 'rgba(255, 205, 86, 0.5)',
      green: 'rgba(75, 192, 192, 0.5)',
      blue: 'rgba(54, 162, 235, 0.5)',
      purple: 'rgba(153, 102, 255, 0.5)',
      grey: 'rgba(201, 203, 207, 0.5)',
      babypink:'rgb(255,191,191,0.5)',
      lightblue: 'rgb(30,162,255,0.5)',
      neonpink:'rgb(255,0,108,0.5)',
      coral: 'rgb(255,87,51,0.5)',
      darkgreen: 'rgb(49,152,20,0.5)',
      indigo:'rgb(53,20,152,0.5)',
      lightgrey: 'rgb(182,174,174,0.5)',
      maroon: 'rgb(150,75,75,0.5)',
      neongreen: 'rgb(0,255,18,0.5)',
      lightorange: 'rgb(255,193,115,0.5)',
      lightyellow: 'rgb(255,252,98,0.5)',
      darkgrey:'rgb(112,112,112,0.5)',
      lavender: 'rgb(210,191,250,0.5)',
      teal: 'rgb(0,255,249,0.5)',
      black: 'rgb(0,0,0,0.5)'
    };
//    console.log(CHART_COLORS_50_Percent);
//    end utils
 let CHART_COLORS_50_Percent_Keys= Object.keys(CHART_COLORS_50_Percent)

    const data = {
      labels: [],
      datasets: []
    };
  //  console.dir(data);

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Employees in Thousands'
          }
        }
      }
    };
//    console.log(config);
// 93ec62bd557e420887e7e79906067fa7
function responseReceivedHandler() {
    if (this.status == 200){
      console.log(this.response);
      let sectorline= {
        label: "",
        data:[],
        borderColor: "",
        backgroundColor:"",
        hidden:true
      }

    let dataArray= this.response.Results.series[0].data;
    let seriesID= this.response.Results.series[0].seriesID


      sectorline.label= (Supersector_Code[seriesID.substring(3,5)])
      sectorline.borderColor= (CHART_COLORS_Keys[returncount])
      sectorline.backgroundColor=(CHART_COLORS_50_Percent_Keys[returncount])


    for (let i = dataArray.length - 1; i >= 0; i--){
        sectorline.data.push(dataArray[i].value)
        if (returncount ==0){
                  data.labels.push(dataArray[i].periodName + " " + dataArray[i].year)
      }
    }

    data.datasets.push(sectorline)
    returncount++

      /*  if (returncount == Supersector_Keys.length){
          const myChart = new Chart(
          document.getElementById('myChart'),
          config);
       }
       } else{
        console.log("error");
      }
    } */

    const myChart = new Chart(
    document.getElementById('myChart'),
    config);

for (let i=0; i < Supersector_Keys.length; i++){
  let xhr = new XMLHttpRequest();
  xhr.addEventListener("load", responseReceivedHandler);
  xhr.responseType="json";
  let start= "https://api.bls.gov/publicAPI/v2/timeseries/data/CEU";
  let end= "00000001?registrationkey=b2d2a22de4064f5a83ab8e64a2d070f9";
  xhr.open("GET", start+ Supersector_Keys[i] + end)
  xhr.send();
}
//    console.dir(myChart);
//    console.log("Ending");
