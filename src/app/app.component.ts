import { Component, OnInit } from '@angular/core';
import { CardService } from './service/card.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  cards: any[] = []; // Array para armazenar os dados completos

  constructor(private cardService: CardService) {}

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.cardService.getCards().toPromise();
      if (response && response.Search) {
        // Inicializar um array para armazenar os detalhes dos filmes
        const detailedCards: any[] = [];

        // Usar um loop para buscar os detalhes de cada filme
        for (const movie of response.Search) {
          try {
            const detailedMovie = await this.cardService
              .getCardsById(movie.imdbID)
              .toPromise();
            detailedCards.push(detailedMovie); // Adicionar o filme detalhado ao array

          } catch (error) {
            console.error(
              `Erro ao buscar detalhes para o filme com ID ${movie.imdbID}:`,
              error
            );
          }
        }

        // Atualizar o array cards com os dados detalhados
        this.cards = detailedCards;
        console.log(this.cards);
      } else {
        console.error(
          'A propriedade Search não foi encontrada no response:',
          response
        );
      }
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    }
  }
}
