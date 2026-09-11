import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('/api/activities/').then(setActivities).catch((requestError) => setError(requestError.message)) }, [])
  return <CollectionPage title="Activities" description="A clear read on recent effort." error={error}><div className="table-responsive"><table className="table align-middle activity-table"><thead><tr><th>Type</th><th>Duration</th><th>Calories</th><th>Completed</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id}><td><strong>{activity.type}</strong></td><td>{activity.durationMinutes} min</td><td>{activity.calories} kcal</td><td>{new Date(activity.completedAt).toLocaleDateString()}</td></tr>)}</tbody></table></div></CollectionPage>
}

function CollectionPage({ title, description, error, children }) { return <section><div className="page-heading"><p className="eyebrow">OCTOFIT / TRAINING LOG</p><h1>{title}</h1><p className="lead-copy">{description}</p></div>{error ? <div className="alert alert-danger">{error}</div> : children}</section> }
export default Activities