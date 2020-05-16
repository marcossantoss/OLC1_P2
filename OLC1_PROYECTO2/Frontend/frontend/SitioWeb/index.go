package main

import (
	"fmt"
	"log"
	"net/http"
	"time"
)

type mensaje struct {
	msg string
}

func (m mensaje) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, m.msg)
}

/*
func holaMundo(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "<h1>Hola Mundo </h1>")

}
*/
func main() {

	mux := http.NewServeMux()

	fs := http.FileServer(http.Dir("PRACTICA2_OLC1"))
	mux.Handle("/", fs)

	fs2 := http.FileServer(http.Dir("PRACTICA2_OLC1/jstree"))
	mux.Handle("/x", fs2)


	servidor_ := &http.Server{
		Addr:           ":9000",
		Handler:        mux,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	log.Println("Servidor escuchando en: http://192.168.1.11:9000/")
	log.Fatal(servidor_.ListenAndServe())


}