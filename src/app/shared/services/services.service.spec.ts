import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';
import {Card} from '../model/card.model';
import {of} from 'rxjs';
import {ServicesService} from './services.service';

describe('ServicesService', () => {
  let service: ServicesService;
  let httpClientMock: jest.Mocked<HttpClient>;

  const mockApiResponse = [
    {
      id: 1,
      title: 'Card 1',
      description: 'Descrição 1',
      img: 'imagem1.jpg',
      type: '1'
    },
    {
      id: 2,
      title: 'Card 2',
      description: 'Descrição 2',
      img: 'imagem2.jpg',
      type: '2'
    }
  ];

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn()
    } as any;

    TestBed.configureTestingModule({
      providers: [
        ServicesService,
        {provide: HttpClient, useValue: httpClientMock}
      ]
    });

    service = TestBed.inject(ServicesService);
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('deve fazer requisição GET e transformar resposta em Card[]', (done) => {
    httpClientMock.get.mockReturnValue(of(mockApiResponse));

    service.getAllCards().subscribe((cards: Card[]) => {
      expect(cards.length).toBe(2);
      expect(cards[0]).toEqual({
        ...mockApiResponse[0],
        type: 1,
        tagColor: 'tag-azul',
        tagName: 'Paisagem'
      });
      expect(cards[1]).toEqual({
        ...mockApiResponse[1],
        type: 2,
        tagColor: 'tag-vermelho',
        tagName: 'Flor'
      });
      done();
    });

    expect(httpClientMock.get).toHaveBeenCalledWith(' https://githubanotaai.github.io/frontend-interview-mock-data/cardlist.json ');
  });

  it('deve lidar com array vazio da API', () => {
    httpClientMock.get.mockReturnValue(of([]));

    service.getAllCards().subscribe((cards: Card[]) => {
      expect(cards).toEqual([]);
    });
  });

  it('deve converter o tipo para número e aplicar cores/nomes corretos', (done) => {
    const mockCard = [{...mockApiResponse[0], type: '3'}];
    httpClientMock.get.mockReturnValue(of(mockCard));

    service.getAllCards().subscribe(cards => {
      expect(cards[0].type).toBe(3);
      expect(cards[0].tagColor).toBe('tag-dourado');
      expect(cards[0].tagName).toBe('Pizza');
      done();
    });
  }, 200);
});
