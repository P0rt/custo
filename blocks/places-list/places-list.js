import Card from '../place-card/place-card'

export default class PlacesList {
    // так же не хватает значений по умолчанию
    constructor(element, initialCards) {
      // то же самое про приватные члены класса
      this.element = element;
      this.cards = [];
  
      // можно получить ошибку о разыменовании null'а
      initialCards.forEach(this.addCard.bind(this));
  
      this.render();
    }
  
    // Стоит добавить значения по умолчанию
    addCard({ name, link }) {
      const { element } = new Card(name, link, this.element);
  
      this.cards.push(element);
      this.element.appendChild(element);
    }
  
    render() {
      this.reset();
  
      this.cards.forEach((card) => {
        this.element.appendChild(card);
      });
    }
  
    reset() {
      this.element.innerHTML = '';
    }
  }