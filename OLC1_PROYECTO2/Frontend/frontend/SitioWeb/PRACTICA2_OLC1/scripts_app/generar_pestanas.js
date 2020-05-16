
var lienzo_actual="";
var pestana_actual="";
var body_actual="";
var num=0;

var ListaErroresLexicos=[];
var id_th="th-";
var id_body="p-"+num;

 function Generarth(){
 id_body="p-"+num;
 
 var nuevo_tbody=document.createElement("tbody");
 nuevo_tbody.setAttribute("id", id_body); 



 var mitable= document.getElementById("mitabla");
 mitable.appendChild(nuevo_tbody);
 
 var lienzo=document.createElement("textarea");
 

 lienzo.setAttribute("id", "lienzo"+num); 



 nuevo_tbody.appendChild(lienzo);
 var newTh = document.createElement("th"); 
 var newContent = document.createTextNode("pestaña"+num); 
 newTh.appendChild(newContent); //añade texto al div creado. 
 newTh.setAttribute("id", id_th+id_body);
 newTh.setAttribute("onclick", "activarTabB(this, '"+id_body+"','"+id_th+id_body+"','lienzo"+num+"')");
 
 var cabecera = document.getElementById("pestanaaa");
 cabecera.appendChild(newTh);





  num++;


  }

  function removerVentana(id){
    pest = document.getElementById(id);	
	if (!pest){
		alert("El elemento selecionado no existe");
	} else {

        var ta=document.getElementById("mitabla");
        var tbo=document.getElementById(body_actual);//elimimanos el body
        ta.removeChild(tbo);

		padre = pest.parentNode;
     
        padre.removeChild(pest);//eliminamos la pestana
        
	}
  }




function activarTabB(este, id,IDth,idTextArea){
    pestana_actual=IDth;
    body_actual=id;
    lienzo_actual=idTextArea
    console.log("La pestana actual es: "+IDth);
    console.log("el lienzo actual es: "+idTextArea);
    var tb = document.getElementById(id);
    if ((tb != null) && (tb.tagName.toLowerCase() == "tbody")){
        var tabla = tb.parentNode || tb.parentElement;
        if ((tabla != null) && (tabla.tagName.toLowerCase()== "table")){
            var tbs = tabla.getElementsByTagName("tbody");
            for (i=0; i<tbs.length; i++){
                var pestanya = document.getElementById("th-" + tbs[i].id);
                if (tbs[i].id == id){
                    pestanya.style.color = "black";
                    pestanya.style.fontWeight = "bold";
                    pestanya.style.backgroundColor = "rgb(235, 235, 225)";
                    tbs[i].style.display = "table-row-group";
                } else {
                    pestanya.style.color = "white";
                    pestanya.style.fontWeight = "normal";
                    pestanya.style.backgroundColor = "cornflowerblue";
                    tbs[i].style.display = "none";
                }
            }
        }
    }
}
