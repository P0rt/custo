export default class PlaceCard {
    // стоит использовать дефолтные значения для аргуметов
    constructor(name, link, parentElement) {
      // Все приватные (закрытые) члены класса должны по соглашению начинаться с символа
      // подчёркивания, например: this._name, this._create(), etc.
      // Для публичных полей нужно использовать сеттеры и геттеры
      this.name = name;
      this.link = link;
      this.parentElement = parentElement;
      this.element = this.create();
      this.likeElem = this.element.querySelector('button.place-card__like-icon');
      this.removeElem = this.element.querySelector('button.place-card__delete-icon');
  
      this.like = this.like.bind(this);
      this.remove = this.remove.bind(this);
  
      this.likeElem.addEventListener('click', this.like);
      this.removeElem.addEventListener('click', this.remove);
    }
  
    // Хорошо бы разделить код метода на создание и инициализацию отдельных
    // элементов. Сейчас всё несколько смешалось в кучу.
    create() {
      const cardContainer = document.createElement('div');
      const cardImageContainer = document.createElement('div');
      const cardDescContainer = document.createElement('div');
      const h3 = document.createElement('h3');
      const deleteButton = document.createElement('button');
      const likeButton = document.createElement('button');
  
      cardContainer.classList.add('place-card');
      cardImageContainer.classList.add('place-card__image');
      cardImageContainer.style.backgroundImage = `url(${this.link})`;
      cardDescContainer.classList.add('place-card__description');
      h3.classList.add('place-card__name');
      h3.textContent = this.name;
      deleteButton.classList.add('place-card__delete-icon');
      likeButton.classList.add('place-card__like-icon');
  
      cardDescContainer.appendChild(h3);
      cardDescContainer.appendChild(likeButton);
      cardImageContainer.appendChild(deleteButton);
      cardContainer.appendChild(cardImageContainer);
      cardContainer.appendChild(cardDescContainer);
  
      return cardContainer;
    }
  
    like() {
      this.likeElem.classList.toggle('place-card__like-icon_liked');
    }
  
    remove() {
      // Завязывать на "parentElement" - не очень хорошо
      this.parentElement.removeChild(this.element);
    }
  }