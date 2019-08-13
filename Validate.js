// Главный вопрос - зачем этот модуль? Как минимум сейчас он нигде не используется.

// Функции именуются в camelCase нотации.
function Validate() {
  /* Элементы */

  // Объявление переменной лучше делать в непосредственной близости
  // от её использования.
  const popupButtonAdd = document.querySelector('.popup__button');
  const popupButtonEdit = document.querySelector('.popup-edit__button');

  /* Тексты ошибок */

  // Константы стоит перенести в самое начало.
  // Более того, стоит объединить их в перечисление.
  const REQUIRED_FIELD_ERR = 'Это обязательное поле';
  const FIELD_VALUE_LENGTH_ERR = 'Должно быть от 2 до 30 символов';
  const INVALID_LINK_ERR = 'Здесь должна быть ссылка';

  /* Функции */

  // Нет никакой необходимости делать эту и следующую функции внутренними
  // Достаточно их просто не экспортировать.
  //
  // Кроме того, у этих функций повторяется бОльшая часть,
  // поэтому стоит провести рефакторинг и просто переиспользовать.
  function validateAdd(event) {
    const { name, link } = event.currentTarget;
    const [nameErr, linkErr] = document.querySelectorAll('.popup__error');

    // проверяем имя
    if (event.target.name === 'name') {
      let err = '';

      if (name.validity.valueMissing) {
        err = REQUIRED_FIELD_ERR;
      } else if (name.validity.tooShort || name.validity.tooLong) {
        err = FIELD_VALUE_LENGTH_ERR;
      }

      nameErr.textContent = err;
    }

    // проверяем ссылку
    if (event.target.name === 'link') {
      let err = '';

      if (link.validity.valueMissing) {
        err = REQUIRED_FIELD_ERR;
      } else if (link.validity.typeMismatch) {
        err = INVALID_LINK_ERR;
      }

      linkErr.textContent = err;
    }

    // активируем/деактивируем кнопку
    if (!name.validity.valid || !link.validity.valid) {
      popupButtonAdd.setAttribute('disabled', true);
      // служебный класс, который является хорошим кандидатом для константы
      popupButtonAdd.classList.add('popup__button_disabled');
    } else {
      popupButtonAdd.removeAttribute('disabled');
      popupButtonAdd.classList.remove('popup__button_disabled');
    }
  }

  function validateEdit(event) {
    const { name, job } = event.currentTarget.elements;
    const [nameErr, linkErr] = document.querySelectorAll('.popup-edit__error');

    // проверяем имя
    if (event.target.name === 'name') {
      let err = '';

      if (name.validity.valueMissing) {
        err = REQUIRED_FIELD_ERR;
      } else if (name.validity.tooShort || name.validity.tooLong) {
        err = FIELD_VALUE_LENGTH_ERR;
      }

      nameErr.textContent = err;
    }

    // проверяем ссылку
    if (event.target.name === 'job') {
      let err = '';

      if (job.validity.valueMissing) {
        err = REQUIRED_FIELD_ERR;
      } else if (job.validity.tooShort || job.validity.tooLong) {
        err = FIELD_VALUE_LENGTH_ERR;
      }

      linkErr.textContent = err;
    }

    // активируем/деактивируем кнопку
    if (!name.validity.valid || !job.validity.valid) {
      popupButtonEdit.setAttribute('disabled', true);
      popupButtonEdit.classList.add('popup-edit__button_disabled');
    } else {
      popupButtonEdit.removeAttribute('disabled');
      popupButtonEdit.classList.remove('popup-edit__button_disabled');
    }
  }

  /* Обработчики */

  document.forms.new.addEventListener('input', validateAdd);
  document.forms.edit.addEventListener('input', validateEdit);
};

// Вызывать валидацию непосредственно в модуле - неправильно с точки зрения логики,
// т.к. он не является управляющей стороной.
Validate();

// Из модуля экспортируется (и должна экспортироваться) одна и только одна функция,
// поэтому стоит использовать "export default".
export { Validate };
// Не хватает пустой строки в конце файла - https://unix.stackexchange.com/a/18789