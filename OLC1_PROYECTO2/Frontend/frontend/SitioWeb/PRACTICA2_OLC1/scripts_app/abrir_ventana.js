function mostrarReporte(){

    window.open("ventana_reportes.html", "R E  P O R T E S", "width=500, height=500");



}


function ver_errores(){
console.log("mostrando reporte");
console.log(ListaErroresLexicos);
        //limpiamos la tabla
        var mitabla = document.getElementById("mi_tabla1");
        ListaErroresLexicos.forEach(element => {
          console.log(element);
          var mitr = document.createElement("tr");
          mitr.setAttribute("id", "trs");
      
          var tipo_ = document.createElement("td");
          tipo_.setAttribute("class", "cajitas");
          var newContent = document.createTextNode(element.tipo);
          tipo_.appendChild(newContent);
      
          var nombre_ = document.createElement("td");
          nombre_.setAttribute("class", "cajitas");
          newContent = document.createTextNode(element.lexema);
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
      
          mitabla.appendChild(mitr);
          
        });
      
        lista_errores_sintacticos.forEach(element=>{
      
      
        });
      
}


