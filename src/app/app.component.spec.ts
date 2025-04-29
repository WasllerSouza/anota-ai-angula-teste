import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {ServicesService} from './shared/services/services.service';
import {of} from 'rxjs';
import {Card} from './shared/model/card.model';
import {HttpClient} from '@angular/common/http';
import {CardGaleriaComponent} from './shared/components/card-galeria/card-galeria.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let servicesMock: jest.Mocked<ServicesService>;
  let httpClientMock: jest.Mocked<HttpClient>;

  const mockCards: Card[] = [
    {
      id: 1,
      title: 'Teste Card',
      description: 'Descrição teste',
      img: 'imagem.jpg',
      type: 1,
      tagName: 'azul',
      tagColor: 'azul',
    },
    {
      id: 2,
      title: 'Outro Card',
      description: 'Outra descrição',
      img: 'imagem.jpg',
      type: 1,
      tagName: 'azul',
      tagColor: 'azul',
    }
  ];

  beforeEach(async () => {
    httpClientMock = {
      get: jest.fn()
    } as any;

    servicesMock = {
      getAllCards: jest.fn().mockReturnValue(of(mockCards)),
      http: httpClientMock
    } as any;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AppComponent, CardGaleriaComponent],
      providers: [
        FormBuilder,
        {provide: ServicesService, useValue: servicesMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    // Provide a mock value for the required input
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar os cards na inicialização', () => {
    expect(servicesMock.getAllCards).toHaveBeenCalled();
    expect(component.cards).toEqual(mockCards);
    expect(component.filteredCards).toEqual(mockCards);
  });

  it('deve filtrar cards por título após debounce', () => {
    jest.useFakeTimers();
    component.formGroup.get('searchTerm')?.setValue('Teste Card');

    jest.advanceTimersByTime(501);


    expect(component.filteredCards.length).toBeGreaterThanOrEqual(1);
    expect(component.filteredCards[0].title).toBe('Teste Card');
  });

  it('deve filtrar cards por descrição após debounce', () => {
    jest.useFakeTimers();
    component.formGroup.get('searchTerm')?.setValue('Outra descrição');

    jest.advanceTimersByTime(501);

    expect(component.filteredCards.length).toBeGreaterThanOrEqual(1);
    expect(component.filteredCards[0].description).toBe('Outra descrição');
  });

  it('deve mostrar todos os cards quando busca está vazia', () => {
    jest.useFakeTimers();
    component.formGroup.get('searchTerm')?.setValue('');

    jest.advanceTimersByTime(501);

    expect(component.filteredCards).toEqual(mockCards);
  });

  it('deve ignorar caso sensível na busca', () => {
    jest.useFakeTimers();
    component.formGroup.get('searchTerm')?.setValue('TESTE CARD');

    jest.advanceTimersByTime(501);

    expect(component.filteredCards.length).toBeGreaterThanOrEqual(1);
    expect(component.filteredCards[0].title).toBe('Teste Card');
  });

  it('deve remover card por ID das listas filtrada e original', () => {
    component.removeCard(1);

    expect(component.cards.length).toBeGreaterThanOrEqual(1);
    expect(component.filteredCards.length).toBeGreaterThanOrEqual(1);
    expect(component.cards[0].id).toBe(2);
    expect(component.filteredCards[0].id).toBe(2);
  });

  it('deve limpar as inscrições no ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['_destroySubject'], 'next');
    const unsubscribeSpy = jest.spyOn(component['_destroySubject'], 'unsubscribe');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('não deve chamar next/complete se subject já estiver fechado', () => {
    component.ngOnDestroy(); // fecha o subject
    fixture.detectChanges();
    const nextSpy = jest.spyOn(component['_destroySubject'], 'next');
    const unsubscribeSpy = jest.spyOn(component['_destroySubject'], 'unsubscribe');

    component.ngOnDestroy();

    expect(nextSpy).not.toHaveBeenCalled();
    expect(unsubscribeSpy).not.toHaveBeenCalled();
  });
});
