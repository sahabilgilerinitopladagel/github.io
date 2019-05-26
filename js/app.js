 var ilce="ilce";
 let keyupdate="";
 let email;
 let password;
 let sheetname="Sheet1",dosyaname="exelfile.xlsx";

 // Your web app's Firebase configuration
 var firebaseConfig = {
   apiKey: "AIzaSyClzSJ_f9pstOLeQmSimKJkcCZ7L6gkpmo",
   authDomain: "envarter-fe4bc.firebaseapp.com",
   databaseURL: "https://envarter-fe4bc.firebaseio.com",
   projectId: "envarter-fe4bc",

 };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  function girisyap(value) {
   email=document.getElementById("email").value;
   password=document.getElementById("password").value;
   firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
    if(value){

      localStorage.setItem("checkbox",email );
    }
    else{
      localStorage.removeItem("checkbox");
    }
    sessionStorage.setItem("deneme", "deneme"); 
    window.location="main.html";  
  }).catch(function(error) {
   swal({
     title: "İşlem Sonucu",
     text: "Şifre yada kullanıcı adını kontrol et",
     type: "error",
     confirmButtonText:"Tekrar Dene",
   });
  // An error happened.
});
}



function doldur(){

  firebase.auth().onAuthStateChanged(function(user) {
   if (user) {
     document.getElementById("profilnanespan").innerHTML=user.email;
   } else {
     window.location="index.html";
   }
 });
  
}



let exeldata=[];
let exelvalue=[];

function tabloxyz(key){
  let t = document.querySelector("tbody");
  let thead = document.querySelector("thead");
  let newRow; 
  let newCell=[]; 
  let newText;
  let time=  new Date();
  let exelobj={};
  let keys=document.getElementById(key).getElementsByClassName("form-control");

  var verilengh=0;
  t.innerHTML="";
  exeldata=[];
  exelvalue=[];

/*
Burada tablo başlıları yazdırılıyor
*/
newRow = thead.insertRow(-1);
for (var i = 0; i < keys.length; i++) {
  newCell[i] = newRow.insertCell(-1);
  newCell[i].innerHTML="<b>"+keys[i].id.toUpperCase()+"</b>";
  exelobj[keys[i].id]=keys[i].id;
}
exelvalue.push(exelobj);
/*
Burada tablo başlıları yazdırılıyor
*/



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

   var getdata=firebase.database().ref().child(key);
   getdata.once('value', function(snapshot) {
     snapshot.forEach(function(childSnapshot) {
       var childData = childSnapshot.val();
       sheetname=key;
       dosyaname=key+time.getTime()+".xlsx";
       var obj = {};
       exelobj={};
       for (var i = 0; i < keys.length; i++) {
        

         obj[keys[i].id]=childData[keys[i].id];
         exelobj[keys[i].id]=childData[keys[i].id];
       
        obj["key"]=childSnapshot.key;

      }

          exeldata.push(obj);
          exelvalue.push(exelobj);
          if(verilengh==snapshot.numChildren()-1){
           exeldata.sort(function (a, b) {
             return a.il.localeCompare(b.il);
           });
           var buttonvalue="";
              //console.log(exeldata);
              exeldata.forEach(function(element) { 
                buttonvalue="";
                newRow = t.insertRow(-1);
                for (var i = 0; i < keys.length; i++) {
                  newCell[i] = newRow.insertCell(-1);
                  newCell[i].appendChild(document.createTextNode(element[keys[i].id]));
                  buttonvalue+=element[keys[i].id]+",";
                }
                var asd=document.createElement("div");
                asd.innerHTML="<span style='margin-left:10px;><span><div class='row'><button class='btn btn-danger btn-circle' onclick='sil(this.id,this.name)' name='"+key+"' id='"+element.key+"' > <i class='fas fa-trash'></i> </button> <button style='margin-left: 5px' class='btn btn-success btn-circle' data-toggle='modal' data-target='#"+key+"' onclick='updatedoldur(this.name,this.value,this.id)' name='"+key+"' id='"+element.key+"' value='"+buttonvalue+"'> <i class='fas fa-check'></i> </button></div>";      
                newCell[6] = newRow.insertCell(-1);
                newCell[6].appendChild(asd);
                element.key="";
                
              });

            }
            verilengh++;


           });//childSnapshot
     pagination();

     });//snapshot


 } 

 else {
  window.location="main.html";
}
});


}

function updatedoldur(id,data,key){
var elementid=document.getElementById(id).getElementsByClassName("form-control");
  data=data.split(",");
  ildoldur(elementid[0]);
  ilcedoldur(data[0],elementid[1]);
  for (var i = 0; i < elementid.length; i++) {
    elementid[i].value=data[i];
   
  }
  
  keyupdate=key;
}

function ildoldur(key){
  var il = key;
  var option;

  for (var i = 0; i < data.length; i++) {
   option = document.createElement("option");
   option.text = data[i].il;
   option.value== data[i].il; 
   try {
     il.add(option);
   } catch(e) {
              // statements
              console.log(e);
            }

          }
        }

        function update(dbname){
          let all=true;
          let columndata={};
          var elementid=document.getElementById(dbname).getElementsByClassName("form-control");
          for (var i = 0; i < elementid.length; i++) {
            if(elementid[i].value==="")
              all=false;
            columndata[elementid[i].id]=elementid[i].value;
          }
          if(all){

            firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
               firebase.database().ref().child(dbname).child(keyupdate).set(
                columndata
                , function(error) {
                  if (error) {
                    swal({
                     title: "Hata!!!",
                     text: error,
                     type: "error",
                     confirmButtonText:"Tamamla",
                   });
                  } else {
                    swal({
                     title: "İşlem Sonucu",
                     text: "İşlem Başarılı",
                     type: "success",
                     confirmButtonText:"Tamamla",
                   });
                    ekle(tablolar.tablo,dbname);
                  }
                });

             }
           });
          }
          else{
            swal({
             title: "Hata!!!",
             text: "Tüm alanları doldurunuz",
             type: "error",
             confirmButtonText:"Tamamla",
           });
          }
        }


        function sil(key,dbname){
          if(window.confirm("Silmek İstediğinize Emin misiniz?")){
           firebase.database().ref().child(dbname).child(key).remove();
           
             ekle(tablolar.tablo,dbname);
           

        }
      }

      function logout(){

        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {

           firebase.auth().signOut().then(function() {
            sessionStorage.removeItem("deneme");
            sessionStorage.clear();
            window.location="index.html";
          }).catch(function(error) {
  // An error happened.
}); 


        } else {
    // No user is signed in.
  }
});

      }


      function kaydet(name){
       
        var elementid=document.getElementById(name).getElementsByClassName("form-control");
       let all=true;
       let columndata={};
       for (var i = 0; i < elementid.length; i++) {
        if(name[i]==="aselsanmi"){
          columndata[elementid[i]]=elementid[i].checked;
        }
        else{
        if(elementid[i].value===""&&elementid[i]!="aciklama")
          all=false;
        columndata[elementid[i].id]=elementid[i].value;
         } 
      }
      if(all){

        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
           firebase.database().ref().child(name).push(
            columndata
            , function(error) {
              if (error) {
                swal({
                 title: "Hata!!!",
                 text: error,
                 type: "error",
                 confirmButtonText:"Tamamla",
               });
              } else {
                swal({
                 title: "İşlem Sonucu",
                 text: "İşlem Başarılı",
                 type: "success",
                 confirmButtonText:"Tamamla",
               });
              }
            });

         }
       });
      }
      else{
        swal({
         title: "Hata!!!",
         text: "Tüm alanları doldurunuz",
         type: "error",
         confirmButtonText:"Tamamla",
       });
      }

    }


    var tablolar=
    {
      "tablo":"<div class='card shadow mb-4'> <div class='card-header py-3'><h6 class='m-0 font-weight-bold text-primary'>Detay Tablo</h6> </div>   <div class='col-sm-12'><div class='card-body'> <div class='table-responsive'> <table class='table table-bordered' id='myTable'> <thead> </thead> <tbody > </tbody></table> </div> </div> </div></div> </div>",
      "kamera":"<!-- Page Heading --> <div class='card shadow mb-4'><div class='card-header py-3'> <h6 class='m-0 font-weight-bold text-primary'>Kamera ekleme işlemleri</h6> </div> <div class='card-body'> <form id='cameradetay'> <div class='form-row'> <div class='form-group col-md-6'> <label for='il'>İl</label> <select id='il' class='form-control' onchange='ilcedoldur(this.value,document.getElementById(this.name))' name='ilce'> <option disabled selected value>Bir il Seçiniz</option> </select> </div> <div class='form-group col-md-6'> <label for='ilce'>İlçe</label> <select id='ilce' class='form-control'> <option disabled selected value>Bir ilçe Seçiniz</option> </select> </div> <div class='form-group col-md-6'> <label for='marka'>Kamera Marka</label> <input type='text' class='form-control' id='marka' placeholder='Kamera Marka giriniz'> </div> <div class='form-group col-md-6'> <label for='model'>Kamera Modeli</label> <input type='text' class='form-control' id='model' placeholder='Kamera Model giriniz'> </div> <div class='form-group col-md-6'> <label for='mc'>Tip</label> <select id='tip' class='form-control'> <option disabled selected value>Kamera tipini seçiniz</option> <option value='Sabit'>Sabit</option> <option value='Hareketli'>Hareketli</option><option value='Encoder'>Encoder</option> <option value='Lazer'>Lazer</option> <option value='Termal'>Termal</option> </select> </div> <div class='form-group col-md-6'> <label>Adet </label> <input type='number' class='form-control' id='adet' placeholder='Kamera adetini giriniz!!!'> </div> <div class='form-group col-md-6'> <label for='sm'>Sistem manager</label> <input type='text' class='form-control' id='sm' placeholder='Aselsan NVRa kayıt yapıyorsa Aselsan yazınız!! '> </div><div class='form-group col-md-6'> <label for='sm'>Kayıt Süresi</label> <input type='text' class='form-control' id='kayit' placeholder='Mevcut NVRa kayıt süresini yazınız!! '> </div> </div> <div class='form-row'> <div class='form-group col-md-6'> <label for='mc'>Multicast Desteği</label> <select id='mc' class='form-control'> <option value='Var' selected>Var</option> <option value='Yok'>Yok</option> </select> </div> <div class='form-group col-md-6'> <label for='aciklama'>Açıklama</label> <input type='text' class='form-control' id='aciklama'> </div> </div> <div class='form-group'> <div class='form-check'> <input class='form-check-input' value='Aselsan' type='checkbox' id='aselsanmi'> <label class='form-check-label' for='aselsanmi'> Aselsan NVR'a kayıt yapıyor mu? </label> </div> </div> <button type='button' class='btn btn-primary' onclick='kaydet(this.name)' value='cameradetay' >Kaydet</button> </form> </div> </div>",
      "nir":"<div class='card shadow mb-4'> <div class='card-header py-3'> <h6 class='m-0 font-weight-bold text-primary'>PTS Depolama İçin Cihaz Ekle</h6> </div> <div class='card-body'> <form id='nirdetay'> <div class='form-row'> <div class='form-group col-md-6'> <label >İl</label> <select id='il' class='form-control' onchange='ilcedoldur(this.value,document.getElementById(this.name))' name='ilce'> <option disabled selected value>Bir il Seçiniz</option> </select> </div> <div class='form-group col-md-6'> <label>İlçe</label> <select id='ilce' class='form-control'> <option disabled selected value>Bir ilçe Seçiniz</option> </select> </div> <div class='form-group col-md-6'> <label>Depolama Ünitesi Seçiniz</label> <select id='depolama' class='form-control'> <option disabled selected value>Depolama Ünitesi Seçiniz</option> <option value='NIR96'>NIR96</option> <option value='NIR54'>NIR54</option> <option value='CIR96'>CIR96</option> <option value='CIR216'>CIR216</option> <option value='NVR'>NVR</option> </select> </div> <div class='form-group col-md-6'> <label>Seri Numarasını Giriniz </label> <input type='text' class='form-control' id='serino' placeholder=''> </div> <div class='form-group col-md-6'> <label>Versiyon Bilgisini Giriniz </label> <input type='text' class='form-control' id='versiyon' placeholder=''> </div> <div class='form-group col-md-6'> <label>PTS sunucu ip adresini Giriniz </label> <input type='text' class='form-control' id='pts' placeholder=''> </div> <div class='form-group col-md-6'> <label>Servis ip adresi </label> <input type='text' class='form-control' id='servisip' placeholder=''> </div> <div class='form-group col-md-6'> <label>Cihaz ip adresi </label> <input type='text' class='form-control' id='ip' placeholder=''> </div> <div class='form-group col-md-6'> <label>Cihaz IPMI ip adresi</label> <input type='text' class='form-control' id='ipmi' placeholder=''> </div> <div class='form-group col-md-6'> <label>Hostname adını Giriniz </label> <input type='text' class='form-control' id='hostname' placeholder='Örnek nir1'> </div> <div class='form-group col-md-6'> <label>Management Address </label> <input type='text' class='form-control' id='management' placeholder=''> </div> <div class='form-group col-md-6'> <label for='ntp'>NTP adresi</label> <input type='text' class='form-control' id='ntp'> </div> </div> <button type='button' class='btn btn-primary' onclick='kaydet(this.value)' value='nirdetay' >Kaydet</button> </form> </div> </div>",
      "swnvr":"<div class='card shadow mb-4'> <div class='card-header py-3'> <h6 class='m-0 font-weight-bold text-primary'>Switch ve NVR Ekle</h6> </div> <div class='card-body'> <form id='swnvrdetay'> <div class='form-row'> <div class='form-group col-md-6'> <label >İl</label> <select id='il' class='form-control' onchange='ilcedoldur(this.value,document.getElementById(this.name))' name='ilce'> <option disabled selected value>Bir il Seçiniz</option> </select> </div> <div class='form-group col-md-6'> <label>İlçe</label> <select id='ilce' class='form-control'> <option disabled selected value>Bir ilçe Seçiniz</option> </select> </div> <div class='form-group col-md-6'> <label>switch Tipini Seçiniz</label> <select id='swtip' class='form-control'> <option disabled selected value>switch Tipini Seçiniz</option> <option value='A'>A</option> <option value='B'>B</option> <option value='C'>C</option> </select> </div> <div class='form-group col-md-6'> <label>switch Marka Seçiniz</label> <select id='swmarka' class='form-control'> <option disabled selected value>switch Marka Seçiniz</option> <option value='Cisco'>Cisco</option> <option value='Extreme'>Extreme</option> <option value='Juniper'>Juniper</option> <option value='Aselsan'>Aselsan</option> </select> </div> <div class='form-group col-md-6'> <label>switch Model Seçiniz</label> <select id='swmodel' class='form-control'> <option disabled selected value>switch Model Seçiniz</option> <option value='4500x'>4500x</option> <option value='x460'>x460</option> <option value='Ex4200'>Ex4200</option> <option value='Ex4300'>Ex4300</option> <option value='Aselsan'>Aselsan</option> </select> </div> <div class='form-group col-md-6'> <label>Adet</label> <input type='number' class='form-control' id='swadet' placeholder='Switch adetini giriniz'> </div> <div class='form-group col-md-6'> <label>NVR Boyutunu Seçiniz</label> <select id='nvrboyut' class='form-control'> <option disabled selected value>NVR Boyutunu Seçiniz</option> <option value='96TB'>96TB</option> <option value='64TB'>64TB</option> <option value='yok'>Yoktur</option></select> </div> <div class='form-group col-md-6'> <label>NVR Adet</label> <input type='number' class='form-control' id='nvradet' placeholder='NVR adetini giriniz'> </div> </div> <button type='button' class='btn btn-primary' onclick='kaydet(this.value)' value='swnvrdetay'>Kaydet</button> </form> </div> </div>",
      "kablosuz":"<div class='card shadow mb-4'> <div class='card-header py-3'> <h6 class='m-0 font-weight-bold text-primary'>Kablosuz Cihaz Ekle</h6> </div> <div class='card-body'> <form id='kablosuzdetay'> <div class='form-row'> <div class='form-group col-md-6'> <label for='il'>İl</label> <select id='il' class='form-control' onchange='ilcedoldur(this.value,document.getElementById(this.name))' name='ilce'> <option disabled selected value>Bir il Seçiniz</option> </select> </div> <div class='form-group col-md-6'> <label for='ilce'>İlçe</label> <select id='ilce' class='form-control'> <option disabled selected value>Bir ilçe Seçiniz</option> </select> </div> <div class='form-group col-md-6'> <label for='marka'>Kablosuz Marka</label> <select id='marka' class='form-control'> <option disabled selected value>Kablosuz Marka seçiniz</option> <option value='Radwin'>Radwin</option> <option value='Redline'>Redline</option> <option value='SAF'>SAF 23 GHZ</option> </select> </div> <div class='form-group col-md-6'> <label for='model'>Kablosuz Modeli</label> <input type='text' class='form-control' id='model' placeholder='Kablosuz Model giriniz'> </div> <div class='form-group col-md-6'> <label for='mc'>Tip</label> <select id='tip' class='form-control'> <option disabled selected value>Kablosuz tipini seçiniz</option> <option value='Baz' selected>Baz</option> <option value='23GHZ'>23GHZ</option> <option value='p2p'>p2p</option> </select> </div> <div class='form-group col-md-6'> <label>Adet </label> <input type='number' class='form-control' id='adet' placeholder='Kablosuz adetini giriniz!!!'> </div> </div> <div class='form-row'> <div class='form-group col-md-6'> <label for='aciklama'>Açıklama</label> <input type='text' class='form-control' id='aciklama'> </div> </div> <button type='button' class='btn btn-primary' onclick='kaydet(this.value)' value='kablosuzdetay'>Kaydet</button> </form> </div> </div>",
    };
function ekle(tabloicerik,dbname){//key= hangi tablonun dolacağı
                                                     //dbname veri tabanı ismi geliyor  
 document.getElementById("icerik").innerHTML="";      //neyidolsur veri tabanı column isimleri , neyegoredoldur fonksiyona link bilgisi
 document.getElementById("icerik").innerHTML=tabloicerik;
 if(dbname==="asd"){
  var il = document.getElementById("il"); 
  var option;
  for (var i = 0; i < data.length; i++) {
   option = document.createElement("option");
   option.text = data[i].il;
   option.value== data[i].il; 
   il.add(option);
 }
}
else{
  tabloxyz(dbname);
}

}


function ilcedoldur(value,element){
 var ilce = element;
 ilce.innerHTML="<option disabled selected value>Bir ilçe Seçiniz</option>";      

 var option;
 for (var i = 0; i < data.length; i++) {
  if(data[i].il===value){
    for (var y = 0; y < data[i].ilceleri.length; y++) {
     option = document.createElement("option");
     option.text = data[i].ilceleri[y];
     option.value== data[i].ilceleri[y]; 
     ilce.add(option); 
   }

 }
} 

}

function exel(){
 // alert(dosyaname);

 var wb = XLSX.utils.book_new();

 var ws = XLSX.utils.json_to_sheet(exelvalue, {skipHeader: 1});

 XLSX.utils.book_append_sheet(wb, ws, sheetname);

 var wbout = XLSX.write(wb, {bookType:'xlsx', type:'array'});
 saveAs(new Blob([wbout],{type:"application/octet-stream"}), dosyaname);

}

