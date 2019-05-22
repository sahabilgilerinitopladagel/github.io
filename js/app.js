 var ilce="ilce";
 var keyupdate="";
  var email;
  var password;

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
//kamera güncelleme modal id
let camera=["","ilupdate","ilceupdate","kameramarkaupdate","kameramodelupdate","systemmanagersupdate","kayitupdate","kameraadetupdate","tipupdate"];
 //kablosuz güncelleme modal id
  let kablosuz=["","kablosuzilupdate","kablosuzilceupdate","kablosuzmarkaupdate","kablosuzmodelupdate","kablosuztipupdate","kablosuzadetupdate"];
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
            "<div class='row' ><button class='btn btn-danger btn-circle' onclick='silkablosuz(this.value)'  value='"+childSnapshot.key+"'> <i class='fas fa-trash'></i> </button> <button style='margin-left: 5px' class='btn btn-success btn-circle' data-toggle='modal' data-target='#kablosuzupdateModal' onclick='updatedoldur(this.value,this.name)' name='"+kablosuz+"' value='"+[childSnapshot.key,childData.il,childData.ilce,childData.marka,childData.model,childData.tip,childData.adet]+"'> <i class='fas fa-check'></i> </button></div>",
            
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
            "<div class='row'><button class='btn btn-danger btn-circle' onclick='silcamera(this.value)'  value='"+childSnapshot.key+"'> <i class='fas fa-trash'></i> </button> <button style='margin-left: 5px' class='btn btn-success btn-circle' data-toggle='modal' data-target='#cameraupdateModal' onclick='updatedoldur(this.value,this.name)' name='"+camera+"' value='"+[childSnapshot.key,childData.il,childData.ilce,childData.marka,childData.model,childData.sm,childData.kayit,childData.adet,childData.tip]+"'> <i class='fas fa-check'></i> </button></div>",
            
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




function updatedoldur(key,name){
  
  key=key.split(",");
name=name.split(",");
ildoldur(name[1]);
ilcedoldur(key[1],name[2]);
  for (var i = 1; i < name.length; i++) {
   document.getElementById(name[i]).value=key[i];
  }
  
  keyupdate=key[0];

}

function ildoldur(key){
  var il = document.getElementById(key); 
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

let cameratablecolumnupdate=["","il","ilce","marka","model","sm","kayit","adet","tip"];
let kablosuztablecolumnupdate=["","il","ilce","marka","model","tip","adet"];
function update(key,name,value,hangitablo){
  let all=true;
  let columndata={};
  for (var i = 1; i < name.length; i++) {
    if(document.getElementById(name[i]).value==="")
      all=false;
    columndata[key[i]]=document.getElementById(name[i]).value;
  }
  if(all){

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
       firebase.database().ref().child(value).child(keyupdate).set(
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
            ekle(hangitablo,value);
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
//Kamera ekleme id'leri
let camerakaydet=["il","ilce","marka","model","adet","tip","sm","mc","aciklama","kayit","aselsanmi"];
//Kamera ekleme id'leri
let kablosuzkaydet=["il","ilce","marka","model","adet","tip","aciklama",""];
//Kamera ekleme id'leri
let nirkaydet=["il","ilce","depolama","serino","versiyon","pts","servisip","ip","ipmi","management","ntp","hostname",""];

function kaydet(name,value){
     name=name.split(",");
let all=true;
  let columndata={};
  for (var i = 0; i < name.length-1; i++) {
   
    if(document.getElementById(name[i]).value===""&&name[i]!="aciklama")
      all=false;
    columndata[name[i]]=document.getElementById(name[i]).value;
  }
  if(all){

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
       firebase.database().ref().child(value).push(
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
"kameratablo":"<div class='card shadow mb-4'> <div class='card-header py-3'><h6 class='m-0 font-weight-bold text-primary'>Kamera Tablosu</h6> </div>   <div class='col-sm-12'><div class='card-body'> <div class='table-responsive'> <table class='table table-striped table color-table primary-table' id='myTable'> <thead> <tr> <th>İl</th> <th>İlçe</th> <th>Marka</th> <th>Model</th> <th>Adet</th> <th>system Manager</th> <th>Kayıt Süresi</th> <th></th> </tr> </thead> <tbody > </tbody></table> </div> </div> </div></div> </div>",
"nirtablo":"<div class='card shadow mb-4'> <div class='card-header py-3'><h6 class='m-0 font-weight-bold text-primary'>NIR-CIR Tablosu</h6> </div>   <div class='col-sm-12'><div class='card-body'> <div class='table-responsive'> <table class='table table-striped table color-table primary-table' id='myTable'> <thead> <tr> <th>İl</th> <th>İlçe</th> <th>Tip</th> <th>Seri No</th> <th>Versiyon</th> <th>Pts sunucu</th> <th>Servis ip</th> <th>Cihaz ip</th> <th>IPMI ip</th> <th>Hostname</th> <th>Ntp adresi</th> <th>Management adresi</th> <th></th> </tr> </thead> <tbody > </tbody></table> </div> </div> </div></div> </div>",
 "kablosuztablo":"<div class='card shadow mb-4'> <div class='card-header py-3'><h6 class='m-0 font-weight-bold text-primary'>Kablosuz Tablosu</h6> </div>   <div class='col-sm-12'><div class='card-body'> <div class='table-responsive'> <table class='table table-striped table color-table primary-table' id='myTable'> <thead> <tr> <th>İl</th> <th>İlçe</th> <th>Marka</th> <th>Model</th><th>Tip</th> <th>Adet</th><th></th> </tr> </thead> <tbody > </tbody></table> </div> </div> </div></div> </div>",
"kamera":"<!-- Page Heading --> <div class='card shadow mb-4'><div class='card-header py-3'> <h6 class='m-0 font-weight-bold text-primary'>Kamera ekleme işlemleri</h6> </div> <div class='card-body'> <form id='formadd'> <div class='form-row'> <div class='form-group col-md-6'> <label for='il'>İl</label> <select id='il' class='form-control' onchange='ilcedoldur(this.value,this.name)' name='ilce'> <option disabled selected value>Bir il Seçiniz</option> </select> </div> <div class='form-group col-md-6'> <label for='ilce'>İlçe</label> <select id='ilce' class='form-control'> <option disabled selected value>Bir ilçe Seçiniz</option> </select> </div> <div class='form-group col-md-6'> <label for='marka'>Kamera Marka</label> <input type='text' class='form-control' id='marka' placeholder='Kamera Marka giriniz'> </div> <div class='form-group col-md-6'> <label for='model'>Kamera Modeli</label> <input type='text' class='form-control' id='model' placeholder='Kamera Model giriniz'> </div> <div class='form-group col-md-6'> <label for='mc'>Tip</label> <select id='tip' class='form-control'> <option disabled selected value>Kamera tipini seçiniz</option> <option value='Sabit'>Sabit</option> <option value='Hareketli'>Hareketli</option><option value='Encoder'>Encoder</option> <option value='Lazer'>Lazer</option> <option value='Termal'>Termal</option> </select> </div> <div class='form-group col-md-6'> <label>Adet </label> <input type='number' class='form-control' id='adet' placeholder='Kamera adetini giriniz!!!'> </div> <div class='form-group col-md-6'> <label for='sm'>Sistem manager</label> <input type='text' class='form-control' id='sm' placeholder='Aselsan NVRa kayıt yapıyorsa Aselsan yazınız!! '> </div><div class='form-group col-md-6'> <label for='sm'>Kayıt Süresi</label> <input type='text' class='form-control' id='kayit' placeholder='Mevcut NVRa kayıt süresini yazınız!! '> </div> </div> <div class='form-row'> <div class='form-group col-md-6'> <label for='mc'>Multicast Desteği</label> <select id='mc' class='form-control'> <option value='Var' selected>Var</option> <option value='Yok'>Yok</option> </select> </div> <div class='form-group col-md-6'> <label for='aciklama'>Açıklama</label> <input type='text' class='form-control' id='aciklama'> </div> </div> <div class='form-group'> <div class='form-check'> <input class='form-check-input' value='Aselsan' type='checkbox' id='aselsanmi'> <label class='form-check-label' for='aselsanmi'> Aselsan NVR'a kayıt yapıyor mu? </label> </div> </div> <button type='button' class='btn btn-primary' onclick='kaydet(this.name,this.value)' name="+camerakaydet+" value='cameradetay' >Kaydet</button> </form> </div> </div>",
 "nir":"<div class='card shadow mb-4'> <div class='card-header py-3'> <h6 class='m-0 font-weight-bold text-primary'>PTS Depolama İçin Cihaz Ekle</h6> </div> <div class='card-body'> <form id='formadd'> <div class='form-row'> <div class='form-group col-md-6'> <label >İl</label> <select id='il' class='form-control' onchange='ilcedoldur(this.value,this.name)' name='ilce'> <option disabled selected value>Bir il Seçiniz</option> </select> </div> <div class='form-group col-md-6'> <label>İlçe</label> <select id='ilce' class='form-control'> <option disabled selected value>Bir ilçe Seçiniz</option> </select> </div> <div class='form-group col-md-6'> <label>Depolama Ünitesi Seçiniz</label> <select id='depolama' class='form-control'> <option disabled selected value>Depolama Ünitesi Seçiniz</option> <option value='NIR96'>NIR96</option> <option value='NIR54'>NIR54</option> <option value='CIR96'>CIR96</option> <option value='CIR216'>CIR216</option> <option value='NVR'>NVR</option> </select> </div> <div class='form-group col-md-6'> <label>Seri Numarasını Giriniz </label> <input type='text' class='form-control' id='serino' placeholder=''> </div> <div class='form-group col-md-6'> <label>Versiyon Bilgisini Giriniz </label> <input type='text' class='form-control' id='versiyon' placeholder=''> </div> <div class='form-group col-md-6'> <label>PTS sunucu ip adresini Giriniz </label> <input type='text' class='form-control' id='pts' placeholder=''> </div> <div class='form-group col-md-6'> <label>Servis ip adresi </label> <input type='text' class='form-control' id='servisip' placeholder=''> </div> <div class='form-group col-md-6'> <label>Cihaz ip adresi </label> <input type='text' class='form-control' id='ip' placeholder=''> </div> <div class='form-group col-md-6'> <label>Cihaz IPMI ip adresi</label> <input type='text' class='form-control' id='ipmi' placeholder=''> </div> <div class='form-group col-md-6'> <label>Hostname adını Giriniz </label> <input type='text' class='form-control' id='hostname' placeholder='Örnek nir1'> </div> <div class='form-group col-md-6'> <label>Management Address </label> <input type='text' class='form-control' id='management' placeholder=''> </div> <div class='form-group col-md-6'> <label for='ntp'>NTP adresi</label> <input type='text' class='form-control' id='ntp'> </div> </div> <button type='button' class='btn btn-primary' onclick='kaydet(this.name,this.value)' name="+nirkaydet+" value='nirdetay' >Kaydet</button> </form> </div> </div>",
 "kablosuz":"<div class='card shadow mb-4'> <div class='card-header py-3'> <h6 class='m-0 font-weight-bold text-primary'>Kablosuz Cihaz Ekle</h6> </div> <div class='card-body'> <form id='formadd'> <div class='form-row'> <div class='form-group col-md-6'> <label for='il'>İl</label> <select id='il' class='form-control' onchange='ilcedoldur(this.value,this.name)' name='ilce'> <option disabled selected value>Bir il Seçiniz</option> </select> </div> <div class='form-group col-md-6'> <label for='ilce'>İlçe</label> <select id='ilce' class='form-control'> <option disabled selected value>Bir ilçe Seçiniz</option> </select> </div> <div class='form-group col-md-6'> <label for='marka'>Kablosuz Marka</label> <select id='marka' class='form-control'> <option disabled selected value>Kablosuz Marka seçiniz</option> <option value='Radwin'>Radwin</option> <option value='Redline'>Redline</option> <option value='SAF'>SAF 23 GHZ</option> </select> </div> <div class='form-group col-md-6'> <label for='model'>Kablosuz Modeli</label> <input type='text' class='form-control' id='model' placeholder='Kablosuz Model giriniz'> </div> <div class='form-group col-md-6'> <label for='mc'>Tip</label> <select id='tip' class='form-control'> <option disabled selected value>Kablosuz tipini seçiniz</option> <option value='Baz' selected>Baz</option> <option value='23GHZ'>23GHZ</option> <option value='p2p'>p2p</option> </select> </div> <div class='form-group col-md-6'> <label>Adet </label> <input type='number' class='form-control' id='adet' placeholder='Kablosuz adetini giriniz!!!'> </div> </div> <div class='form-row'> <div class='form-group col-md-6'> <label for='aciklama'>Açıklama</label> <input type='text' class='form-control' id='aciklama'> </div> </div> <button type='button' class='btn btn-primary' onclick='kaydet(this.name,this.value)' name="+kablosuzkaydet+" value='kablosuzdetay'>Kaydet</button> </form> </div> </div>",
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


  function ilcedoldur(value,element){
     var ilce = document.getElementById(element);
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