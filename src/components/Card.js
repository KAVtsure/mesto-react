import React from 'react';


function Card({ card, onCardClick }) {

    function handleClick() {
        onCardClick(card);
    }

    return (
        <li className="element">
            <button className="element__delete" type="button" aria-label="удалить фотографию"></button>
            <img className="element__image" src={card.link} alt={card.name} onClick={handleClick} />
            <div className="element__description">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-section">
                    <button className="element__like" type="button" aria-label="оценка фотографии"></button>
                    <p className="element__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )

}

export default Card;
