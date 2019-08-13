export default class Popup {
    constructor(container) {
      this.container = container;
      this.popupContent = container.querySelector('.popup__data');
      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
    }
  
    open(content) {
      this.popupContent.appendChild(content);
      this.container.classList.add('popup_is-opened');
    }
  
    close() {
      this.popupContent.innerHTML = '';
      this.container.classList.remove('popup_is-opened');
    }
}
