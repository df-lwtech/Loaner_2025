import React, { useEffect, useState } from 'react'

export default function App() {
  const [message, setMessage] = useState('Loading...')
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name: '', description: '' })
  const [showItems, setShowItems] = useState(false)
  const [itemsLoading, setItemsLoading] = useState(false)

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.ok ? res.json() : Promise.reject(res.statusText))
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('Could not reach backend'))
  }, [])

  async function handleToggleItems() {
    if (!showItems) {
      setItemsLoading(true)
      try {
        const res = await fetch('/api/items')
        if (!res.ok) throw new Error('Failed to load items')
        const data = await res.json()
        setItems(data)
      } catch (e) {
        setItems([])
      } finally {
        setShowItems(true)
        setItemsLoading(false)
      }
    } else {
      setShowItems(false)
    }
  }

  return (
    <div className="app">
      <h1>Loaner React Frontend</h1>
      <p>Backend says: {message}</p>

      <button onClick={handleToggleItems} disabled={itemsLoading}>
        {showItems ? 'Hide Items' : (itemsLoading ? 'Loading…' : 'Show Items')}
      </button>
      {showItems && (
      <section>
        <h2>Items</h2>
        {items.length === 0 ? (
          <p>No items yet.</p>
        ) : (
          <ul>
            {items.map((it) => (
              <li key={it.id}>
                <strong>{it.name}</strong>: {it.description}
              </li>
            ))}
          </ul>
        )}

        <h3>Add Item</h3>
        <form onSubmit={async (e) => {
          e.preventDefault()
          const res = await fetch('/api/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
          })
          if (!res.ok) {
            alert('Failed to create item')
            return
          }
          const created = await res.json()
          setItems((prev) => [...prev, created])
          setForm({ name: '', description: '' })
        }}>
          <div>
            <label>
              Name
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Item name"
                required
              />
            </label>
          </div>
          <div>
            <label>
              Description
              <input
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Item description"
                required
              />
            </label>
          </div>
          <button type="submit">Create</button>
        </form>
      </section>
  )}
    </div>
  )
}
