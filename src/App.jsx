import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './App.css'
import { setGameSettings } from './store/actions/gameSettings'

export default function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/game')
  }

  return (
    <div className="game-start">
      <form className="form" onSubmit={handleSubmit}>
        <select id="option" className="select" required onChange={(e) => dispatch(setGameSettings({level: e.target.value}))}>
          <option value="" hidden>Kategoriyani tanlang</option>
          <option value="all">Barcha kategoriyalar </option>
          <option value="easy">Oson</option>
          <option value="medium">O'rta</option>
          <option value="hard">Qiyin</option>
        </select>
        <select className="select-time" required onChange={(e) => dispatch(setGameSettings({time: e.target.value}))}>
          <option hidden value="">Vaqtni tanlang</option>
          <option value={3}>3 min</option>
          <option value={5}>5 min</option>
          <option value={10}>10 min</option>
        </select>
        <button className="form-btn" type="submit">O'yin</button>
      </form>
    </div>
  )
}
