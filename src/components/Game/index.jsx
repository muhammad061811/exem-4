import {  useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import useCountDown from "../../hooks/useCountDown";
import Card from "../Card";
import { roadSymbol } from "../signs";


const Game = () => {
    const settings = useSelector(state => state.gameSettings)
    const prevItem = useRef()
    const navigate = useNavigate()
    const [cards, setCards] = useState(roadSymbol)
    const [currentItem, setCurrentItem] = useState({})
    const [score, setScore] = useState({})
    const [selectedItems, setSelectedItems] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const time = useCountDown(parseInt(settings?.time) * 60)

    useEffect(() => {
        console.log(prevItem.current === currentItem?.id);
        if (score?.incorrect?.length === 5 || score?.correct?.length === cards?.length) {
            setIsOpen(true)
        }
        if (prevItem.current === currentItem?.id) {
            let cards = []
            switch (settings?.level) {
                case 'hard':  cards = roadSymbol; break;
                case 'medium':  cards = roadSymbol?.slice(0, 50); break;
                case 'easy':  cards = roadSymbol?.slice(0, 30); break;
            }
            const arr = cards?.filter(card => !selectedItems?.includes(card?.id))
            const index = Math.floor(Math.random() * (arr?.length - 1))
            setCurrentItem(arr?.[index])
            setSelectedItems(state => [...(state || []), arr?.[index]?.id])
        }
    }, [score, settings, cards?.length, currentItem?.id, selectedItems])

    useEffect(() => {
        switch (settings?.level) {
            case 'hard': return setCards(roadSymbol);
            case 'medium': return setCards(roadSymbol?.slice(0, 50));
            case 'easy': return setCards(roadSymbol?.slice(0, 30));
            default: return setCards(roadSymbol)
        }
    }, [settings])

    useEffect(() => {
        if(time <= 0) {
            setIsOpen(true)
        }
    }, [time])

    const handleClick = (e, id) => {
        if (id === currentItem?.id) {
            setScore(state => ({
                ...state,
                correct: [...(state?.correct || []), id]
            }))
            prevItem.current = id
        } else {
            e.target.classList.add('error')
            setTimeout(() => {
                e.target.classList.remove('error')
            }, 100)
            setScore(state => ({
                ...state,
                incorrect: [...(state?.incorrect || []), id]
            }))
        }
    }

    if (!settings?.time || !settings?.level) {
        return <Navigate to='/' />
    } else {
        return (
            <>
                {
                    isOpen && (
                        <div className="show-modal modal">
                            <div className="modal-card">
                                <h2 className="modal-title"></h2>
                                <p className="modal-count">Tog'ri topgan belgilar soni: {score?.correct?.length || 0}</p>
                                <p className="modal-error">No togri topgan belgilar soni: {score?.incorrect?.length || 0}</p>
                                <ul className="modal-list"></ul>
                                <button className="modal-btn" onClick={() => navigate('/')}>ok</button>
                                <button className="modal-close" onClick={() => navigate('/')}>X</button>
                            </div>
                        </div>
                    )
                }
                <header className="show-modal">
                    <div className="container" >
                        <div className="header">
                            <div className="header-wrapper">
                                <p>Time: <time className="timer">{Math.floor(time / 60)}:{time - (60 * Math.floor(time / 60))}</time></p>
                                <h1 className="title">{currentItem?.symbol_title}</h1>
                                <p>Count: <span className="count"> </span></p>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="show-modal">
                    <section >
                        <div className="container">
                            <ul className="list">
                                {
                                    cards?.length > 0 && cards?.map(el => (
                                        <Card
                                            key={el.id}
                                            image={el.symbol_img}
                                            success={score?.correct?.includes(el.id)}
                                            onClick={(e) => handleClick(e, el.id)}
                                        />
                                    ))
                                }
                            </ul>
                        </div>
                    </section>
                </main>
            </>
        );
    }
}

export default Game;
