import React from 'react';
import api from '../utils/api.js';
import Card from './Card.js';


function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

    const [userName, setUserName] = React.useState("");
    const [userDescription, setuserDescription] = React.useState("");
    const [userAvatar, setuserAvatar] = React.useState("");
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getUserInfo()
            .then((res) => {
                setUserName(res.name)
                setuserDescription(res.about)
                setuserAvatar(res.avatar)
            })
            .catch((err) => {
                console.log(err);
            })
        api.getInitialCards()
            .then((res) => {
                setCards(res)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])



    return (
        <main className="content">
            <section className="profile">
                <img className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }} />
                <button onClick={onEditAvatar} className="profile__avatar-button" type="button" aria-label="Редактировать аватар"></button>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <p className="profile__description">{userDescription}</p>
                    <button onClick={onEditProfile} className="profile__edit-button" type="button" aria-label="Редактировать профиль"></button>
                </div>
                <button onClick={onAddPlace} className="profile__add-button" type="button" aria-label="кнопка добавить"></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card) => {
                        return (
                            <Card
                                card={card}
                                key={card._id}
                                onCardClick={onCardClick}
                            />
                        )
                    }
                    )}
                </ul>
            </section>
        </main>
    )
}

export default Main;

