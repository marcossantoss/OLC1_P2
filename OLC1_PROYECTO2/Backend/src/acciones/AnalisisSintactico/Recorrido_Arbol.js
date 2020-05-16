var Nodo_reporte= require("./Reportes_copias");


var Lista_reporte1=[]; //esta van a ser de tipo Nodo_reporte


var nombre_clase_actual;


var pos = 0;
var Clases_copias=[];
var Clases_original=[];


var bandera_clase_original=false;
var bandera_clase_copia=false;


var Funciones_copias=[];
var Metodos_copias=[];
var Ids_copias=[];

var contador_funciones_original=0;
var contador_metodos_original=0;

var contador_metodos_copias=0;
var contador_funciones_copias=0;

var contador_clases_originales=0;
var contador_clases_copias=0;



var Sim = require('./Simbolo');


class Recorrido_Arbol{

    constructor(Raiz){
      this.limpiarlistas_copias();
    this.concatena="";
     this.Raiz=Raiz;
     console.log("\n");
     console.log("mostrando la raiz desde la clase Recorrido arbol");
    // console.log(this.Raiz);
    this.contenidoHTML=this.recorrer_arbolito(Raiz);

    }

      //esto es para recorrer el arbol


recorrer_arbolito(nodo)
{

    pos = pos + 1;
    var padre = "nodo" + pos;
    
    var text_html="";

        //console.log( padre +" - "+nodo.tipo + " - "+nodo.valor);
    
    if(nodo.valor == ""){
       text_html="<ul><li data-jstree='{ \"opened\" : true }'>\"" + nodo.tipo+ "\"\n";
      //              <li data-jstree='{ "opened" : true }'></li>
    }else{
       text_html="<ul><li data-jstree='{ \"opened\" : true }'> \"" + nodo.tipo+ "\" <-> \""+nodo.valor+"\"\n";
    }
    
           // concatena+= padre + "[label=\""+pos+") valor: "+nodo.valor+"\"];\n";
           /* concatena += padre + "[ shape=Mrecord,style=filled, fillcolor=slategray4 , color=lightblue4 , label=<<TABLE border=\"0\" cellborder=\"0\" bgcolor=\"lightskyblue4\">\n";
             concatena +=
             "<TR>\n"

            + "<td border=\"1\" >" + nodo.valor + " </td>\n"

            + " </TR>\n"

            + "</TABLE>>]";*/
            
    nodo.hijos.forEach(element => {
        
        // console.log("soy hijo de: "+ nodo.tipo)
        /*  concatena += padre + "->" + "nodo" + (1 + pos) + ";\n";
        concatena += recorrer_arbolito(hijo);*/

        //ejecutamos nuestros metodo recursivo
      text_html +=   this.recorrer_arbolito(element);
    });
   

    text_html+="</li></ul>"+"\n";
    return text_html;

}




buscar_elemento_arbolito_reporte1(nodo,tipo,valor)
{

  console.log("\n");
  console.log("los datos coinciden : " + nodo.tipo + " , "+ nodo.valor + " con los datos buscado : "+ tipo + " , "+ valor);
    var nodo_actual=nodo;
  
    var encontrado=false;
    
    
    if(contador_clases_originales===contador_clases_copias){
      
      bandera_clase_copia=true;
    }else{
      bandera_clase_copia=false;
    }



    if(nodo.tipo===tipo && nodo.valor===valor && tipo==="CLASS"){
         
      
      Clases_copias.push(new Sim("COPIA","CLASS",nodo.valor,-1,null,nodo.fila,nodo.columna));;
      console.log("esto es verdadero");
     
      bandera_clase_original=true;
      encontrado=true;

      
      
      
    }else if(nodo.tipo===tipo && nodo.valor===valor && tipo==="METODO" && bandera_clase_copia ){

     var cantidad_parametros= nodo.hijos[0].hijos.length;

      Metodos_copias.push(new Sim("COPIA","METODO",nodo.valor,cantidad_parametros,nodo.hijos[0].hijos,nodo.fila,nodo.columna));
      contador_metodos_copias++;
      encontrado=true;
     
    }else if(nodo.tipo===tipo && nodo.valor===valor && tipo==="FUNCION" && bandera_clase_copia ){

      console.log(nodo.hijos.hijos);

      var cantidad_parametros= nodo.hijos[0].hijos.length;

      Funciones_copias.push(new Sim("COPIA","FUNCION",nodo.valor,cantidad_parametros,nodo.hijos[0].hijos,nodo.fila,nodo.columna));
     
      contador_funciones_copias++;
      encontrado=true;
    }else if(nodo.tipo===tipo && nodo.valor===valor && tipo==="ID" && bandera_clase_copia ){

      Ids_copias.push(new Sim("COPIA","ID",nodo.valor,-1,null,nodo.fila,nodo.columna));
      encontrado=true;
    }else if(nodo.tipo==="}"){
    contador_clases_copias++;

    }
            
   
              for(var i=0; i<nodo_actual.hijos.length;i++){
                if(encontrado===true){
                    break;
                }else{
                    this.buscar_elemento_arbolito_reporte1(nodo_actual.hijos[i],tipo,valor);
                }
              }

  
   

   
  //  return encontrado;

}



buscar_clases_y_cantidad_metodos(raizoriginal,raizcopia)
{
//aqui recorremos todo el archivo original, es decir por cada nodo de la raiz original 
//se va a buscar a la raiz copia , es decir que por cada nodo original, se recorre todo el arbol
//copia en buscar de alguna coincidencia
    var nodo_actual=raizoriginal;
  
  
    console.log("elemento a buscar : "+ raizoriginal.tipo + " , "+ raizoriginal.valor);
    //vamos a buscar la copia
    if(raizoriginal.tipo==="CLASS"){
     //aqui vamos a reportar de inicio
      nombre_clase_actual=raizoriginal.valor;
      
    
    }else if(raizoriginal.tipo==="METODO"){
      contador_metodos_original++;

    }else if(raizoriginal.tipo==="FUNCION"){
      contador_funciones_original++;

    }else if(raizoriginal.tipo==="}"){
    
 
      if(bandera_clase_original){
        var total= contador_metodos_copias+contador_funciones_copias;
        Lista_reporte1.push(new Nodo_reporte(Clases_copias[contador_clases_originales].valor,total,Metodos_copias,Funciones_copias,Ids_copias,Clases_copias[contador_clases_originales].fila,Clases_copias[contador_clases_originales].columna));
     
      }
      
      //cada vez que encuentre una clase se vuelve a cero para volver a contar
        contador_funciones_copias=0;
        contador_metodos_copias=0;
        contador_funciones_original=0;
        contador_metodos_original=0;
        contador_clases_originales++;

        bandera_clase_original=false;

       
        Funciones_copias=[];
        Metodos_copias=[];
        Ids_copias=[];
    }
    contador_clases_copias=0;
    this.buscar_elemento_arbolito_reporte1(raizcopia,raizoriginal.tipo,raizoriginal.valor);
       
            
    nodo_actual.hijos.forEach(element => {
  
        this.buscar_clases_y_cantidad_metodos(element,raizcopia);
    });
  
   
}

mostrar_copias(){

  console.log("estoy mostrando las copias");

  console.log(Lista_reporte1);
  /*console.log(Clases_copias);

  console.log("------------------------------------");


  console.log("Cantidad de funciones encontrados: "+ contador_funciones_copias);
  console.log("Cantidad de Metodos encontrados: "+ contador_metodos_copias);
  console.log("Total de metodos y funciones copias: "+ (contador_metodos_copias+contador_funciones_copias));


  console.log("mostrando funciones copias");
  console.log(Funciones_copias);

  console.log("mostrando metodos copias");
  console.log(Metodos_copias);*/

  console.log("fin de las copias");


}


retornarreporteclases(){
  return Lista_reporte1;
}

limpiarlistas_copias(){

  Lista_reporte1=[]; //esta van a ser de tipo Nodo_reporte


  nombre_clase_actual="";
  
  
  pos = 0;
  Clases_copias=[];
  Clases_original=[];
  
  
  bandera_clase_original=false;
  bandera_clase_copia=false;
  
  
  Funciones_copias=[];
  Metodos_copias=[];
  
  contador_funciones_original=0;
  contador_metodos_original=0;
  
  contador_metodos_copias=0;
  contador_funciones_copias=0;
  
  contador_clases_originales=0;
  contador_clases_copias=0;
}

}

module.exports= Recorrido_Arbol;