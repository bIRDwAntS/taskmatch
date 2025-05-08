import React from 'react';
import { IUser } from '../../types/api.types';


interface IUserAvatarCardProps {
  user: IUser;
}

export const UserAvatarCard: React.FC<IUserAvatarCardProps> = ({ user }) => {
  return (
    <div 
      className={`user-avatar-card ${user.isPremium ? 'user-card--premium' : ''}`}
      data-testid={`user-avatar-card-${user.id}`}
    >
      <div className="user-avatar-card__avatar-container">
        <img 
          src={user.avatar} 
          alt={`${user.firstName} ${user.lastName}`} 
          className="user-avatar-card__avatar"
          loading="lazy"
        />
      </div>
    </div>
  );
};