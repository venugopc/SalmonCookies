'use strict';
var form = document.getElementById('sample_form');
var table = document.getElementById('store_table');
var data = [];
var total = 0;
let rows = new Array(13);

for (var i = 6; i <= 19; i++)
rows[i-6]=0; 

function Cookies(name,minNumCust,maxNumCust,avgCookieSale) {
    this.storeName = name;
    this.minCust = minNumCust;
    this.maxCust = maxNumCust;
    this.avgCust = avgCookieSale;
  }
Cookies.prototype.getCustCount=function(min, max, avg, index){
    min = Math.ceil(min);
    max = Math.floor(max);
    var random = 0;
    random = Math.floor(Math.random() * (max - min)) + min ; 
    random = Math.ceil(random * avg);
    total = total + random ;
     
    rows[index] += parseInt(random); 
    return random;
  }
function formData(event) 
{
  event.preventDefault();
   
  var storeName = event.target.storeName.value;
  var minCust = event.target.minCust.value;
  var maxCust = event.target.maxCust.value;
  var avgCust = event.target.avgCust.value;
   
  data.push(new Cookies(storeName, minCust, maxCust, avgCust));
  createTable();
  data.pop();
  createFooter();
  form.reset();
}

function createTable() {
  
var row;

  for (var i = 0; i < data.length; i++) 
  {       
      row = document.createElement('tr');   
      total = 0;              
      row.innerHTML = '<td style="border:2px solid black" align="left">' + data[i].storeName + '</td>' +
          '<td style="border:2px solid black" align="left">' + data[i].minCust + '</td>' +
          '<td style="border:2px solid black" align="left">' + data[i].maxCust + '</td>' +
          '<td style="border:2px solid black" align="left">' + data[i].avgCust + '</td>'; 

          for(var j=0;j<=13;j++)
           row.innerHTML += '<td style="border:2px solid black" align="left">' + data[i].getCustCount(data[i].minCust,data[i].maxCust,data[i].avgCust,j) + '</td>' 
          row.innerHTML += '<td style="border:2px solid black" align="left">' + total  + '</td>' 
    }
     
    table.appendChild(row);

    var foot=document.getElementById('footer');
    if ( foot.childNodes.length < 2)
    {
        var td=document.createElement('td')
        td.colSpan=4;
        td.style.border="2px solid black"; 
        td.align = "center";
        td.appendChild(document.createTextNode('Total'));
        foot.appendChild(td);
    }                            
}
function createFooter() {
    var foot=document.getElementById('footer');
    for (var i=0; i<=13; i++)
    {
      if( foot.childNodes.length > 2)
        foot.removeChild(foot.childNodes[2]);
    }
    for (var i=0; i<=13; i++)
    {
     var td_temp=document.createElement('td');
     td_temp.style.border="2px solid black"; 
     td_temp.appendChild(document.createTextNode(rows[i]));
     foot.appendChild(td_temp);
    }  
}
form.addEventListener('submit',formData);
 