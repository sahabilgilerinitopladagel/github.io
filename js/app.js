
  // Your web app's Firebase configuration
  var firebaseConfig = {
  	apiKey: "AIzaSyClzSJ_f9pstOLeQmSimKJkcCZ7L6gkpmo",
  	authDomain: "envarter-fe4bc.firebaseapp.com",
  	databaseURL: "https://envarter-fe4bc.firebaseio.com",
  	projectId: "envarter-fe4bc",
  	
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var email;
  var password;

  function girisyap() {
   email=document.getElementById("email").value;
   password=document.getElementById("password").value;
   firebase.auth().signInWithEmailAndPassword(email, password).then(function() {

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
    break;
      yolla();
    }
  });
  
}
function yolla(){
   window.location="index.html";
    
}
function kameradetaydoldur(){
  var t = $('#myTable').DataTable({
     "iDisplayLength":10,
        dom: 'Bfrtip',
        buttons: [
        'excel',
        ]
     
    });
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      document.getElementById("profilnanespan").innerHTML=user.email;

      var getdata=firebase.database().ref().child("cameradetay");
      getdata.on('value', function(snapshot) {
       snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();

          t.row.add( [
            childData.il,
            childData.ilce,
            childData.marka,
            childData.model,
            childData.adet,
            childData.sm,
            childData.kayit
            ] ).draw( false );

     console.log(childData.il);
      });


     });



    } else {
      window.location="main.html";
    }
  });	
}

function logout(){

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

     firebase.auth().signOut().then(function() {
      window.location="index.html";
    }).catch(function(error) {
  // An error happened.
}); 


  } else {
    // No user is signed in.
  }
});

}


function kamerabilgikaydet(){

	var il=document.getElementById("il").value;
	var ilce=document.getElementById("ilce").value;
  var marka=document.getElementById("kameramarka").value;
  var model=document.getElementById("kameramodel").value;
  var adet=document.getElementById("kameraadet").value;
  var sm=document.getElementById("systemmanagers").value;
  var mc=document.getElementById("mc").value;
  var tip=document.getElementById("tip").value;
  var aciklama=document.getElementById("aciklama").value;
  var aselsanmi=document.getElementById("aselsanmi").checked;
  var kayit=document.getElementById("kayit").value
  if(il!=""&&ilce!=""&&marka!=""&&model!=""&&adet!=""&&sm!=""&&tip!=""){
   firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

     firebase.database().ref().child('cameradetay').push({
       user:user.uid,
       il:il,
       ilce:ilce,
       marka:marka,
       model:model,
       tip:tip,
       adet:adet,
       sm:sm,
       mc:mc,
       kayit:kayit,
       aciklama:aciklama,
       aselsanmi:aselsanmi
     });
     swal({
                   title: "İşlem Sonucu",
                   text: "İşlem Başarılı",
                   type: "success",
                   confirmButtonText:"Tamamla",
               });
      document.getElementById("formadd").reset();

   } else {
    // No user is signed in.
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


function kablosuzekle(value){
   document.getElementById("icerik").innerHTML="";
 document.getElementById("icerik").innerHTML="<div class='card shadow mb-4'> <div class='card-header py-3'> <h6 class='m-0 font-weight-bold text-primary'>Kablosuz Cihaz Ekle</h6> </div> <div class='card-body'> <form id='formadd'> <div class='form-row'> <div class='form-group col-md-6'> <label for='il'>İl</label> <select id='il' class='form-control' onchange='ilcedoldur(this.value)'> <option disabled selected value>Bir il Seçiniz</option> </select> </div> <div class='form-group col-md-6'> <label for='ilce'>İlçe</label> <select id='ilce' class='form-control'> <option disabled selected value>Bir ilçe Seçiniz</option> </select> </div> <div class='form-group col-md-6'> <label for='kameramarka'>Kablosuz Marka</label> <select id='kameramarka' class='form-control'> <option disabled selected value>Kablosuz Marka seçiniz</option> <option value='Radwin'>Radwin</option> <option value='Redline'>Redline</option> <option value='SAF'>SAF 23 GHZ</option> </select> </div> <div class='form-group col-md-6'> <label for='kameramodeli'>Kablosuz Modeli</label> <input type='text' class='form-control' id='kameramodel' placeholder='Kablosuz Model giriniz'> </div> <div class='form-group col-md-6'> <label for='mc'>Tip</label> <select id='tip' class='form-control'> <option disabled selected value>Kablosuz tipini seçiniz</option> <option value='Baz' selected>Baz</option> <option value='23GHZ'>23GHZ</option> <option value='p2p'>p2p</option> </select> </div> <div class='form-group col-md-6'> <label>Adet </label> <input type='text' class='form-control' id='kameraadet' placeholder='Kablosuz adetini giriniz!!!'> </div> </div> <div class='form-row'> <div class='form-group col-md-6'> <label for='aciklama'>Açıklama</label> <input type='text' class='form-control' id='aciklama'> </div> </div> <button type='button' class='btn btn-primary' onclick='kablosuzbilgikaydet()'>Kaydet</button> </form> </div> </div>";
var il = document.getElementById("il");
    var option;
  
for (var i = 0; i < data.length; i++) {
           option = document.createElement("option");
            option.text = data[i].il;
            option.value== data[i].il; 
           il.add(option);
          }
}



function kameratabloekle(){
 document.getElementById("icerik").innerHTML="";
 document.getElementById("icerik").innerHTML=" <div class='col-sm-12'> <div class='card-header py-3'> <h6 class='m-0 font-weight-bold text-primary'>Kamera Bilgileri</h6> </div> <div class='card-body'> <div class='table-responsive'> <table class='table table-striped table color-table primary-table' id='myTable'> <thead> <tr> <th>İl</th> <th>İlçe</th> <th>Marka</th> <th>Model</th> <th>Adet</th> <th>system Manager</th> <th>Kayıt Süresi</th> </tr> </thead> <tbody > </tbody> <th>İl</th> <th>İlçe</th> <th>Marka</th> <th>Model</th> <th>Adet</th> <th>system Manager</th> <th>Kayıt Süresi</th> </table> </div> </div> </div>";

kameradetaydoldur();

$('.buttons-excel').addClass('btn btn-primary m-r-10');

}

function kameraekle(){

document.getElementById("icerik").innerHTML="";
 document.getElementById("icerik").innerHTML="<!-- Page Heading --> <div class='card shadow mb-4'> <div class='card-header py-3'> <h6 class='m-0 font-weight-bold text-primary'>Kamera ekleme işlemleri</h6> </div> <div class='card-body'> <form id='formadd'> <div class='form-row'> <div class='form-group col-md-6'> <label for='il'>İl</label> <select id='il' class='form-control' onchange='ilcedoldur(this.value)'> <option disabled selected value>Bir il Seçiniz</option> </select> </div> <div class='form-group col-md-6'> <label for='ilce'>İlçe</label> <select id='ilce' class='form-control'> <option disabled selected value>Bir ilçe Seçiniz</option> </select> </div> <div class='form-group col-md-6'> <label for='kameramarka'>Kamera Marka</label> <input type='text' class='form-control' id='kameramarka' placeholder='Kamera Marka giriniz'> </div> <div class='form-group col-md-6'> <label for='kameramodeli'>Kamera Modeli</label> <input type='text' class='form-control' id='kameramodel' placeholder='Kamera Model giriniz'> </div> <div class='form-group col-md-6'> <label for='mc'>Tip</label> <select id='tip' class='form-control'> <option disabled selected value>Kamera tipini seçiniz</option> <option value='Sabit'>Sabit</option> <option value='Hareketli'>Hareketli</option> <option value='Lazer'>Lazer</option> <option value='Termal'>Termal</option> </select> </div> <div class='form-group col-md-6'> <label>Adet </label> <input type='text' class='form-control' id='kameraadet' placeholder='Kamera adetini giriniz!!!'> </div> <div class='form-group col-md-6'> <label for='systemmanagers'>Sistem manager</label> <input type='text' class='form-control' id='systemmanagers' placeholder='Aselsan NVRa kayıt yapıyorsa Aselsan yazınız!! '> </div> </div> <div class='form-row'> <div class='form-group col-md-6'> <label for='mc'>Multicast Desteği</label> <select id='mc' class='form-control'> <option value='Var' selected>Var</option> <option value='Yok'>Yok</option> </select> </div> <div class='form-group col-md-6'> <label for='aciklama'>Açıklama</label> <input type='text' class='form-control' id='aciklama'> </div> </div> <div class='form-group'> <div class='form-check'> <input class='form-check-input' value='Aselsan' type='checkbox' id='aselsanmi'> <label class='form-check-label' for='aselsanmi'> Aselsan NVR'a kayıt yapıyor mu? </label> </div> </div> <button type='button' class='btn btn-primary' onclick='kamerabilgikaydet()'>Kaydet</button> </form> </div> </div>";

 var il = document.getElementById("il"); 
  var option;
for (var i = 0; i < data.length; i++) {
           option = document.createElement("option");
            option.text = data[i].il;
            option.value== data[i].il; 
           il.add(option);
          }
}

function kablosuzbilgikaydet(){


var il=document.getElementById("il").value;
  var ilce=document.getElementById("ilce").value;
  var marka=document.getElementById("kameramarka").value;
  var model=document.getElementById("kameramodel").value;
  var adet=document.getElementById("kameraadet").value;
  var tip=document.getElementById("tip").value;
  var aciklama=document.getElementById("aciklama").value;
  if(il!=""&&ilce!=""&&marka!=""&&model!=""&&adet!=""&&tip!=""){
   firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

     firebase.database().ref().child('kablosuzdetay').push({
       user:user.uid,
       il:il,
       ilce:ilce,
       marka:marka,
       model:model,
       tip:tip,
       adet:adet,
       aciklama:aciklama
       
     });
     swal({
                   title: "İşlem Sonucu",
                   text: "İşlem Başarılı",
                   type: "success",
                   confirmButtonText:"Tamamla",
               });
      document.getElementById("formadd").reset();

   } else {
    // No user is signed in.
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

  function ilcedoldur(value){
     var ilce = document.getElementById("ilce"); 
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
















//table.innerHTML=table.innerHTML+"<tr><td>"+childData.il+"</td><td>"+childData.ilce+"</td><td>"+childData.marka+"</td><td>"+childData.model+"</td><td>"+childData.adet+"</td><td>"+childData.sm+"</td></tr>";