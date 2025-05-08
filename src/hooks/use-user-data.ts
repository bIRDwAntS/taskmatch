import { useState, useEffect } from 'react';
import { IUser } from '../types/api.types';

interface IUserData {
  profile: IUser | null;
  loading: boolean;
  error: string | null;
}


export const useUserData = (userId: string): IUserData => {
  const [profile, setProfile] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        const profileResponse = await fetch(`/api/user/profile?userId=${userId}`);
        const responseWrapper = await profileResponse.json();
        
        const profileData = responseWrapper.data;
                
        console.log('Response data for', userId, profileData);

        setProfile(profileData);
        setError(null);
      } catch (err) {
        console.error('Erreur:', err);
        setError('Erreur lors de la récupération');
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, [userId]);

  return { profile, loading, error };
};