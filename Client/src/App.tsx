import './App.css'
import {Routes,Route} from 'react-router-dom'
import QuizHome from './pages/QuizHome/QuizHome'
import QuizQuestions from './pages/QuizQuestions/QuizQuestions'
import UserAuth from './pages/UserAuth/UserAuth'
import LeaderBoard from './pages/LeaderBoard/LeaderBoard'

function App() {
 

  return (
    <>
    <Routes>
      <Route path='/' element={<QuizHome />} />
      <Route path='/quiz/:level' element={<QuizQuestions />} />
      <Route path='/auth' element={<UserAuth />} />
      <Route path='/home' element={<QuizHome />} />
      <Route path='/leaderboard' element={<LeaderBoard />} />
    </Routes>
    </>
  )
}

export default App
