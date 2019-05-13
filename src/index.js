import Chart from "chart.js"

// import du fichier Json 
const data = require('../data/anti_retroviral_drug.json');


console.log("hello");


////// CLEAN DES DATAS ///////

// pour mettre les years dans un sous tableau 

const getYears = d =>
  Array.from(Array(14)).map((d, i) => i + 2004)
  .reduce((res, year) =>
    ([ ...res, { year,  value: d[year] }]), [])

// ne prend que les données necessaires
const format = d =>({
    sexe: d.Sexe,
    country_name: d.Country_Name,
    country_code: d.Country_Code,
    years: getYears(d)
})

// controle si years est vide. (test que le premier)
const newHIV = data.HIV.map(format).filter(item => item.years[0].value !== "..");


// pour l'axe des années (Y)
var labels = newHIV[0].years.map(anne => anne.year);


// pour récupérer les noms des pays
var label = newHIV.map(pays => pays.country_name);


// récuperation hommes et femmes


const ArrayWomen = newHIV.filter(item => item.sexe == 'female(%)');
const ArrayMen = newHIV.filter(item => item.sexe == 'male(%)');

// met les données hommes au chargement
var finalTab = ArrayMen;

// Gestion du nombre de pays a ajouter

//var NB_PAYS = finalTab.length;
var NB_PAYS = 15;

///// GESTION DES BOUTONS MEN - WOMEN //////
  var ctx = document.getElementById('myChart').getContext('2d');
  //Déclaration chart par sexe 
var chartMale = new Chart(ctx,{});
var chartFemale = new Chart(ctx,{});
$(function() {                       //run when the DOM is ready
  $("#men").click(function() {  //use a class, since your ID gets mangled
    $(this).addClass("active btn-info");      //add the class to the clicked element
    $("#women").removeClass("active btn-danger");
    $("#women").addClass("btn-secondary");
    finalTab = ArrayMen; // met les données hommes dans le tableau
       var paysChartData = genDataSetBySex(NB_PAYS,finalTab);
       chartFemale.destroy();
       chartMale = plotChart(paysChartData);
  });

    $("#women").click(function() {  //use a class, since your ID gets mangled
    $(this).addClass("active btn-danger");      //add the class to the clicked element
    $("#men").removeClass("active btn-info");
    $("#men").addClass("btn-secondary");
     finalTab = ArrayWomen; // met les données femmes dans le tableau
     var paysChartData = genDataSetBySex(NB_PAYS,finalTab);   
     chartMale.destroy();   
     chartFemale = plotChart(paysChartData);
  });

});


// génère l'aperçu des données 

function plotChart(paysChartData){ 
  var ctx = document.getElementById('myChart').getContext('2d');

  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: paysChartData /*{
          labels: labels,
          datasets: [{
              label: label,
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              //data: data
                data: lineChartData
          }]
      }*/,

      // Configuration options go here
          options: {
          title: {
              display: true,
              text: 'Access to Anti-Retroviral Drugs'
          },
          scales: {
              yAxes: [{
                  ticks: {
                      // Include a % in the ticks
                      callback: function(value, index, values) {
                          return  value + ' %';
                      }
                  }
              }]
          }

      }
  });
return chart
}



// génère les datasets en fonction du tableau fourni (hommes ou femmes)
function genDataSetBySex( NB_PAYS, finalTab ){

  var paysChartData = {labels:labels, datasets:[]}; //declare un objet

  for (var pays = 0; pays < NB_PAYS; pays++) {
    var y = [];
    paysChartData.datasets.push({}); //create a new pays dataset
    var dataset = paysChartData.datasets[pays]
    dataset.label = label[pays];
    dataset.backgroundColor = "rgb("+(pays*30)%255+", "+(pays*73)%255+", "+(pays*43)%255+",0.05)"; // petit délire pour faire des couleurs un peu funky
    dataset.borderColor = "rgb("+(pays*30)%255+", "+(pays*73)%255+", "+(pays*43)%255+",0.5)";
    dataset.data = []; //contains the 'Y; axis data

    for (var x = 0; x < finalTab[pays].years.length; x++) {

      //  y.push(pays + x); //push some data aka generate 4 distinct separate payss
        y.push(finalTab[pays].years[x].value)
       // if (pays === 0)
           // paysChartData.labels.push("coucou"); //adds x axis labels
    } //for x

    paysChartData.datasets[pays].data = y; //send new line data to dataset
} //for line

  return paysChartData;
}



// appelle de genDataSetBySex
var paysChartData = genDataSetBySex(NB_PAYS,finalTab)

// appelle de plotChart
plotChart(paysChartData);
