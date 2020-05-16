


class  Nodo_Arbol{


    constructor(tipo,valor,fila,columna){

        this.tipo=tipo;
        this.valor=valor;
        this.fila=fila;
        this.columna=columna;
        this.hijos=[];

    }

    agregarHijo(hijo){
        this.hijos.push(hijo);
    }

}




//exportar la clase y poder importarla en otras clases 
module.exports= Nodo_Arbol;


