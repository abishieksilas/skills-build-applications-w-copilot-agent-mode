import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const workoutsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection(workoutsEndpoint).then(setWorkouts).catch((requestError) => setError(requestError.message)) }, [])
  return <CollectionPage title="Workouts" description="Focused plans for the next good session." error={error}><div className="row g-3">{workouts.map((workout) => <article className="col-md-6 col-xl-4" key={workout._id}><div className="data-card h-100"><span className="badge text-bg-warning mb-3">{workout.difficulty}</span><h2>{workout.name}</h2><p className="muted">{workout.category} / {workout.durationMinutes} min</p><ul>{workout.exercises?.map((exercise) => <li key={exercise}>{exercise}</li>)}</ul></div></article>)}</div></CollectionPage>
}

function CollectionPage({ title, description, error, children }) { return <section><div className="page-heading"><p className="eyebrow">OCTOFIT / TRAINING LIBRARY</p><h1>{title}</h1><p className="lead-copy">{description}</p></div>{error ? <div className="alert alert-danger">{error}</div> : children}</section> }
export default Workouts