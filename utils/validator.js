// Судя по всему, этот файл является исправленной версией файла Validate.js,
// находящегося в корне проекта.

// И всё таки хочется перечисление
const REQUIRED_FIELD_ERR = 'Это обязательное поле';
const FIELD_VALUE_LENGTH_ERR = 'Должно быть от 2 до 30 символов';
const INVALID_LINK_ERR = 'Здесь должна быть ссылка';

// Почему PascalCase? Это же не класс
export default function Validate(form) {
  // Переменная объявлено далеко от использования
  const button = form.querySelector('button');

  function handleInput(event, errorContainer) {
    const input = event.target;
    // Лучше назвать "errMsg" - коротко и понятно
    let err = '';

    if (input.validity.valueMissing) {
      err = REQUIRED_FIELD_ERR;
    } else if (input.validity.tooShort || input.validity.tooLong) {
      err = FIELD_VALUE_LENGTH_ERR;
    } else if (input.validity.typeMismatch) {
      err = INVALID_LINK_ERR;
    }

    if (errorContainer) {
        errorContainer.textContent = err;
    }
    // До этого делаем проверку, чтобы не получить ошибку при разыменовании,
    // а затем стреляем себе в ногу?
    errorContainer.textContent = err;

    // активируем/деактивируем кнопку
    if (!input.validity.valid) {
      button.setAttribute('disabled', true);
      // И всё же константа
      button.classList.add('popup__button_disabled');
    } else {
      button.removeAttribute('disabled');
      button.classList.remove('popup__button_disabled');
    }
  }

  [...form.querySelectorAll('input')].forEach(input => {
    // Завязываться на "parentElement" - не лучшая затея. Вёрстка может поменяться
    const errorContainer = input.parentElement.querySelector('p');

    input.addEventListener('input', (event) => {
      handleInput(event, errorContainer);
    });
  });
}