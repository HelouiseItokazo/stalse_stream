import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: false,

  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})

export class CardsComponent {
  @Input() Poster: string = '';
  @Input() Title: string = '';
  @Input() Year: string = '';
  @Input() Writer: string = '';
  @Input() Language: string = '';
}
