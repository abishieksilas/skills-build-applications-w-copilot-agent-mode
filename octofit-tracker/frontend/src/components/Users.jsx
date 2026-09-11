import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const usersEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection(usersEndpoint).then(setUsers).catch((requestError) => setError(requestError.message)) }, [])
  return <CollectionPage title="Users" description="People building consistent habits." error={error}><div className="row g-3">{users.map((user) => <article className="col-md-6 col-xl-4" key={user._id}><div className="data-card h-100"><span className="avatar" style={{ backgroundColor: user.avatarColor }}>{user.displayName?.charAt(0)}</span><h2>{user.displayName}</h2><p className="muted">@{user.username}</p><p>{user.email}</p></div></article>)}</div></CollectionPage>
}

function CollectionPage({ title, description, error, children }) { return <section><div className="page-heading"><p className="eyebrow">OCTOFIT / DIRECTORY</p><h1>{title}</h1><p className="lead-copy">{description}</p></div>{error ? <div className="alert alert-danger">{error}</div> : children}</section> }
export default Users