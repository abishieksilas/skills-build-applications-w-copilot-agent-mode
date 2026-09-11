import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('leaderboard').then(setEntries).catch((requestError) => setError(requestError.message)) }, [])
  return <CollectionPage title="Leaderboard" description="The month at a glance." error={error}><div className="leaderboard-list">{[...entries].sort((first, second) => first.rank - second.rank).map((entry) => <article className="leaderboard-row" key={entry._id}><span className="rank">{String(entry.rank).padStart(2, '0')}</span><div><strong>{entry.user}</strong><span className="muted">{entry.period}</span></div><strong>{entry.points.toLocaleString()} pts</strong></article>)}</div></CollectionPage>
}

function CollectionPage({ title, description, error, children }) { return <section><div className="page-heading"><p className="eyebrow">OCTOFIT / COMPETITION</p><h1>{title}</h1><p className="lead-copy">{description}</p></div>{error ? <div className="alert alert-danger">{error}</div> : children}</section> }
export default Leaderboard