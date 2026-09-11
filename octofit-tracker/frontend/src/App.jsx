import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/"><img src="/octofitapp-small.png" alt="Octofit Tracker" /><span>Octofit Tracker</span></NavLink>
        <nav className="main-nav" aria-label="Primary navigation">
          <NavLink to="/users">Users</NavLink><NavLink to="/teams">Teams</NavLink><NavLink to="/activities">Activities</NavLink><NavLink to="/leaderboard">Leaderboard</NavLink><NavLink to="/workouts">Workouts</NavLink>
        </nav>
      </header>
      <main className="app-main"><Routes><Route path="/" element={<Dashboard />} /><Route path="/users" element={<Users />} /><Route path="/teams" element={<Teams />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/workouts" element={<Workouts />} /></Routes></main>
    </div>
  )
}

function Dashboard() {
  return <section className="dashboard-intro"><p className="eyebrow">OCTOFIT / DAILY OPERATIONS</p><h1>Make the next session count.</h1><p className="lead-copy">Track the people, movement, teams, and training plans powering your fitness community.</p><div className="dashboard-links"><NavLink className="btn btn-dark" to="/activities">View activity feed</NavLink><NavLink className="btn btn-outline-dark" to="/workouts">Browse workouts</NavLink></div></section>
}

export default App
