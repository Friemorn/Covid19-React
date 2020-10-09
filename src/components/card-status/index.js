import React from 'react'
import './card.css'

function CardStatus(props) {
    return (
      <div className={`card ${props.color && props.color}`}>
        <div className="card-body">
          <h3 className="card-title text-center title">
            {props.title}
          </h3>
          <h3 className="card-subtitle mb-2 text-center">
            {props.TotalConfirmed}
          </h3>
        </div>
      </div>
    );
}

export default CardStatus
