 var ilce="ilce";
 var keyupdate="";
 

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
function tablodoldur(key,who){
  var t = $('#myTable').DataTable({
     "iDisplayLength":10,
        dom: 'Bfrtip',
        buttons: [
        'excel',
        ]
     
    });
  t.innerHTML="";
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      document.getElementById("profilnanespan").innerHTML=user.email;

      var getdata=firebase.database().ref().child(key);
      getdata.once('value', function(snapshot) {
       snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        if(who==="kablosuzdetay"){   //kablosuz tablosu için 
         
          t.row.add( [
            childData.il,
            childData.ilce,
            childData.marka,
            childData.model,
            childData.tip,
             childData.adet,
            "<div class='row' ><button class='btn btn-danger btn-circle' onclick='silkablosuz(this.value)'  value='"+childSnapshot.key+"'> <i class='fas fa-trash'></i> </button> <button style='margin-left: 5px' class='btn btn-success btn-circle' data-toggle='modal' data-target='#kablosuzupdateModal' onclick='updatekablosuzdoldur(this.value)' value='"+[childSnapshot.key,childData.il,childData.ilce,childData.marka,childData.model,childData.tip,childData.adet]+"'> <i class='fas fa-check'></i> </button></div>",
            
            ] ).draw( false );
          }
          else if(who==="cameradetay"){//kamera tablosu için 
            
               t.row.add([
            childData.il,
            childData.ilce,
            childData.marka,
            childData.model,
            childData.adet,
            childData.sm,
            childData.kayit,
            "<div class='row'><button class='btn btn-danger btn-circle' onclick='silcamera(this.value)'  value='"+childSnapshot.key+"'> <i class='fas fa-trash'></i> </button> <button style='margin-left: 5px' class='btn btn-success btn-circle' data-toggle='modal' data-target='#cameraupdateModal' onclick='updatecameradoldur(this.value)' value='"+[childSnapshot.key,childData.il,childData.ilce,childData.marka,childData.model,childData.sm,childData.kayit,childData.adet,childData.tip]+"'> <i class='fas fa-check'></i> </button></div>",
            
            ]).draw( false );
          }//kamera tablosu için 
          else if(who==="nirdetay"){//nır tablosu için

               t.row.add([
            childData.il,
            childData.ilce,
            childData.depolama,
            childData.serino,
            childData.versiyon,
            childData.pts,
            childData.servisip,
            childData.ip,
            childData.ipmi,
            childData.hostname,
            childData.ntp,
            childData.management,
            "<div class='row'><button class='btn btn-danger btn-circle' onclick='silnir(this.value)'  value='"+childSnapshot.key+"'> <i class='fas fa-trash'></i> </button> <button style='margin-left: 5px' class='btn btn-success btn-circle' data-toggle='modal' data-target='#cameraupdateModal' onclick='' value='"+[childSnapshot.key,childData.il, childData.ilce, childData.depolama, childData.serino, childData.versiyon, childData.pts, childData.servisip, childData.ip, childData.ipmi, childData.hostname, childData.ntp, childData.management]+"'> <i class='fas fa-check'></i> </button></div>",
            
            ]).draw( false );

          }//nır tablosu için

         });


     });//snapshot



    } else {
      window.location="main.html";
    }
  }); 
}



function updatecameradoldur(key){
  
  key=key.split(",");
  
  var il = document.getElementById("ilupdate"); 
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

    for (var i = 0; i <81; i++) {

      if(il.options[i].value===key[1]){
        il.selectedIndex=i;

        ilcedoldur(key[1],"ilceupdate");
      }
     
    }
    var ilce = document.getElementById("ilceupdate");

    for (var i = 0; i <ilce.length; i++) {
      if(ilce.options[i].value===key[2]){
        ilce.selectedIndex=i;
      }
     
    }
   var tipupdate = document.getElementById("tipupdate");
    for (var i = 0; i < tipupdate.length; i++) {

      if(tipupdate.options[i].value===key[8]){
        tipupdate.selectedIndex=i;
      }
    }

   // childData.il,childData.ilce,childData.marka,childData.model,childData.sm,childData.kayit,childData.adet
  document.getElementById("kameramarkaupdate").value=key[3];
  document.getElementById("kameramodelupdate").value=key[4];
 document.getElementById("kameraadetupdate").value=key[7];
 document.getElementById("systemmanagersupdate").value=key[5];
  document.getElementById("kayitupdate").value=key[6];
  

 keyupdate=key[0];

}


function updatekablosuzdoldur(key){
  
  key=key.split(",");
  
  var il = document.getElementById("kablosuzilupdate"); 
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

    for (var i = 0; i <81; i++) {

      if(il.options[i].value===key[1]){
        il.selectedIndex=i;

        ilcedoldur(key[1],"kablosuzilceupdate");
      }
     
    }
    var ilce = document.getElementById("kablosuzilceupdate");

    for (var i = 0; i <ilce.length; i++) {
      if(ilce.options[i].value===key[2]){
        ilce.selectedIndex=i;
      }
     
    }
   var tipupdate = document.getElementById("kablosuztipupdate");
    for (var i = 0; i < tipupdate.length; i++) {

      if(tipupdate.options[i].value===key[5]){
        tipupdate.selectedIndex=i;
      }
    }

   // childData.il,childData.ilce,childData.marka,childData.model,childData.sm,childData.kayit,childData.adet
  document.getElementById("kablosuzmarkaupdate").value=key[3];
  document.getElementById("kablosuzmodelupdate").value=key[4];
 document.getElementById("kablosuzadetupdate").value=key[6];
  
  

 keyupdate=key[0];

}


function updatenirdoldur(key){
  
  key=key.split(",");
  
  var il = document.getElementById("kablosuzilupdate"); 
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

    for (var i = 0; i <81; i++) {

      if(il.options[i].value===key[1]){
        il.selectedIndex=i;

        ilcedoldur(key[1],"kablosuzilceupdate");
      }
     
    }
    var ilce = document.getElementById("kablosuzilceupdate");

    for (var i = 0; i <ilce.length; i++) {
      if(ilce.options[i].value===key[2]){
        ilce.selectedIndex=i;
      }
     
    }
   var tipupdate = document.getElementById("kablosuztipupdate");
    for (var i = 0; i < tipupdate.length; i++) {

      if(tipupdate.options[i].value===key[5]){
        tipupdate.selectedIndex=i;
      }
    }

   // childData.il,childData.ilce,childData.marka,childData.model,childData.sm,childData.kayit,childData.adet
  document.getElementById("kablosuzmarkaupdate").value=key[3];
  document.getElementById("kablosuzmodelupdate").value=key[4];
 document.getElementById("kablosuzadetupdate").value=key[6];
  
  

 keyupdate=key[0];

}

function kamerabilgiupdate(){
   var il = document.getElementById("ilupdate").value;
   var ilce = document.getElementById("ilceupdate").value;
  var marka=document.getElementById("kameramarkaupdate").value;
  var model=document.getElementById("kameramodelupdate").value;
 var adet=document.getElementById("kameraadetupdate").value;
 var sm=document.getElementById("systemmanagersupdate").value;
  var kayit=document.getElementById("kayitupdate").value;
  var tip=document.getElementById("tipupdate").value;

if(il!=""&&ilce!=""&&marka!=""&&model!=""&&adet!=""&&sm!=""&&tip!=""&&kayit!=""){

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
       firebase.database().ref().child("cameradetay").child(keyupdate).set({
        il:il,
       ilce:ilce,
       marka:marka,
       model:model,
       tip:tip,
       adet:adet,
       sm:sm,
       kayit:kayit

  }, function(error) {
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
         ekle(tablolar.kameratablo,'cameradetay');
    }
  });
     
}

});
}
}

function kablosuzbilgiupdate(){
   var il = document.getElementById("kablosuzilupdate").value;
   var ilce = document.getElementById("kablosuzilceupdate").value;
  var marka=document.getElementById("kablosuzmarkaupdate").value;
  var model=document.getElementById("kablosuzmodelupdate").value;
 var adet=document.getElementById("kablosuzadetupdate").value;
  var tip=document.getElementById("kablosuztipupdate").value;
if(il!=""&&ilce!=""&&marka!=""&&model!=""&&adet!=""&&tip!=""){
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
       firebase.database().ref().child("kablosuzdetay").child(keyupdate).set({
        il:il,
       ilce:ilce,
       marka:marka,
       model:model,
       tip:tip,
       adet:adet,
  }, function(error) {
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
      ekle(tablolar.kablosuztablo,'kablosuzdetay');
    }
  });
} 
});

}
}


function silcamera(key){
  if(window.confirm("Silmek İstediğinize Emin misiniz?")){
   firebase.database().ref().child("cameradetay").child(key).remove();
   ekle(tablolar.kameratablo,'cameradetay');
 }
}
function silkablosuz(key){
  if(window.confirm("Silmek İstediğinize Emin misiniz?")){
   firebase.database().ref().child("kablosuzdetay").child(key).remove();
   ekle(tablolar.kablosuztablo,'kablosuzdetay');
 }
}
function silnir(key){
  if(window.confirm("Silmek İstediğinize Emin misiniz?")){
   firebase.database().ref().child("nirdetay").child(key).remove();
   ekle(tablolar.nirtablo,'nirdetay');
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
  if(il!=""&&ilce!=""&&marka!=""&&model!=""&&adet!=""&&sm!=""&&tip!=""&&mc!=""&&kayit!=""){
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


var tablolar=
{
"kameratablo":"<div class='card shadow mb-4'> <div class='card-header py-3'><h6 class='m-0 font-weight-bold text-primary'>Kamera Tablosu</h6> </div>   <div class='col-sm-12'><div class='card-body'> <div class='table-responsive'> <table class='table table-striped table color-table primary-table' id='myTable'> <thead> <tr> <th>İl</th> <th>İlçe</th> <th>Marka</th> <th>Model</th> <th>Adet</th> <th>system Manager</th> <th>Kayıt Süresi</th> <th></th> </tr> </thead> <tbody > </tbody></table> </div> </div> </div></div> </div>",
"nirtablo":"<div class='card shadow mb-4'> <div class='card-header py-3'><h6 class='m-0 font-weight-bold text-primary'>NIR-CIR Tablosu</h6> </div>   <div class='col-sm-12'><div class='card-body'> <div class='table-responsive'> <table class='table table-striped table color-table primary-table' id='myTable'> <thead> <tr> <th>İl</th> <th>İlçe</th> <th>Tip</th> <th>Seri No</th> <th>Versiyon</th> <th>Pts sunucu</th> <th>Servis ip</th> <th>Cihaz ip</th> <th>IPMI ip</th> <th>Hostname</th> <th>Ntp adresi</th> <th>Management adresi</th> <th></th> </tr> </thead> <tbody > </tbody></table> </div> </div> </div></div> </div>",
 "kablosuztablo":"<div class='card shadow mb-4'> <div class='card-header py-3'><h6 class='m-0 font-weight-bold text-primary'>Kablosuz Tablosu</h6> </div>   <div class='col-sm-12'><div class='card-body'> <div class='table-responsive'> <table class='table table-striped table color-table primary-table' id='myTable'> <thead> <tr> <th>İl</th> <th>İlçe</th> <th>Marka</th> <th>Model</th><th>Tip</th> <th>Adet</th><th></th> </tr> </thead> <tbody > </tbody></table> </div> </div> </div></div> </div>",
"kamera":"<!-- Page Heading --> <div class='card shadow mb-4'><div class='card-header py-3'> <h6 class='m-0 font-weight-bold text-primary'>Kamera ekleme işlemleri</h6> </div> <div class='card-body'> <form id='formadd'> <div class='form-row'> <div class='form-group col-md-6'> <label for='il'>İl</label> <select id='il' class='form-control' onchange='ilcedoldur(this.value,this.name)' name='ilce'> <option disabled selected value>Bir il Seçiniz</option> </select> </div> <div class='form-group col-md-6'> <label for='ilce'>İlçe</label> <select id='ilce' class='form-control'> <option disabled selected value>Bir ilçe Seçiniz</option> </select> </div> <div class='form-group col-md-6'> <label for='kameramarka'>Kamera Marka</label> <input type='text' class='form-control' id='kameramarka' placeholder='Kamera Marka giriniz'> </div> <div class='form-group col-md-6'> <label for='kameramodeli'>Kamera Modeli</label> <input type='text' class='form-control' id='kameramodel' placeholder='Kamera Model giriniz'> </div> <div class='form-group col-md-6'> <label for='mc'>Tip</label> <select id='tip' class='form-control'> <option disabled selected value>Kamera tipini seçiniz</option> <option value='Sabit'>Sabit</option> <option value='Hareketli'>Hareketli</option><option value='Encoder'>Encoder</option> <option value='Lazer'>Lazer</option> <option value='Termal'>Termal</option> </select> </div> <div class='form-group col-md-6'> <label>Adet </label> <input type='number' class='form-control' id='kameraadet' placeholder='Kamera adetini giriniz!!!'> </div> <div class='form-group col-md-6'> <label for='systemmanagers'>Sistem manager</label> <input type='text' class='form-control' id='systemmanagers' placeholder='Aselsan NVRa kayıt yapıyorsa Aselsan yazınız!! '> </div><div class='form-group col-md-6'> <label for='systemmanagers'>Kayıt Süresi</label> <input type='text' class='form-control' id='kayit' placeholder='Mevcut NVRa kayıt süresini yazınız!! '> </div> </div> <div class='form-row'> <div class='form-group col-md-6'> <label for='mc'>Multicast Desteği</label> <select id='mc' class='form-control'> <option value='Var' selected>Var</option> <option value='Yok'>Yok</option> </select> </div> <div class='form-group col-md-6'> <label for='aciklama'>Açıklama</label> <input type='text' class='form-control' id='aciklama'> </div> </div> <div class='form-group'> <div class='form-check'> <input class='form-check-input' value='Aselsan' type='checkbox' id='aselsanmi'> <label class='form-check-label' for='aselsanmi'> Aselsan NVR'a kayıt yapıyor mu? </label> </div> </div> <button type='button' class='btn btn-primary' onclick='kamerabilgikaydet()'>Kaydet</button> </form> </div> </div>",
 "nir":"<div class='card shadow mb-4'> <div class='card-header py-3'> <h6 class='m-0 font-weight-bold text-primary'>PTS Depolama İçin Cihaz Ekle</h6> </div> <div class='card-body'> <form id='formadd'> <div class='form-row'> <div class='form-group col-md-6'> <label >İl</label> <select id='il' class='form-control' onchange='ilcedoldur(this.value,this.name)' name='ilce'> <option disabled selected value>Bir il Seçiniz</option> </select> </div> <div class='form-group col-md-6'> <label>İlçe</label> <select id='ilce' class='form-control'> <option disabled selected value>Bir ilçe Seçiniz</option> </select> </div> <div class='form-group col-md-6'> <label>Depolama Ünitesi Seçiniz</label> <select id='nirdepolama' class='form-control'> <option disabled selected value>Depolama Ünitesi Seçiniz</option> <option value='NIR96'>NIR96</option> <option value='NIR54'>NIR54</option> <option value='CIR96'>CIR96</option> <option value='CIR216'>CIR216</option> <option value='NVR'>NVR</option> </select> </div> <div class='form-group col-md-6'> <label>Seri Numarasını Giriniz </label> <input type='text' class='form-control' id='nirserino' placeholder=''> </div> <div class='form-group col-md-6'> <label>Versiyon Bilgisini Giriniz </label> <input type='text' class='form-control' id='nirversiyon' placeholder=''> </div> <div class='form-group col-md-6'> <label>PTS sunucu ip adresini Giriniz </label> <input type='text' class='form-control' id='nirpts' placeholder=''> </div> <div class='form-group col-md-6'> <label>Servis ip adresi </label> <input type='text' class='form-control' id='nirservis' placeholder=''> </div> <div class='form-group col-md-6'> <label>Cihaz ip adresi </label> <input type='text' class='form-control' id='nirip' placeholder=''> </div> <div class='form-group col-md-6'> <label>Cihaz IPMI ip adresi</label> <input type='text' class='form-control' id='niripmi' placeholder=''> </div> <div class='form-group col-md-6'> <label>Hostname adını Giriniz </label> <input type='text' class='form-control' id='nirhostname' placeholder='Örnek nir1'> </div> <div class='form-group col-md-6'> <label>Management Address </label> <input type='text' class='form-control' id='nirmanagement' placeholder=''> </div> <div class='form-group col-md-6'> <label for='aciklama'>NTP adresi</label> <input type='text' class='form-control' id='nirntp'> </div> </div> <button type='button' class='btn btn-primary' onclick='nirbilgikaydet()'>Kaydet</button> </form> </div> </div>",
 "kablosuz":"<div class='card shadow mb-4'> <div class='card-header py-3'> <h6 class='m-0 font-weight-bold text-primary'>Kablosuz Cihaz Ekle</h6> </div> <div class='card-body'> <form id='formadd'> <div class='form-row'> <div class='form-group col-md-6'> <label for='il'>İl</label> <select id='il' class='form-control' onchange='ilcedoldur(this.value,this.name)' name='ilce'> <option disabled selected value>Bir il Seçiniz</option> </select> </div> <div class='form-group col-md-6'> <label for='ilce'>İlçe</label> <select id='ilce' class='form-control'> <option disabled selected value>Bir ilçe Seçiniz</option> </select> </div> <div class='form-group col-md-6'> <label for='kameramarka'>Kablosuz Marka</label> <select id='kameramarka' class='form-control'> <option disabled selected value>Kablosuz Marka seçiniz</option> <option value='Radwin'>Radwin</option> <option value='Redline'>Redline</option> <option value='SAF'>SAF 23 GHZ</option> </select> </div> <div class='form-group col-md-6'> <label for='kameramodeli'>Kablosuz Modeli</label> <input type='text' class='form-control' id='kameramodel' placeholder='Kablosuz Model giriniz'> </div> <div class='form-group col-md-6'> <label for='mc'>Tip</label> <select id='tip' class='form-control'> <option disabled selected value>Kablosuz tipini seçiniz</option> <option value='Baz' selected>Baz</option> <option value='23GHZ'>23GHZ</option> <option value='p2p'>p2p</option> </select> </div> <div class='form-group col-md-6'> <label>Adet </label> <input type='number' class='form-control' id='kameraadet' placeholder='Kablosuz adetini giriniz!!!'> </div> </div> <div class='form-row'> <div class='form-group col-md-6'> <label for='aciklama'>Açıklama</label> <input type='text' class='form-control' id='aciklama'> </div> </div> <button type='button' class='btn btn-primary' onclick='kablosuzbilgikaydet()'>Kaydet</button> </form> </div> </div>",
};
function ekle(key,nereye){
  
 document.getElementById("icerik").innerHTML="";
 document.getElementById("icerik").innerHTML=key;
 if(nereye==="asd"){
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
  tablodoldur(nereye,nereye);
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



function nirbilgikaydet(){


var il=document.getElementById("il").value;
  var ilce=document.getElementById("ilce").value;
  var depolama=document.getElementById("nirdepolama").value;
  var serino=document.getElementById("nirserino").value;
  var versiyon=document.getElementById("nirversiyon").value;
  var pts=document.getElementById("nirpts").value;
  var servisip=document.getElementById("nirservis").value;
  var ip=document.getElementById("nirip").value;
  var ipmi=document.getElementById("niripmi").value;
   var management=document.getElementById("nirmanagement").value;
  var ntp=document.getElementById("nirntp").value;
  var hostname=document.getElementById("nirhostname").value;
  if(il!=""&&ilce!=""&&depolama!=""&&serino!=""&&versiyon!=""&&pts!=""&&management!=""&&servisip!=""&&ip!=""&&ipmi!=""&&ntp!=""){
   firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

     firebase.database().ref().child('nirdetay').push({
       user:user.uid,
       il:il,
       ilce:ilce,
       depolama:depolama,
       serino:serino,
       versiyon:versiyon,
       pts:pts,
       servisip:servisip,
       ip:ip,
       ipmi:ipmi,
       hostname:hostname,
       ntp:ntp,
       management:management
       
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

  function ilcedoldur(value,element){
     var ilce = document.getElementById(element);

   
      var ilceupdate = document.getElementById("ilceupdate");
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