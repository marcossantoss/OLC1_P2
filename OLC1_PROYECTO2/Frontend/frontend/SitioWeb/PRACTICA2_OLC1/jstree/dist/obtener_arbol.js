


window.onload=function(){
     this.ejecutar();
}

function ejecutar(){

    var elemento = document.getElementById('html');
    
 //  var item = document.createElement('li');
 // item.setAttribute("data-jstree","data-jstree=\'{ \"opened\" : true }\'");
 //  item.innerHTML="hijo"
 //elemento.innerHTML = contenido;
    elemento.innerHTML = "	<ul>    <li data-jstree=\'{ \"opened\" : false }\'>Raiz<ul>   <li data-jstree=\'{ \"opened\" : true }\'>Aritmetica         <ul>     <li>Primitivo</li>     <li>Primitivo</li> </ul> 	</li>    </ul>";
 //  elemento.appendChild(item);
}
