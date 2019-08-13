// Экспорт потерялся
class PopupClose {
    constructor(container, {onClick}) {
      this.container = container;
      if (typeof onClick === 'function') {
        container.addEventListener('click', onClick)
      }
    }
}