/**
 * Type utils for standard api
 * @template T Type data return
 */
type TApiResponseWrapper<T> = {
    success: boolean;
    data: T;
    message?: string;
    error?: IApiError;
    timestamp: string;
  };
  
  /**
   * api error handling
   */
  interface IApiError {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  }
  
  /**
   * Enums for const
   */
  export enum EVerificationLevel {
    NONE = 'none',
    EMAIL = 'email',
    IDENTITY = 'identity',
    FULL = 'full'
  }
  
  export enum EDocumentType {
    ID_CARD = 'id_card',
    PASSPORT = 'passport',
    DRIVER_LICENSE = 'driver_license',
    RESIDENCE_PROOF = 'residence_proof',
    OTHER = 'other'
  }
  
  export enum EDocumentStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    EXPIRED = 'expired'
  }
  
  export enum EVerificationStepStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    FAILED = 'failed'
  }
  
  // Types for query params
  type TProfileIncludes = 'stats' | 'verification';
  
  /**
   * basic user info
   */
  interface IUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    isVerified: boolean;
    isPremium: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  /**
   * full user profile
   */
  interface IUserProfile extends IUser {
  bio?: string;
  location?: string;
  preferredLanguage?: string; 
  notificationSettings?: INotificationSettings; 
  skills?: string[];
  rating?: number;
  completedJobs?: number;
  }
  
  /**
   * user notif params
   */
  interface INotificationSettings {
    email: boolean;
    push: boolean;
    marketing: boolean;
  }
  
  /**
   * user verification status
   */
  interface IVerificationStatus {
    currentLevel: EVerificationLevel;
    steps: IVerificationStep[];
    nextRequiredStep?: EVerificationLevel;
    lastUpdated: string;
  }
  
  /**
   * verification stages
   */
  interface IVerificationStep {
    level: EVerificationLevel;
    status: EVerificationStepStatus;
    completedAt?: string;
    failureReason?: string;
  }
  
  /**
   * user verification data
   */
  interface IVerificationRequest {
    level: EVerificationLevel;
    documents?: IDocumentUpload[];
    metadata?: Record<string, unknown>;
  }
  
  /**
   * verification aim
   */
  interface IVerificationResult {
    success: boolean;
    newLevel: EVerificationLevel;
    message: string;
  }
  
  /**
   * doc file data
   */
  interface IDocumentUpload {
    type: EDocumentType;
    file: File;
    metadata?: {
      expirationDate?: string;
      issuingCountry?: string;
      documentNumber?: string;
    };
  }
  
  /**
   * doc file data aim
   */
  interface IDocumentUploadResult {
    documentId: string;
    type: EDocumentType;
    status: EDocumentStatus;
    uploadedAt: string;
    reviewEstimate?: string;
  }
  
  /**
   * premium update data
   */
  interface IPremiumUpgradeRequest {
    plan: 'monthly' | 'annual';
    paymentMethodId: string;
    promoCode?: string;
  }
  
  /**
   * premium update data aim
   */
  interface IPremiumUpgradeResult {
    success: boolean;
    subscriptionId: string;
    expiresAt: string;
    features: string[];
  }
  
  /**
   * user stats
   */
  interface IUserStats {
    accountAge: number; // in days
    documentsUploaded: number;
    verificationProgress: number; // in pourcent
    lastLoginAt: string;
    totalLogins: number;
    premiumSince?: string;
  }
  
  /**
   * endpoints types
   */
  type TApiEndpoints = {
    // User endpoints
    'GET /api/user/profile': {
      query?: { include?: TProfileIncludes[] };
      response: TApiResponseWrapper<IUserProfile>;
    };
    'GET /api/user/verification-status': {
      response: TApiResponseWrapper<IVerificationStatus>;
    };
    'POST /api/user/verify': {
      request: IVerificationRequest;
      response: TApiResponseWrapper<IVerificationResult>;
    };
    'POST /api/user/upgrade-premium': {
      request: IPremiumUpgradeRequest;
      response: TApiResponseWrapper<IPremiumUpgradeResult>;
    };
    'GET /api/user/stats': {
      response: TApiResponseWrapper<IUserStats>;
    };
    'POST /api/documents/upload': {
      request: FormData; // IDocumentUpload included
      response: TApiResponseWrapper<IDocumentUploadResult>;
    };
  };
  
  /**
   * Type helper in order to extract type request endpoint 
   */
  export type TApiRequest<T extends keyof TApiEndpoints> = 
    TApiEndpoints[T] extends { request: infer R } ? R : never;
  
  /**
   * Type helper in order to extract type response endpoint 
   */
  export type TApiResponse<T extends keyof TApiEndpoints> =
    TApiEndpoints[T] extends { response: infer R } ? R : never;
  
  /**
   * Type helper in order to extract queries params endpoint 
   */
  export type TApiQuery<T extends keyof TApiEndpoints> =
    TApiEndpoints[T] extends { query?: infer Q } ? Q : never;
  
  /**
   * Export main types
   */
  export type {
    // Types
    TApiResponseWrapper,
    TApiEndpoints,
    TProfileIncludes
  };
  
  export type {
    // Interfaces
    IUser,
    IUserProfile,
    IVerificationStatus,
    IVerificationRequest,
    IVerificationResult,
    IDocumentUpload,
    IDocumentUploadResult,
    IPremiumUpgradeRequest,
    IPremiumUpgradeResult,
    IUserStats,
    IApiError,
    INotificationSettings,
    IVerificationStep
  };