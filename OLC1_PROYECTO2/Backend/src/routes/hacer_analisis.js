
const { Router } = require('express');
const router = Router();
var AnalisisLex = require('../acciones/AnalisisLexico/Analisis_Lexico');
var AnalisisSin = require('../acciones/AnalisisSintactico/Analisis_sintactico');
var RecorrerArb= require('../acciones/AnalisisSintactico/Recorrido_Arbol');


var Arbol="";
var Arbol2="";
var listaErroresLexicos;
var listaErroresSintacticos;

var listaErroresLexicoscopia;
var listaErroresSintacticoscopia;

var RaizOriginal;
var RaizCopia;
var constante_analisis=0;

//aqui mandamos hacer todo y luego vamos a retornar con gets
router.post('/analizar', async (req, res) => {


const {contenido} = req.body;

var entrada= contenido;
 console.log("el contenido de mi paso de info es: ");
 console.log(entrada);
 console.log("*************************************");
    // var entrada="if(a>=b ||10!=10 ){Console.Write(\"esto es una cadena\");} for(int a=11;i<=10;i++){}";
    var analisislexico=new AnalisisLex(entrada);
    analisislexico.limpiarListaErroresLexicos();
    analisislexico.limpiarListaTokens();

    analisislexico.scanner();
    console.log("Salidad de lista para el paser");
    console.log(analisislexico.returnListaTokens());
    console.log("----------------------------------------");
    console.log("Salidad de lista de errores lexicos");
    console.log(analisislexico.returnListaErroresLexicos());
    console.log("Analisis concluido");
    
    console.log("haciendo analisis sintactico");

    //obtenemos los errores lexicos
    listaErroresLexicos=analisislexico.returnListaErroresLexicos();

    //aqui mandamos los datos al analisis sintactico
    var ListaDatos =analisislexico.returnListaTokens();
    var analisissintactico=new AnalisisSin(ListaDatos);
  //  analisissintactico.limpiarLista();
    console.log("mostrando elementos del arbol");
    console.log(analisissintactico.retornar_raiz());

    RaizOriginal= analisissintactico.retornar_raiz();

    //madamos la lista de errores sintacticos
    listaErroresSintacticos=analisissintactico.retornarLista();

    //vamos a usar esta clase para recorrer el arbolito
    var recorrer_mi_raiz= new RecorrerArb(analisissintactico.retornar_raiz());

    var retornoArbol= recorrer_mi_raiz.contenidoHTML;

    Arbol=retornoArbol;
    console.log("mandando arbol construido");
    console.log(retornoArbol);

  
    //este mensaje se envia como retorno de todo bien;
    res.json({ "msg": "analisis correcto","arbol":retornoArbol})

})



//vamos hacer un get  que devuelve el codigo html del arbolito a mostrar
router.get('/mostrarArbolito', async (req,res) => {
    
 //retornamos el arbol generado   
    
    res.json({"infoHTML":Arbol});

    
})
    


//vamos hacer un get  que devuelve las listas de errores lexicos
router.get('/retornarLexicos', async (req,res) => {
    
    //retornamos el arbol generado   
       
       res.json({"lista":listaErroresLexicos});
       
   })

   //vamos hacer un get  que devuelve las listas de errores sintactcos
router.get('/retornarSintacticos', async (req,res) => {
    
    //retornamos el arbol generado   
       
       res.json({"lista":listaErroresSintacticos});
       
   })

   //vamos hacer un get  que compara
   router.get('/comparar', async (req,res) => {
    
    var buscar_copias = new RecorrerArb(RaizOriginal);
       
    console.log("Salida raiz original");
    console.log(RaizOriginal);
    console.log("------------------------");

    console.log("\n");

    console.log("Salida raiz copia");
    console.log(RaizOriginal);
    console.log("------------------------");
    buscar_copias.buscar_clases_y_cantidad_metodos(RaizOriginal,RaizCopia);
    console.log("finalizado de revision")
    buscar_copias.mostrar_copias();
    var lista_clases=buscar_copias.retornarreporteclases();
    res.json({"clasescopias":lista_clases,"variablescopias":"variables"});
       
   })


//aqui van los del segundo archivo
//aqui mandamos hacer todo y luego vamos a retornar con gets
router.post('/analizaraux', async (req, res) => {


    const {contenido} = req.body;
    
    var entrada= contenido;
     console.log("el contenido de mi paso de info es: ");
     console.log(entrada);
     console.log("*************************************");
        // var entrada="if(a>=b ||10!=10 ){Console.Write(\"esto es una cadena\");} for(int a=11;i<=10;i++){}";
        var analisislexico=new AnalisisLex(entrada);
        analisislexico.limpiarListaErroresLexicos();
        analisislexico.limpiarListaTokens();
    
        analisislexico.scanner();
        console.log("Salidad de lista para el paser");
        console.log(analisislexico.returnListaTokens());
        console.log("----------------------------------------");
        console.log("Salidad de lista de errores lexicos");
        console.log(analisislexico.returnListaErroresLexicos());
        console.log("Analisis concluido");
        
        console.log("haciendo analisis sintactico");
    
        //obtenemos los errores lexicos
        listaErroresLexicoscopia=analisislexico.returnListaErroresLexicos();
    
        //aqui mandamos los datos al analisis sintactico
        var ListaDatos =analisislexico.returnListaTokens();
        var analisissintactico=new AnalisisSin(ListaDatos);
      //  analisissintactico.limpiarLista();
        console.log("mostrando elementos del arbol");
        console.log(analisissintactico.retornar_raiz());
    

        RaizCopia= analisissintactico.retornar_raiz();
        //madamos la lista de errores sintacticos
        listaErroresSintacticoscopia=analisissintactico.retornarLista();
    
        //vamos a usar esta clase para recorrer el arbolito
        var recorrer_mi_raiz= new RecorrerArb(analisissintactico.retornar_raiz());
    
        var retornoArbol= recorrer_mi_raiz.contenidoHTML;
    
        Arbol2=retornoArbol;
        console.log("mandando arbol construido");
        console.log(retornoArbol);
    
        console.log("archivo copia en memmoria");
        //este mensaje se envia como retorno de todo bien;
        res.json({ "msg": "analisis correcto","arbol":retornoArbol})
    
    })
module.exports = router;