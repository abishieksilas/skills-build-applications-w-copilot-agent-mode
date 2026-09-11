export async function fetchCollection(url) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Unable to load ${url} (${response.status})`)
  const payload = await response.json()
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload.results)) return payload.results
  if (Array.isArray(payload.items)) return payload.items
  if (Array.isArray(payload.data)) return payload.data
  return []
}