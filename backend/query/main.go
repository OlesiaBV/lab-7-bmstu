package main

import (
	"fmt"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	name := r.URL.Query().Get("name")
	if name == "" {
		http.Error(w, "Нет параметра", http.StatusBadRequest)
		return
	}
	fmt.Fprintf(w, "Hello, %s!", name)
}
func main() {
	http.HandleFunc("/api/user", handler)
	err := http.ListenAndServe(":8083", nil)
	fmt.Println("starting server...")
	if err != nil {
		fmt.Println("Ошибка запуска сервера", err)
	}
}
