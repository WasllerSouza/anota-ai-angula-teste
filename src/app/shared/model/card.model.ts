import {TAG, TAG_COLOR} from '../const/tag.const';

/**
 * Classe que representa um cartão.
 * Contém informações como título, descrição, imagem, tipo e propriedades relacionadas a tags.
 */
export class Card {
  /** Identificador único do cartão. */
  id: number;

  /** Título do cartão. */
  title: string;

  /** Descrição do cartão. */
  description: string;

  /** URL da imagem associada ao cartão. */
  img: string;

  /** Tipo do cartão, representado como um número. */
  type: number;

  /** Nome da tag associada ao tipo do cartão. */
  tagName: string;

  /** Cor da tag associada ao tipo do cartão. */
  tagColor: string;

  /**
   * Obtém o nome da tag com base no tipo do cartão.
   *
   * @param type - O tipo do cartão (deve estar entre 1 e 3).
   * @returns O nome da tag correspondente ao tipo ou `undefined` se o tipo for inválido.
   */
  public static getTagName(type: number): string {
    if (type < 1 || type > 3) return undefined;
    return Object.keys(TAG).find(key => TAG[key] === type);
  }

  /**
   * Obtém a cor da tag com base no tipo do cartão.
   *
   * @param type - O tipo do cartão (deve estar entre 1 e 3).
   * @returns A classe CSS correspondente à cor da tag ou `undefined` se o tipo for inválido.
   */
  public static getTagColor(type: number): string {
    if (type < 1 || type > 3) return undefined;
    return `tag-${Object.keys(TAG_COLOR).find(key => TAG_COLOR[key] === type)}`;
  }
}
