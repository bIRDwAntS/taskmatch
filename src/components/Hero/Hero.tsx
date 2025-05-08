import { UserAvatarCard } from '../UserAvatarCard/UserAvatarCard';
import { UserHighlightCard } from '../UserHighlightCard/index';
import { SkillBadge } from '../SkillBadge/SkillBadge';
import { useUserData } from '../../hooks/use-user-data';
import { CertifBenefits } from '../CertifBenefits';



interface HeroProps {
    className?: string;
  }
  export const Hero = ({ className = '' }: HeroProps) => {
    const { 
      profile: basicProfile, 
      loading: basicLoading, 
      error: basicError 
    } = useUserData('user-1');

    const { 
      profile: premiumProfile, 
      loading: premiumLoading, 
      error: premiumError 
    } = useUserData('user-3');
 
    return (
      <header className={`hero ${className}`}>
        <div className="hero__container">
          {/* BASIC USER */}
      <div className="hero__cards-container __card-reverse">
      <div className="hero__card-wrapper">
          <div className='hero__avatar-wrapper'>
          {basicLoading && <div>Chargement...</div>}
          {basicError && <div>Erreur: {basicError}</div>}
          {basicProfile && <UserAvatarCard user={basicProfile} />}
          <div className="hero__info-wrapper">
            {basicLoading && <div>Chargement...</div>}
            {basicError && <div>Erreur: {basicError}</div>}
            {basicProfile && <UserHighlightCard profile={basicProfile} />}
          </div>
          </div>
         
        </div>

      
          {/* PREMIUM USER */}
        <div className="hero__card-wrapper">
          {premiumLoading && <div>Chargement...</div>}
          {premiumError && <div>Erreur: {premiumError}</div>}
          {premiumProfile && <UserAvatarCard user={premiumProfile} />}
          <div className="hero__info-wrapper">
            {premiumLoading && <div>Chargement...</div>}
            {premiumError && <div>Erreur: {premiumError}</div>}
            {premiumProfile && <UserHighlightCard profile={premiumProfile} />}
          </div>
         <div className="hero__badge-wrapper">
         {premiumProfile && <SkillBadge user={premiumProfile} />}
         </div>
        </div>
      </div>

      <div className="hero__title-container">
          <div className="hero__title-wrapper">
            <h1>
            Valorisez vos compétences & boostez votre crédibilité.
            </h1>
            <h2>
            Rejoignez la communauté des particuliers certifiés et accédez à des avantages exclusifs. 
            </h2>
          </div>

          <div className="hero__vantages-container">
          <CertifBenefits />
        </div>

        <div>
          <a href="/" className='btn-base btn__primary'>
          devenir certifié
          </a>
        </div>
        </div>

      



        </div>
      </header>
    );
  };
  
 