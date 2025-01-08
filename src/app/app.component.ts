import { Component, OnInit } from '@angular/core';
import { CardService } from './service/card.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  cards: any[] = []; // Array para armazenar os dados completos
  poster: string = '';

  constructor(private cardService: CardService) { }

  async ngOnInit(): Promise<void> {
    try {
      const response = await firstValueFrom(this.cardService.getCards());

      if (response && response.Search) {
        // Inicializar um array para armazenar os detalhes dos filmes
        const detailedCards: any[] = [];

        // Usar um loop para buscar os detalhes de cada filme
        for (const movie of response.Search) {
          try {
            const detailedMovie = await firstValueFrom(this.cardService
              .getCardsById(movie.imdbID))

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

        try {
          const response = await firstValueFrom(this.cardService.getPoster())
          if (response && response.Poster) {
            const detailedCards: any[] = [];
            detailedCards.push(response.Poster);
            this.poster = detailedCards[0];
            console.log('Poster', this.poster)
          }
        } catch (err) {
          console.error(
            'A propriedade Search não foi encontrada no response:',
            response
          );
        }

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
