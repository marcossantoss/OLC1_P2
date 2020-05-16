//esta nos va a servir para mostrar los datos
class Nodo_reporte{


    constructor(nombre_clase,cantidad_metodos_funciones,lista_metodos,lista_funciones,lista_ids,fila,columna){
        this.nombre_clase=nombre_clase;
        this.cantidad_metodos_funciones=cantidad_metodos_funciones;
        this.lista_metodos=lista_metodos;
        this.lista_funciones=lista_funciones;
        this.lista_ids=lista_ids;
        this.fila=fila;
        this.columna=columna;
    }


}

module.exports=Nodo_reporte;
