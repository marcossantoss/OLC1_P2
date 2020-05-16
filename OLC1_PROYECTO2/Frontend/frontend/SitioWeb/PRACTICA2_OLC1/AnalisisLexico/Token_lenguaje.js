
class Token_lenguaje{
	    //CONSTRUCTOR
        constructor(tipo, lexema, fila, columna)
        {
            this.tipo = tipo;
            this.lexema = lexema;
            this.fila = fila;
            this.columna = columna;
        }
 
        //METODOS GET /SET
        getTipo(){
            return this.tipo;
        }

        getLexema(){
            return this.Lexema;
        }

        getFila(){
            return this.fila
        }
        getColumna(){
            return this.columna
        }
       

        
    };
 

    //CLASE ENUMERADA
    const TOKEN={
        
        //ID:1,
        //COMA:2,
        //IGUAL:3,
        //IGUALIGUAL: 4
        //punto:5
       //  MAS:6,
       //  MENOS:7,
       // MULTIPLICACION:8,
       //DIVISION:9,
       // VOID:10,
       // PARE_APER:11,
       // PARE_CERR:12,
        //LLAV_APER:13,
        //LLAV_CIRR:14,
      
       // MAYORQUE:16,
       // MENORQUE:17,
       // MAYORIGUAL:18,
        //MENORIGUAL:19,
       // SWITCHH:20,
      //  CASE:21,
      //   BREAK:22,
      //PTOCOMA:23,
     //   CONSOLE:24,
    //    WRITEE:25,
    //    DEFAULTT:26,
     //   IF:27,
     //   ELSE:28,
        
     //   MAIN:30,
     //   CADENA:31,
     //   CADENAHTML:32,
     //   NUMERO:33,
        //   FORR:34,
        //  MASMAS:35,
        //  MENOSMENOS:36,
        //    WHILEE:37,
        //    DOO:38,
        //    RETURNN:39,
        //     CONTINUEE:40,
        //ANDD:41,
        //ORR:42,
        // NOTT:43,
        //DISTINTO:44,
        //INT:45,
        //DOUBLE:46,
        //STRINGG:47,  
        //CHARR:48   
        //bool:49 
        //dospuntos :50
        //true:51
        //false:52
       


        //ACEPTACION=90
    };




//exportar la clase y poder importarla en otras clases 
//module.exports= Token_lenguaje;

