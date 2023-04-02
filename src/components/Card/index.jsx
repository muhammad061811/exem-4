import React from 'react';

const Card = ({
    image,
    success = false,
    ...other
}) => {
    return (
        <li {...other}>
            <div className="card">
                <img className="card-img" src={image} />
                <img className={`card-img__success ${success ? 'd-block' : ''}`} src="./images/success.png"  />
                <img className="card-img__error" src="./images/error-img.png" />
            </div>
        </li>
    );
}

export default Card;
