import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CardGaleriaComponent} from './card-galeria.component';
import {Card} from '../../model/card.model';

describe('CardGaleriaComponent', () => {
  let component: CardGaleriaComponent;
  let fixture: ComponentFixture<CardGaleriaComponent>;

  const mockCard: Card = {
    id: 1,
    title: 'Teste Card',
    description: 'Descrição teste',
    img: 'imagem.jpg',
    type: 1,
    tagName: 'Paisagem',
    tagColor: 'tag-azul',
  } as Card;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardGaleriaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CardGaleriaComponent);
    component = fixture.componentInstance;
    component.card = mockCard;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve retornar os dados do card através do getter', () => {
    expect(component.card).toEqual(mockCard);
  });

  it('deve emitir o ID do card quando removeCard for chamado', () => {
    const emitSpy = jest.spyOn(component.cardChange, 'emit');

    component.removeCard(mockCard.id);

    expect(emitSpy).toHaveBeenCalledWith(mockCard.id);
  });

  it('deve emitir evento quando removeCard for chamado com ID válido', () => {
    const emitSpy = jest.spyOn(component.cardChange, 'emit');

    component.removeCard(mockCard.id);

    expect(emitSpy).toHaveBeenCalledWith(mockCard.id);
    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('deve refletir múltiplas atualizações no _card', () => {
    const novoCard1: Card = {...mockCard, id: 2, title: 'Card 1'};
    const novoCard2: Card = {...mockCard, id: 3, title: 'Card 2'};

    component.card = (novoCard1);
    fixture.detectChanges();
    expect(component.card).toEqual(novoCard1);

    component.card = (novoCard2);
    fixture.detectChanges();
    expect(component.card).toEqual(novoCard2);
  });

  it('deve inserir um card com o type inesistente', () => {
    const novoCard1: Card = {...mockCard, id: 4, title: 'Card 1', type: 4};
    novoCard1.tagColor = Card.getTagColor(novoCard1.type);
    novoCard1.tagName = Card.getTagName(novoCard1.type);

    component.card = (novoCard1);
    fixture.detectChanges();
    expect(component.card.tagName).toBeUndefined();
    expect(component.card.tagColor).toBeUndefined();
  });
});
