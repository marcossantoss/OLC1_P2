
var numero_preanalisis;//sirve para saber que elemento de la lista buscar
var simbolo_preanalisis;//seteamos el simbolo actual de analisis
//lista que se obtiene del scanner
var analisisCorrecto = false;//verifica si fue satisfactorio el analisis

var id_auxiliar = "";//nos va servir para almacenar en la lista de nuestros ids , ya que este dato se obtiene en una derivacion mas abajo y lo que busca es insertar la informacion en una produccion mas arriba

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

    parser() {

        //aqui limpiamos todas nuestras variables ya que aqui es donde obtenemos todos los datos
        analisisCorrecto = true;
        numero_preanalisis = 0;
        simbolo_preanalisis = ListaParser[0];
        lista_traduccion_pyton = [];
        posicion_lista_traduccion_pyton = 0;
        lista_ids=[];
        lista_html=[];
   

        this.INICIO();
        console.log("Salida de traduccion");
        console.log(lista_traduccion_pyton);
    }

    INICIO() {//inicio -> L_INS # 

        this.L_INS();//se completan todas las instrucciones

        if (simbolo_preanalisis.getTipo() == 90) {

            this.match(90,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        }


    }

    L_INS() {//l_ins -> ins l_ins'

        this.INS(); this.L_INSP();

    }

    L_INSP() {

        //L_INSP->   L_INSP
        if (simbolo_preanalisis.getTipo() == 45 || simbolo_preanalisis.getTipo() == 49 || simbolo_preanalisis.getTipo() == 47 || simbolo_preanalisis.getTipo() == 48 || simbolo_preanalisis.getTipo() == 46) {

            this.L_INS();

        } else if (simbolo_preanalisis.getTipo() == 10) {//void id ( L_PARAMETROS )  {  //mas instrucciones }

            this.L_INS();


        } else if (simbolo_preanalisis.getTipo() == 27) {//if ( EXPRESION ) {  //mas instrucciones  }

            this.L_INS();

        } else if (simbolo_preanalisis.getTipo() == 20) {//swicth ( EXPRESION ) {  //mas instrucciones  }

            this.L_INS();
        } else if (simbolo_preanalisis.getTipo() == 1) {// id = expresion;

            this.L_INS();
        } else if (simbolo_preanalisis.getTipo() == 34) {// for ( asignacion o declaracion ;  expresion ; id ++ ó id -- ){ //mas instrucciones}

            this.L_INS();
        } else if (simbolo_preanalisis.getTipo() == 22) {//BREAK;
            this.L_INS();

        } else if (simbolo_preanalisis.getTipo() == 40) {//Continue;
            this.L_INS();
        } else if (simbolo_preanalisis.getTipo() == 39) {//return;
            this.L_INS();
        } else if (simbolo_preanalisis.getTipo() == 37) {//while (expresion) { //mas instrucciones }
            this.L_INS();
        } else if (simbolo_preanalisis.getTipo() == 38) {//do -while
            this.L_INS();
        } else if (simbolo_preanalisis.getTipo() == 24) {//console
            this.L_INS();
        } else {
            //L_INSP-> epsilon
            return;
        }
    }

    INS() {
        //aqui vamos a encapsular
        if (simbolo_preanalisis.getTipo() == 45 || simbolo_preanalisis.getTipo() == 49 || simbolo_preanalisis.getTipo() == 47 || simbolo_preanalisis.getTipo() == 48 || simbolo_preanalisis.getTipo() == 46) {//INT O STRING O DOUBLE O CHAR O BOOL
            //una declaracion 
            this.TIPODATO(); this.AUXFUNCION_DECLARACION();

        } else if (simbolo_preanalisis.getTipo() == 10) {//void id ( L_PARAMETROS )  {  //mas instrucciones }
            //metodo o un main
            this.match(10,simbolo_preanalisis.fila,simbolo_preanalisis.columna); this.AUXMETODO_MAIN();



        } else if (simbolo_preanalisis.getTipo() == 27) {//if ( EXPRESION ) {  //mas instrucciones  }
            //if seguido de mas if o else if o else
            this.SENTENCIA_IF();

        } else if (simbolo_preanalisis.getTipo() == 20) {//swicth ( EXPRESION ) {  case  }
            //switch
            this.SENTENCIA_SWICTH();
        } else if (simbolo_preanalisis.getTipo() == 1) {// id = expresion o una llamada a metodos;
            //una asignacion   
            this.SENTENCIA_ASIGNACION();
        } else if (simbolo_preanalisis.getTipo() == 34) {// for ( asignacion o declaracion ;  expresion ; id ++ ó id -- ){ //mas instrucciones}
            //for
            this.SENTENCIA_FOR();
        } else if (simbolo_preanalisis.getTipo() == 22) {//BREAK;
            //break
            this.BREAK();
        } else if (simbolo_preanalisis.getTipo() == 40) {//Continue;
            //continue
            this.CONTINUE();
        } else if (simbolo_preanalisis.getTipo() == 39) {//return;
            //return

            this.RETURN();
        } else if (simbolo_preanalisis.getTipo() == 37) {//while (expresion) { //mas instrucciones }
            //while    
            this.SENTENCIA_WHILE();
        } else if (simbolo_preanalisis.getTipo() == 38) {//do - while

            //do-while
            this.SENTENCIA_DO_WHILE();
        } else if (simbolo_preanalisis.getTipo() == 24) {//console
            //console
            this.SENTENCIA_CONSOLE();
        } else {
            return;
        }


    }

    LISTAID() {
        //LISTAID -> id IDP 
        if (simbolo_preanalisis.getTipo() == 1) {
            this.match(1,simbolo_preanalisis.fila,simbolo_preanalisis.columna);//hace match con id
            this.IDP();
        } else {
            console.log("ERROR DE SINTAXIS");
        }
    }

    IDP() {

        //IDP-> = EXPRESION LISTA_IDP
        if (simbolo_preanalisis.getTipo() == 3) {
            this.match(3,simbolo_preanalisis.fila,simbolo_preanalisis.columna);//hace match con =
            this.EXPRESION();
            lista_ids.push(new Simbolo(tipo_id,id_actual,concatena_expresion,simbolo_preanalisis.fila,simbolo_preanalisis.columna));
                
            lista_traduccion_pyton.push(id_actual + "=" + concatena_expresion);
            posicion_lista_traduccion_pyton++;
            id_actual = "";
            concatena_expresion = "";
            this.LISTAIDP();
        } else {
            //IDP-> LISTA_IDP
            //soportamos el error del singno = , si viene un num o false o true o un signo menos -34 o una cadena se toma como una expresion
            if (simbolo_preanalisis.getTipo() == 33 || simbolo_preanalisis.getTipo() == 32 || simbolo_preanalisis.getTipo() == 31 || simbolo_preanalisis.getTipo() == 51 || simbolo_preanalisis.getTipo() == 52 || simbolo_preanalisis.getTipo() == 7 || simbolo_preanalisis.getTipo() == 43) {
                this.match(3,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                this.EXPRESION();
                lista_ids.push(new Simbolo(tipo_id,id_actual,concatena_expresion,simbolo_preanalisis.fila,simbolo_preanalisis.columna));
                lista_traduccion_pyton.push(id_actual + "=" + concatena_expresion);
                posicion_lista_traduccion_pyton++;
                id_actual = "";
                concatena_expresion = "";
                this.LISTAIDP();

            } else {
                cantidad_de_ids_sin_expresion++;
                lista_traduccion_pyton.push(id_actual);
                posicion_lista_traduccion_pyton++;
                id_actual = "";
                this.LISTAIDP();

            }
        }
    }

    LISTAIDP() {

        //LISTAIDP -> , id IDP 
        if (simbolo_preanalisis.getTipo() == 2) {

            this.match(2,simbolo_preanalisis.fila,simbolo_preanalisis.columna);//hace match con coma
            id_actual = simbolo_preanalisis.lexema;
            lista_traduccion_pyton.push(id_actual);
            posicion_lista_traduccion_pyton++;
            cantidad_de_ids_sin_expresion++;
            this.match(1,simbolo_preanalisis.fila,simbolo_preanalisis.columna);//hace match con id

            this.IDBP();
        } else {
            //soportamos el error de que no venga la coma ;
            if (simbolo_preanalisis.getTipo() == 1) {

                this.match(2,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                id_actual = simbolo_preanalisis.lexema;
                posicion_lista_traduccion_pyton++;
                lista_traduccion_pyton.push(id_actual);
                cantidad_de_ids_sin_expresion++;
                this.match(1,simbolo_preanalisis.fila,simbolo_preanalisis.columna);//hace match con id
                this.IDBP();

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

    IDBP() {

        //IDP-> = EXPRESION LISTA_ID
        if (simbolo_preanalisis.getTipo() == 3) {

            this.match(3,simbolo_preanalisis.fila,simbolo_preanalisis.columna);//hace match con =

            this.EXPRESION();

           // console.log("pos - ids : " + (posicion_lista_traduccion_pyton - cantidad_de_ids_sin_expresion));
            for (var i = posicion_lista_traduccion_pyton - cantidad_de_ids_sin_expresion; i < posicion_lista_traduccion_pyton; i++) {
                lista_ids.push(new Simbolo(tipo_id,lista_traduccion_pyton[i], concatena_expresion,simbolo_preanalisis.fila,simbolo_preanalisis.columna));
                
                lista_traduccion_pyton[i] = lista_traduccion_pyton[i] + "=" + concatena_expresion;

            }
            cantidad_de_ids_sin_expresion = 0;
            concatena_expresion = "";
            this.LISTAIDP();
        } else {

            //soportamos el error de que no venga el signo =
            //si no viene el = pero si viene un num o  true o false o  una cadena o una negacion se toma como una expresion
            if (simbolo_preanalisis.getTipo() == 33 || simbolo_preanalisis.getTipo() == 32 || simbolo_preanalisis.getTipo() == 31 || simbolo_preanalisis.getTipo() == 51 || simbolo_preanalisis.getTipo() == 52 || simbolo_preanalisis.getTipo() == 7 || simbolo_preanalisis.getTipo() == 43) {
                this.match(3,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                this.EXPRESION();
                for (var i = posicion_lista_traduccion_pyton - cantidad_de_ids_sin_expresion; i < posicion_lista_traduccion_pyton; i++) {
                    lista_ids.push(new Simbolo(tipo_id,lista_traduccion_pyton[i], concatena_expresion,simbolo_preanalisis.fila,simbolo_preanalisis.columna));
                
              
                    lista_traduccion_pyton[i] = lista_traduccion_pyton[i] + "=" + concatena_expresion;

                }
                cantidad_de_ids_sin_expresion = 0;
                concatena_expresion = "";
                this.LISTAIDP();

            } else {


                this.LISTAIDP();

            }


        }





    }


    TIPODATO() {
        //console.log("estoy en tipo de dato: "+ simbolo_preanalisis.getTipo());
        if (simbolo_preanalisis.getTipo() == 45) {
            tipo_id=simbolo_preanalisis.lexema;
            this.match(45,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        } else if (simbolo_preanalisis.getTipo() == 49) {
            tipo_id=simbolo_preanalisis.lexema;
            this.match(49,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        } else if (simbolo_preanalisis.getTipo() == 47) {
            tipo_id=simbolo_preanalisis.lexema;
            this.match(47,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        } else if (simbolo_preanalisis.getTipo() == 48) {
            tipo_id=simbolo_preanalisis.lexema;
            this.match(48,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        } else if (simbolo_preanalisis.getTipo() == 46) {
            tipo_id=simbolo_preanalisis.lexema;
            this.match(46,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        } else {
            console.log("ERROR SINTACTICO en tipos de datos, no podemos continuar de manera correcta");
        }



    }


    //vamos a programar expresion
    EXPRESION() {
        this.B(); this.AP();
    }

    AP() {

        if (simbolo_preanalisis.getTipo() == 42) {//||
            this.match(42,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " or "; this.B(); this.AP();

        } else {
            return;//e
        }
    }

    B() {
        //console.log("estoy en b");
        this.C(); this.BP();

    }

    BP() {
        if (simbolo_preanalisis.getTipo() == 41) {//&&
            this.match(41,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " and "; this.C(); this.BP();
        } else {
            return;//e
        }

    }

    C() {
        this.D(); this.CP();

    }

    CP() {

        if (simbolo_preanalisis.getTipo() == 4) {//==
            this.match(4,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " == "; this.D(); this.CP();
        } else if (simbolo_preanalisis.getTipo() == 44) {//!=
            this.match(44,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " != "; this.D(); this.CP();
        } else {
            return;//e
        }
    }

    D() {
        this.E(); this.DP();
    }

    DP() {
        if (simbolo_preanalisis.getTipo() == 16) {//>
            this.match(16,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " > "; this.E(); this.DP();
        } else if (simbolo_preanalisis.getTipo() == 17) {//<
            this.match(17,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " < "; this.E(); this.DP();
        } else if (simbolo_preanalisis.getTipo() == 18) {//>=
            this.match(18,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " >= "; this.E(); this.DP();
        } else if (simbolo_preanalisis.getTipo() == 19) {//<=
            this.match(19,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " <= "; this.E(); this.DP();
        } else {
            return;//e
        }
    }

    E() {
        this.F(); this.EP();
    }

    EP() {

        if (simbolo_preanalisis.getTipo() == 6) {//+
            this.match(6,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " + "; this.F(); this.EP();
        } else if (simbolo_preanalisis.getTipo() == 7) {//-
            this.match(7,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " - "; this.F(); this.EP();
        } else {
            return;//e
        }

    }

    F() {
        this.G(); this.FP();
    }

    FP() {


        if (simbolo_preanalisis.getTipo() == 8) {//*
            this.match(8,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " * "; this.G(); this.FP();
        } else if (simbolo_preanalisis.getTipo() == 9) {//  /
            this.match(9,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " / "; this.G(); this.FP();
        } else {
            return;//e
        }
    }


    G() {

        // console.log("el simbolo de llegada es: "+ simbolo_preanalisis.getTipo());
        if (simbolo_preanalisis.getTipo() == 33) {//numero
            concatena_expresion += simbolo_preanalisis.lexema; this.match(33,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        } else if (simbolo_preanalisis.getTipo() == 32) {//cadena ' ' posible html o char
            console.log("----------------------------------------> "+simbolo_preanalisis.lexema);
            concatena_expresion += simbolo_preanalisis.lexema; 
            var cadenitahtml=simbolo_preanalisis.lexema.replace("\'","");
            this.match(32,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
           if(!(cadenitahtml.length==1 || cadenitahtml.length==2 )){
             lista_html.push(cadenitahtml.replace("'",""));
           }
            //
        } else if (simbolo_preanalisis.getTipo() == 31) {//cadena " "
            concatena_expresion += simbolo_preanalisis.lexema; this.match(31,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        } else if (simbolo_preanalisis.getTipo() == 51) {//true
            concatena_expresion += simbolo_preanalisis.lexema; this.match(51,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        } else if (simbolo_preanalisis.getTipo() == 52) {//false
            concatena_expresion += simbolo_preanalisis.lexema; this.match(52,simbolo_preanalisis.fila,simbolo_preanalisis.columna);

        } else if (simbolo_preanalisis.getTipo() == 1) {//id
            concatena_expresion += simbolo_preanalisis.lexema; this.match(1,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            this.AUX_ID();
        } else if (simbolo_preanalisis.getTipo() == 7) {//numero negativo
            concatena_expresion += simbolo_preanalisis.lexema; this.match(7,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            concatena_expresion += simbolo_preanalisis.lexema; this.match(33,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        } else if (simbolo_preanalisis.getTipo() == 43) {//  ! NEGACION
            concatena_expresion += " not "; this.match(43,simbolo_preanalisis.fila,simbolo_preanalisis.columna); this.EXPRESION();

        } else if (simbolo_preanalisis.getTipo() == 11) {//  (  EXPRESION )
            this.match(11,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " ( "; this.EXPRESION(); concatena_expresion += " ) "; this.match(12,simbolo_preanalisis.fila,simbolo_preanalisis.columna);

        }


    }

    AUX_ID() {

        if (simbolo_preanalisis.getTipo() == 11) {
            this.match(11,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " ( "; this.LISTA_PARAMETROSLLAMADA(); concatena_expresion += " ) "; this.match(12,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        } else {
            return;
        }
    }
    //-----------------ESTE ES PARA LISTADEPARAMETROS LLAMADA----------------------------------------------------------

    LISTA_PARAMETROSLLAMADA() {



        if (simbolo_preanalisis.getTipo() == 1 || simbolo_preanalisis.getTipo() == 33 || simbolo_preanalisis.getTipo() == 32 || simbolo_preanalisis.getTipo() == 31 || simbolo_preanalisis.getTipo() == 51 || simbolo_preanalisis.getTipo() == 52 || simbolo_preanalisis.getTipo() == 7 || simbolo_preanalisis.getTipo() == 43) {
            this.EXPRESION();
            this.LISTA_PARAMETROSLLAMADAP();

        } else {

            return;
        }
    }

    LISTA_PARAMETROSLLAMADAP() {

        if (simbolo_preanalisis.getTipo() == 2) {//, EXPRESION
            this.match(2,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " , "
            this.EXPRESION();
            this.LISTA_PARAMETROSLLAMADAP();

        } else {

            if (simbolo_preanalisis.getTipo() == 1 || simbolo_preanalisis.getTipo() == 33 || simbolo_preanalisis.getTipo() == 32 || simbolo_preanalisis.getTipo() == 31 || simbolo_preanalisis.getTipo() == 51 || simbolo_preanalisis.getTipo() == 52 || simbolo_preanalisis.getTipo() == 7 || simbolo_preanalisis.getTipo() == 43) {
                this.match(2,simbolo_preanalisis.fila,simbolo_preanalisis.columna); this.match(2,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_expresion += " , "
                this.EXPRESION();
                this.LISTA_PARAMETROSLLAMADAP();
            } else {
                return;
            }


        }


    }

    //-----------------ESTE ES PARA LISTADEPARAMETROS DECLARARACION----------------------------------------------------------

    LISTA_PARAMETROS() {



        if (simbolo_preanalisis.getTipo() == 45 || simbolo_preanalisis.getTipo() == 49 || simbolo_preanalisis.getTipo() == 47 || simbolo_preanalisis.getTipo() == 48 || simbolo_preanalisis.getTipo() == 46) {
            this.TIPODATO()
            this.LISTA_PARAMETROSP();

        } else {

            return;
        }
    }


    LISTA_PARAMETROSP() {

        if (simbolo_preanalisis.getTipo() == 1) {
            concatena_funcion += simbolo_preanalisis.lexema;
            this.match(1,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            this.PARAMETROS();

        } else {
            //ERROR SINTACTICO
            console.log("imposible recuperarse de este error");
            return;
        }


    }


    PARAMETROS() {

        if (simbolo_preanalisis.getTipo() == 2) {//, numero
            this.match(2,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            concatena_funcion += " , ";
            this.TIPODATO();
            concatena_funcion += simbolo_preanalisis.lexema;
            this.match(1,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            this.PARAMETROS();
        } else {



            //recuperamos del error porque se separa por comas
            if (simbolo_preanalisis.getTipo() == 45 || simbolo_preanalisis.getTipo() == 49 || simbolo_preanalisis.getTipo() == 47 || simbolo_preanalisis.getTipo() == 48 || simbolo_preanalisis.getTipo() == 46) {
                this.match(2,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                concatena_funcion += " , ";
                this.TIPODATO();
                concatena_funcion += simbolo_preanalisis.lexema;
                this.match(1,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                this.PARAMETROS();
            } else {
                return;//epsilon
            }


        }
    }


    //----------------------------------METODO PARA FUNCIONES --------------------------------------------


    AUXFUNCION_DECLARACION() {

        id_actual = simbolo_preanalisis.lexema

        this.match(1,simbolo_preanalisis.fila,simbolo_preanalisis.columna);

        if (simbolo_preanalisis.getTipo() == 11) {
            //si encuentra parentesis se trata de una funcion
            concatena_funcion += "def "
            concatena_funcion += id_actual;
            concatena_funcion += "("; this.match(11,simbolo_preanalisis.fila,simbolo_preanalisis.columna); this.LISTA_PARAMETROS(); 
            concatena_funcion += ")"; concatena_funcion += ":";
            lista_traduccion_pyton.push(concatena_funcion);
            posicion_lista_traduccion_pyton++;
            concatena_funcion = "";
            this.match(12,simbolo_preanalisis.fila,simbolo_preanalisis.columna); this.match(13,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_funcion += "{"; lista_traduccion_pyton.push(concatena_funcion); posicion_lista_traduccion_pyton++; this.L_INS(); lista_traduccion_pyton.push("}"); posicion_lista_traduccion_pyton++; this.match(14,simbolo_preanalisis.fila,simbolo_preanalisis.columna);

            concatena_funcion = "";


        } else {

            this.IDP(); this.match(23,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        }
    }


    //------------------------------------METODO PARA METODOS-------------------------------------------------

    AUXMETODO_MAIN() {

        if (simbolo_preanalisis.getTipo() == 30) {
            //se trata del main
            concatena_main += "def ";
            this.match(30,simbolo_preanalisis.fila,simbolo_preanalisis.columna); concatena_main += "main "; concatena_main += "("; concatena_main += ") "; concatena_main += ":";
            lista_traduccion_pyton.push(concatena_main);
            posicion_lista_traduccion_pyton++;
            concatena_main = "";
            this.match(11,simbolo_preanalisis.fila,simbolo_preanalisis.columna); this.match(12,simbolo_preanalisis.fila,simbolo_preanalisis.columna); this.match(13,simbolo_preanalisis.fila,simbolo_preanalisis.columna); lista_traduccion_pyton.push("{"); posicion_lista_traduccion_pyton++;
            this.L_INS(); lista_traduccion_pyton.push("}"); posicion_lista_traduccion_pyton++; this.match(14,simbolo_preanalisis.fila,simbolo_preanalisis.columna);

            concatena_main = ""
            lista_traduccion_pyton.push("if __name__ == '__main__':");
            posicion_lista_traduccion_pyton++;
            lista_traduccion_pyton.push("   main()"); posicion_lista_traduccion_pyton++;


        } else {
            //se trata de un metodo
            concatena_metodo += "def ";
            concatena_metodo += simbolo_preanalisis.lexema; this.match(1,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            concatena_metodo += " ( "; this.match(11,simbolo_preanalisis.fila,simbolo_preanalisis.columna); this.LISTA_PARAMETROS(); concatena_metodo += concatena_funcion;//aqui lo que hacemos es usar esta concatenacion previa 
            concatena_funcion = "";//solo auxiliar por compartir metodos usamos esto 
            concatena_metodo += " ) "; concatena_metodo += " : "; lista_traduccion_pyton.push(concatena_metodo); posicion_lista_traduccion_pyton++;
            concatena_metodo = "";
            this.match(12,simbolo_preanalisis.fila,simbolo_preanalisis.columna); this.match(13,simbolo_preanalisis.fila,simbolo_preanalisis.columna); lista_traduccion_pyton.push("{"); posicion_lista_traduccion_pyton++;
            this.L_INS(); lista_traduccion_pyton.push("}"); posicion_lista_traduccion_pyton++; this.match(14,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            concatena_metodo = "";
        }





    }

    //-----------------------------------METODO PARA IF------------------------------------------------------


    SENTENCIA_IF() {

        concatena_if += "if ";
        this.match(27,simbolo_preanalisis.fila,simbolo_preanalisis.columna);

        this.match(11,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        this.EXPRESION();
        concatena_if += concatena_expresion;
        concatena_expresion = "";
        this.match(12);
        concatena_if += " :";
        this.match(13,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        lista_traduccion_pyton.push(concatena_if);
        posicion_lista_traduccion_pyton++;
        concatena_if = ""
        lista_traduccion_pyton.push("{"); posicion_lista_traduccion_pyton++;
        this.L_INS();
        this.match(14,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        concatena_expresion = "";
        lista_traduccion_pyton.push("}"); posicion_lista_traduccion_pyton++;


        this.ELSE_IF();

    }


    ELSE_IF() {
        //si viene la palabra else entonces lo toma y salta el else_if'
        if (simbolo_preanalisis.getTipo() == 28) {

            this.match(28,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            this.ELSE_IFP();

        } else {
            return;
        }

    }


    ELSE_IFP() {
        //verificamos si es un else o un else if 
        if (simbolo_preanalisis.getTipo() == 27) {
            concatena_if += "el";
            this.SENTENCIA_IF();
        } else {
            concatena_if += "else:";
            lista_traduccion_pyton.push(concatena_if); concatena_if = ""; posicion_lista_traduccion_pyton++;
            lista_traduccion_pyton.push("{"); posicion_lista_traduccion_pyton++;
            this.match(13,simbolo_preanalisis.fila,simbolo_preanalisis.columna); this.L_INS(); lista_traduccion_pyton.push("}"); posicion_lista_traduccion_pyton++; this.match(14,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            concatena_expresion = "";


        }


    }

    //-----------------------------------------------METODO PARA SWICTH-------------------------------------



    SENTENCIA_SWICTH() {
        concatena_switch += "def switch(";
        this.match(20,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        this.match(11,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        this.LISTA_PARAMETROSLLAMADA();
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
        this.CASES();

        this.match(14,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        contador_casos = 1;
        lista_traduccion_pyton.push("°°}"); posicion_lista_traduccion_pyton++;
        lista_traduccion_pyton.push("}"); posicion_lista_traduccion_pyton++;



    }

    CASES() {


        if (simbolo_preanalisis.getTipo() == 21) {

            this.match(21,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            this.EXPRESION();
            concatena_switch += contador_casos++ + ": ";
            concatena_expresion = "";
            lista_traduccion_pyton.push(concatena_switch);
            concatena_switch = ""; posicion_lista_traduccion_pyton++;
            this.match(50,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            this.L_INS();
            lista_traduccion_pyton.push(","); posicion_lista_traduccion_pyton++;
            this.BREAK();
            this.CASES();
        } else if (simbolo_preanalisis.getTipo() == 26) {
            this.match(26,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            concatena_switch += contador_casos++ + ": ";
            lista_traduccion_pyton.push(concatena_switch);
            concatena_switch = ""; posicion_lista_traduccion_pyton++;
            this.match(50,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            this.L_INS();
            lista_traduccion_pyton.push(","); posicion_lista_traduccion_pyton++;
            this.CASES();

        } else {
            return;
        }


    }


    //---------------------------------------------METODOS SENTENCIA BREAK-------------------------------------------
    BREAK() {

        if (simbolo_preanalisis.getTipo() == 22) {
            this.match(22,simbolo_preanalisis.fila,simbolo_preanalisis.columna); this.match(23,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            lista_traduccion_pyton.push("break"); posicion_lista_traduccion_pyton++;
        } else {
            return;
        }
    }

    //---------------------------------------------METODOS SENTENCIA CONTINUE-------------------------------------------
    CONTINUE() {

        if (simbolo_preanalisis.getTipo() == 40) {
            this.match(40,simbolo_preanalisis.fila,simbolo_preanalisis.columna); this.match(23,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            lista_traduccion_pyton.push("continue"); posicion_lista_traduccion_pyton++;
        } else {
            return;
        }
    }

    //---------------------------------------------METODOS SENTENCIA RETURN-------------------------------------------
    RETURN() {

        if (simbolo_preanalisis.getTipo() == 39) {
            this.match(39,simbolo_preanalisis.fila,simbolo_preanalisis.columna); this.AUXRETURN();
        } else {
            return;
        }
    }

    AUXRETURN() {

        if (simbolo_preanalisis.getTipo() == 1 || simbolo_preanalisis.getTipo() == 33 || simbolo_preanalisis.getTipo() == 32 || simbolo_preanalisis.getTipo() == 31 || simbolo_preanalisis.getTipo() == 51 || simbolo_preanalisis.getTipo() == 52 || simbolo_preanalisis.getTipo() == 7 || simbolo_preanalisis.getTipo() == 43) {

            this.EXPRESION();
            lista_traduccion_pyton.push("return " + concatena_expresion); posicion_lista_traduccion_pyton++;
            concatena_expresion = "";
            this.match(23,simbolo_preanalisis.fila,simbolo_preanalisis.columna);

        } else {

            lista_traduccion_pyton.push("return"); posicion_lista_traduccion_pyton++;
            this.match(23,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        }



    }

    //----------------------------------------- METODOS SENTENCIA FOR --------------------------------------------



    SENTENCIA_FOR() {


        this.match(34,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        this.match(11,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        lista_traduccion_pyton.push("for"); posicion_lista_traduccion_pyton++;
        this.INS();
        lista_traduccion_pyton.push("in range ("); posicion_lista_traduccion_pyton++;
        this.EXPRESION();
        lista_traduccion_pyton.push(concatena_expresion + " ):"); concatena_expresion = ""; posicion_lista_traduccion_pyton++;
        this.match(23,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        this.match(1,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        this.AUMENTA_FOR();
        lista_traduccion_pyton.push("{"); posicion_lista_traduccion_pyton++;
        this.match(12,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        this.match(13,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        this.L_INS();
        this.match(14,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        lista_traduccion_pyton.push("}"); posicion_lista_traduccion_pyton++;


    }


    AUMENTA_FOR() {

        if (simbolo_preanalisis.getTipo() == 6) {//++

            this.match(6,simbolo_preanalisis.fila,simbolo_preanalisis.columna); this.match(6,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        } else if (simbolo_preanalisis.getTipo() == 7) {//--
            this.match(7,simbolo_preanalisis.fila,simbolo_preanalisis.columna); this.match(7,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        } else {
            return;
        }




    }


    //-----------------------------------------METODOS SENTENCIA ASGINACION --------------------------------------------



    SENTENCIA_ASIGNACION() {


        if (simbolo_preanalisis.getTipo() == 1) {
            concatena_asignacion += simbolo_preanalisis.lexema;
            this.match(1,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
            if(simbolo_preanalisis.getTipo()==11){
                
                this.match(11,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                this.LISTA_PARAMETROSLLAMADA();
                this.match(12,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
                concatena_asignacion+="(";
                concatena_asignacion+=concatena_expresion;
                concatena_expresion="";
                concatena_asignacion+=")";
                lista_traduccion_pyton.push(concatena_asignacion); posicion_lista_traduccion_pyton++;
                concatena_asignacion="";
                this.match(23,simbolo_preanalisis.fila,simbolo_preanalisis.columna);

                }else{
                concatena_asignacion += " = "

                this.match(3,simbolo_preanalisis.fila,simbolo_preanalisis.columna);

                this.EXPRESION();
                concatena_asignacion += concatena_expresion;
                concatena_expresion = "";
                lista_traduccion_pyton.push(concatena_asignacion);
                concatena_asignacion = ""; posicion_lista_traduccion_pyton++; this.match(23,simbolo_preanalisis.fila,simbolo_preanalisis.columna);


                } 
        }else{
            return;
        }
    }

    //-----------------------------------------METODOS SENETENCIA WHILE --------------------------------------------------


    SENTENCIA_WHILE() {

        concatena_ciclos += "while ";
        this.match(37,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        this.match(11,simbolo_preanalisis.fila,simbolo_preanalisis.columna);

        this.EXPRESION();
        concatena_ciclos += concatena_expresion + " :";
        lista_traduccion_pyton.push(concatena_ciclos); posicion_lista_traduccion_pyton++;
        concatena_expresion = ""; concatena_ciclos = "";
        lista_traduccion_pyton.push("{"); posicion_lista_traduccion_pyton++;
        this.match(12,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        this.match(13,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        this.L_INS();
        lista_traduccion_pyton.push("}"); posicion_lista_traduccion_pyton++;
        this.match(14,simbolo_preanalisis.fila,simbolo_preanalisis.columna);

    }


    //-----------------------------------------METODOS SENETENCIA do while --------------------------------------------------


    SENTENCIA_DO_WHILE() {
        concatena_ciclos += "while True:";
        lista_traduccion_pyton.push(concatena_ciclos); posicion_lista_traduccion_pyton++; concatena_ciclos = "";
        lista_traduccion_pyton.push("{"); posicion_lista_traduccion_pyton++;

        this.match(38,simbolo_preanalisis.fila,simbolo_preanalisis.columna); this.match(13,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        this.L_INS(); this.match(14,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        this.match(37,simbolo_preanalisis.fila,simbolo_preanalisis.columna); this.match(11,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        this.EXPRESION();
        concatena_ciclos += "if (" + concatena_expresion + " ):\tbreak";
        lista_traduccion_pyton.push(concatena_ciclos); posicion_lista_traduccion_pyton++; concatena_ciclos = ""; concatena_expresion = "";
        this.match(12,simbolo_preanalisis.fila,simbolo_preanalisis.columna); this.match(23,simbolo_preanalisis.fila,simbolo_preanalisis.columna);
        lista_traduccion_pyton.push("}"); posicion_lista_traduccion_pyton++;
    }


    //-----------------------------------------METODOS SENETENCIA console.write --------------------------------------------------


    SENTENCIA_CONSOLE() {

        concatena_ciclos += "print(";
        this.match(24,simbolo_preanalisis.fila,simbolo_preanalisis.columna); this.match(5,simbolo_preanalisis.fila,simbolo_preanalisis.columna); this.match(25,simbolo_preanalisis.fila,simbolo_preanalisis.columna); this.match(11,simbolo_preanalisis.fila,simbolo_preanalisis.columna); this.EXPRESION();
        concatena_ciclos += concatena_expresion.replace("+", ",") + ")";
        lista_traduccion_pyton.push(concatena_ciclos.replace("+",",")); posicion_lista_traduccion_pyton++;
        concatena_ciclos = "";
        concatena_expresion = ""; this.match(12,simbolo_preanalisis.fila,simbolo_preanalisis.columna); this.match(23,simbolo_preanalisis.fila,simbolo_preanalisis.columna);


    }




    //---------------------------------------



    match(token_a_verificar,fila,columna) {
        //si hace match y no es el ultimo token ,pasa al siguiente
        if (token_a_verificar == simbolo_preanalisis.getTipo() && simbolo_preanalisis.getTipo() != ListaParser[ListaParser.length - 1].getTipo()) {
            console.log("hago macth con: " + simbolo_preanalisis.lexema);
            numero_preanalisis++;
            simbolo_preanalisis = ListaParser[numero_preanalisis];

        }
        else if (token_a_verificar == ListaParser[ListaParser.length - 1].getTipo()) {
            console.log("hago macth con: " + simbolo_preanalisis.lexema);
            console.log("Analisis Sintactico Concluido");
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

}