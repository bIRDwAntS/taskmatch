import React from 'react';
import { IUserProfile } from '../../types/api.types';

interface UserHighlightCardProps {
  profile: IUserProfile; // get all infos of IUser
  className?: string;
}

export const UserHighlightCard: React.FC<UserHighlightCardProps> = ({ 
  profile,
  className = '' 
}) => {
  return (
    <div 
      className={`user-highlight-card ${className} ${profile.isPremium ? 'user-highlight-card--premium' : ''}`}
      data-testid={`user-highlight-${profile.id}`}
    >
      <div className="user-highlight-card__content">
        <h3 className="user-highlight-card__name">
          {profile.firstName} 
          <span>
          {profile.rating !== undefined && (
            <div className="user-highlight-card__rating">
              <span className="user-highlight-card__rating-value">{profile.rating.toFixed(1)}</span>
              <span className="user-highlight-card__rating-icon">★</span>
            </div>
          )}
          </span>
        </h3>

       
       
        <div className="user-highlight-card__stats">
          {profile.completedJobs !== undefined && (
            <div className="user-highlight-card__completed-jobs">
              <span className="user-highlight-card__completed-jobs-value">{profile.completedJobs}</span>
              <span className="user-highlight-card__completed-jobs-label"> projets complétés</span>
            </div>
          )}
          </div>
        <p className="user-highlight-card__type">
          {profile.isPremium ? 'Compétences Validées' : 'Profile Standard'}
        </p>

         {/* <p className="user-highlight-card__type">
        {profile.skills && profile.skills.length > 0 && <p>{profile.skills.join(', ')}</p>}
        </p> */}
      </div>
    </div>
  );
};