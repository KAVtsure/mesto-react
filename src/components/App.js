import React from 'react';
import { useState } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsImagePopupOpen(false)
    setSelectedCard({})
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImagePopupOpen(true)
  }

  return (
    <div className="base">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        name="profile-edit"
        title="Редактировать профиль"
        textButton="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input type="text"
          className="popup__field popup__field_name"
          name="profile_name"
          id="profile_name"
          placeholder="Введите ваше имя"
          required
          minLength="2"
          maxLength="40" />
        <span className="popup__field-error popup__field-error_visible" id="profile_name-error"></span>
        <input type="text"
          className="popup__field popup__field_description"
          name="profile__description"
          id="profile__description"
          placeholder="Введите ваш род занятий"
          required
          minLength="2"
          maxLength="200" />
        <span className="popup__field-error popup__field-error_visible" id="profile__description-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="element-edit"
        title="Новое место"
        textButton="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input type="text"
          className="popup__field popup__field_place"
          name="place_name"
          id="place_name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30" />
        <span className="popup__field-error popup__field-error_visible" id="place_name-error"></span>
        <input type="url"
          className="popup__field popup__field_image-link"
          name="image-link"
          id="image-link"
          placeholder="Ссылка на картинку"
          required />
        <span className="popup__field-error popup__field-error_visible" id="image-link-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="avatar-edit"
        title="Обновить аватар"
        textButton="Создать"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input type="url"
          className="popup__field popup__field_avatar-link"
          name="avatar-link"
          id="avatar-link"
          placeholder="Ссылка на картинку"
          required />
        <span className="popup__field-error popup__field-error_visible" id="avatar-link-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="confirmation"
        title="Вы уверены?"
        textButton="Да"
        onClose={closeAllPopups}
      >
      </PopupWithForm>

      <ImagePopup
        onClose={closeAllPopups}
        card={selectedCard}
        isOpen={isImagePopupOpen}
      />
    </div>
  );
}

export default App;
