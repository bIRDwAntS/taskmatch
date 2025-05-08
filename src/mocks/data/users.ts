import { IUser, IUserProfile, IUserStats } from '../../types/api.types';

// ---- IUSER
//premium users (a user with active premium subscription)
export const mockPremiumUser: IUser = {
  id: 'user-3', 
  email: 'vincent@ringtwin.com',
  firstName: 'vincent',
  lastName: 'arthsy',
  avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=Kingston&backgroundColor=b6e3f4',
  isVerified: true,
  isPremium: true,
  createdAt: '2023-06-10T08:00:00Z',
  updatedAt: '2024-05-01T11:20:00Z'
};

export const mockPremiumProUser: IUser = {
  id: 'user-6',
  email: 'bastien@ringtwin.com',
  firstName: 'bastien',
  lastName: 'jul',
  avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=Felix&backgroundColor=b6e3f4',
  isVerified: true,
  isPremium: true,
  createdAt: '2023-06-10T08:00:00Z',
  updatedAt: '2024-05-01T11:20:00Z'
};

export const mockPremiumCreativeUser: IUser = {
  id: 'user-7',
  email: 'elsa@ringtwin.com',
  firstName: 'elsa',
  lastName: 'maje',
  avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=Liliana&backgroundColor=540187&body=variant15',
  isVerified: true,
  isPremium: true,
  createdAt: '2023-04-05T08:30:00Z',
  updatedAt: '2024-04-20T16:15:00Z'
}



// ---- IUSERPROFILE
// ------ premium users for tests ----
//complete user premium profile
export const mockPremiumUserProfile: IUserProfile = { //vincent
  ...mockPremiumUser,
  bio: 'Développeur passionné par les technologies web modernes.',
  location: 'Bruxelles, Belgique',
  skills: ['React', 'TypeScript', 'SaSS'],
  rating: 4.9,
  completedJobs: 24,
  preferredLanguage: 'en',
  notificationSettings: {
    email: true,
    push: false,
    marketing: false
  }
};

export const mockPremiumProUserProfile: IUserProfile = {
  ...mockPremiumProUser,
  bio: "Web Designer UX/UI freelance, passionné par l'expérience utilisateur et l'accessibilité.",
  location: 'Mons, Belgique',
  skills: ['React','UX Design', 'UI Design', 'Prototypage'],
  rating: 4.9,
  completedJobs: 37,
  preferredLanguage: 'fr',
  notificationSettings: {
    email: true,
    push: true,
    marketing: true
  }
};

export const mockPremiumCreativeUserProfile: IUserProfile = {
  ...mockPremiumCreativeUser,
  bio: 'Back Dev, passionnée par les technologies décentralisées &  hacktiviste éthique.',
  location: 'Bruxelles, Belgique',
  skills: ['Cloud Architecture', 'DevOps', 'Solution Design'],
  rating: 4.8,
  completedJobs: 42,
  preferredLanguage: 'fr',
  notificationSettings: {
    email: true,
    push: true,
    marketing: false
  }
};




// ------ Other users for tests errors & threats ----
//standard unverified user
export const mockBasicUser: IUser = {
  id: 'user-1',
  email: 'Simon@example.com',
  firstName: 'simon',
  lastName: 'klong',
  avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=Aneka&backgroundColor=ffd5dc',
  isVerified: false,
  isPremium: false,
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-02-01T14:30:00Z'
};


//verified user (user who has completed id verification) 
export const mockVerifiedUser: IUser = {
  id: 'user-2',
  email: 'chase@example.com',
  firstName: 'Chase',
  lastName: 'Verified',
  avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=Chase&backgroundColor=c0aede',
  isVerified: true,
  isPremium: false,
  createdAt: '2023-11-20T09:00:00Z',
  updatedAt: '2024-03-01T16:45:00Z'
};



//user with errors (edge cases)
export const mockUserWithErrors: IUser = {
  id: '',  
  email: 'invalid-email',  
  firstName: '',  
  lastName: '', 
  isVerified: false,
  isPremium: false,
  createdAt: 'invalid-date', 
  updatedAt: 'invalid-date' 
};

//user with partial data
export const mockPartialUser: Partial<IUser> = {
  id: 'user-partial',
  email: 'partial@example.com',
};

//deleted/deactivated user
export const mockDeletedUser: IUser & { deletedAt?: string } = {
  id: 'user-deleted',
  email: 'deleted@example.com',
  firstName: 'Deleted',
  lastName: 'User',
  isVerified: false,
  isPremium: false,
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  deletedAt: '2024-02-01T00:00:00Z'
};



// ------ basic user profile with all data & info
export const mockUserProfile: IUserProfile = { //Simon
  ...mockBasicUser,
  bio: 'Early adopter et utilisateur basic depuis le début.',
  location: 'Mons, Bruxelles',
  skills: ['Jardinage', 'Potager'],
  rating: 3.7,
  completedJobs: 8,
  preferredLanguage: 'fr',
  notificationSettings: {
    email: true,
    push: true,
    marketing: true
  }
};

// ----- STATISTICS // ---- IUSERSTATS
//premium users stats
//victhor
export const mockPremiumUserStats: IUserStats = {
  accountAge: 330, // in days
  documentsUploaded: 5,
  verificationProgress: 100,
  lastLoginAt: '2024-05-05T08:00:00Z',
  totalLogins: 245,
  premiumSince: '2023-09-01T00:00:00Z'
};

//sebastien
export const mockPremiumProUserStats: IUserStats = {
  accountAge: 395,
  documentsUploaded: 4,
  verificationProgress: 100,
  lastLoginAt: '2024-05-05T18:30:00Z',
  totalLogins: 187,
  premiumSince: '2023-05-01T00:00:00Z'
};

//carl
export const mockPremiumCreativeUserStats: IUserStats = {
  accountAge: 235,
  documentsUploaded: 6,
  verificationProgress: 100,
  lastLoginAt: '2024-05-06T09:15:00Z',
  totalLogins: 210,
  premiumSince: '2023-10-01T00:00:00Z'
};

//basic user stats
export const mockBasicUserStats: IUserStats = {
  accountAge: 100, // in days
  documentsUploaded: 0,
  verificationProgress: 0,
  lastLoginAt: '2024-05-04T14:30:00Z',
  totalLogins: 15
};

//verified user stats
export const mockVerifiedUserStats: IUserStats = {
  accountAge: 165, // in days
  documentsUploaded: 3,
  verificationProgress: 100,
  lastLoginAt: '2024-05-05T09:15:00Z',
  totalLogins: 78
};


// ---- LIST IUSER
// list of users for tests with no error & threats
export const mockUsersList: IUser[] = [
  mockBasicUser,    
  mockPremiumUser,
  mockPremiumProUser,
  mockPremiumCreativeUser,   
  {
    id: 'user-4',
    email: 'new.user@example.com',
    firstName: 'New',
    lastName: 'User',
    isVerified: false,
    isPremium: false,
    createdAt: '2024-05-01T12:00:00Z',
    updatedAt: '2024-05-01T12:00:00Z'
  },
  {
    id: 'user-5',
    email: 'partial.verified@example.com',
    firstName: 'Partial',
    lastName: 'Verified',
    avatar: 'https://avatars.dicebear.com/api/avataaars/partialverified.svg',
    isVerified: false,
    isPremium: false,
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-04-20T15:30:00Z'
  }
];


// ----- MAPS
// map of users by ID for quick access
export const mockUsersMap = new Map<string, IUser>(
  mockUsersList.map(user => [user.id, user])
);

// map of user profiles
export const mockProfilesMap = new Map<string, IUserProfile>([
  ['user-1', mockUserProfile],
  ['user-3', mockPremiumUserProfile],
  ['user-6', mockPremiumProUserProfile],       
  ['user-7', mockPremiumCreativeUserProfile] 
]);

// map of user statistics
export const mockStatsMap = new Map<string, IUserStats>([
  ['user-3', mockPremiumUserStats],
  ['user-6', mockPremiumProUserStats],  
  ['user-7', mockPremiumCreativeUserStats] 
]);


// ----- HELPERS ------
// helper to retrieve a user by their ID
//@param id - The user's identifier
//@returns IUser | undefined
export const getUserById = (id: string): IUser | undefined => {
  return mockUsersMap.get(id);
};

// helper to retrieve a user profile by ID
// @param id - The user's identifier
// @returns IUserProfile | undefined
export const getUserProfile = (id: string): IUserProfile | undefined => {
  return mockProfilesMap.get(id);
};

// helper to retrieve a user's statistics
// @param id - The user's identifier
// @returns IUserStats | undefined
export const getUserStats = (id: string): IUserStats | undefined => {
  return mockStatsMap.get(id);
};

// helper to check if a user exists
// @param id - The user's identifier
// @returns boolean
export const userExists = (id: string): boolean => {
  return mockUsersMap.has(id);
};

// helper to get all premium users
// @returns IUser[]
export const getPremiumUsers = (): IUser[] => {
  return mockUsersList.filter(user => user.isPremium);
};

// helper to get all verified users
// @returns IUser[]
export const getVerifiedUsers = (): IUser[] => {
  return mockUsersList.filter(user => user.isVerified);
};

// ----- ERROR SIMULATION
// simulates an error to test error handling
// @throws Error
export const simulateUserFetchError = (): never => {
  throw new Error('Erreur de connexion au serveur');
};