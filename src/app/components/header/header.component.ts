import { Component } from '@angular/core';
import { CardService } from '../../service/card.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  movieName: string = '';
  isLoading: boolean = false; // Flag para mostrar o carregamento
  errorMessage: string = ''; // Mensagem de erro
  movies: any[] = []; // Lista para armazenar os filmes

  constructor(private cardService: CardService) {}

  async searchMovie(): Promise<void> {
    const cardElement = document.getElementById("card");

  // Garantir que cardElement não é nulo
  if (!cardElement) {
    console.error("Elemento com ID 'card' não encontrado.");
    return;
  }
   // Limpar o conteúdo do elemento
   cardElement.innerHTML = "";

    if (this.movieName.trim().length > 0) {
      this.isLoading = true; // Ativar o carregamento
      try {
        const response = await this.cardService.getCardsByName(this.movieName.trim()).toPromise();
        if (response && response.length > 0) {
          this.movies = response; // Armazenar a lista de filmes
          this.errorMessage = ''; // Limpar a mensagem de erro
          this.createCards(cardElement, this.movies); // Criar e renderizar os cards
        } else {
          this.errorMessage = 'Nenhum filme encontrado.';
        }
      } catch (error) {
        this.errorMessage = 'Erro ao buscar os filmes.';
        console.error(error); // Mostrar o erro no console
      } finally {
        this.isLoading = false; // Desativar o carregamento
      }
    }
  }

  /**
   * Cria e renderiza os componentes de card para cada item da lista.
   * @param container Elemento HTML onde os cards serão adicionados.
   * @param movies Lista de filmes a serem exibidos como cards.
   */
  private createCards(container: HTMLElement, movies: any[]): void {
    for (const movie of movies) {
      const cardComponent = this.createCardComponent(movie); // Criar um componente de card
      container.appendChild(cardComponent); // Adicionar o componente ao DOM
    }
  }

  /**
   * Cria um elemento de card a partir de um item do filme.
   * @param movie Dados do filme.
   * @returns Elemento HTML representando o card.
   */
  private createCardComponent(movie: any): HTMLElement {
    const cardDiv = document.createElement("div");
    cardDiv.className = "movie-card";

    const poster = document.createElement("img");
    poster.src = movie.Poster || "https://via.placeholder.com/300x450?text=No+Image";
    poster.alt = `${movie.Title} Poster`;

    const title = document.createElement("h3");
    title.textContent = movie.Title;

    const year = document.createElement("p");
    year.textContent = `Year: ${movie.Year}`;

    const plot = document.createElement("p");
    plot.textContent = `Plot: ${movie.Plot}`;

    const rating = document.createElement("p");
    rating.textContent = `IMDb Rating: ${movie.imdbRating || 'N/A'}`;

    // Adicionar os elementos ao card
    cardDiv.appendChild(poster);
    cardDiv.appendChild(title);
    cardDiv.appendChild(year);
    cardDiv.appendChild(plot);
    cardDiv.appendChild(rating);

    return cardDiv;
  }
}
