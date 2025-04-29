import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Card} from '../model/card.model';
import {map, Observable} from 'rxjs';

/**
 * Service responsável por gerenciar operações relacionadas a cartões.
 * Fornece métodos para buscar e processar dados de cartões.
 */
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  /**
   * Construtor do serviço.
   * @param http - Instância do HttpClient para realizar requisições HTTP.
   */
  constructor(private readonly http: HttpClient) {
  }

  /**
   * Obtém todos os cartões a partir de uma API externa.
   *
   * @returns Um Observable contendo uma lista de objetos do tipo Card.
   * O método realiza um mapeamento nos dados recebidos para adicionar
   * propriedades calculadas como `tagColor` e `tagName`.
   */
  public getAllCards(): Observable<Card[]> {
    return this.http.get<Card[]>(' https://githubanotaai.github.io/frontend-interview-mock-data/cardlist.json ')
      .pipe(
        map(res => {
          return res.map((card: Card) => {
            return {
              ...card,
              type: Number(card.type), // Converte o tipo para número.
              tagColor: Card.getTagColor(Number(card.type)), // Obtém a cor da tag com base no tipo.
              tagName: Card.getTagName(Number(card.type)), // Obtém o nome da tag com base no tipo.
            };
          });
        })
      );
  }
}
