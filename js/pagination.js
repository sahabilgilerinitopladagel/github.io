let rowcount;
let viewrowcount=10;
let pagecount;
let ii=0;
let columndata=[]; 
let rows;
let th;
var table;
var columdatatemp;
let vtable=document.createElement('tbody');

function pagination(){
//pagination
table = document.getElementById("myTable");
vtable.innerHTML=table.getElementsByTagName("tbody")[0].outerHTML;
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
 table.insertAdjacentHTML("beforebegin","<div class='navbar navbar-expand-lg navbar-light bg-light'> <button class='navbar-toggler' type='button' data-toggle='collapse'"+
  " data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false'"+
  " aria-label='Toggle navigation'><span class='navbar-toggler-icon'></span> </button>"+
  "<div class='collapse navbar-collapse' id='navbarSupportedContent'> <ul class='navbar-nav mr-auto'>"+
  " <li class='nav-item dropdown'> <a class='nav-link dropdown-toggle' href='#' id='navbarDropdown' "+
  "role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'> Listele </a>"+
  " <div class='dropdown-menu' aria-labelledby='navbarDropdown'> <a class='dropdown-item' onclick=(rowcountFunc(5))>5</a> "+
  "<a class='dropdown-item' onclick=(rowcountFunc(10))>10</a> <a class='dropdown-item' onclick=(rowcountFunc(25))>25</a>"+
  "<a class='dropdown-item' onclick=(rowcountFunc(50))>50</a><a class='dropdown-item' onclick=(rowcountFunc(100))>100</a>"+
  " </div> </li> <li class='nav-item'> <button type='button' class='btn btn-outline-info my-2 my-sm-0' onclick='exel()'> Exel</button> </li> </ul>"+
  " <form class='form-inline my-2 my-lg-0'> <input  class='form-control mr-sm-2'  placeholder='Ara'"+
  " aria-label='Search' onkeyup='search(this.value)' id='tableara'>"+
  " <button class='btn btn-outline-success my-2 my-sm-0' type='button' >Ara</button> "+
  "</form> </div> </div>");
 table.insertAdjacentHTML("afterend","<div class='col-sm-12'> <div class='row'>"+
  " <div class='col-sm-6 col-md-6' id='showing'> </div> <div class='col-sm-6 col-md-6 ' > <nav aria-label='Page navigation example '>"+
  "<ul  id='btngrup' class='pagination justify-content-end'></ul></nav> </div> </div> </div>");
 /*table.insertAdjacentHTML("beforebegin","<div class='col-sm-12'> <div class='row'>"+
  "<div class='col-sm-6 col-md-2'> <select onchange='rowcountFunc(this.value)' class='custom-select custom-select-sm form-control form-control-sm'>"+
  "<option value='5'>5</option><option value='10' selected>10</option>"+
  "<option value='25'>25</option><option value='50'>50</option><option value='100'>100</option></select> "+
  "</div><div class='col-sm-1 col-md-1'>"+
  " <button type='button' style= 'margin-bottom: 20px;' class='btn btn-primary'onclick='exel()'>Exel</button> </div>"+
  "<div class='col-md-6' style='display: flex; justify-content: flex-end'>"+
  " <input type='text'  class='form-control' onkeyup='search(this.value)'></div></div></div>");*/
 columdatatemp=columndata;
 sort(1); 
}
function rowcountFunc(value){
  viewrowcount=parseInt(value);
  pagecount=Math.ceil((rowcount-1)/viewrowcount);
  sort(1);
}
function search(value){
  //alert(vtable.innerHTML);


  columndata=[];
  ii=0;
  var td,tr;
  if(value!==""){
  value = value.toLowerCase();
   tr = vtable.getElementsByTagName("tr");
   for (var i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (var j = 0; j < td.length; j++) {
            if (td[j].innerHTML.toLowerCase().indexOf(value) > -1) {
                columndata[ii]=tr[i].outerHTML;
                ii=ii+1;
                break;
            }
        }
        
    }
    rowcount=columndata.length;
    pagecount=Math.ceil((rowcount)/viewrowcount);//sayfa sayısı
    sort(1);
   }
   else{
    columndata=columdatatemp;
     rowcount=columndata.length;
     pagecount=Math.ceil((rowcount-1)/viewrowcount);//sayfa sayısı
    sort(1);
   }
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
      else{
         document.getElementById("btngrup").innerHTML = "";
      document.getElementById("showing").innerHTML="Gösteilecek sonuç bulunamadı."

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
var butonlar="<li class='page-item "+geri+"' > <a class='page-link' onclick='sort("+(currentpage + 1)+")' >Geri</a> </li>"; 
 if(currentpage<=3){
  sag=7;
}else{
   butonlar+="<li class='page-item'><a class='page-link' onclick='sort(1)'>1</a></li>";
   butonlar+="<li class='page-item disabled' ><a class='page-link '>...</a></li>";
   sol=sol+1;
  
}


 
for (var i =sol; i <=sag ;i++) {
if(i>0&&i<=pagecount){
  if(currentpage===i){
    butonlar += "<li class='page-item active'><a class='page-link ' onclick='sort("+i+")'>"+i+"</a></li>";
    }
    else{
  butonlar += "<li class='page-item'><a class='page-link' onclick='sort("+i+")'>"+i+"</a></li>"; 
      }
  }         
                                   }                                   
 
if(sag>=pagecount){
  sol=pagecount-6;
}
else{
   butonlar+="<li class='page-item disabled' ><a class='page-link disabled'>...</a></li>";
   butonlar+="<li class='page-item'><a class='page-link' onclick='sort("+pagecount+")'>"+pagecount+"</a></li>";
  sag=sag+1;
}
   butonlar += " <li class='page-item "+ileri+"'><a class='page-link' onclick='sort("+(currentpage + 1)+")' >İleri</a></li>";
   

 return butonlar;
 
}

