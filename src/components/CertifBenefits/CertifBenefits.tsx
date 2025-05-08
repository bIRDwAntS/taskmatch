import React from 'react';

const certificationBenefits = [
  "Badge 'Certifié' sur votre profil",
  "Mise en avant dans la section Talents Certifiés",
  "Accès au réseau des Certifiés",
  "Apparition dans les suggestions recommandées envoyées aux clients potentiels",
  "Personnalisation avancée du profil"
  //   "Visibilité accrue dans les résultats de recherche",
];

export const CertifBenefits: React.FC = () => {
  return (
    <div className="certification-benefits">
      <h3 className="certification-benefits__title">Vos avantages</h3>
      <ul className="certification-benefits__list">
        {certificationBenefits.map((benefit, index) => (
          <li 
            key={index} 
            className={`certification-benefits__item certification-benefits__item--${index + 1}`}
          >
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  );
};