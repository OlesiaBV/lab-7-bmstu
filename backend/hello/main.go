package main

import (
	"fmt"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	w.Write([]byte("Hello, web!"))
}
func main() {
	http.HandleFunc("/get", handler)
	err := http.ListenAndServe(":8082", nil)
	fmt.Println("starting server...")
	if err != nil {
		fmt.Println("Ошибка запуска сервера:", err)
	}
}
