var ListaParser = [];
var ListaErroresLexicos=[];
var banderaaux_levantada=false;


class Analisis_lexico{
 
   
    constructor() {

        
        this.contenido_areaTexto = contenidoo+" #";
        this.lexema="";
        this.estado=0;
        this.fila=0;
        this.columna=0;


    }

    //hacemos el analisis lexico
    scanner(){

        console.log('scanneando');
        this.estado=0;
        this.fila=1;
        this.columna=1;
        var auxcaracter=0;//este va ser un auxiliar para analizar el siguiente caracter

      
        for(var i=0;i<this.contenido_areaTexto.length;i++){
        
           
        
        //va contener el caracter por caracter de todo el archivo de entrada
        var charActual=this.contenido_areaTexto[i];

            if(charActual=='\n'){
               this.fila++;
               this.columna=0;
            }
    //     console.log("auxcaracter -> "+auxcaracter+ "  i -> "+i + "  el caracter es: "+ charActual);
     //    console.log("estado-> "+ this.estado);
        
            //aqui iniciamos con los casos de analisis lexico
            switch(this.estado)
            {
                case 0:
                    if(banderaaux_levantada){
                      banderaaux_levantada=false;
                    }else if((charActual==='/')  && ((this.contenido_areaTexto[auxcaracter+1]==='*') || (this.contenido_areaTexto[auxcaracter+1]==='/'))){//comentario multilinea o de una linea 
                        this.lexema+=charActual;
                        this.estado=1;
                    }else if(charActual===','){//coma
                        this.aceptarToken(2,charActual,this.fila,this.columna);
                    }else if(charActual===':'){//punto y coma
                        this.aceptarToken(50,charActual,this.fila,this.columna);
                    }else if(charActual===';'){//punto y coma
                        this.aceptarToken(23,charActual,this.fila,this.columna);
                    }else if(charActual==='{'){//llave de apertura
                        this.aceptarToken(13,charActual,this.fila,this.columna);
                    }else if(charActual==='}'){//llave de cierre
                        this.aceptarToken(14,charActual,this.fila,this.columna);
                    }else if(charActual==='('){//parentesis de apertura
                        this.aceptarToken(11,charActual,this.fila,this.columna);
                    }else if(charActual===')'){//parentesis de cierre
                        this.aceptarToken(12,charActual,this.fila,this.columna);
                    }/*else if(charActual==='+' && this.contenido_areaTexto[auxcaracter+1]==='+'){//==
                        this.aceptarToken(35,"++",this.fila,this.columna);
                        banderaaux_levantada=true;
                    }else if(charActual==='-' && this.contenido_areaTexto[auxcaracter+1]==='-'){//--
                        this.aceptarToken(36,"--",this.fila,this.columna);
                        banderaaux_levantada=true;
                    }*/else if(charActual==='=' && this.contenido_areaTexto[auxcaracter+1]==='='){//==
                        this.aceptarToken(4,"==",this.fila,this.columna);
                        banderaaux_levantada=true;
                    }else if(charActual==='!' && this.contenido_areaTexto[auxcaracter+1]==='='){//!=
                        this.aceptarToken(44,"!=",this.fila,this.columna);
                        banderaaux_levantada=true;
                    }else if(charActual==='<' && this.contenido_areaTexto[auxcaracter+1]==='='){//<=
                        this.aceptarToken(19,"<=",this.fila,this.columna);
                        banderaaux_levantada=true;
                    }else if(charActual==='>' && this.contenido_areaTexto[auxcaracter+1]==='='){//>=
                        this.aceptarToken(18,">=",this.fila,this.columna);
                        banderaaux_levantada=true;
                    }else if(charActual==='|' && this.contenido_areaTexto[auxcaracter+1]==='|'){//|
                        this.aceptarToken(42,"||",this.fila,this.columna);
                        banderaaux_levantada=true;
                    }else if(charActual==='&' && this.contenido_areaTexto[auxcaracter+1]==='&'){//&&
                        this.aceptarToken(41,"&&",this.fila,this.columna);
                        banderaaux_levantada=true;
                    }else if(charActual==='='){//=
                        this.aceptarToken(3,charActual,this.fila,this.columna);
                    }else if(charActual==='!'){//!=
                        this.aceptarToken(43,charActual,this.fila,this.columna);
                    }else if(charActual==='+'){//suma
                        this.aceptarToken(6,"+",this.fila,this.columna);
                    }else if(charActual==='-'){//resta
                        this.aceptarToken(7,"-",this.fila,this.columna);
                    }else if(charActual==='*'){//multiplica
                        this.aceptarToken(8,"*",this.fila,this.columna);
                    }else if(charActual==='/'){//divisor
                        this.aceptarToken(9,"/",this.fila,this.columna);
                    }else if(charActual==='>'){//>
                        this.aceptarToken(16,">",this.fila,this.columna);
                    }else if(charActual==='<'){//<
                        this.aceptarToken(17,"<",this.fila,this.columna);
                    }else if(charActual==='.'){//punto
                        this.aceptarToken(5,"punto",this.fila,this.columna);
                    }else if(charActual==='\"'){//cadena tipo string
                        this.lexema+=charActual; 
                        this.estado=5;
                    }else if(charActual==='\''){//cadenaHTML O CHAR
                        this.lexema+=charActual; 
                        this.estado=6;
                    }else if((charActual.charCodeAt(0) >= 65 && charActual.charCodeAt(0) <= 90) || (charActual.charCodeAt(0) >= 97 && charActual.charCodeAt(0) <= 122)){//si es una letra
                        if(this.contenido_areaTexto[auxcaracter+1]==='\t'||this.contenido_areaTexto[auxcaracter+1]==='\n'||this.contenido_areaTexto[auxcaracter+1]==='.'||this.contenido_areaTexto[auxcaracter+1]==='-'||this.contenido_areaTexto[auxcaracter+1]==='+'||this.contenido_areaTexto[auxcaracter+1]==='<' || this.contenido_areaTexto[auxcaracter+1]==='>' || this.contenido_areaTexto[auxcaracter+1]==='!' || this.contenido_areaTexto[auxcaracter+1]==='&' || this.contenido_areaTexto[auxcaracter+1]==='|' ||this.contenido_areaTexto[auxcaracter+1]==='(' ||this.contenido_areaTexto[auxcaracter+1]==='{'||this.contenido_areaTexto[auxcaracter+1]===' ' || this.contenido_areaTexto[auxcaracter+1]===';' || this.contenido_areaTexto[auxcaracter+1]===',' || this.contenido_areaTexto[auxcaracter+1]==='\t' ||this.contenido_areaTexto[auxcaracter+1]==='=' || this.contenido_areaTexto[auxcaracter+1]===')'){
                            this.aceptarToken(1,charActual,this.fila,this.columna);
                        }else{
                            this.lexema+=charActual;
                            this.estado=4;
                        }
                       

                    }else if((charActual.charCodeAt(0) >= 48) && (charActual.charCodeAt(0) <= 57)){//numero

                        if(this.contenido_areaTexto[auxcaracter+1]==='='||this.contenido_areaTexto[auxcaracter+1]==='*'||this.contenido_areaTexto[auxcaracter+1]==='/'|| this.contenido_areaTexto[auxcaracter+1]===')' ||this.contenido_areaTexto[auxcaracter+1]===':' ||this.contenido_areaTexto[auxcaracter+1]==='-'||this.contenido_areaTexto[auxcaracter+1]==='+'||this.contenido_areaTexto[auxcaracter+1]==='<' || this.contenido_areaTexto[auxcaracter+1]==='>' || this.contenido_areaTexto[auxcaracter+1]==='!' || this.contenido_areaTexto[auxcaracter+1]==='&' || this.contenido_areaTexto[auxcaracter+1]==='|' ||this.contenido_areaTexto[auxcaracter+1]===' ' || this.contenido_areaTexto[auxcaracter+1]===','|| this.contenido_areaTexto[auxcaracter+1]==='\n' || this.contenido_areaTexto[auxcaracter+1]==='\t' || this.contenido_areaTexto[auxcaracter+1]===';'){
                            this.aceptarToken(33, charActual, this.fila, this.columna);
                        }else{
                        this.lexema+=charActual;
                        this.estado=7
                        }
                    }else if(charActual==='#'){
                        this.aceptarToken(90,charActual,this.fila,this.columna);
                    }else if(charActual == '\n' || charActual == '\t' || charActual == ' ' || charActual =='\r'){
                        //se omiten
                        this.estado=0;
                    }else{
                        //marcamos errores lexicos
                        this.reportarToken(-1,charActual,this.fila,this.columna);
                    }
                    
                    break;
                
                case 1:
                    if(charActual==='*'){
                        this.lexema+=charActual;
                        this.estado=2
                    }else if(charActual==='/'){
                        this.lexema+=charActual;
                        this.estado=3;
                    }
                    
                    break;//fin caso 1
                case 2:
                    if(this.lexema.endsWith("*/"))
                    {
            //          console.log("comando de varias lineas");
                    //  console.log(this.lexema);
                      this.estado=0;
                      this.lexema="";
                    }else{
                       this.lexema+=charActual;
                    }
                    break;//fin caso 2
                case 3:
                    if(charActual==='\n'){
                  //      console.log("comentario de un linea");
                  
                        this.estado=0;
                        this.lexema="";
                    }else{
                        this.lexema+=charActual;
                    }
                    break;//fin caso 3
                case 4:
                     
              //      console.log("Estado 4: "+"caracter con el que llego: "+ charActual);
              //      console.log(this.contenido_areaTexto[auxcaracter+1]+"==="+" = " + this.contenido_areaTexto[auxcaracter+1]==='=');
                    if(this.contenido_areaTexto[auxcaracter+1]==='\t'||this.contenido_areaTexto[auxcaracter+1]==='\n'||this.contenido_areaTexto[auxcaracter+1]===':' ||this.contenido_areaTexto[auxcaracter+1]==='.'||this.contenido_areaTexto[auxcaracter+1]==='-'||this.contenido_areaTexto[auxcaracter+1]==='+'||this.contenido_areaTexto[auxcaracter+1]==='<' || this.contenido_areaTexto[auxcaracter+1]==='>' || this.contenido_areaTexto[auxcaracter+1]==='!' || this.contenido_areaTexto[auxcaracter+1]==='&' || this.contenido_areaTexto[auxcaracter+1]==='|' ||this.contenido_areaTexto[auxcaracter+1]==='(' ||this.contenido_areaTexto[auxcaracter+1]==='{'||this.contenido_areaTexto[auxcaracter+1]===' ' || this.contenido_areaTexto[auxcaracter+1]===';' || this.contenido_areaTexto[auxcaracter+1]===',' || this.contenido_areaTexto[auxcaracter+1]==='\t' ||this.contenido_areaTexto[auxcaracter+1]==='=' || this.contenido_areaTexto[auxcaracter+1]===')'){
                        this.lexema+=charActual;
                        if(this.lexema==="int"){
                           this.aceptarToken(45, this.lexema, this.fila, this.columna);
                        }else if(this.lexema==="string"){
                           this.aceptarToken(47, this.lexema, this.fila, this.columna);
                        }else if(this.lexema==="char"){
                           this.aceptarToken(48, this.lexema, this.fila, this.columna);
                        }else if(this.lexema==="bool"){
                           this.aceptarToken(49, this.lexema, this.fila, this.columna);
                       
                        }else if(this.lexema==="double"){
                            this.aceptarToken(46, this.lexema, this.fila, this.columna);
                       
                        }else if(this.lexema==="void"){
                            this.aceptarToken(10, this.lexema, this.fila, this.columna);
                       
                        }else if(this.lexema==="switch"){
                            this.aceptarToken(20, this.lexema, this.fila, this.columna);
                        }else if(this.lexema==="case"){
                            this.aceptarToken(21, this.lexema, this.fila, this.columna);
                        }else if(this.lexema==="break"){
                            this.aceptarToken(22, this.lexema, this.fila, this.columna);
                        }else if(this.lexema==="Console"){
                            this.aceptarToken(24, this.lexema, this.fila, this.columna);
                        }else if(this.lexema==="Write"){
                            this.aceptarToken(25, this.lexema, this.fila, this.columna);
                        }else if(this.lexema==="default"){
                            this.aceptarToken(26, this.lexema, this.fila, this.columna);
                        }else if(this.lexema==="if"){
                            this.aceptarToken(27, this.lexema, this.fila, this.columna);
                        }else if(this.lexema==="else"){
                            this.aceptarToken(28, this.lexema, this.fila, this.columna);
                        }else if(this.lexema==="main"){
                            this.aceptarToken(30, this.lexema, this.fila, this.columna);
                        }else if(this.lexema==="for"){
                            this.aceptarToken(34, this.lexema, this.fila, this.columna);
                        }else if(this.lexema==="while"){
                            this.aceptarToken(37, this.lexema, this.fila, this.columna);
                        }else if(this.lexema==="do"){
                            this.aceptarToken(38, this.lexema, this.fila, this.columna);
                        }else if(this.lexema==="return"){
                             this.aceptarToken(39, this.lexema, this.fila, this.columna);
                        }else if(this.lexema==="continue"){
                            this.aceptarToken(40, this.lexema, this.fila, this.columna);
                        }else if(this.lexema==="true"){
                            this.aceptarToken(51, this.lexema, this.fila, this.columna);
                        }else if(this.lexema==="false"){
                            this.aceptarToken(52, this.lexema, this.fila, this.columna);
                        }
                        else{                          
                            this.aceptarToken(1, this.lexema, this.fila, this.columna);
                       
                        }
                       
                    }else if(charActual==='_'){
                        this.lexema+=charActual;
                        this.estado=4;
                                            
                    }else if((charActual.charCodeAt(0) >= 65) && (charActual.charCodeAt(0) <= 90 || charActual.charCodeAt(0) >= 97 && charActual.charCodeAt(0) <= 122))
                    {
                        this.lexema+=charActual;
                        this.estado=4;
                    }else if((charActual.charCodeAt(0) >= 48) && (charActual.charCodeAt(0) <= 57)){//numero
                        this.lexema+=charActual;
                        this.estado=4;
                    }else{
                        this.reportarToken(-1,charActual,this.fila,this.columna);

                    }
                    break;//fin caso 4
                case 5://cadenas normales
                    this.lexema+=charActual;
                 //   console.log(this.lexema);
                 //   console.log(this.lexema.startsWith("\"") && this.lexema.endsWith("\""));
                    if((this.lexema.startsWith("\"") && this.lexema.endsWith("\"")) && ( this.contenido_areaTexto[auxcaracter+1]==='\n'||this.contenido_areaTexto[auxcaracter+1]==='\t'||this.contenido_areaTexto[auxcaracter+1]===' '||this.contenido_areaTexto[auxcaracter+1]==='!'||this.contenido_areaTexto[auxcaracter+1]==='='||this.contenido_areaTexto[auxcaracter+1]==='-' ||this.contenido_areaTexto[auxcaracter+1]==='+' ||this.contenido_areaTexto[auxcaracter+1]==='&'||this.contenido_areaTexto[auxcaracter+1]==='|'||this.contenido_areaTexto[auxcaracter+1]===')'  || this.contenido_areaTexto[auxcaracter+1]===';' || this.contenido_areaTexto[auxcaracter+1]===',')){
                        if(this.contenido_areaTexto[auxcaracter-1]==='\\'){
                           this.estado=5;
                        }else{
                            this.aceptarToken(31, this.lexema, this.fila, this.columna);
                        }
                       

                    }else {

                        this.estado=5;
                    }
                    break;//fin caso5
                case 6://cadenas html
                if(charActual!='\n'){
                    this.lexema+=charActual;
                }
                    
                    if(this.contenido_areaTexto[auxcaracter+1]==='\n'||this.contenido_areaTexto[auxcaracter+1]==='\t'||this.contenido_areaTexto[auxcaracter+1]===' '||this.contenido_areaTexto[auxcaracter+1]==='!'||this.contenido_areaTexto[auxcaracter+1]==='='||this.contenido_areaTexto[auxcaracter+1]==='-' ||this.contenido_areaTexto[auxcaracter+1]==='+' ||this.contenido_areaTexto[auxcaracter+1]==='&'||this.contenido_areaTexto[auxcaracter+1]==='|'||this.contenido_areaTexto[auxcaracter+1]===')' || this.contenido_areaTexto[auxcaracter+1]===';' || this.contenido_areaTexto[auxcaracter+1]===','){
                      if((this.lexema.startsWith("'") && this.lexema.endsWith("'"))  &&  this.contenido_areaTexto[auxcaracter-1]!='\\'){
                        this.aceptarToken(32, this.lexema, this.fila, this.columna);
                      }else{
                        this.estado=6;
                      }
                        

                    }else{

                        this.estado=6;
                    }
                    break;//fin caso 6
                case 7://numero con decimales
                    this.lexema+=charActual;
                    if(this.contenido_areaTexto[auxcaracter+1]==='='||this.contenido_areaTexto[auxcaracter+1]==='*' ||this.contenido_areaTexto[auxcaracter+1]==='/' || this.contenido_areaTexto[auxcaracter+1]===')' || this.contenido_areaTexto[auxcaracter+1]==='-'||this.contenido_areaTexto[auxcaracter+1]==='+'||this.contenido_areaTexto[auxcaracter+1]==='<' || this.contenido_areaTexto[auxcaracter+1]==='>' || this.contenido_areaTexto[auxcaracter+1]==='!' || this.contenido_areaTexto[auxcaracter+1]==='&' || this.contenido_areaTexto[auxcaracter+1]==='|' ||this.contenido_areaTexto[auxcaracter+1]===':' ||this.contenido_areaTexto[auxcaracter+1]===' ' || this.contenido_areaTexto[auxcaracter+1]===','|| this.contenido_areaTexto[auxcaracter+1]==='\n' || this.contenido_areaTexto[auxcaracter+1]==='\t' || this.contenido_areaTexto[auxcaracter+1]===';'){
                        this.aceptarToken(33, this.lexema, this.fila, this.columna);

                    }else if((charActual.charCodeAt(0) >= 48) && (charActual.charCodeAt(0) <= 57)) {

                        this.estado=7;
                    }else if(charActual=='.'){
                        
                        this.estado=8;
                    }                 
                     break;//fin caso 7
                case 8://numeros 
                    
                    if(this.contenido_areaTexto[auxcaracter+1]==='='||this.contenido_areaTexto[auxcaracter+1]==='*' ||this.contenido_areaTexto[auxcaracter+1]==='/' || this.contenido_areaTexto[auxcaracter+1]===')' || this.contenido_areaTexto[auxcaracter+1]==='-'||this.contenido_areaTexto[auxcaracter+1]==='+'||this.contenido_areaTexto[auxcaracter+1]==='<' || this.contenido_areaTexto[auxcaracter+1]==='>' || this.contenido_areaTexto[auxcaracter+1]==='!' || this.contenido_areaTexto[auxcaracter+1]==='&' || this.contenido_areaTexto[auxcaracter+1]==='|' ||this.contenido_areaTexto[auxcaracter+1]===':' || this.contenido_areaTexto[auxcaracter+1]===' ' || this.contenido_areaTexto[auxcaracter+1]===','|| this.contenido_areaTexto[auxcaracter+1]==='\n' || this.contenido_areaTexto[auxcaracter+1]==='\t' || this.contenido_areaTexto[auxcaracter+1]===';'){
                        this.lexema+=charActual;
                        this.aceptarToken(33, this.lexema, this.fila, this.columna);

                    }else if((charActual.charCodeAt(0) >= 48) && (charActual.charCodeAt(0) <= 57)) {
                        this.lexema+=charActual;
                        this.estado=8;
                    }else{
                        this.reportarToken(-1,this.lexema,this.fila,this.columna);
                    }
                    break;//fin caso n8

            }//fin del switch
            this.columna++;//aumenta la columna cada vez que lee el siguiente caracter
            auxcaracter++; //este se usa solo si es necesario sin embargo de ir de la mano con el charActual
        }//fin del ciclo for

    }//fin del metodo scanner


    aceptarToken(tipo,Lexema, fila, columna)
    {
            let nuevoToken=new Token_lenguaje(tipo, Lexema, fila, columna);
            ListaParser.push(nuevoToken);// se agrega el token a mi lista 
            this.lexema = "";//limpiamos el lexema
            this.estado = 0; // el estado regresa al estado inicial
             
    }//fin de aceptar token

    reportarToken(tipo, Lexema,fila,columna)
    {
        var nuevoError=new Token_lenguaje(tipo, Lexema, fila, columna);
        ListaErroresLexicos.push(nuevoError);// se agrega el token a mi lista 
        this.lexema = "";//limpiamos el lexema
        this.estado = 0; // el estado regresa al estado inicial
    }

        /*
          @Lista de tokens aceptados
          retorna los tokens acpetados en el analisis
         */
        returnListaTokens()
        {
            return ListaParser;
        }

        /*
          @Lista de errores Lexicos
          retorna los tokens no acpetados en el analisis
         */
        returnListaErroresLexicos()
        {
            return ListaErroresLexicos;
        }


}

//exportar la clase y poder importarla en otras clases 
//module.exports= Analisis_lexico;
