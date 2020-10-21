# Project: Porfolio med fetch



FetchApi som anropar webbtjänst skapad med php. 

- Anrop sker till API:t med fetch-metoden. 
- Data från databasen hämtas med en sql-fråga och läses ut i en tabell
- Varje rad har en uppdatera (funkar inte) och delete-knapp
- Vid klick på x (delete) skickas id med till radera-metoden som skickar en sql-fråga till databasen och där tar bort all info
- Vill man lägga till kurser gör man det via formuläret som först kontrollerar att namn är ifyllt och rensar bort eventuella taggar. Därefter skickas sql-fråga och databasen uppdateras


API: 
http://studenter.miun.se/~elku1901/dt173g/Moment5/rest/courses.php

Webbsida: 
http://studenter.miun.se/~elku1901/dt173g/Moment5/fetchAPI/pub/


För tillfället funkar inte uppdatera-funktionen. 