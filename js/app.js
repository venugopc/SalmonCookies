'use strict';
function Cookies(name,minNumCust,maxNumCust,avgCookieSale) {
  this.name = name;
  this.minNumCust = minNumCust;
  this.maxNumCust = maxNumCust;
  this.avgCookieSale = avgCookieSale;
}
Cookies.prototype.getCustCount=function(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
}

var firstandpike = new Cookies('1st and Pike',23,65,6.3);
var seatac = new Cookies('SeaTac Airport',3,24,1.2);
var seattlecenter = new Cookies('Seattle Center',11,38,3.7);
var capitolhill = new Cookies('Capitol Hill',20,38,2.3);
var alki = new Cookies('Alki',2,16,4.6);
let rows = new Array(13);
var stores = [firstandpike, seatac, seattlecenter, capitolhill, alki];  

var myTable = document.getElementById('Sales-Table');
createHeaderOrFooter(1,'th','Location','Daily Location Total',rows,6,19);

  var numCust;
  var numCookies;
  var storeCount =0;

  for (var i = 6; i <= 19; i++)
        rows[i-6]=0;  

  while (storeCount < stores.length) {
    var totCookies = 0;
    var tr = createRow(0);
    createColumn('td',stores[storeCount].name,tr);    
    
  for (var j = 6; j <= 19; j++)
   {              
    numCust = stores[storeCount].getCustCount(stores[storeCount].minNumCust,stores[storeCount].maxNumCust);
    numCookies = Math.ceil(numCust * stores[storeCount].avgCookieSale);                      
    totCookies = totCookies + numCookies;
    createColumn('td',numCookies,tr); 
    rows[j-6]+= parseInt(numCookies);
  }
    createColumn('td',totCookies,tr);    
    myTable.appendChild(tr);

  storeCount = storeCount + 1;
}
createHeaderOrFooter(0,'td','Total',' ',rows,0,rows.length-1); 

function createHeaderOrFooter(rowType,headerType,firstColumnHeader,lastColumnHeader,dataArray,startIndex,endIndex){    
  var tr = createRow(rowType);
  createColumn(headerType,firstColumnHeader,tr);  
  for (var i=startIndex; i<=endIndex;i++) {  
    if (rowType) {
    var time = (i < 12) ? i + ' am' : (i==12) ? i + ' pm' :  (i-12) + ' pm';
    createColumn(headerType,time,tr);   
    } else  {
    createColumn(headerType,dataArray[i],tr);          
    }      
  }
  createColumn(headerType,lastColumnHeader,tr);   
  myTable.appendChild(tr);    
};

function createRow(flag) {
  var tr = document.createElement('tr');
  tr.style.border="2px solid black";
  if(flag)
  tr.style.backgroundColor='grey';
  return tr;
};

function createColumn(columnType,nodeText,rowRef) {  
  var col = document.createElement(columnType);  
  col.style.border="2px solid black";  
  col.style.textAlign="left";   
  var data = document.createTextNode(nodeText); 
  col.appendChild(data)
  rowRef.appendChild(col);
};








