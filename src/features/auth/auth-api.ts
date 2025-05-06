import { TUser } from './auth-context';

// Simuler des délais de réseau
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Utilisateurs de test simulés
const MOCK_USERS: Record<string, TUser> = {
  'user@example.com': {
    id: 'user1',
    email: 'user@example.com',
    displayName: 'John Doe',
    role: 'user'
  },
  'admin@example.com': {
    id: 'admin1',
    email: 'admin@example.com',
    displayName: 'Admin User',
    role: 'admin'
  }
};

// Auth API simulée pour MVP
export const authApi = {
  // Connexion
  async login(email: string, password: string) {
    await delay(800); // Simuler un délai réseau
    
    if (!email || !password) {
      throw { code: 'auth/invalid-credentials', message: 'Email et mot de passe requis' };
    }
    
    // Vérification des identifiants (simple pour MVP)
    const user = MOCK_USERS[email.toLowerCase()];
    
    if (!user || password !== 'password') { // Dans un vrai projet, utiliser bcrypt
      throw { code: 'auth/invalid-credentials', message: 'Email ou mot de passe incorrect' };
    }
    
    // Simuler un token JWT
    const token = `mock_token_for_${user.id}_${Date.now()}`;
    
    return { user, token };
  },
  
  // Inscription
  async register(email: string, password: string, displayName: string) {
    await delay(1000);
    
    if (!email || !password || !displayName) {
      throw { code: 'auth/missing-fields', message: 'Tous les champs sont obligatoires' };
    }
    
    // Vérifier si l'utilisateur existe déjà
    if (MOCK_USERS[email.toLowerCase()]) {
      throw { code: 'auth/email-in-use', message: 'Cet email est déjà utilisé' };
    }
    
    // Créer un nouvel utilisateur
    const newUser: TUser = {
      id: `user_${Date.now()}`,
      email: email.toLowerCase(),
      displayName,
      role: 'user'
    };
    
    // Dans un vrai projet, on sauvegarderait dans la BDD
    MOCK_USERS[email.toLowerCase()] = newUser;
    
    // Simuler un token JWT
    const token = `mock_token_for_${newUser.id}_${Date.now()}`;
    
    return { user: newUser, token };
  },
  
  // Validation du token
  async validateToken(token: string) {
    await delay(500);
    
    if (!token || !token.startsWith('mock_token_for_')) {
      throw { code: 'auth/invalid-token', message: 'Token invalide' };
    }
    
    // Extraire l'ID utilisateur du token
    const userId = token.split('_')[3];
    
    // Trouver l'utilisateur par ID (simulé)
    const user = Object.values(MOCK_USERS).find(u => u.id === userId);
    
    if (!user) {
      throw { code: 'auth/user-not-found', message: 'Utilisateur non trouvé' };
    }
    
    return user;
  },
  
  // Déconnexion
  async logout(_token: string) {
    await delay(300);
    // Simuler une déconnexion (invalidation de token)
    return { success: true };
  },
  
  // Réinitialisation de mot de passe
  async resetPassword(email: string) {
    await delay(800);
    
    if (!email) {
      throw { code: 'auth/invalid-email', message: 'Email invalide' };
    }
    
    const user = MOCK_USERS[email.toLowerCase()];
    
    if (!user) {
      // Pour des raisons de sécurité, ne pas révéler si l'email existe
      return { success: true };
    }
    
    // Simuler l'envoi d'un email (dans un vrai projet)
    console.log(`Email de réinitialisation envoyé à ${email}`);
    
    return { success: true };
  }
};