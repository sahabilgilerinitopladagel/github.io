let rowcount;
let viewrowcount;
let pagecount;
let ii=0;
let columndata=[]; 
let rows;
let th;
var table;

function pagination(){
//pagination
table = document.getElementById("myTable");

rowcount=table.rows.length;//tablo satır sayısı
columndata=[];

  // statements
viewrowcount=10;//görüntülenmek istenen satır
pagecount=Math.ceil((rowcount-1)/viewrowcount);//sayfa sayısı
 th=table.rows[(0)].outerHTML;
 ii=0;

 for (var i = 1; i < rowcount; i++) {
   columndata[ii]= table.rows[i].outerHTML;
   ii=ii+1;
   
 }
 table.insertAdjacentHTML("afterend"," <div class='col-sm-12'> <div class='row'> <div class='col-sm-8 col-md-5' id='showing'> </div> <div class='col-sm-8 col-md-7' style='display: flex; justify-content: flex-end'> <div class='btn-group ' id='btngrup' > </div> </div> </div></div>");
 table.insertAdjacentHTML("beforebegin","<div class='col-sm-12'> <div class='row'><div class='col-sm-6 col-md-2'> <div>  <select onchange='rowcountFunc(this.value)' class='custom-select custom-select-sm form-control form-control-sm'><option value='5'>5</option><option value='10' selected>10</option><option value='25'>25</option><option value='50'>50</option><option value='100'>100</option></select> </div></div><div class='col-sm-1 col-md-1'> <button type='button' style= ' margin-bottom: 20px;' class='btn btn-primary'onclick='exel()' >Exel</button></div></div></div>");
 sort(1); 
}
function rowcountFunc(value){
  viewrowcount=parseInt(value);
  pagecount=Math.ceil((rowcount-1)/viewrowcount);
  sort(1);
}



function sort(currentpage){
 var i=0;
  s = (viewrowcount * currentpage)-viewrowcount;
rows=th;  
  for (i = s; i < (s+viewrowcount)&& i<columndata.length; i++)
  rows+=columndata[i];
  table.innerHTML=rows;
  try {
      if(pagecount>0){
      document.getElementById("btngrup").innerHTML = sayfabutton(pagecount,currentpage);
      document.getElementById("showing").innerHTML="Toplam "+(columndata.length)+" satırdan "+(s+1)+" ile "+i+" arası gösteriliyor."
      }
  } catch(e) {
    // statements
    console.log(e);
  }
  


}
  

var sag;
var sol;

function sayfabutton(pagecount,currentpage){
 geri=(currentpage==1)?"disabled":"";
 ileri=(currentpage==pagecount)?"disabled":"";
 sol=currentpage-3;
 sag=currentpage+3
var butonlar="<button type='button' class='btn btn-default btn-outline waves-effect' onclick='sort("+(currentpage - 1)+")' "+geri+" ><i class='fa fa-chevron-left'></i></button>"; 
 if(currentpage<=3){
  sag=7;
}else{
   butonlar+="<button type='button' class='btn btn-default btn-light btn-outline waves-effect' onclick='sort(1)' "+geri+" >1</button>";
   butonlar+="<button type='button' class='btn btn-default btn-light btn-outline waves-effect' disabled "+geri+" >...</button>";
   sol=sol+1;
  
}


 
for (var i =sol; i <=sag ;i++) {
if(i>0&&i<=pagecount){
  if(currentpage===i){
    butonlar += "<button type='button'  class='btn btn-default btn-info btn-outline waves-effect ' onclick='sort("+i+")' "+i+" > "+i+"</button>";
    }
    else{
  butonlar += "<button type='button'  class='btn btn-default btn-light btn-outline waves-effect ' onclick='sort("+i+")' "+i+" > "+i+"</button>"; 
      }
  }         
                                   }                                   
 
if(sag>=pagecount){
  sol=pagecount-6;
}
else{
   butonlar+="<button type='button' class='btn btn-default btn-light btn-outline waves-effect' disabled  >...</button>";
   butonlar+="<button type='button' class='btn btn-default btn-light btn-outline waves-effect' onclick='sort("+pagecount+")' >"+pagecount+"</button>";
  sag=sag+1;
}
   butonlar += "<button type='button'  class='btn btn-default btn-outline waves-effect ' onclick='sort("+(currentpage + 1)+")' "+ileri+" ><i class='fa fa-chevron-right'></button>";
   

 return butonlar;
 
}

