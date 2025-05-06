// Test rapide dans App.tsx
// import { useEffect, useState } from 'react';

// function App() {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('/api/user/profile')
//       .then(res => res.json())
//       .then(data => {
//         setProfile(data);
//         setLoading(false);
//         console.log('MSW Test:', data);
//       })
//       .catch(err => {
//         console.error('MSW Test failed:', err);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>MSW Test</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : profile ? (
//         <pre>{JSON.stringify(profile, null, 2)}</pre>
//       ) : (
//         <p>Erreur de chargement</p>
//       )}
//     </div>
//   );
// }

// export default App;


import { useState, useEffect } from 'react';

function PremiumUserTest() {
  // États pour stocker les différentes données
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [verification, setVerification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ID de l'utilisateur à tester
  const userId = 'user-3';

  useEffect(() => {
    // Fonction pour récupérer toutes les données
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Récupérer le profil
        const profileResponse = await fetch(`/api/user/profile?userId=${userId}`);
        const profileData = await profileResponse.json();
        
        // Récupérer les statistiques
        const statsResponse = await fetch(`/api/user/stats?userId=${userId}`);
        const statsData = await statsResponse.json();
        
        // Récupérer le statut de vérification
        const verificationResponse = await fetch(`/api/user/verification-status?userId=${userId}`);
        const verificationData = await verificationResponse.json();
        
        // Mettre à jour les états
        setProfile(profileData);
        setStats(statsData);
        setVerification(verificationData);
        setError(null);
      } catch (err) {
        console.error('Erreur lors de la récupération des données:', err);
        // setError('Erreur lors de la récupération des données utilisateur');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <div>Chargement des données...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div className="premium-user-test">
      <h1>Test de l'utilisateur Premium (user-3)</h1>
      
      <div className="data-section">
        <h2>Profil utilisateur</h2>
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </div>
      
      <div className="data-section">
        <h2>Statistiques</h2>
        <pre>{JSON.stringify(stats, null, 2)}</pre>
      </div>
      
      <div className="data-section">
        <h2>Statut de vérification</h2>
        <pre>{JSON.stringify(verification, null, 2)}</pre>
      </div>
    </div>
  );
}

export default PremiumUserTest;