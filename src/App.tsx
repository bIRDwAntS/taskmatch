// Test rapide dans App.tsx
import { useEffect, useState } from 'react';

function App() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user/profile')
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setLoading(false);
        console.log('MSW Test:', data);
      })
      .catch(err => {
        console.error('MSW Test failed:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>MSW Test</h1>
      {loading ? (
        <p>Loading...</p>
      ) : profile ? (
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      ) : (
        <p>Erreur de chargement</p>
      )}
    </div>
  );
}

export default App;