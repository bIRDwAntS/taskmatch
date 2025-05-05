// src/mocks/handlers/user.handlers.ts

import { http, delay, HttpResponse } from 'msw';
import { TApiResponseWrapper, EVerificationLevel  } from '../../types/api.types';
import { 
  getUserProfile, 
  getUserStats
} from '../data/users';
import { 
  getVerificationStatus, 
  mockVerificationResults,
//   hasVerificationLevel
} from '../data/verifications';

/**
 * Helper pour créer une réponse d'erreur
 */
const createErrorResponse = (
    status: number, 
    message: string,
    error?: unknown  // Paramètre optionnel pour l'erreur
  ): Response => {
    // Log l'erreur (uniquement en développement)
    if (process.env.NODE_ENV !== 'production' && error) {
      console.error(`API Error (${status}): ${message}`, error);
    }
    
    return HttpResponse.json(
      createApiResponse(null, false, message),
      { status }
    );
  };

/**
 * Helper pour créer une réponse API standardisée
 */
const createApiResponse = <T>(
  data: T,
  success = true,
  message?: string
): TApiResponseWrapper<T> => {
  return {
    success,
    data,
    message,
    timestamp: new Date().toISOString()
  };
};


/**
 * Handlers pour les endpoints utilisateur
 */
export const userHandlers = [
  // GET /api/user/profile
  http.get('/api/user/profile', async ({ request }) => {
    try {
      // Délai léger pour simuler le réseau
      await delay(300);
      
      // Parse les paramètres de requête
      const url = new URL(request.url);
      const userId = url.searchParams.get('userId') || 'user-1';
      
      // Récupérer le profil utilisateur
      const profile = getUserProfile(userId);
      
      if (!profile) {
        return createErrorResponse(404, `Utilisateur non trouvé`);
      }
      
      return HttpResponse.json(
        createApiResponse(profile, true)
      );
    } catch (error) {
        return createErrorResponse(500, 'Erreur serveur', error);
    }
  }),
  
  // GET /api/user/verification-status
  http.get('/api/user/verification-status', async ({ request }) => {
    try {
      const url = new URL(request.url);
      const userId = url.searchParams.get('userId') || 'user-1';
      
      const verificationStatus = getVerificationStatus(userId);
      
      if (!verificationStatus) {
        return createErrorResponse(404, `Statut de vérification non trouvé`);
      }
      
      return HttpResponse.json(
        createApiResponse(verificationStatus, true)
      );
    } catch (error) {
        return createErrorResponse(500, 'Erreur serveur', error);
    }
  }),
  
  // GET /api/user/stats
  http.get('/api/user/stats', async ({ request }) => {
    try {
      const url = new URL(request.url);
      const userId = url.searchParams.get('userId') || 'user-1';
      
      const stats = getUserStats(userId);
      
      if (!stats) {
        return createErrorResponse(404, `Statistiques non trouvées`);
      }
      
      return HttpResponse.json(
        createApiResponse(stats, true)
      );
    } catch (error) {
        return createErrorResponse(500, 'Erreur serveur', error);
    }
  }),
  
  // POST /api/user/verify
  http.post('/api/user/verify', async ({ request }) => {
    try {
      const requestData = await request.json() as { level: EVerificationLevel };
      const { level } = requestData;
      
      if (!level) {
        return createErrorResponse(400, 'Niveau de vérification requis');
      }
      
      // Logique simplifiée basée sur le niveau
      let result;
      switch (level) {
        case EVerificationLevel.EMAIL:
          result = mockVerificationResults.success;
          break;
        case EVerificationLevel.IDENTITY:
          result = mockVerificationResults.identitySuccess;
          break;
        case EVerificationLevel.FULL:
          result = mockVerificationResults.fullSuccess;
          break;
        default:
          return createErrorResponse(400, 'Niveau de vérification invalide');
      }
      
      return HttpResponse.json(
        createApiResponse(result, true)
      );
    } catch (error) {
        return createErrorResponse(500, 'Erreur serveur', error);
    }
  }),
  
  // POST /api/user/upgrade-premium
  http.post('/api/user/upgrade-premium', async ({ request }) => {
    try {
      const requestData = await request.json() as { 
        plan: string, 
        paymentMethodId: string 
      };
      const { plan, paymentMethodId } = requestData;
      
      if (!plan || !paymentMethodId) {
        return createErrorResponse(400, 'Plan et méthode de paiement requis');
      }
      
      // Réponse simplifiée
      const isAnnual = plan === 'annual';
      const premiumResult = {
        success: true,
        subscriptionId: `sub-${Date.now()}`,
        expiresAt: new Date().toISOString(),
        features: [
          'Téléversement illimité de documents',
          'Vérification prioritaire',
          'Support 24/7'
        ]
      };
      
      return HttpResponse.json(
        createApiResponse(premiumResult, true, 
          `Mise à niveau vers plan ${isAnnual ? 'annuel' : 'mensuel'} réussie!`)
      );
    } catch (error) {
        return createErrorResponse(500, 'Erreur serveur', error);
    }
  })
];