
class Simbolo{
constructor(tipo,id,valor,cantidad,lista_parametros,fila,columna){
    
    this.tipo = tipo
    this.Identiicador = id;
    this.cantidad=cantidad;
    this.valor = valor;   
    this.lista_parametros=lista_parametros;   
    this.fila = fila;
    this.columna = columna;
   
}

 /**
         * @return the Identiicador
         */
        getTipo()
        {
            return this.tipo;
        }

 /**
         * @return the Identiicador
         */
         getIdentiicador()
        {
            return this.Identiicador;
        }

        /**
         * @param Identiicador the Identiicador to set
         */
        setIdentiicador(Identiicador)
        {
            this.Identiicador = Identiicador;
        }

        /**
         * @return the valor
         */
        getValor()
        {
            return this.valor;
        }

        /**
         * @param Contenido the Contenido to set
         */
        setValor(valor)
        {
            this.valor = valor;
        }

}


//exportar la clase y poder importarla en otras clases 
module.exports= Simbolo;