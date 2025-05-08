import React from 'react';
import { IUser } from '../../types/api.types';

interface SkillBadgeProps {
  user: IUser;
  className?: string;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({ 
  user,
  className = ''
}) => {
  const hasValidatedSkills = user.isVerified;
  
  if (!hasValidatedSkills) return null;
  
  return (
    <span 
    className={`skill-badge ${className} ${user.isPremium ? 'skill-badge--premium' : ''}`}
    data-testid="skill-badge"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="16" 
      height="16" 
      viewBox="0 0 24 24"
      className="skill-badge__icon"
    >
      <path fill="none" stroke="currentColor" stroke-width="2" d="M20 15c-1 1 1.25 3.75 0 5s-4-1-5 0s-1.5 3-3 3s-2-2-3-3s-3.75 1.25-5 0s1-4 0-5s-3-1.5-3-3s2-2 3-3s-1.25-3.75 0-5s4 1 5 0s1.5-3 3-3s2 2 3 3s3.75-1.25 5 0s-1 4 0 5s3 1.5 3 3s-2 2-3 3ZM7 12l3 3l7-7"/>
    </svg>
    <span className="skill-badge__text">Compétences validées</span>
  </span>
  );
};