import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { CardsComponent } from '../components/card/card.component';
import { map } from 'rxjs/operators';  // Importando o operador 'map'


interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface ApiResponse {
  Search: Movie[]; // Lista de filmes retornados
  totalResults: string; // Total de resultados encontrados
  Response: string; // Indica se a resposta foi bem-sucedida ("True" ou "False")
}


interface MovieResponse {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
  Error:string;
}

interface Rating {
  Source: string;
  Value: string;
}
@Injectable({
  providedIn: 'root'
})


export class CardService {
  private apiUrl = 'https://www.omdbapi.com/'; // API base URL
  private apiKey = environment.apiKey; // Sua chave de API

  constructor(private http: HttpClient) { }



  getCards(): Observable<ApiResponse> {
    const url = `${this.apiUrl}?apikey=${this.apiKey}&s=Movie`;
    return this.http.get<ApiResponse>(url).pipe(
      map(response => response)
    );
  }



   // Função para buscar múltiplos filmes filtrando por nome
   getCardsByName(searchTerm:string): Observable<MovieResponse[]> {
    const url = `${this.apiUrl}?apikey=${this.apiKey}&t=${searchTerm}`;
    console.log(typeof(this.http.get<any>(url)))
    return this.http.get<any>(url).pipe(
      map(response => {
        // Transformando o objeto em um array, caso a resposta seja um objeto
        if (response && response.Title) {
          return [response];  // Colocando o objeto em um array
        } else {
          return [];  // Caso não haja dados, retornamos um array vazio
        }
      })
    );
  }

   // Função para buscar múltiplos filmes filtrando por id
   getCardsById(ident:string): Observable<MovieResponse[]> {
    const url = `${this.apiUrl}?apikey=${this.apiKey}&i=${ident}`;
    console.log(typeof(this.http.get<any>(url)))
    return this.http.get<any>(url).pipe(
      map(response => {
        // Transformando o objeto em um array, caso a resposta seja um objeto
        if (response && response.Title) {
          return [response];  // Colocando o objeto em um array
        } else {
          return [];  // Caso não haja dados, retornamos um array vazio
        }
      })
    );
  }
}

