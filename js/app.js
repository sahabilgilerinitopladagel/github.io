 var ilce="ilce";
 let keyupdate="";
 let email;
 let password;
 let sheetname="Sheet1",dosyaname="exelfile.xlsx";
 let tabloisim="";

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
               // element.key="";
                
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
                     text: "İşlem Başarılı sayfayı yenilerseniz sonucun başarılı olduğunu göreceksiniz!",
                     type: "success",
                     confirmButtonText:"Tamamla",
                   });
                   // ekle(dbname,true,tabloisim);
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
           
             ekle(dbname,true,tabloisim);
           

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

     /* function abc(){

        ankara.forEach(function(element) {
          //console.log(element);
       firebase.database().ref().child("cameradetay").push(
           element
            , function(error) {
              if (error) {
                
              } else {
                console.log("basarili");
              }
            });
           
         });
      }*/


      function kaydet(name){
       
        var elementid=document.getElementById("icerik").getElementsByClassName("form-control");
       let all=true;
       let columndata={};
       for (var i = 0; i < elementid.length; i++) {
        if(elementid[i].value===""&&elementid[i]!="aciklama")
          all=false;
        columndata[elementid[i].id]=elementid[i].value;
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
      "tablo":"<div class='table-responsive'> <table class='table table-bordered' id='myTable'> <thead> </thead> <tbody > </tbody></table> </div> ",
      
    };
function ekle(dbname,tablomu,tabloismi){//key= hangi tablonun dolacağı
    tabloisim=tabloismi;                                                 //dbname veri tabanı ismi geliyor  
 document.getElementById("icerik").innerHTML="";      //neyidolsur veri tabanı column isimleri , neyegoredoldur fonksiyona link bilgisi
 document.getElementById("baslik").innerHTML=tabloismi;
 if(!tablomu){
 var icerik=document.getElementById(dbname).getElementsByTagName("form")[0];
 document.getElementById("icerik").innerHTML=icerik.outerHTML+"<button type='button' class='btn btn-primary' onclick='kaydet(this.value)' value='"+dbname+"' >Kaydet</button>";
 ildoldur(document.getElementById("il")); 

}
else{
   document.getElementById("icerik").innerHTML=tablolar.tablo;
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

