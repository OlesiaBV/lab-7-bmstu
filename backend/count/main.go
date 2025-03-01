package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
)

var globCount int

func main() {
	http.HandleFunc("/", handleRequest)
	err := http.ListenAndServe(":8081", nil)
	fmt.Println("starting server...")
	if err != nil {
		log.Println(err)
	}
}
func handleRequest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	switch r.Method {
	case http.MethodGet:
		handleGet(w, r)
	case http.MethodPost:
		handlePost(w, r)
	case http.MethodDelete:
		handleDelete(w, r)
	}
}
func handleGet(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "%d", globCount)
	fmt.Println(globCount)
}
func handlePost(w http.ResponseWriter, r *http.Request) {
	intCount, err := strconv.Atoi(r.FormValue("count"))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("это не число"))
	} else {
		globCount += intCount
	}
}
func handleDelete(w http.ResponseWriter, r *http.Request) {
	globCount = 0
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Счетчик был сброшен"))
}
