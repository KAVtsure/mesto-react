import React from 'react';
import { useState, useEffect } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({name: '', about: ''});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

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

  function handleUpdateUser(name, about) {
    api.saveUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(newLink) {
    api.updateAvatar(newLink)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addCard(name, link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser} >
      <div className="base">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

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
    </CurrentUserContext.Provider>
  );
}

export default App;
