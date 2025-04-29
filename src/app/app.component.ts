/**
 * @description Componente principal da aplicação que gerencia a exibição e filtragem de cards
 */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Card} from './shared/model/card.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged, map, Subject, takeUntil, tap} from 'rxjs';
import {ServicesService} from './shared/services/services.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  /** Termo de busca atual */
  searchTerm: string = '';

  /** Array que armazena todos os cards */
  cards!: Card[];
  /** Array que armazena os cards filtrados */
  filteredCards: Card[] = [];
  /** Formulário reativo para o campo de busca */
  formGroup: FormGroup;
  /** Subject usado para gerenciar o ciclo de vida das inscrições */
  private _destroySubject = new Subject<void>();

  /**
   * @description Construtor do componente
   * @param fb Serviço FormBuilder para criar formulários reativos
   * @param service Serviço que gerencia as operações com cards
   */
  constructor(private readonly fb: FormBuilder, private readonly service: ServicesService) {
    this.formGroup = fb.group({
      searchTerm: ['']
    })
  }

  /**
   * @description Método do ciclo de vida que limpa as inscrições ao destruir o componente
   */
  ngOnDestroy(): void {
    if (!this._destroySubject.closed) {
      this._destroySubject.next();
      this._destroySubject.unsubscribe();
    }
  }

  /**
   * @description Método do ciclo de vida que inicializa o componente
   * Carrega os cards e configura a busca
   */
  ngOnInit(): void {
    this.service.getAllCards().pipe(
      tap((cards: Card[]) => {
        this.cards = cards;
        this.filteredCards = [...this.cards];
      }),
      takeUntil(this._destroySubject)
    ).subscribe();
    this.search();
  }

  /**
   * @description Remove um card tanto da lista filtrada quanto da lista original
   * @param id ID do card a ser removido
   */
  removeCard(id: number): void {
    this.filteredCards = this.filteredCards.filter(card => card.id !== id);
    this.cards = this.cards.filter(card => card.id !== id);
  }

  /**
   * @description Configura a funcionalidade de busca com debounce
   * Filtra os cards com base no termo de busca
   * @private
   */
  private search() {
    this.formGroup.get('searchTerm')?.valueChanges?.pipe(
      debounceTime(500),
      map(searchTerm => searchTerm?.trim()),
      distinctUntilChanged(),
      tap((searchTerm: string) => {
        if (!searchTerm) {
          this.filteredCards = [...this.cards];
          return;
        }
        const term = searchTerm.toLowerCase();
        this.filteredCards = this.cards.filter(card =>
          card.title.toLowerCase().includes(term.trim().toLowerCase()) ||
          card.description.toLowerCase().includes(term.trim().toLowerCase())
        );
      })
    ).subscribe();
  }
}
