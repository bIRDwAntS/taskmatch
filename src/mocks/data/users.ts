import { IUser, IUserProfile, IUserStats } from '../../types/api.types';

/**
 * Basic user for tests
 **/

//standard unverified user
export const mockBasicUser: IUser = {
  id: 'user-1',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  avatar: 'https://avatars.dicebear.com/api/avataaars/johndoe.svg',
  isVerified: false,
  isPremium: false,
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-02-01T14:30:00Z'
};

/**
 * Verified user
 * Represents a user who has completed identity verification
 */
export const mockVerifiedUser: IUser = {
  id: 'user-2',
  email: 'jane.smith@example.com',
  firstName: 'Jane',
  lastName: 'Smith',
  avatar: 'https://avatars.dicebear.com/api/avataaars/janesmith.svg',
  isVerified: true,
  isPremium: false,
  createdAt: '2023-11-20T09:00:00Z',
  updatedAt: '2024-03-01T16:45:00Z'
};

/**
 * Premium user
 * Represents a user with active premium subscription
 */
export const mockPremiumUser: IUser = {
  id: 'user-3',
  email: 'premium.user@example.com',
  firstName: 'Premium',
  lastName: 'User',
  avatar: 'https://avatars.dicebear.com/api/avataaars/premiumuser.svg',
  isVerified: true,
  isPremium: true,
  createdAt: '2023-06-10T08:00:00Z',
  updatedAt: '2024-05-01T11:20:00Z'
};

/**
 * User with errors to test edge cases
 * Contains data that could trigger validation errors
 */
export const mockUserWithErrors: IUser = {
  id: '',  // Empty ID 
  email: 'invalid-email',  // Invalid email
  firstName: '',  // Empty first name
  lastName: '',  // Empty last name
  isVerified: false,
  isPremium: false,
  createdAt: 'invalid-date',  // Invalid date
  updatedAt: 'invalid-date'  // Invalid date
};

/**
 * User with partial data
 * To test robustness with incomplete data
 */
export const mockPartialUser: Partial<IUser> = {
  id: 'user-partial',
  email: 'partial@example.com',
  // Missing firstName, lastName, and other required fields
};

/**
 * Deleted/deactivated user
 * To test cases of deleted account
 */
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

/**
 * Complete user profile
 * Includes all additional information for a profile
 */
export const mockUserProfile: IUserProfile = {
  ...mockBasicUser,
  bio: 'Développeur passionné par les technologies web modernes.',
  location: 'Bruxelles, Belgique',
  skills: ['React', 'TypeScript'],
  rating: 4.5,
  completedJobs: 12,
  preferredLanguage: 'fr',
  notificationSettings: {
    email: true,
    push: false,
    marketing: false
  }
};

/**
 * Premium user profile with all data
 */
export const mockPremiumUserProfile: IUserProfile = {
  ...mockPremiumUser,
  bio: 'Early adopter et utilisateur premium depuis le début.',
  location: 'Mons, Bruxelles',
  skills: ['Jardinage', 'Potager'],
  rating: 3.5,
  completedJobs: 24,
  preferredLanguage: 'fr',
  notificationSettings: {
    email: true,
    push: true,
    marketing: true
  }
};

/**
 * Basic user statistics
 */
export const mockBasicUserStats: IUserStats = {
  accountAge: 100, // days
  documentsUploaded: 0,
  verificationProgress: 0,
  lastLoginAt: '2024-05-04T14:30:00Z',
  totalLogins: 15
};

/**
 * Verified user statistics
 */
export const mockVerifiedUserStats: IUserStats = {
  accountAge: 165,
  documentsUploaded: 3,
  verificationProgress: 100,
  lastLoginAt: '2024-05-05T09:15:00Z',
  totalLogins: 78
};

/**
 * Premium user statistics
 */
export const mockPremiumUserStats: IUserStats = {
  accountAge: 330,
  documentsUploaded: 5,
  verificationProgress: 100,
  lastLoginAt: '2024-05-05T08:00:00Z',
  totalLogins: 245,
  premiumSince: '2023-09-01T00:00:00Z'
};

/**
 * List of users for tests
 */
export const mockUsersList: IUser[] = [
  mockBasicUser,
  mockVerifiedUser,
  mockPremiumUser,
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

/**
 * Map of users by ID for quick access
 */
export const mockUsersMap = new Map<string, IUser>(
  mockUsersList.map(user => [user.id, user])
);

/**
 * Map of user profiles
 */
export const mockProfilesMap = new Map<string, IUserProfile>([
  ['user-1', mockUserProfile],
  ['user-3', mockPremiumUserProfile]
]);

/**
 * Map of user statistics
 */
export const mockStatsMap = new Map<string, IUserStats>([
  ['user-1', mockBasicUserStats],
  ['user-2', mockVerifiedUserStats],
  ['user-3', mockPremiumUserStats]
]);

/**
 * Helper to retrieve a user by their ID
 * @param id - The user's identifier
 * @returns IUser | undefined
 */
export const getUserById = (id: string): IUser | undefined => {
  return mockUsersMap.get(id);
};

/**
 * Helper to retrieve a user profile by ID
 * @param id - The user's identifier
 * @returns IUserProfile | undefined
 */
export const getUserProfile = (id: string): IUserProfile | undefined => {
  return mockProfilesMap.get(id);
};

/**
 * Helper to retrieve a user's statistics
 * @param id - The user's identifier
 * @returns IUserStats | undefined
 */
export const getUserStats = (id: string): IUserStats | undefined => {
  return mockStatsMap.get(id);
};

/**
 * Helper to check if a user exists
 * @param id - The user's identifier
 * @returns boolean
 */
export const userExists = (id: string): boolean => {
  return mockUsersMap.has(id);
};

/**
 * Helper to get all premium users
 * @returns IUser[]
 */
export const getPremiumUsers = (): IUser[] => {
  return mockUsersList.filter(user => user.isPremium);
};

/**
 * Helper to get all verified users
 * @returns IUser[]
 */
export const getVerifiedUsers = (): IUser[] => {
  return mockUsersList.filter(user => user.isVerified);
};

/**
 * Simulates an error to test error handling
 * @throws Error
 */
export const simulateUserFetchError = (): never => {
  throw new Error('Erreur de connexion au serveur');
};