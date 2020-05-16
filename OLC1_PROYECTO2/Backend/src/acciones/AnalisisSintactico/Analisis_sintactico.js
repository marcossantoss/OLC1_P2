
var Token_lenguaje = require('../AnalisisLexico/Token_lenguaje');

var Simbolo = require('./Simbolo');
var Nodo = require('./Nodo_Arbol');

var numero_errores_fatales=0;
//esto es para insertar 
/*
     Nodo padre = new Nodo(".");
                    Nodo hijo1 = new Nodo(expression.expresionEstructurdaenLista.ElementAt(i).Replace("|", "(or)"));
                    Nodo hijo2 = new Nodo("#");
                    //     MessageBox.Show("EL hijo 1 contiene :" + hijo1.valor);
                    padre.agregarHijo(hijo1);
                    padre.agregarHijo(hijo2);
                    formarArbol(hijo1, expression.expresionEstructurdaenLista);
                    
*/

var Raiz;



var numero_preanalisis;//sirve para saber que elemento de la lista buscar
var simbolo_preanalisis;//seteamos el simbolo actual de analisis
//lista que se obtiene del scanner
var analisisCorrecto = false;//verifica si fue satisfactorio el analisis

var id_auxiliar = "";//nos va servir para almacenar en la lista de nuestros ids , ya que este dato se obtiene en una derivacion mas abajo y lo que busca es insertar la informacion en una produccion mas arriba
var auxiliar="";
var tipo="";

//contendra la lista de los datos html
var lista_html=[];

//contendra los errores sintacticos recuperados
var lista_errores_sintacticos=[];

//contendra todos las variables declaradas
var lista_ids = [];
var tipo_id="";

//esto servira para insertar los datos traducidos
var lista_traduccion_pyton = [];

//esto servira para saber si lo que se toma es un string
var string_dectectado = false;

//esta servira para traducir las declaraciones de variables
var id_actual = "";
var concatena_expresion = "";
var posicion_lista_traduccion_pyton = 0;
var cantidad_de_ids_sin_expresion = 0;

//estos me serviran para concatenar informacion de las demas sentencias
var concatena_funcion = "";
var concatena_metodo = "";
var concatena_main = "";
var concatena_asignacion = "";
var concatena_if = "";
var concatena_switch = "";
var contador_casos = 1;
var concatena_ciclos = "";

class Analisis_Sintactico {

    constructor(ListaParser) {

        //aqui limpiamos todas nuestras variables ya que aqui es donde obtenemos todos los datos
       this.limpiarLista();
        analisisCorrecto = true;
        numero_preanalisis = 0;
        this.ListaParserA=ListaParser;
        simbolo_preanalisis=this.ListaParserA[0]
       
        lista_traduccion_pyton = [];
        posicion_lista_traduccion_pyton = 0;
        lista_ids=[];
        lista_html=[];
   
      // console.log("la info es: ");
      //si esta llegando la lista tal como es
      //  console.log(ListaParser[0]);
      var Padre_todo= new Nodo("INICIO","",simbolo_preanalisis.fila,simbolo_preanalisis.columna)

       this.INICIO(Padre_todo);
     
      // console.log("monstrando pader de todo");
       //console.log(Padre_todo);
       Raiz=Padre_todo;
       console.log("Analisis sintactico correcto");
      
    }

    INICIO(raiz) {//inicio -> L_INS # 

        
        this.L_INS(raiz);//se completan todas las instrucciones
        
        //espero el simbolo del final del archivo
        if (simbolo_preanalisis.getTipo() == 90) {

            this.match(90,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        }


    }

    L_INS(raiz) {//l_ins -> ins l_ins'

        this.INS(raiz); this.L_INSP(raiz);

    }

    L_INSP(raiz) {

        //L_INSP->   L_INSP
        if (simbolo_preanalisis.getTipo() == 45 || simbolo_preanalisis.getTipo() == 49 || simbolo_preanalisis.getTipo() == 47 || simbolo_preanalisis.getTipo() == 48 || simbolo_preanalisis.getTipo() == 46) {

            this.L_INS(raiz);

        } else if (simbolo_preanalisis.getTipo() == 10) {//void id ( L_PARAMETROS )  {  //mas instrucciones }

            this.L_INS(raiz);


        } else if (simbolo_preanalisis.getTipo() == 27) {//if ( EXPRESION ) {  //mas instrucciones  }

            this.L_INS(raiz);

        } else if (simbolo_preanalisis.getTipo() == 20) {//swicth ( EXPRESION ) {  //mas instrucciones  }

            this.L_INS(raiz);
        } else if (simbolo_preanalisis.getTipo() == 1) {// id = expresion;

            this.L_INS(raiz);
        } else if (simbolo_preanalisis.getTipo() == 34) {// for ( asignacion o declaracion ;  expresion ; id ++ ó id -- ){ //mas instrucciones}

            this.L_INS(raiz);
        } else if (simbolo_preanalisis.getTipo() == 22) {//BREAK;
            this.L_INS(raiz);

        } else if (simbolo_preanalisis.getTipo() == 40) {//Continue;
            this.L_INS(raiz);
        } else if (simbolo_preanalisis.getTipo() == 39) {//return;
            this.L_INS(raiz);
        } else if (simbolo_preanalisis.getTipo() == 37) {//while (expresion) { //mas instrucciones }
            this.L_INS(raiz);
        } else if (simbolo_preanalisis.getTipo() == 38) {//do -while
            this.L_INS(raiz);
        } else if (simbolo_preanalisis.getTipo() == 63) {//System
            this.L_INS(raiz);
        } 
        else if (simbolo_preanalisis.getTipo() == 61) {//class
            //class
            this.L_INS(raiz);
        } else if (simbolo_preanalisis.getTipo() == 62) {//import
            //import
            this.L_INS(raiz);
        } else {
            //L_INSP-> epsilon
          return;
            /*  console.log("Estoy aqui: "+simbolo_preanalisis.lexema + ", especificamente en la linea "+ simbolo_preanalisis.fila);
            numero_preanalisis++;
            simbolo_preanalisis=this.ListaParserA[numero_preanalisis];
             console.log("El tamanio de simbolos preanalisis es: "+ numero_preanalisis);
             console.log("El tamanio de la lista es: "+ this.ListaParserA.length);
             if(numero_preanalisis<this.ListaParserA.length){
              // this.match(90);
              numero_errores_fatales++;
              this.INS(raiz);
            }else{
                numero_preanalisis--;
                simbolo_preanalisis=this.ListaParserA[numero_preanalisis];
                console.log("Encontramos problemas pero salimos:  con "+ numero_errores_fatales + " errores "); 
                return;
             }*/
            

        }
    }

    INS(raiz) {
        //aqui vamos a encapsular
        if (simbolo_preanalisis.getTipo() == 45 || simbolo_preanalisis.getTipo() == 49 || simbolo_preanalisis.getTipo() == 47 || simbolo_preanalisis.getTipo() == 48 || simbolo_preanalisis.getTipo() == 46) {//INT O STRING O DOUBLE O CHAR O BOOL
            //una declaracion  O  una funcion
            
            this.AUXFUNCION_DECLARACION(raiz);

        } else if (simbolo_preanalisis.getTipo() == 10) {//void id ( L_PARAMETROS )  {  //mas instrucciones }
            //metodo o un main
           

            this.match(10,simbolo_preanalisis.fila,simbolo_preanalisis.columna); 
            this.AUXMETODO_MAIN(raiz);



        } else if (simbolo_preanalisis.getTipo() == 27) {//if ( EXPRESION ) {  //mas instrucciones  }
            //if seguido de mas if o else if o else
            var nodo_padre = new Nodo("IF",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);

            this.SENTENCIA_IF(nodo_padre);

        } else if (simbolo_preanalisis.getTipo() == 20) {//swicth ( EXPRESION ) {  case  }
            //switch
            var nodo_padre = new Nodo("SWITCH",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);

            this.SENTENCIA_SWICTH(nodo_padre);

        } else if (simbolo_preanalisis.getTipo() == 1) {// id = expresion o una llamada a metodos;
            //una asignacion   
            var nodo_padre = new Nodo("ASIGNACION","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);

            this.SENTENCIA_ASIGNACION(nodo_padre);
         
        } else if (simbolo_preanalisis.getTipo() == 34) {// for ( asignacion o declaracion ;  expresion ; id ++ ó id -- ){ //mas instrucciones}
            //for
            var nodo_padre = new Nodo("FOR",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);

            this.SENTENCIA_FOR(nodo_padre);
        } else if (simbolo_preanalisis.getTipo() == 22) {//BREAK;
            //break
            var nodo_padre = new Nodo("BREAK",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);

            this.BREAK();
        } else if (simbolo_preanalisis.getTipo() == 40) {//Continue;
            //continue
            var nodo_padre = new Nodo("CONTINUE",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);

            this.CONTINUE();
        } else if (simbolo_preanalisis.getTipo() == 39) {//return;
            //return
            var nodo_padre = new Nodo("RETURN",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);

            this.RETURN(nodo_padre);
        } else if (simbolo_preanalisis.getTipo() == 37) {//while (expresion) { //mas instrucciones }
            //while    
            var nodo_padre = new Nodo("WHILE",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);

            this.SENTENCIA_WHILE(nodo_padre);
        } else if (simbolo_preanalisis.getTipo() == 38) {//do - while


            //do-while
            var nodo_padre = new Nodo("DO-WHILE",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);

            this.SENTENCIA_DO_WHILE(nodo_padre);
        } else if (simbolo_preanalisis.getTipo() == 63) {//System
            //System
            var nodo_padre = new Nodo("SYSTEM_OUT_PRINTLN",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);

            this.SENTENCIA_CONSOLE(nodo_padre);
        } else if (simbolo_preanalisis.getTipo() == 61) {//class
            //class
           

            this.SENTENCIA_CLASS(raiz);
        } else if (simbolo_preanalisis.getTipo() == 62) {//import
            //import
           

            this.SENTENCIA_IMPORT(raiz);
        } else {
          return;
            /*  console.log("Estoy aqui: "+simbolo_preanalisis.lexema + ", especificamente en la linea "+ simbolo_preanalisis.fila);
            numero_preanalisis++;
            simbolo_preanalisis=this.ListaParserA[numero_preanalisis];
             console.log("El tamanio de simbolos preanalisis es: "+ numero_preanalisis);
             console.log("El tamanio de la lista es: "+ this.ListaParserA.length);
             if(numero_preanalisis<this.ListaParserA.length){
              // this.match(90);
              numero_errores_fatales++;
              this.INS(raiz);
            }else{
                numero_preanalisis--;
                simbolo_preanalisis=this.ListaParserA[numero_preanalisis];
                console.log("Encontramos problemas pero salimos:  con "+ numero_errores_fatales + " errores "); 
                return;
             }*/
        }


    }

    SENTENCIA_CLASS(raiz){

            //class id {  expresiones }
          
            this.match(61); 

            var nodo_padrea = new Nodo("CLASS",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padrea);

            id_auxiliar=simbolo_preanalisis.lexema;
            
            this.match(1); this.match(13);
            var nodo_padre = new Nodo("L_INSTRUCCIONES","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            nodo_padrea.agregarHijo(nodo_padre);
            this.L_INS(nodo_padre); 
            
            this.match(14);
            var nodo = new Nodo("}","cierre_clase",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            id_auxiliar="";
            raiz.agregarHijo(nodo);
            

        return;

    }

    SENTENCIA_IMPORT(raiz){


        // import id ;
        this.match(62);
        var nodo_padre = new Nodo("IMPORT",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        raiz.agregarHijo(nodo_padre);
        this.match(1); this.match(23);



}

    LISTAID(raiz) {
        //LISTAID -> id IDP 
        if (simbolo_preanalisis.getTipo() == 1) {
            this.match(1,simbolo_preanalisis.fila,simbolo_preanalisis.columna);//hace match con id
            this.IDP(raiz);
        } else {
           
            console.log("ERROR DE SINTAXIS en el id, no podemos continuar de manera correcta");
            return;
        }
    }

    IDP(raiz) {

        //IDP-> = EXPRESION LISTA_IDP
        if (simbolo_preanalisis.getTipo() == 3) {
            this.match(3,simbolo_preanalisis.fila,simbolo_preanalisis.columna);//hace match con =
          
            var nodo_padre = new Nodo("EXPRESION","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);   
           
            this.EXPRESION(nodo_padre);
        

            lista_ids.push(new Simbolo(tipo_id,id_actual,concatena_expresion,simbolo_preanalisis.fila,simbolo_preanalisis.columna));
                
            lista_traduccion_pyton.push(id_actual + "=" + concatena_expresion);
            posicion_lista_traduccion_pyton++;
            id_actual = "";
            concatena_expresion = "";
        
            
           

            this.LISTAIDP(raiz);
        } else {
            //IDP-> LISTA_IDP
            //soportamos el error del singno = , si viene un num o false o true o un signo menos -34 o una cadena se toma como una expresion
            if (simbolo_preanalisis.getTipo() == 33 || simbolo_preanalisis.getTipo() == 32 || simbolo_preanalisis.getTipo() == 31 || simbolo_preanalisis.getTipo() == 51 || simbolo_preanalisis.getTipo() == 52 || simbolo_preanalisis.getTipo() == 7 || simbolo_preanalisis.getTipo() == 43) {
              
              
                this.match(3,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
              
                var nodo_padre = new Nodo("EXPRESION","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                raiz.agregarHijo(nodo_padre);   
               
              
                this.EXPRESION(nodo_padre);
                lista_ids.push(new Simbolo(tipo_id,id_actual,concatena_expresion,simbolo_preanalisis.fila,simbolo_preanalisis.columna));
                lista_traduccion_pyton.push(id_actual + "=" + concatena_expresion);
                posicion_lista_traduccion_pyton++;
                id_actual = "";
                concatena_expresion = "";

             
                this.LISTAIDP(raiz);

            } else {
                cantidad_de_ids_sin_expresion++;
                lista_traduccion_pyton.push(id_actual);
                posicion_lista_traduccion_pyton++;
                id_actual = "";
                    
            
            this.LISTAIDP(raiz);

            }
        }
    }

    LISTAIDP(raiz) {

        //LISTAIDP -> , id IDP 
        if (simbolo_preanalisis.getTipo() == 2) {

            this.match(2,simbolo_preanalisis.fila,simbolo_preanalisis.columna);//hace match con coma
            id_actual = simbolo_preanalisis.lexema;
            lista_traduccion_pyton.push(id_actual);
            posicion_lista_traduccion_pyton++;
            cantidad_de_ids_sin_expresion++;
            var nodo_padre = new Nodo("ID",id_auxiliar+","+auxiliar+","+tipo+","+simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);   
           

            this.match(1,simbolo_preanalisis.fila,simbolo_preanalisis.columna);//hace match con id

            this.IDBP(raiz);
        } else {
            //soportamos el error de que no venga la coma ;
            if (simbolo_preanalisis.getTipo() == 1) {

                this.match(2,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                id_actual = simbolo_preanalisis.lexema;
                posicion_lista_traduccion_pyton++;
                lista_traduccion_pyton.push(id_actual);
                cantidad_de_ids_sin_expresion++;

                var nodo_padre = new Nodo("ID",id_auxiliar+","+auxiliar+","+tipo+","+simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                raiz.agregarHijo(nodo_padre);   
               

                this.match(1,simbolo_preanalisis.fila,simbolo_preanalisis.columna);//hace match con id
                this.IDBP(raiz);

            } else {
                //recorremos para asginar null


                for (var i = posicion_lista_traduccion_pyton - cantidad_de_ids_sin_expresion; i < posicion_lista_traduccion_pyton; i++) {
                   // console.log("llego aqui");
                   lista_ids.push(new Simbolo(tipo_id,lista_traduccion_pyton[i], "null",simbolo_preanalisis.fila,simbolo_preanalisis.columna));
                
                    lista_traduccion_pyton[i] = lista_traduccion_pyton[i] + "=" + "null";
                 

                }
                cantidad_de_ids_sin_expresion = 0;
                return;
            }
        }

    }

    IDBP(raiz) {

        //IDP-> = EXPRESION LISTA_ID
        if (simbolo_preanalisis.getTipo() == 3) {

            this.match(3,simbolo_preanalisis.fila,simbolo_preanalisis.columna);//hace match con =
            var nodo_padre = new Nodo("EXPRESION","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);   
           
            this.EXPRESION(nodo_padre);

           // console.log("pos - ids : " + (posicion_lista_traduccion_pyton - cantidad_de_ids_sin_expresion));
            for (var i = posicion_lista_traduccion_pyton - cantidad_de_ids_sin_expresion; i < posicion_lista_traduccion_pyton; i++) {
                lista_ids.push(new Simbolo(tipo_id,lista_traduccion_pyton[i], concatena_expresion,simbolo_preanalisis.fila,simbolo_preanalisis.columna));
                
                lista_traduccion_pyton[i] = lista_traduccion_pyton[i] + "=" + concatena_expresion;

            }
            cantidad_de_ids_sin_expresion = 0;
            concatena_expresion = "";
                
           
            this.LISTAIDP(nodo_padre);
        } else {

            //soportamos el error de que no venga el signo =
            //si no viene el = pero si viene un num o  true o false o  una cadena o una negacion se toma como una expresion
            if (simbolo_preanalisis.getTipo() == 33 || simbolo_preanalisis.getTipo() == 32 || simbolo_preanalisis.getTipo() == 31 || simbolo_preanalisis.getTipo() == 51 || simbolo_preanalisis.getTipo() == 52 || simbolo_preanalisis.getTipo() == 7 || simbolo_preanalisis.getTipo() == 43) {
                this.match(3,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                var nodo_padre = new Nodo("EXPRESION","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                raiz.agregarHijo(nodo_padre);   
               
               
                this.EXPRESION(nodo_padre);
                for (var i = posicion_lista_traduccion_pyton - cantidad_de_ids_sin_expresion; i < posicion_lista_traduccion_pyton; i++) {
                    lista_ids.push(new Simbolo(tipo_id,lista_traduccion_pyton[i], concatena_expresion,simbolo_preanalisis.fila,simbolo_preanalisis.columna));
                
              
                    lista_traduccion_pyton[i] = lista_traduccion_pyton[i] + "=" + concatena_expresion;

                }
                cantidad_de_ids_sin_expresion = 0;
                concatena_expresion = "";
                this.LISTAIDP(raiz);

            } else {


                this.LISTAIDP(raiz);

            }


        }





    }


    TIPODATO(raiz) {
        //console.log("estoy en tipo de dato: "+ simbolo_preanalisis.getTipo());
        if (simbolo_preanalisis.getTipo() == 45) {
            tipo_id=simbolo_preanalisis.lexema;

              //aqui tipo de dato se vuelve hijo de raiz
            var nodo_padre = new Nodo("TIPO_DATO",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            this.match(45,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                    
            raiz.agregarHijo(nodo_padre);
       

        } else if (simbolo_preanalisis.getTipo() == 49) {
            tipo_id=simbolo_preanalisis.lexema;

            var nodo_padre = new Nodo("TIPO_DATO",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);
            this.match(49,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        } else if (simbolo_preanalisis.getTipo() == 47) {
            
            var nodo_padre = new Nodo("TIPO_DATO",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);
            tipo_id=simbolo_preanalisis.lexema;
            this.match(47,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        } else if (simbolo_preanalisis.getTipo() == 48) {

            
            var nodo_padre = new Nodo("TIPO_DATO",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);
            tipo_id=simbolo_preanalisis.lexema;
            this.match(48,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        } else if (simbolo_preanalisis.getTipo() == 46) {
            
            var nodo_padre = new Nodo("TIPO_DATO",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);
            tipo_id=simbolo_preanalisis.lexema;
            this.match(46,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        } else {
        
            console.log("ERROR SINTACTICO en tipos de datos, no podemos continuar de manera correcta");
          
            var nodo_padre = new Nodo("ID_recuperado",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);
            this.match(1,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            return;
        }

    return tipo_id;

    }


    TIPODATOAUX(raiz) {
        //console.log("estoy en tipo de dato: "+ simbolo_preanalisis.getTipo());
        if (simbolo_preanalisis.getTipo() == 45) {
            tipo_id=simbolo_preanalisis.lexema;

              //aqui tipo de dato se vuelve hijo de raiz
         //   var nodo_padre = new Nodo("TIPO_DATO",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            this.match(45,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                    
         //   raiz.agregarHijo(nodo_padre);
       

        } else if (simbolo_preanalisis.getTipo() == 49) {
            tipo_id=simbolo_preanalisis.lexema;

         //   var nodo_padre = new Nodo("TIPO_DATO",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
         //   raiz.agregarHijo(nodo_padre);
            this.match(49,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        } else if (simbolo_preanalisis.getTipo() == 47) {
            
        //    var nodo_padre = new Nodo("TIPO_DATO",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        //   raiz.agregarHijo(nodo_padre);
            tipo_id=simbolo_preanalisis.lexema;
            this.match(47,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        } else if (simbolo_preanalisis.getTipo() == 48) {

            
         //   var nodo_padre = new Nodo("TIPO_DATO",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
         //   raiz.agregarHijo(nodo_padre);
            tipo_id=simbolo_preanalisis.lexema;
            this.match(48,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        } else if (simbolo_preanalisis.getTipo() == 46) {
            
          //  var nodo_padre = new Nodo("TIPO_DATO",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
          //  raiz.agregarHijo(nodo_padre);
            tipo_id=simbolo_preanalisis.lexema;
            this.match(46,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        } else {
        
            console.log("ERROR SINTACTICO en tipos de datos, no podemos continuar de manera correcta");
          
          //  var nodo_padre = new Nodo("ID_recuperado",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
          //  raiz.agregarHijo(nodo_padre);
           
          this.match(1,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            return;
        }

    return tipo_id;

    }


    //vamos a programar expresion
    EXPRESION(raiz) {
        this.B(raiz); this.AP(raiz);
    }

    AP(raiz) {

        if (simbolo_preanalisis.getTipo() == 42) {//||

            var nodo_hijo= new Nodo("OPERADOR","or",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_hijo);

            this.match(42,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " or ";
             this.B(raiz); this.AP(raiz);

        } else {
            return;//e
        }
    }

    B(raiz) {
        //console.log("estoy en b");
        this.C(raiz); this.BP(raiz);

    }

    BP(raiz) {
        if (simbolo_preanalisis.getTipo() == 41) {//&&
        
            var nodo_hijo= new Nodo("OPERADOR","and",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_hijo);
           
           
            this.match(41,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " and ";
             this.C(raiz); this.BP(raiz);
        } else {
            return;//e
        }

    }

    C(raiz) {
        this.D(raiz); this.CP(raiz);

    }

    CP(raiz) {

        if (simbolo_preanalisis.getTipo() == 4) {//==
            var nodo_hijo= new Nodo("OPERADOR","==",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_hijo);
          
            this.match(4,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " == ";
             this.D(raiz); this.CP(raiz);
        } else if (simbolo_preanalisis.getTipo() == 44) {//!=

            var nodo_hijo= new Nodo("OPERADOR","!=",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_hijo);

            this.match(44,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " != "; 
            this.D(raiz); this.CP(raiz);
        } else {
            return;//e
        }
    }

    D(raiz) {
        this.E(raiz); this.DP(raiz);
    }

    DP(raiz) {
        if (simbolo_preanalisis.getTipo() == 16) {//>

            var nodo_hijo= new Nodo("OPERADOR",">",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_hijo);

            this.match(16,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " > "; 
            this.E(raiz); this.DP(raiz);
        } else if (simbolo_preanalisis.getTipo() == 17) {//<
           
            var nodo_hijo= new Nodo("OPERADOR","<",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_hijo);

            this.match(17,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " < "; 
            this.E(raiz); this.DP(raiz);
        } else if (simbolo_preanalisis.getTipo() == 18) {//>=

            var nodo_hijo= new Nodo("OPERADOR",">=",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_hijo);

            this.match(18,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " >= ";
             this.E(raiz); this.DP(raiz);
        } else if (simbolo_preanalisis.getTipo() == 19) {//<=
           
            var nodo_hijo= new Nodo("OPERADOR","<=",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_hijo);
           
            this.match(19,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " <= "; 
            this.E(raiz); this.DP(raiz);
        } else {
            return;//e
        }
    }

    E(raiz) {
        this.F(raiz); this.EP(raiz);
    }

    EP(raiz) {

        if (simbolo_preanalisis.getTipo() == 6) {//+

            var nodo_hijo= new Nodo("OPERADOR","+",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_hijo);

            this.match(6,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " + "; 
            this.F(raiz); this.EP(raiz);
        } else if (simbolo_preanalisis.getTipo() == 7) {//-
            var nodo_hijo= new Nodo("OPERADOR","-",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_hijo);

            this.match(7,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " - "; 
            this.F(raiz); this.EP(raiz);
        } else {
            return;//e
        }

    }

    F(raiz) {
        this.G(raiz); this.FP(raiz);
    }

    FP(raiz) {


        if (simbolo_preanalisis.getTipo() == 8) {//*
            var nodo_hijo= new Nodo("OPERADOR","*",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_hijo);
            this.match(8,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " * "; 
            this.G(raiz); this.FP(raiz);
        } else if (simbolo_preanalisis.getTipo() == 9) {//  /
            var nodo_hijo= new Nodo("OPERADOR","/",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_hijo);
            this.match(9,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " / "; 
            this.G(raiz); this.FP(raiz);
        } else if (simbolo_preanalisis.getTipo() == 59) {//  ^
            var nodo_hijo= new Nodo("OPERADOR","^",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_hijo);
            this.match(59,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " / "; 
            this.G(raiz); this.FP(raiz);
        } else if (simbolo_preanalisis.getTipo() == 60) {//  %
            var nodo_hijo= new Nodo("OPERADOR","%",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_hijo);
            this.match(60,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " / "; 
            this.G(raiz); this.FP(raiz);
        } else {
            return;//e
        }
    }


    G(raiz) {

        // console.log("el simbolo de llegada es: "+ simbolo_preanalisis.getTipo());
        if (simbolo_preanalisis.getTipo() == 33) {//numero
            concatena_expresion += simbolo_preanalisis.lexema; 
         
            var nodo_hijo= new Nodo("numero",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_hijo);
         
            this.match(33,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        } else if (simbolo_preanalisis.getTipo() == 32) {//cadena ' ' posible html o char
            console.log("----------------------------------------> "+simbolo_preanalisis.lexema);
            concatena_expresion += simbolo_preanalisis.lexema; 
           
            var nodo_hijo= new Nodo("char",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_hijo);
           
           
            var cadenitahtml=simbolo_preanalisis.lexema.replace("\'","");
            this.match(32,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
         
            if(!(cadenitahtml.length==1 || cadenitahtml.length==2 )){
             lista_html.push(cadenitahtml.replace("'",""));
         
            }
         
            //
        } else if (simbolo_preanalisis.getTipo() == 31) {//cadena " "
            concatena_expresion += simbolo_preanalisis.lexema;
            
            var nodo_hijo= new Nodo("String",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_hijo);

            this.match(31,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        } else if (simbolo_preanalisis.getTipo() == 51) {//true
        
        
            concatena_expresion += simbolo_preanalisis.lexema; 
            
            var nodo_hijo= new Nodo("booleano",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_hijo);
            
            this.match(51,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        } else if (simbolo_preanalisis.getTipo() == 52) {//false
            concatena_expresion += simbolo_preanalisis.lexema; 
            
            var nodo_hijo= new Nodo("booleano",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_hijo);
            
            this.match(52,simbolo_preanalisis.fila,simbolo_preanalisis.columna);

        } else if (simbolo_preanalisis.getTipo() == 1) {//id
            concatena_expresion += simbolo_preanalisis.lexema; 
            
            var nodo_hijo= new Nodo("id",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_hijo);

            this.match(1,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            this.AUX_ID(raiz);
        } else if (simbolo_preanalisis.getTipo() == 7) {//numero negativo
            concatena_expresion += simbolo_preanalisis.lexema;
            
            
            
            this.match(7,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            
            concatena_expresion += simbolo_preanalisis.lexema; 
            
            
            var nodo_hijo= new Nodo("numero negativo","-"+simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_hijo);
            

            this.match(33,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        } else if (simbolo_preanalisis.getTipo() == 43) {//  ! NEGACION
            concatena_expresion += " not "; 
            
            var nodo_hijo= new Nodo("negacion",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_hijo);
            
            this.match(43,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            this.EXPRESION(nodo_hijo);

        } else if (simbolo_preanalisis.getTipo() == 11) {//  (  EXPRESION )
            this.match(11,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
             concatena_expresion += " ( "; 
             var nodo_hijo= new Nodo("EXPRESION","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
             raiz.agregarHijo(nodo_hijo);

             this.EXPRESION(nodo_hijo);
              concatena_expresion += " ) "; 
             this.match(12,simbolo_preanalisis.fila,simbolo_preanalisis.columna);

        }else{
            return;
        }


    }

    AUX_ID(raiz) {

        if (simbolo_preanalisis.getTipo() == 11) {
            this.match(11,simbolo_preanalisis.fila,simbolo_preanalisis.columna); 
            concatena_expresion += " ( "; 

            var nodo_hijo1= new Nodo("LLAMADA_METODO","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_hijo1);
            var nodo_hijo2= new Nodo("L_PARAMETROS","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            nodo_hijo1.agregarHijo(nodo_hijo2);

            this.LISTA_PARAMETROSLLAMADA(nodo_hijo2);
            concatena_expresion += " ) "; 
            this.match(12,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        } else {
            return;
        }
    }
    //-----------------ESTE ES PARA LISTADEPARAMETROS LLAMADA----------------------------------------------------------

    LISTA_PARAMETROSLLAMADA(raiz) {



        if (simbolo_preanalisis.getTipo() == 1 || simbolo_preanalisis.getTipo() == 33 || simbolo_preanalisis.getTipo() == 32 || simbolo_preanalisis.getTipo() == 31 || simbolo_preanalisis.getTipo() == 51 || simbolo_preanalisis.getTipo() == 52 || simbolo_preanalisis.getTipo() == 7 || simbolo_preanalisis.getTipo() == 43) {
            var nodo_hijo= new Nodo("EXPRESION","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_hijo);
           
            this.EXPRESION(nodo_hijo);
            this.LISTA_PARAMETROSLLAMADAP(raiz);

        } else {

            return;
        }
    }

    LISTA_PARAMETROSLLAMADAP(raiz) {

        if (simbolo_preanalisis.getTipo() == 2) {//, EXPRESION
            this.match(2,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " , "
            var nodo_hijo= new Nodo("EXPRESION","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_hijo);
           
            this.EXPRESION(nodo_hijo);
            this.LISTA_PARAMETROSLLAMADAP(raiz);

        } else {

            if (simbolo_preanalisis.getTipo() == 1 || simbolo_preanalisis.getTipo() == 33 || simbolo_preanalisis.getTipo() == 32 || simbolo_preanalisis.getTipo() == 31 || simbolo_preanalisis.getTipo() == 51 || simbolo_preanalisis.getTipo() == 52 || simbolo_preanalisis.getTipo() == 7 || simbolo_preanalisis.getTipo() == 43) {
                this.match(2,simbolo_preanalisis.fila,simbolo_preanalisis.columna); this.match(2,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " , "
                var nodo_hijo= new Nodo("EXPRESION","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                raiz.agregarHijo(nodo_hijo);
                this.EXPRESION(nodo_hijo);
                this.LISTA_PARAMETROSLLAMADAP(raiz);
            } else {
                return;
            }


        }


    }

    //-----------------ESTE ES PARA LISTADEPARAMETROS DECLARARACION----------------------------------------------------------

    LISTA_PARAMETROS(raiz) {



        if (simbolo_preanalisis.getTipo() == 45 || simbolo_preanalisis.getTipo() == 49 || simbolo_preanalisis.getTipo() == 47 || simbolo_preanalisis.getTipo() == 48 || simbolo_preanalisis.getTipo() == 46) {
            
            this.LISTA_PARAMETROSP(raiz);

        } else {

            return;
        }
    }


    LISTA_PARAMETROSP(raiz) {


       var tipo=this.TIPODATOAUX(raiz);


        if (simbolo_preanalisis.getTipo() == 1) {
            concatena_funcion += simbolo_preanalisis.lexema;

            var nodo_padre_parametros = new Nodo("PARAMETRO",tipo+","+simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre_parametros);

            this.match(1,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            this.PARAMETROS(raiz);

        } else {
            //ERROR SINTACTICO
            console.log("imposible recuperarse de este error");
            return;
        }


    }


    PARAMETROS(raiz) {

        if (simbolo_preanalisis.getTipo() == 2) {//, numero
            this.match(2,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            concatena_funcion += " , ";
           var tipo= this.TIPODATOAUX(raiz);
            concatena_funcion += simbolo_preanalisis.lexema;
            var nodo_padre_parametros = new Nodo("PARAMETRO",tipo+","+simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre_parametros);

            this.match(1,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            this.PARAMETROS(raiz);
        } else {



            //recuperamos del error porque se separa por comas
            if (simbolo_preanalisis.getTipo() == 45 || simbolo_preanalisis.getTipo() == 49 || simbolo_preanalisis.getTipo() == 47 || simbolo_preanalisis.getTipo() == 48 || simbolo_preanalisis.getTipo() == 46) {
                this.match(2,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                concatena_funcion += " , ";
                this.TIPODATO(raiz);
                concatena_funcion += simbolo_preanalisis.lexema;
                var nodo_padre_parametros = new Nodo("ID",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                raiz.agregarHijo(nodo_padre_parametros);
                this.match(1,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                this.PARAMETROS(raiz);
            } else {
                return;//epsilon
            }


        }
    }


    //----------------------------------METODO PARA FUNCIONES --------------------------------------------


    AUXFUNCION_DECLARACION(raiz) {

        tipo= this.TIPODATOAUX(raiz);
       var  id_actual = simbolo_preanalisis.lexema
        
        

        this.match(1,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            
       

        if (simbolo_preanalisis.getTipo() == 11) {
            auxiliar=id_actual;
            //si encuentra parentesis se trata de una funcion
            var nodo_padre = new Nodo("FUNCION",id_auxiliar+","+tipo+","+id_actual,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);
    
          
            
    
            concatena_funcion += "def "
            concatena_funcion += id_actual;
            concatena_funcion += "("; 
            this.match(11,simbolo_preanalisis.fila,simbolo_preanalisis.columna); 
           
            var nodo_padre_parametros = new Nodo("L_PARAMETRO","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            nodo_padre.agregarHijo(nodo_padre_parametros);
            this.LISTA_PARAMETROS(nodo_padre_parametros); 
          
          
          
            concatena_funcion += ")"; concatena_funcion += ":";
          
            lista_traduccion_pyton.push(concatena_funcion);
            posicion_lista_traduccion_pyton++;
            concatena_funcion = "";
            this.match(12,simbolo_preanalisis.fila,simbolo_preanalisis.columna); 
            this.match(13,simbolo_preanalisis.fila,simbolo_preanalisis.columna); 
            concatena_funcion += "{"; lista_traduccion_pyton.push(concatena_funcion); 
            posicion_lista_traduccion_pyton++; 

            var nodo_padre = new Nodo("L_INSTRUCCIONES","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);
            this.L_INS(nodo_padre);
            lista_traduccion_pyton.push("}");

            auxiliar="";

            posicion_lista_traduccion_pyton++; 
            this.match(14,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            
            concatena_funcion = "";
            return;


        } else {

            //PUEDEN SER MAS IDS
            var nodo_padre = new Nodo("ID",id_auxiliar+","+auxiliar+","+tipo+","+id_actual,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);
    
           

            this.IDP(raiz); this.match(23,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
          
        }
    }


    //------------------------------------METODO PARA METODOS-------------------------------------------------

    AUXMETODO_MAIN(raiz) {


        //esto no se usa aqui solo el else
        if (simbolo_preanalisis.getTipo() == 30) {
            //se trata del main
            concatena_main += "def ";
            this.match(30,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_main += "main "; concatena_main += "("; concatena_main += ") "; concatena_main += ":";
            lista_traduccion_pyton.push(concatena_main);
            posicion_lista_traduccion_pyton++;
            concatena_main = "";
            this.match(11,simbolo_preanalisis.fila,simbolo_preanalisis.columna); this.match(12,simbolo_preanalisis.fila,simbolo_preanalisis.columna); this.match(13,simbolo_preanalisis.fila,simbolo_preanalisis.columna); lista_traduccion_pyton.push("{"); posicion_lista_traduccion_pyton++;
            var nodo_padre = new Nodo("L_INSTRUCCIONES","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);
            this.L_INS();
             lista_traduccion_pyton.push("}"); posicion_lista_traduccion_pyton++; this.match(14,simbolo_preanalisis.fila,simbolo_preanalisis.columna);

            concatena_main = ""
            lista_traduccion_pyton.push("if __name__ == '__main__':");
            posicion_lista_traduccion_pyton++;
            lista_traduccion_pyton.push("   main()"); posicion_lista_traduccion_pyton++;


        } else {
            //se trata de un metodo
            concatena_metodo += "def ";
            var nodo_padrea = new Nodo("METODO",id_auxiliar+","+simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padrea);

            concatena_metodo += simbolo_preanalisis.lexema; 
            auxiliar=simbolo_preanalisis.lexema;

            this.match(1,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            concatena_metodo += " ( "; 
            this.match(11,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            var nodo_padre = new Nodo("L_PARAMETROS","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            nodo_padrea.agregarHijo(nodo_padre);

            this.LISTA_PARAMETROS(nodo_padre);
             
             concatena_metodo += concatena_funcion;//aqui lo que hacemos es usar esta concatenacion previa 
            concatena_funcion = "";//solo auxiliar por compartir metodos usamos esto 
            concatena_metodo += " ) "; concatena_metodo += " : "; lista_traduccion_pyton.push(concatena_metodo); posicion_lista_traduccion_pyton++;
            concatena_metodo = "";
            this.match(12,simbolo_preanalisis.fila,simbolo_preanalisis.columna); 
            this.match(13,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
             lista_traduccion_pyton.push("{"); posicion_lista_traduccion_pyton++;

             var nodo_padre = new Nodo("L_INSTRUCCIONES","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
             raiz.agregarHijo(nodo_padre);
            this.L_INS(nodo_padre);
             lista_traduccion_pyton.push("}"); 
             posicion_lista_traduccion_pyton++; 
             
             auxiliar="";

             this.match(14,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            concatena_metodo = "";
        }





    }

    //-----------------------------------METODO PARA IF------------------------------------------------------


    SENTENCIA_IF(raiz) {

        concatena_if += "if ";
        this.match(27,simbolo_preanalisis.fila,simbolo_preanalisis.columna);

        this.match(11,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        
        var nodo_padre = new Nodo("EXPRESION","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        raiz.agregarHijo(nodo_padre);
        this.EXPRESION(nodo_padre);

        concatena_if += concatena_expresion;
        concatena_expresion = "";
        this.match(12);
        concatena_if += " :";
        this.match(13,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        lista_traduccion_pyton.push(concatena_if);
        posicion_lista_traduccion_pyton++;
        concatena_if = ""
        lista_traduccion_pyton.push("{"); posicion_lista_traduccion_pyton++;
        
        
        var nodo_padre = new Nodo("L_INSTRUCCIONES","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        raiz.agregarHijo(nodo_padre);
        this.L_INS(nodo_padre);
        this.match(14,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        concatena_expresion = "";
        lista_traduccion_pyton.push("}"); posicion_lista_traduccion_pyton++;


       
        this.ELSE_IF(raiz);

    }


    ELSE_IF(raiz) {
        //si viene la palabra else entonces lo toma y salta el else_if'
        if (simbolo_preanalisis.getTipo() == 28) {

            this.match(28,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            this.ELSE_IFP(raiz);

        } else {
            return;
        }

    }


    ELSE_IFP(raiz) {
        //verificamos si es un else o un else if 
        if (simbolo_preanalisis.getTipo() == 27) {
            concatena_if += "el";
            var nodo_padre = new Nodo("ELSE IF","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);
            this.SENTENCIA_IF(nodo_padre);
        } else {
            concatena_if += "else:";
            lista_traduccion_pyton.push(concatena_if); concatena_if = ""; posicion_lista_traduccion_pyton++;
            lista_traduccion_pyton.push("{"); posicion_lista_traduccion_pyton++;
            var nodo_padre = new Nodo("ELSE","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);
            this.match(13,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
             this.L_INS(nodo_padre); lista_traduccion_pyton.push("}"); 
             posicion_lista_traduccion_pyton++;
              this.match(14,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            concatena_expresion = "";


        }


    }

    //-----------------------------------------------METODO PARA SWICTH-------------------------------------



    SENTENCIA_SWICTH(raiz) {
        concatena_switch += "def switch(";
        this.match(20,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        this.match(11,simbolo_preanalisis.fila,simbolo_preanalisis.columna);

        var nodo_padre = new Nodo("INDEX","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        raiz.agregarHijo(nodo_padre);

        this.LISTA_PARAMETROSLLAMADA(nodo_padre);
        concatena_switch += concatena_expresion;
        concatena_expresion = "";
        concatena_switch += "):";
        lista_traduccion_pyton.push(concatena_switch); posicion_lista_traduccion_pyton++;
        concatena_switch = "";
        lista_traduccion_pyton.push("{"); posicion_lista_traduccion_pyton++;
        lista_traduccion_pyton.push("switcher = {"); posicion_lista_traduccion_pyton++;
        lista_traduccion_pyton.push("{"); posicion_lista_traduccion_pyton++;
        this.match(12,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        this.match(13,simbolo_preanalisis.fila,simbolo_preanalisis.columna);

        var nodo_padre1 = new Nodo("CASOS","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        raiz.agregarHijo(nodo_padre1);


        this.CASES(nodo_padre1);

        this.match(14,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        contador_casos = 1;
        lista_traduccion_pyton.push("°°}"); posicion_lista_traduccion_pyton++;
        lista_traduccion_pyton.push("}"); posicion_lista_traduccion_pyton++;



    }

    CASES(raiz) {


        if (simbolo_preanalisis.getTipo() == 21) {

            this.match(21,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            var nodo_padre = new Nodo("CASITO","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);

           
            this.EXPRESION(nodo_padre);

            concatena_switch += contador_casos++ + ": ";
            concatena_expresion = "";
            lista_traduccion_pyton.push(concatena_switch);
            concatena_switch = ""; posicion_lista_traduccion_pyton++;
            this.match(50,simbolo_preanalisis.fila,simbolo_preanalisis.columna);

            var nodo_padre1 = new Nodo("L_INSTRUCCIONES","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            nodo_padre.agregarHijo(nodo_padre1);

            this.L_INS(nodo_padre1);
            lista_traduccion_pyton.push(","); posicion_lista_traduccion_pyton++;
            this.BREAK(nodo_padre);
            this.CASES(raiz);
        } else if (simbolo_preanalisis.getTipo() == 26) {

            this.match(26,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            concatena_switch += contador_casos++ + ": ";
            lista_traduccion_pyton.push(concatena_switch);
            concatena_switch = ""; posicion_lista_traduccion_pyton++;
            this.match(50,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            var nodo_padre = new Nodo("DEFAULT","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);

            var nodo_padre1 = new Nodo("L_INSTRUCCIONES","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            nodo_padre.agregarHijo(nodo_padre1);
            this.L_INS(nodo_padre1);

            lista_traduccion_pyton.push(","); 
            posicion_lista_traduccion_pyton++;

            return;
          //  this.CASES();

        } else {
            return;
        }


    }


    //---------------------------------------------METODOS SENTENCIA BREAK-------------------------------------------
    BREAK(raiz) {

        if (simbolo_preanalisis.getTipo() == 22) {
            this.match(22,simbolo_preanalisis.fila,simbolo_preanalisis.columna); this.match(23,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            lista_traduccion_pyton.push("break"); posicion_lista_traduccion_pyton++;
        } else {
            return;
        }
    }

    //---------------------------------------------METODOS SENTENCIA CONTINUE-------------------------------------------
    CONTINUE(raiz) {

        if (simbolo_preanalisis.getTipo() == 40) {
            this.match(40,simbolo_preanalisis.fila,simbolo_preanalisis.columna); this.match(23,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            lista_traduccion_pyton.push("continue"); posicion_lista_traduccion_pyton++;
        } else {
            return;
        }
    }

    //---------------------------------------------METODOS SENTENCIA RETURN-------------------------------------------
    RETURN(raiz) {

        if (simbolo_preanalisis.getTipo() == 39) {
            this.match(39,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            this.AUXRETURN(raiz);
        } else {
            return;
        }
    }

    AUXRETURN(raiz) {

        if (simbolo_preanalisis.getTipo() == 1 || simbolo_preanalisis.getTipo() == 33 || simbolo_preanalisis.getTipo() == 32 || simbolo_preanalisis.getTipo() == 31 || simbolo_preanalisis.getTipo() == 51 || simbolo_preanalisis.getTipo() == 52 || simbolo_preanalisis.getTipo() == 7 || simbolo_preanalisis.getTipo() == 43) {

            var nodo_padre = new Nodo("EXPRESION","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);
            this.EXPRESION(nodo_padre);
            lista_traduccion_pyton.push("return " + concatena_expresion); posicion_lista_traduccion_pyton++;
            concatena_expresion = "";
            this.match(23,simbolo_preanalisis.fila,simbolo_preanalisis.columna);

        } else {

            lista_traduccion_pyton.push("return"); posicion_lista_traduccion_pyton++;
            this.match(23,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        }



    }

    //----------------------------------------- METODOS SENTENCIA FOR --------------------------------------------



    SENTENCIA_FOR(raiz) {


        this.match(34,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        this.match(11,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        lista_traduccion_pyton.push("for"); posicion_lista_traduccion_pyton++;
        var nodo_padre = new Nodo("INS","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        raiz.agregarHijo(nodo_padre);
       
        this.INS(nodo_padre);
        lista_traduccion_pyton.push("in range ("); posicion_lista_traduccion_pyton++;
       
        var nodo_padre1 = new Nodo("EXPRESION","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        raiz.agregarHijo(nodo_padre1);
        this.EXPRESION(nodo_padre1);

        lista_traduccion_pyton.push(concatena_expresion + " ):"); concatena_expresion = ""; posicion_lista_traduccion_pyton++;
        this.match(23,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
       
        var nodo_padre2 = new Nodo("INS",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        raiz.agregarHijo(nodo_padre2);
       
        this.match(1,simbolo_preanalisis.fila,simbolo_preanalisis.columna);

        
        
        this.AUMENTA_FOR(nodo_padre2);
        lista_traduccion_pyton.push("{"); posicion_lista_traduccion_pyton++;
        this.match(12,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        this.match(13,simbolo_preanalisis.fila,simbolo_preanalisis.columna);

        var nodo_padre3 = new Nodo("L_INSTRUCCIONES","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        raiz.agregarHijo(nodo_padre3);
        this.L_INS(nodo_padre3);
        this.match(14,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        lista_traduccion_pyton.push("}"); posicion_lista_traduccion_pyton++;


    }


    AUMENTA_FOR(raiz) {

        if (simbolo_preanalisis.getTipo() == 6) {//++

            var nodo_padre = new Nodo("incremento","++",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);
            this.match(6,simbolo_preanalisis.fila,simbolo_preanalisis.columna); 
            this.match(6,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        } else if (simbolo_preanalisis.getTipo() == 7) {//--
            var nodo_padre = new Nodo("decremento","--",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);
            this.match(7,simbolo_preanalisis.fila,simbolo_preanalisis.columna); this.match(7,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        } else {

            this.match(3,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            this.EXPRESION(raiz);
            return;
        }




    }


    //-----------------------------------------METODOS SENTENCIA ASGINACION --------------------------------------------



    SENTENCIA_ASIGNACION(raiz) {


        if (simbolo_preanalisis.getTipo() == 1 || simbolo_preanalisis.getTipo() == 33) {
            concatena_asignacion += simbolo_preanalisis.lexema;

            var nodo_padre = new Nodo("ASIGNACION",simbolo_preanalisis.lexema,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            raiz.agregarHijo(nodo_padre);

            this.match(1,simbolo_preanalisis.fila,simbolo_preanalisis.columna);

            if(simbolo_preanalisis.getTipo()==11){
             
                this.match(11,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                var nodo_padre1 = new Nodo("LLAMADA_METODO","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                nodo_padre.agregarHijo(nodo_padre1);

                this.LISTA_PARAMETROSLLAMADA(nodo_padre1);

                this.match(12,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                concatena_asignacion+="(";
                concatena_asignacion+=concatena_expresion;
                concatena_expresion="";
                concatena_asignacion+=")";
                lista_traduccion_pyton.push(concatena_asignacion); posicion_lista_traduccion_pyton++;
                concatena_asignacion="";
                this.match(23,simbolo_preanalisis.fila,simbolo_preanalisis.columna);

                }else if(simbolo_preanalisis.getTipo()==6){//++
                     var nodo_padre = new Nodo("INCREMENTO","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                     raiz.agregarHijo(nodo_padre);
                    
                     this.match(6,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                    this.match(6,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                    this.match(23,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                }else if(simbolo_preanalisis.getTipo()==7){//--
                    var nodo_padre = new Nodo("DECREMENTO","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                    raiz.agregarHijo(nodo_padre);
                   
                    this.match(7,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                    this.match(7,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                    this.match(23,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                }
                else{
                concatena_asignacion += " = "

                this.match(3,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                var nodo_padre = new Nodo("EXPRESION","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                raiz.agregarHijo(nodo_padre);
               
                this.EXPRESION(nodo_padre);
                concatena_asignacion += concatena_expresion;
                concatena_expresion = "";
                lista_traduccion_pyton.push(concatena_asignacion);
                concatena_asignacion = ""; posicion_lista_traduccion_pyton++; 
                this.match(23,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
      

                } 
        }else{
            return;
        }
    }

    //-----------------------------------------METODOS SENETENCIA WHILE --------------------------------------------------


    SENTENCIA_WHILE(raiz) {

        concatena_ciclos += "while ";
        this.match(37,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        this.match(11,simbolo_preanalisis.fila,simbolo_preanalisis.columna);

        var nodo_padre = new Nodo("EXPRESION","");
        raiz.agregarHijo(nodo_padre);
        this.EXPRESION(nodo_padre);
        concatena_ciclos += concatena_expresion + " :";
        lista_traduccion_pyton.push(concatena_ciclos); posicion_lista_traduccion_pyton++;
        concatena_expresion = ""; concatena_ciclos = "";
        lista_traduccion_pyton.push("{"); posicion_lista_traduccion_pyton++;
        this.match(12,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        this.match(13,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        var nodo_padre2 = new Nodo("L_INSTRUCCIONES","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        raiz.agregarHijo(nodo_padre2);
        this.L_INS(nodo_padre2);
        lista_traduccion_pyton.push("}"); posicion_lista_traduccion_pyton++;
        this.match(14,simbolo_preanalisis.fila,simbolo_preanalisis.columna);

    }


    //-----------------------------------------METODOS SENETENCIA do while --------------------------------------------------


    SENTENCIA_DO_WHILE(raiz) {
        concatena_ciclos += "while True:";
        lista_traduccion_pyton.push(concatena_ciclos); posicion_lista_traduccion_pyton++; concatena_ciclos = "";
        lista_traduccion_pyton.push("{"); posicion_lista_traduccion_pyton++;

        this.match(38,simbolo_preanalisis.fila,simbolo_preanalisis.columna); 
        this.match(13,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        var nodo_padre = new Nodo("L_INSTRUCCIONES","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        raiz.agregarHijo(nodo_padre);
        this.L_INS(nodo_padre); 
        this.match(14,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        this.match(37,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        this.match(11,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        var nodo_padre1 = new Nodo("DO_EXPRESION","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        raiz.agregarHijo(nodo_padre1);
        this.EXPRESION(nodo_padre1);
        concatena_ciclos += "if (" + concatena_expresion + " ):\tbreak";
        lista_traduccion_pyton.push(concatena_ciclos); posicion_lista_traduccion_pyton++; concatena_ciclos = ""; concatena_expresion = "";
        this.match(12,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
         this.match(23,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        lista_traduccion_pyton.push("}"); posicion_lista_traduccion_pyton++;
    }


    //-----------------------------------------METODOS SENETENCIA System.out.println( // expresion ); --------------------------------------------------


    SENTENCIA_CONSOLE(raiz) {

        concatena_ciclos += "print(";

        this.match(63,simbolo_preanalisis.fila,simbolo_preanalisis.columna); 
        this.match(5,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        this.match(64,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        this.match(5,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        this.match(65,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        this.match(11,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        var nodo_padre = new Nodo("EXPRESION","",simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        raiz.agregarHijo(nodo_padre);
        this.EXPRESION(nodo_padre);
       
        concatena_ciclos += concatena_expresion.replace("+", ",") + ")";
       
        lista_traduccion_pyton.push(concatena_ciclos.replace("+",","));
         posicion_lista_traduccion_pyton++;
       
        concatena_ciclos = "";
       
        concatena_expresion = "";
         this.match(12,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
         this.match(23,simbolo_preanalisis.fila,simbolo_preanalisis.columna);


    }




    //---------------------------------------



    match(token_a_verificar,fila,columna) {
        //si hace match y no es el ultimo token ,pasa al siguiente
        if (token_a_verificar == simbolo_preanalisis.getTipo() && simbolo_preanalisis.getTipo() != this.ListaParserA[this.ListaParserA.length - 1].getTipo()) {
            console.log("hago macth con: " + simbolo_preanalisis.lexema);
            numero_preanalisis++;
            simbolo_preanalisis = this.ListaParserA[numero_preanalisis];

        }
        else if (token_a_verificar == this.ListaParserA[this.ListaParserA.length - 1].getTipo()) {
            console.log("hago macth con: " + simbolo_preanalisis.lexema);
            console.log("Analisis Sintactico Concluido llegue al final de la lista de tokens");
        }
        else {


            console.log("Analisis Sintactico Incorrecto Se esperaba : " + token_a_verificar);
            lista_errores_sintacticos.push(new Token_lenguaje(token_a_verificar,this.retornar_tipo_error(token_a_verificar),fila,columna));
            


            analisisCorrecto = false;
        }


    }

    retornar_tipo_error(numero){

        if(numero==1){
            return "se esperaba un id";
        }else if(numero==2){
            return "se esperaba una ,";
        }else if(numero==3){
            return "se esperaba un signo =";
        }else if(numero==4){
            return "se esperaba un signo ==";
        }else if(numero==5){
            return "se esperaba un .";
        }else if(numero==6){
            return "se esperaba un +";
        }else if(numero==7){
            return "se esperaba un -";
        }else if(numero==8){
            return "se esperaba un *";
        }else if(numero==9){
            return "se esperaba un /";
        }else if(numero==10){
            return "se esperaba un void";
        }else if(numero==11){
            return "se esperaba un (";
        }else if(numero==12){
            return "se esperaba un )";
        }else if(numero==13){
            return "se esperaba un {";
        }else if(numero==14){
            return "se esperaba un }";
        }else if(numero==16){
            return "se esperaba un >";
        }else if(numero==17){
            return "se esperaba un <";
        }else if(numero==18){
            return "se esperaba un >=";
        }else if(numero==19){
            return "se esperaba un <=";
        }else if(numero==20){
            return "se esperaba un switch";
        }else if(numero==21){
            return "se esperaba un case";
        }else if(numero==22){
            return "se esperaba un break";
        }else if(numero==23){
            return "se esperaba un ;";
        }else if(numero==24){
            return "se esperaba un Console";
        }else if(numero==25){
            return "se esperaba un Write";
        }else if(numero==26){
            return "se esperaba un Default";
        }else if(numero==27){
            return "se esperaba un If";
        }else if(numero==28){
            return "se esperaba un else";
        }else if(numero==30){
            return "se esperaba un main";
        }else if(numero==31){
            return "se esperaba una cadena";
        }else if(numero==32){
            return "se esperaba una cadena html";
        }else if(numero==33){
            return "se esperaba un numero";
        }else if(numero==34){
            return "se esperaba un for";
        }else if(numero==35){
            return "se esperaba un ++";
        }else if(numero==37){
            return "se esperaba un while";
        }else if(numero==38){
            return "se esperaba un do";
        }else if(numero==39){
            return "se esperaba un return";
        }else if(numero==40){
            return "se esperaba un continue";
        }else if(numero==41){
            return "se esperaba un and";
        }else if(numero==42){
            return "se esperaba un or";
        }else if(numero==43){
            return "se esperaba un not";
        }else if(numero==44){
            return "se esperaba un !";
        }else if(numero==45){
            return "se esperaba un int";
        }else if(numero==46){
            return "se esperaba un double";
        }else if(numero==47){
            return "se esperaba un string";
        }else if(numero==48){
            return "se esperaba un char";
        }else if(numero==49){
            return "se esperaba un bool";
        }else if(numero==50){
            return "se esperaba un :";
        }else if(numero==51){
            return "se esperaba un true";
        }else if(numero==52){
            return "se esperaba un false";
        }else if(numero==90){
            return "se esperaba un #";
        
        }else{
            return "no se conoce este tipo de error sintactico"
        }





    }

    retornar_raiz(){
        return Raiz;
    }

    retornarLista(){
        return lista_errores_sintacticos;
    }

    limpiarLista()
    {
        lista_errores_sintacticos=[];
    }


}

//exportar la clase y poder importarla en otras clases 
module.exports= Analisis_Sintactico;