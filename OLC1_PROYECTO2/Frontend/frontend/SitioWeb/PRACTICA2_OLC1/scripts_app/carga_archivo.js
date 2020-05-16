var contenidoo = "";
var contador_de_analisis=0;



window.onload = function () {
  document.getElementById('file-input').addEventListener('change', leerArchivo, false);
}

window.onkeypress=function(){
 this.indicarnumero0();
}

function leerArchivo(e) {
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function (e) {
    var contenido = e.target.result;

    mostrarContenido(contenido);


  };
  lector.readAsText(archivo);
}

function mostrarContenido(contenido) {
  var elemento = document.getElementById(lienzo_actual);
  elemento.innerHTML = contenido;


}


/*
function hacer_analisis_archivo() {
  ListaParser = []; ListaErroresLexicos = [];//limpiamos  nuestras listas del analisis sintactico
  var elemento = document.getElementById(lienzo_actual);
  contenidoo = elemento.value;
  console.log("el contenido es:", contenidoo);

  //se crea un objeto de tipo Analisis lexico y se accede a sus metodos
  var analisislexico = new Analisis_lexico();

  analisislexico.scanner();
  console.log(analisislexico.returnListaTokens());
  console.log("----------------------------------------");
  console.log(analisislexico.returnListaErroresLexicos());
  console.log("Analisis concluido");

  //aqui mandamos hacer el analisis sintactico

  var analisisSintactico = new Analisis_Sintactico(analisislexico.returnListaTokens());
  analisisSintactico.parser();

  //aqui mandamos a traducir de c# a python
  var traduccion_python = new Analisis_traduccion_PYTHON();
  traduccion_python.iniciar_traduccion();

  //mandamos a mostrar la lista de ids encontrados

  //limpiamos la tabla
  var elmtTable = document.getElementById('mitabladeid');
  var tableRows = elmtTable.getElementsByTagName('tr');
  var rowCount = tableRows.length;

  for (var x = rowCount - 1; x > 0; x--) {
    elmtTable.removeChild(tableRows[x]);
  }


  var mitabla = document.getElementById("mitabladeid");




  console.log(lista_ids);
  lista_ids.forEach(element => {

    var mitr = document.createElement("tr");
    mitr.setAttribute("id", "trs");

    var tipo_ = document.createElement("td");
    tipo_.setAttribute("class", "cajitas");
    var newContent = document.createTextNode(element.tipo);
    tipo_.appendChild(newContent);

    var nombre_ = document.createElement("td");
    nombre_.setAttribute("class", "cajitas");
    newContent = document.createTextNode(element.Identiicador);
    nombre_.appendChild(newContent);

    var valor_ = document.createElement("td");
    valor_.setAttribute("class", "cajitas");
    newContent = document.createTextNode(element.valor);
    valor_.appendChild(newContent);


    var fila_ = document.createElement("td");
    fila_.setAttribute("class", "cajitas");
    newContent = document.createTextNode(element.fila);
    fila_.appendChild(newContent);

    var columna_ = document.createElement("td");
    columna_.setAttribute("class", "cajitas");
    newContent = document.createTextNode(element.columna);
    columna_.appendChild(newContent);


    mitr.appendChild(tipo_);
    mitr.appendChild(nombre_);
    mitr.appendChild(valor_);
    mitr.appendChild(fila_);
    mitr.appendChild(columna_);

    mitabla.appendChild(mitr);

  });

  //ahora mostramos los textos html encontrados
  var escribir_html = "";
  lista_html.forEach(element => {
    escribir_html += element + "\n";

  });
  //vamos a asigar el dato al html
  var elemento = document.getElementById("textarea1");
  elemento.innerHTML = escribir_html;
  console.log(lista_html);

  //limpiamos nuestras listas de analisis
  descargarreporte();
  lista_errores_sintacticos=[];
  ListaErroresLexicos=[];


}
*/

/*
function descargarHTML(){

  console.log("descarga html");
  var textFile = null,
  makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
  };



    textbox = document.getElementById('textarea1');


    var link = document.createElement('a');
    link.setAttribute('download', 'salida.html');
    link.href = makeTextFile(textbox.value);
    document.body.appendChild(link);

    // wait for the link to be added to the document
    window.requestAnimationFrame(function () {
      var event = new MouseEvent('click');
      link.dispatchEvent(event);
      document.body.removeChild(link);
		});
    



}*/


/*function nueva(){

 var lista_errores_sintacticos=[];
 var  ListaErroresLexicos=[];

  var url= "http://192.168.1.11:3000/retornarLexicos";
  var req = new XMLHttpRequest();
  req.open('GET', url, false); 
  req.send(null);
  if(req.status == 200){
  
  
  var hola = JSON.parse(req.responseText); console.log(hola.infoHTML);
  }else{
    alert("error");
  }
   ListaErroresLexicos=hola.lista;
  console.log(hola.lista);
  console.log("***************************");
  console.log(ListaErroresLexicos);

}*/

function descargarreporte(){

 var lista_errores_sintacticos=[];
 var  ListaErroresLexicos=[];

  var url= "http://192.168.1.11:3000/retornarLexicos";
  var req = new XMLHttpRequest();
  req.open('GET', url, false); 
  req.send(null);
  if(req.status == 200){
  
  
  var hola = JSON.parse(req.responseText); 
  console.log(hola.lista);
  ListaErroresLexicos=hola.lista;
  }else{
    alert("error");
  }

  var url= "http://192.168.1.11:3000/retornarSintacticos";
  var req = new XMLHttpRequest();
  req.open('GET', url, false); 
  req.send(null);
  if(req.status == 200){

  
   var hola= JSON.parse(req.responseText);
    console.log(hola.lista);
    lista_errores_sintacticos=hola.lista;
  }else{
    alert("error");
  }



  var textFile = null,
  makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/plain'});

    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
  };

  var reporte="";
  reporte+="<!DOCTYPE html5>   <head>       <title>R e p o r t e</title>       <style>       table {font-family: arial, sans-serif; border: 1px solid #dddddd;        width: 100%;}        td, th {border: 1px solid #dddddd;text-align: left;           padding: 8px;}        th{background-color:green;color: white;}        </style>      </head>  <body>       <h2>ERRORES LEXICOS</h2>";
  reporte+="   <table >  <tr>   <th>No.</th>      <th>TIPO</th>       <th>ID</th>       <th>FILA</th>       <th>COLUMNA</th>   </tr> ";

  var numero=1;
 ListaErroresLexicos.forEach(element => {
    
  reporte+="<tr>";
  reporte+="<td>"+numero++ +"</td>";
  reporte+="<td>"+element.tipo+"</td>";
  reporte+="<td>"+element.lexema+"</td>";
  reporte+="<td>"+element.fila+"</td>";
  reporte+="<td>"+element.columna+"</td>";
 
  reporte+="</tr>";
  });

  reporte+="  </table>";

reporte+="<h2>ERRORES SINTACTICOS</h2>"
  reporte+="   <table >  <tr>   <th>No.</th>      <th>TIPO</th>       <th>DESCRIPCION</th>       <th>FILA</th>       <th>COLUMNA</th>   </tr> ";

   numero=1;
 lista_errores_sintacticos.forEach(element => {
    
  reporte+="<tr>";
  reporte+="<td>"+numero++ +"</td>";
  reporte+="<td>"+element.tipo+"</td>";
  reporte+="<td>"+element.lexema+"</td>";
  reporte+="<td>"+element.fila+"</td>";
  reporte+="<td>"+element.columna+"</td>";
 
  reporte+="</tr>";
  });

  reporte+="  </table>";

  reporte+="</body>   </html>";
    var link = document.createElement('a');
    link.setAttribute('download', 'reporte.html');
    link.href = makeTextFile(reporte);
    document.body.appendChild(link);

    
    window.requestAnimationFrame(function () {
      var event = new MouseEvent('click');
      link.dispatchEvent(event);
      document.body.removeChild(link);
		});
    



}



function guardar_archivo(){
  console.log( document.getElementById("file-input").files[0].name);
  var nombre=document.getElementById("file-input").files[0].name;
  var p1 = document.getElementById(lienzo_actual).value;
  var textFile = null,
  makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/plain'});

    
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
  };


  var link = document.createElement('a');
  link.setAttribute('download', nombre);
  link.href = makeTextFile(p1);
  document.body.appendChild(link);


  window.requestAnimationFrame(function () {
    var event = new MouseEvent('click');
    link.dispatchEvent(event);
    document.body.removeChild(link);
  });
}


function guardar_como(){

 var nombre=prompt('Ingrese el nombre del archivo a guardar:','');
 var p1 = document.getElementById(lienzo_actual).value;
  var textFile = null,
  makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
  };


  var link = document.createElement('a');
  link.setAttribute('download', nombre);
  link.href = makeTextFile(p1);
  document.body.appendChild(link);

  // wait for the link to be added to the document
  window.requestAnimationFrame(function () {
    var event = new MouseEvent('click');
    link.dispatchEvent(event);
    document.body.removeChild(link);
  });

}

/*
function convertir_json(){
var contenidoHTML = document.getElementById("textarea1").value;
var estado=0;
var numaux=0;
var concatena="";
var charActual='';
var indentado=0;
var concat_identado="";
var lista_json=[];
for(var i=0;i<contenidoHTML.length;i++){
 
  charActual=contenidoHTML[i];


  switch(estado){
  
  case 0:
      if(charActual=='<'){
      estado=1;
      }else if((charActual.charCodeAt(0) >= 48 && charActual.charCodeAt(0) <= 57) ||(charActual.charCodeAt(0) >= 65 && charActual.charCodeAt(0) <= 90) || (charActual.charCodeAt(0) >= 97 && charActual.charCodeAt(0) <= 122)){
      estado=2;
      concatena+=charActual;
      }else{
        estado=0;
       // alert("datos no aceptados en formato json");
      }
  break;
  //--------------------------------------------------------------------------------------------------------------------
  case 1:
    if((charActual.charCodeAt(0) >= 48 && charActual.charCodeAt(0) <= 57)||(charActual.charCodeAt(0) >= 65 && charActual.charCodeAt(0) <= 90) || (charActual.charCodeAt(0) >= 97 && charActual.charCodeAt(0) <= 122)){
      //si es una letra o un numero entonces concatenamos hasta que haya una coindidencia de etiqueta
    concatena+=charActual;
    estado=1;

    }else{
      //una vez que dejen de venir letras comparamos la eitqueta que se obtuvo
      concat_identado="";
      for(var j=0;j<indentado;j++){
       concat_identado+="   "; 
      }
     
     
      if(charActual=='/'){
        indentado--;
        lista_json.push(concat_identado+"}");
        estado=3;
        concatena="";
      }else{
        


        if(concatena=="html" || concatena=="HTML"){
          indentado++;
          lista_json.push(concat_identado+"\""+concatena+"\":{");
          estado=0;
          concatena="";
        }else if(concatena=="head" || concatena=="HEAD"  ){
          indentado++
          lista_json.push(concat_identado+"\""+concatena+"\":{");
          estado=0;
          concatena="";
        }else if(concatena=="body" || concatena=="BODY"){
          indentado++;
          lista_json.push(concat_identado+"\""+concatena+"\":{");
          estado=0;
          concatena="";
        }else if(concatena=="title" || concatena=="TITLE"){
          indentado++;
          lista_json.push(concat_identado+"\""+concatena+"\":{");
          estado=0;
          concatena="";
        }else if(concatena=="div" || concatena=="DIV" ){
          indentado++;
          lista_json.push(concat_identado+"\""+concatena+"\":{");
          estado=0;
          concatena="";
        }else if(concatena=="br" || concatena=="BR" ){
          indentado++;
          lista_json.push(concat_identado+"\""+concatena+"\":{");
          estado=0;
          concatena="";
        }else if(concatena=="p" || concatena=="P"){
          indentado++;
          lista_json.push(concat_identado+"\""+concatena+"\":{");
          estado=0;
          concatena="";
        }else if(concatena=="h1" || concatena=="H1"){
          indentado++;
          lista_json.push(concat_identado+"\""+concatena+"\":{");
          estado=0;
          concatena="";
        }else if(concatena=="button" || concatena=="H1"){
          indentado++;
          lista_json.push(concat_identado+"\""+concatena+"\":{");
          estado=0;
          concatena="";
        }else if(concatena=="label" || concatena=="LABEL"){
          indentado++;
          lista_json.push(concat_identado+"\""+concatena+"\":{");
          estado=0;
          concatena=""; 
        }else if(concatena=="input" || concatena=="INPUT"){
          indentado++;
          lista_json.push(concat_identado+"\""+concatena+"\":{");
          estado=0;
          concatena="";
        }else{
          estado=0;
          concatena="";
        }



      }
    }
    break;

  //----------------------------------------------------------------------------------------------------------------------
  case 2:

    if(contenidoHTML[numaux+1]=='<' || contenidoHTML[numaux+1]=='>'){
      concat_identado="";
      for(var j=0;j<indentado;j++){
       concat_identado+="   "; 
      }

      if(concatena.startsWith("style")){
        lista_json.push(concat_identado+"\"STYLE\":"+"\""+concatena.substring(concatena.indexOf("=")+1,concatena.length)+"\"");
      }else{
        lista_json.push(concat_identado+"\"TEXTO\":"+"\""+concatena+charActual+"\"");
      }
      
      estado=0;
      concatena="";
    }else{
    concatena+=charActual;
    estado=2;
    }
    break;

    case 3:
    
    if(charActual=='>'){
      estado=0;
    }else{
      estado=3;
    }
      break;
  }

  numaux++;
}


  //ahora mostramos los textos json encontrados
  var escribir_json = "";
  lista_json.forEach(element => {
    escribir_json += element + "\n";

  });
  //vamos a asigar el dato al html
  var elemento = document.getElementById("textarea2");
  elemento.innerHTML = escribir_json;
   console.log(lista_json);

  
}*/
//--------------------------------------------------------------------------------------------------------------------------------------




//---------------------------------------------------------------------------------------------------------------------------------------

async function verificando(){
  

  const url = 'http://192.168.1.11:3000/getMarcos'
 
  let response = await fetch(url);

if (response.ok) { // if HTTP-status is 200-299
  // get the response body (the method explained below)
  console.log("todo bien")
//  let json = await response.json();
let json = await response.json();
    console.log(json);
} else {
  alert("HTTP-Error de conexion en getMarcos: " + response.status);
}

}


function realizar_analisis(){

  var elemento = document.getElementById(lienzo_actual);
  contenidoo = elemento.value;
  console.log("el contenido es:", contenidoo);  
 
  //aqui commienza el analisis de esa informacion
  completar_analisis(contenidoo);


}

async function completar_analisis(datos_entrada){
  

  const url = 'http://192.168.1.11:3000/analizar'
 
  let user = {
    contenido: datos_entrada
    
  };
  
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  });
  
  let result = await response.json();
  console.log(result);
  alert("Analisis Finalizado");
  contador_de_analisis++;


}


function realizar_analisisaux(){

  var elemento = document.getElementById(lienzo_actual);
  contenidoo = elemento.value;
  console.log("el contenido es:", contenidoo);  
 
  //aqui commienza el analisis de esa informacion
  completar_analisisaux(contenidoo);


}

async function completar_analisisaux(datos_entrada){
  

  const url = 'http://192.168.1.11:3000/analizaraux'
 
  let user = {
    contenido: datos_entrada
    
  };
  
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  });
  
  let result = await response.json();
  console.log(result);
  alert("Analisis Finalizado archivo copia");
  contador_de_analisis++;


}


function comparar(){

  if(contador_de_analisis>=2){
    var url= "http://192.168.1.11:3000/comparar";
	  var req = new XMLHttpRequest();
		req.open('GET', url, false); 
		req.send(null);
		if(req.status == 200){
      console.log("salida de comparacion de datos");
		
       var hola= JSON.parse(req.responseText); 
       console.log("mostrando respuesta");
       console.log(hola);
       console.log(hola.clasescopias);

  var clasess= hola.clasescopias;
       //mandamos a mostrar la lista de ids encontrados

  //limpiamos las tablas
  var elmtTable = document.getElementById('mitabladeclases');
  var tableRows = elmtTable.getElementsByTagName('tr');
  var rowCount = tableRows.length;

  for (var x = rowCount - 1; x > 0; x--) {
    elmtTable.removeChild(tableRows[x]);
  }

  var elmtTable = document.getElementById('mitabladefunciones');
  var tableRows = elmtTable.getElementsByTagName('tr');
  var rowCount = tableRows.length;

  for (var x = rowCount - 1; x > 0; x--) {
    elmtTable.removeChild(tableRows[x]);
  }


  var elmtTable = document.getElementById('mitabladevariables');
  var tableRows = elmtTable.getElementsByTagName('tr');
  var rowCount = tableRows.length;

  for (var x = rowCount - 1; x > 0; x--) {
    elmtTable.removeChild(tableRows[x]);
  }

  var mitabla = document.getElementById("mitabladeclases");




  clasess.forEach(element => {

    var mitr = document.createElement("tr");
    mitr.setAttribute("id", "trs");

    var tipo_ = document.createElement("td");
    tipo_.setAttribute("class", "cajitas");
    var newContent = document.createTextNode(element.nombre_clase);
    tipo_.appendChild(newContent);

    var nombre_ = document.createElement("td");
    nombre_.setAttribute("class", "cajitas");
    newContent = document.createTextNode(element.lista_funciones.length);
    nombre_.appendChild(newContent);

    var valor_ = document.createElement("td");
    valor_.setAttribute("class", "cajitas");
    newContent = document.createTextNode(element.lista_metodos.length);
    valor_.appendChild(newContent);

    var total_ = document.createElement("td");
    total_.setAttribute("class", "cajitas");
    newContent = document.createTextNode(element.cantidad_metodos_funciones);
    total_.appendChild(newContent);



    var fila_ = document.createElement("td");
    fila_.setAttribute("class", "cajitas");
    newContent = document.createTextNode(element.fila);
    fila_.appendChild(newContent);

    var columna_ = document.createElement("td");
    columna_.setAttribute("class", "cajitas");
    newContent = document.createTextNode(element.columna);
    columna_.appendChild(newContent);


    mitr.appendChild(tipo_);
    mitr.appendChild(nombre_);
    mitr.appendChild(valor_);
    mitr.appendChild(total_);
    mitr.appendChild(fila_);
    mitr.appendChild(columna_);

    mitabla.appendChild(mitr);

    var mitabla2 = document.getElementById("mitabladefunciones");

    element.lista_metodos.forEach(element => {

      var mitr = document.createElement("tr");
      mitr.setAttribute("id", "trs");
  
      var tipo_ = document.createElement("td");
      tipo_.setAttribute("class", "cajitas");
      var newContent = document.createTextNode(element.Identiicador);
      tipo_.appendChild(newContent);
  
      var nombre_ = document.createElement("td");
      nombre_.setAttribute("class", "cajitas");
      newContent = document.createTextNode(element.valor);
      nombre_.appendChild(newContent);
  
      var valor_ = document.createElement("td");
      valor_.setAttribute("class", "cajitas");
      element.lista_parametros.forEach(element => {
        newContent = document.createTextNode(element.valor+"\n");
        valor_.appendChild(newContent);

      });
    
    
  
      var total_ = document.createElement("td");
      total_.setAttribute("class", "cajitas");
      newContent = document.createTextNode(element.cantidad);
      total_.appendChild(newContent);
  
  
  
      var fila_ = document.createElement("td");
      fila_.setAttribute("class", "cajitas");
      newContent = document.createTextNode(element.fila);
      fila_.appendChild(newContent);
  
      var columna_ = document.createElement("td");
      columna_.setAttribute("class", "cajitas");
      newContent = document.createTextNode(element.columna);
      columna_.appendChild(newContent);
  
  
      mitr.appendChild(tipo_);
      mitr.appendChild(nombre_);
      mitr.appendChild(valor_);
      mitr.appendChild(total_);
      mitr.appendChild(fila_);
      mitr.appendChild(columna_);
  
      mitabla2.appendChild(mitr);

      
    });


    var mitabla3 = document.getElementById("mitabladefunciones");

    element.lista_funciones.forEach(element => {

      var mitr = document.createElement("tr");
      mitr.setAttribute("id", "trs");
  
      var tipo_ = document.createElement("td");
      tipo_.setAttribute("class", "cajitas");
      var newContent = document.createTextNode(element.Identiicador);
      tipo_.appendChild(newContent);
  
      var nombre_ = document.createElement("td");
      nombre_.setAttribute("class", "cajitas");
      newContent = document.createTextNode(element.valor);
      nombre_.appendChild(newContent);
  
      var valor_ = document.createElement("td");
      valor_.setAttribute("class", "cajitas");
      element.lista_parametros.forEach(element => {
        newContent = document.createTextNode(element.valor+"\n");
        valor_.appendChild(newContent);

      });
    
    
  
      var total_ = document.createElement("td");
      total_.setAttribute("class", "cajitas");
      newContent = document.createTextNode(element.cantidad);
      total_.appendChild(newContent);
  
  
  
      var fila_ = document.createElement("td");
      fila_.setAttribute("class", "cajitas");
      newContent = document.createTextNode(element.fila);
      fila_.appendChild(newContent);
  
      var columna_ = document.createElement("td");
      columna_.setAttribute("class", "cajitas");
      newContent = document.createTextNode(element.columna);
      columna_.appendChild(newContent);
  
  
      mitr.appendChild(tipo_);
      mitr.appendChild(nombre_);
      mitr.appendChild(valor_);
      mitr.appendChild(total_);
      mitr.appendChild(fila_);
      mitr.appendChild(columna_);
  
      mitabla3.appendChild(mitr);

      
    });

    var mitabla4 = document.getElementById("mitabladevariables");

    element.lista_ids.forEach(element => {

      var mitr = document.createElement("tr");
      mitr.setAttribute("id", "trs");
  
      var tipo_ = document.createElement("td");
      tipo_.setAttribute("class", "cajitas");
      var newContent = document.createTextNode("ID");
      tipo_.appendChild(newContent);
  
      var nombre_ = document.createElement("td");
      nombre_.setAttribute("class", "cajitas");
      newContent = document.createTextNode(element.valor);
      nombre_.appendChild(newContent);
  
      
    
  
  
      var fila_ = document.createElement("td");
      fila_.setAttribute("class", "cajitas");
      newContent = document.createTextNode(element.fila);
      fila_.appendChild(newContent);
  
      var columna_ = document.createElement("td");
      columna_.setAttribute("class", "cajitas");
      newContent = document.createTextNode(element.columna);
      columna_.appendChild(newContent);
  
  
      mitr.appendChild(tipo_);
      mitr.appendChild(nombre_);
   
      mitr.appendChild(fila_);
      mitr.appendChild(columna_);
  
      mitabla4.appendChild(mitr);

      
    });




  });
       alert("Analisis de copias completado,\n verifica tus tablas");
		}else{
			alert("error");
		}

  }else{
    alert("no ha cargado un archivo para comparar");
  }

}


function indicarnumero0(){

  var elemento = document.getElementById(lienzo_actual);
  var nvalor="";
  var contenido = elemento.value;
  var lineas = contenido.split('\n');
  var total=0;
  var paralabel="";
  for(var i = 0;i < lineas.length;i++){
  nvalor  += (i+1) + ' ' +lineas[i] + '\n';
  total=i+1;



}
 
 var miindicador= document.getElementById("posicion");
 miindicador.innerHTML="Posicion del cursor: "+ "fila: "+total;
 // document.getElementById('n').disabled = true; //opcional
}