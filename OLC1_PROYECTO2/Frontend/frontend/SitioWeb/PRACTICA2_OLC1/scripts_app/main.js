
//const Persona= require('./AnalisisLexico/CLase_ejemplo');
//const AnalisisLex=require('./AnalisisLexico/Analisis_Lexico');



//let per= new Persona("Marcos");
//console.log(per.saludar());
//console.log("estamos aprendiendo");

var AnalisisLex=require('./AnalisisLexico/Analisis_Lexico');

var entrada="if(a>=b ||10!=10 ){Console.Write(\"esto es una cadena\");} for(int a=11;i<=10;i++){}";
var analisislexico=new AnalisisLex(entrada);

analisislexico.scanner();
console.log(analisislexico.returnListaTokens());
console.log("----------------------------------------");
console.log(analisislexico.returnListaErroresLexicos());
console.log("Analisis concluido");



