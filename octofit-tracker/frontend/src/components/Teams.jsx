import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('/api/teams/').then(setTeams).catch((requestError) => setError(requestError.message)) }, [])
  return <CollectionPage title="Teams" description="Groups that keep momentum social." error={error}><div className="row g-3">{teams.map((team) => <article className="col-md-6" key={team._id}><div className="data-card h-100"><p className="eyebrow">TEAM</p><h2>{team.name}</h2><p>{team.motto}</p><strong>{team.members?.length || 0} members</strong></div></article>)}</div></CollectionPage>
}

function CollectionPage({ title, description, error, children }) { return <section><div className="page-heading"><p className="eyebrow">OCTOFIT / COMMUNITY</p><h1>{title}</h1><p className="lead-copy">{description}</p></div>{error ? <div className="alert alert-danger">{error}</div> : children}</section> }
export default Teams