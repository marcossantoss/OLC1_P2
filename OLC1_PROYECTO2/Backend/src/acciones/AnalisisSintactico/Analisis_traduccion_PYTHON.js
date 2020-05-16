


var cantidad_identados_abiertos=0;
var filtro_traduccion=[];
var switcher_detectado=0;
var for_detectado=false;
var reestructura_for="";
var variable_aux_for="";
var cuenta_for=0;
class Analisis_traduccion_PYTHON{

  
    iniciar_traduccion(){
        filtro_traduccion=[];

 
        console.log("impriendo datos obtenidos en la traduccion previa.....");
       
        for (let index = 0; index < lista_traduccion_pyton.length; index++) {
           
            
        
            
            if(lista_traduccion_pyton[index]==="{"){
                cantidad_identados_abiertos++;
            
            }else if(lista_traduccion_pyton[index]==="}"){
                cantidad_identados_abiertos--;
            
            }else{
            var concatena_identado="";            
           
            //aqui asignamos el indentado
            for (var i = 0; i < cantidad_identados_abiertos; i++) {
                concatena_identado+="   ";
            }

            //aqui limpiamos el switcher 
            if(lista_traduccion_pyton[index]==="°°}"){
                lista_traduccion_pyton[index]=lista_traduccion_pyton[index].replace("°°","");
                cantidad_identados_abiertos--;
                switcher_detectado--;
                
            }else if(lista_traduccion_pyton[index].startsWith("switcher = {")){
                //esto nos va servir para detectar que no insertar las instrucciones break de c# cuando venga un switch
                switcher_detectado++;
                cantidad_identados_abiertos++;
                
            }




            if(switcher_detectado>0 && lista_traduccion_pyton[index]=="break"){
                //no insertamos esta instruccion que se puede hacer presente
                concatena_identado="";
                           

            }else if(lista_traduccion_pyton[index]=="for"){
                console.log("estoy aqui");
                for_detectado=true;
                cuenta_for++;
            }else if(for_detectado){

                if(cuenta_for==1){
                reestructura_for+=concatena_identado+"for "+  lista_traduccion_pyton[index].substring(0, (lista_traduccion_pyton[index].indexOf("=")))+ " ";
                //for variable 
                console.log(reestructura_for);
                variable_aux_for= lista_traduccion_pyton[index].substring(lista_traduccion_pyton[index].indexOf("=")+1,lista_traduccion_pyton[index].length);
                console.log(variable_aux_for);
                cuenta_for++;  
                }else if(cuenta_for==2){
                    //for variable in a range
                    reestructura_for+=lista_traduccion_pyton[index];
                    cuenta_for++;

                }else if(cuenta_for==3){
                     var variable_aux_for2="";
                    variable_aux_for2 =lista_traduccion_pyton[index].substring(lista_traduccion_pyton[index].indexOf("<")+1, lista_traduccion_pyton[index].length)
                    reestructura_for+= variable_aux_for+" , "+ variable_aux_for2;
                    cuenta_for++;
                    cuenta_for++;
                    filtro_traduccion.push(reestructura_for);
                }else{
                    lista_traduccion_pyton[index]=concatena_identado +  lista_traduccion_pyton[index];
                    filtro_traduccion.push(lista_traduccion_pyton[index]);
                    concatena_identado="";

                    reestructura_for="";
                    variable_aux_for=""
                    cuenta_for=0;
                    for_detectado=false;
                }
            }else{
                lista_traduccion_pyton[index]=concatena_identado +  lista_traduccion_pyton[index];
                filtro_traduccion.push(lista_traduccion_pyton[index]);
                concatena_identado="";
            }

         
            }
        }


        console.log("impriendo datos traduccidos correctamente.....");
        var escribir_en_textArea="";
        filtro_traduccion.forEach(element => {
          escribir_en_textArea+=element+"\n";
          console.log(element);
        });

        //vamos a asigar el dato al html
        var elemento = document.getElementById("textarea3");
        elemento.innerHTML=escribir_en_textArea;


    }



}

