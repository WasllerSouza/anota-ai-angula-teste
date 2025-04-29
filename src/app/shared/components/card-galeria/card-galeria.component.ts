/**
 * @description Componente responsável por exibir e gerenciar um card individual na galeria
 */
import {Component, Input, output,} from '@angular/core';
import {Card} from '../../model/card.model';

@Component({
  selector: 'app-card-galeria',
  standalone: false,
  templateUrl: './card-galeria.component.html',
})
export class CardGaleriaComponent {
  /**
   * @description variavel de entrada que recebe os dados do card a ser exibido
   * @requires Card - Objeto contendo as informações do card
   */
  @Input() card: Card;
  /**
   * @description Evento de saída que emite o ID do card quando ele é removido
   * @emits number - ID do card removido
   */
  public cardChange = output<number>();

  constructor() {
  }

  /**
   * @description Remove o card atual emitindo seu ID para o componente pai
   * @param {number} id - ID do card a ser removido
   */
  public removeCard(id: number): void {
    this.cardChange.emit(id);
  }
}
