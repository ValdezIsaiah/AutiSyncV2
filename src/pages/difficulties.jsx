import React, { useEffect, useState } from 'react';
import difficultiesService from '../lib/difficultiesService';

export default function Difficulties() {
  const [difficulties, setDifficulties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newLevel, setNewLevel] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    async function fetchDifficulties() {
      setLoading(true);
      const { data, error } = await difficultiesService.getAllDifficulties();
      if (!error) setDifficulties(data || []);
      setLoading(false);
    }
    fetchDifficulties();
  }, []);

  async function handleAddDifficulty(e) {
    e.preventDefault();
    if (!newLevel) return;
    const { data, error } = await difficultiesService.createDifficulty({
      level: newLevel,
      description: newDescription,
    });
    if (!error && data) setDifficulties([...difficulties, ...data]);
    setNewLevel('');
    setNewDescription('');
  }

  return (
    <div>
      <h2>Difficulties</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {difficulties.map(d => (
            <li key={d.id}>
              <strong>{d.level}</strong>: {d.description}
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleAddDifficulty} style={{ marginTop: '1em' }}>
        <input
          type="text"
          placeholder="Level (e.g. Easy)"
          value={newLevel}
          onChange={e => setNewLevel(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newDescription}
          onChange={e => setNewDescription(e.target.value)}
        />
        <button type="submit">Add Difficulty</button>
      </form>
    </div>
  );
}