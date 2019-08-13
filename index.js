import Validate from './utils/validator';
import { initialCards } from './data';

// Неиспользуемый импорт
import PlaceCard from './blocks/place-card/place-card';
import PlacesList from './blocks/places-list/places-list';
import Popup from './blocks/popup/popup';
import PopupClose  from './blocks/popup/__close/popup__close';

import './pages/style.css';

/* Элементы */
const addPopupOpenButton = document.querySelector('.user-info__button');
const addPopupContent = document.querySelector('.popup-add__data');
const editPopupOpenButton = document.querySelector('.user-info__edit');
const editPopupContent = document.querySelector('.popup-edit__data');
const imagePopupContent = document.querySelector('.popup-image__data');
const cardsContainer = document.querySelector('.places-list.root__section');

/* Начальные карточки */

const cardList = new PlacesList(cardsContainer, initialCards);

const popup = new Popup(document.querySelector('.popup'));
// Неиспользуемая переменная
const popupClose = new PopupClose(document.querySelector('.popup__close'), {
  onClick: popup.close
});

/* Обработчики событий */

addPopupOpenButton.addEventListener('click', function () {
  popup.open(addPopupContent);
});

editPopupOpenButton.addEventListener('click', function () {
  popup.open(editPopupContent);
  const currentName = document.querySelector('.user-info__name').textContent;
  const currentJob = document.querySelector('.user-info__job').textContent;
  const { name, job } = document.forms.edit.elements;

  name.value = currentName;
  job.value = currentJob;
});

cardsContainer.addEventListener('click', function () {
  if (!event.target.classList.contains('place-card__image')) {
    return;
  }

  const src = event.target.style.backgroundImage.split('"')[1];

  imagePopupContent.querySelector('.popup-image__image').src = src;
  popup.open(imagePopupContent);
});

document.forms.new.addEventListener('submit', function (event) {
  event.preventDefault();

  cardList.addCard({
    name: event.currentTarget.elements.name.value,
    link: event.currentTarget.elements.link.value
  });

  event.currentTarget.reset();
  popup.close();
});

document.forms.edit.addEventListener('submit', function (event) {
  event.preventDefault();

  const nameEl = document.querySelector('.user-info__name');
  const jobEl = document.querySelector('.user-info__job');
  const { name, job } = event.currentTarget.elements;

  nameEl.textContent = name.value;
  jobEl.textContent = job.value;

  event.currentTarget.reset();
  popup.close();
});

Validate(document.forms.new);
Validate(document.forms.edit);
