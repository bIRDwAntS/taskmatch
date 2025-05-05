import { 
    IVerificationStatus, 
    IVerificationStep, 
    EVerificationLevel, 
    EVerificationStepStatus,
    IVerificationResult 
  } from '../../types/api.types';
  
  /**
   * Verification status for an unverified user
   */
  export const mockUnverifiedStatus: IVerificationStatus = {
    currentLevel: EVerificationLevel.NONE,
    steps: [
      {
        level: EVerificationLevel.EMAIL,
        status: EVerificationStepStatus.PENDING
      },
      {
        level: EVerificationLevel.IDENTITY,
        status: EVerificationStepStatus.PENDING
      },
      {
        level: EVerificationLevel.FULL,
        status: EVerificationStepStatus.PENDING
      }
    ],
    nextRequiredStep: EVerificationLevel.EMAIL,
    lastUpdated: '2024-05-01T12:00:00Z'
  };
  
  /**
   * Verification status with email completed
   */
  export const mockEmailVerifiedStatus: IVerificationStatus = {
    currentLevel: EVerificationLevel.EMAIL,
    steps: [
      {
        level: EVerificationLevel.EMAIL,
        status: EVerificationStepStatus.COMPLETED,
        completedAt: '2024-04-15T10:30:00Z'
      },
      {
        level: EVerificationLevel.IDENTITY,
        status: EVerificationStepStatus.PENDING
      },
      {
        level: EVerificationLevel.FULL,
        status: EVerificationStepStatus.PENDING
      }
    ],
    nextRequiredStep: EVerificationLevel.IDENTITY,
    lastUpdated: '2024-04-15T10:30:00Z'
  };
  
  /**
   * Verification status with failed identity verification
   */
  export const mockFailedIdentityStatus: IVerificationStatus = {
    currentLevel: EVerificationLevel.EMAIL,
    steps: [
      {
        level: EVerificationLevel.EMAIL,
        status: EVerificationStepStatus.COMPLETED,
        completedAt: '2024-04-15T10:30:00Z'
      },
      {
        level: EVerificationLevel.IDENTITY,
        status: EVerificationStepStatus.FAILED,
        failureReason: 'Document expiré fourni'
      },
      {
        level: EVerificationLevel.FULL,
        status: EVerificationStepStatus.PENDING
      }
    ],
    nextRequiredStep: EVerificationLevel.IDENTITY,
    lastUpdated: '2024-04-20T14:45:00Z'
  };
  
  /**
   * Fully verified status
   */
  export const mockFullyVerifiedStatus: IVerificationStatus = {
    currentLevel: EVerificationLevel.FULL,
    steps: [
      {
        level: EVerificationLevel.EMAIL,
        status: EVerificationStepStatus.COMPLETED,
        completedAt: '2024-03-01T09:00:00Z'
      },
      {
        level: EVerificationLevel.IDENTITY,
        status: EVerificationStepStatus.COMPLETED,
        completedAt: '2024-03-05T14:20:00Z'
      },
      {
        level: EVerificationLevel.FULL,
        status: EVerificationStepStatus.COMPLETED,
        completedAt: '2024-03-10T11:15:00Z'
      }
    ],
    lastUpdated: '2024-03-10T11:15:00Z'
  };
  
  /**
   * Verification status with corrupted data
   * Used for testing error handling
   */
  export const mockCorruptedVerificationStatus: IVerificationStatus = {
    currentLevel: '' as EVerificationLevel, // Invalid level
    steps: [], // No steps
    lastUpdated: 'invalid-date' // Invalid date
  };
  
  /**
   * Inconsistent verification status
   * Current level doesn't match completed steps
   */
  export const mockInconsistentVerificationStatus: IVerificationStatus = {
    currentLevel: EVerificationLevel.FULL,
    steps: [
      {
        level: EVerificationLevel.EMAIL,
        status: EVerificationStepStatus.PENDING // Inconsistent with currentLevel
      },
      {
        level: EVerificationLevel.IDENTITY,
        status: EVerificationStepStatus.PENDING
      },
      {
        level: EVerificationLevel.FULL,
        status: EVerificationStepStatus.PENDING
      }
    ],
    lastUpdated: '2024-05-01T12:00:00Z'
  };
  
  /**
   * Possible verification results
   */
  export const mockVerificationResults = {
    success: {
      success: true,
      newLevel: EVerificationLevel.EMAIL,
      message: 'Email vérifié avec succès'
    } as IVerificationResult,
    
    identitySuccess: {
      success: true,
      newLevel: EVerificationLevel.IDENTITY,
      message: 'Identité vérifiée avec succès'
    } as IVerificationResult,
    
    fullSuccess: {
      success: true,
      newLevel: EVerificationLevel.FULL,
      message: 'Vérification complète réussie'
    } as IVerificationResult,
    
    documentInvalid: {
      success: false,
      newLevel: EVerificationLevel.EMAIL,
      message: 'Document invalide ou expiré'
    } as IVerificationResult,
    
    verificationFailed: {
      success: false,
      newLevel: EVerificationLevel.NONE,
      message: 'Échec de la vérification. Veuillez réessayer.'
    } as IVerificationResult,
    
    systemError: {
      success: false,
      newLevel: EVerificationLevel.NONE,
      message: 'Erreur système. Veuillez réessayer plus tard.'
    } as IVerificationResult
  };
  
  /**
   * Map of verification statuses by user
   */
  export const mockVerificationStatusMap = new Map<string, IVerificationStatus>([
    ['user-1', mockUnverifiedStatus],
    ['user-2', mockFullyVerifiedStatus],
    ['user-3', mockFullyVerifiedStatus],
    ['user-4', mockUnverifiedStatus],
    ['user-5', mockEmailVerifiedStatus]
  ]);
  
/**
 * Helper to retrieve a user's verification status
 * @param userId - The user's identifier
 * @returns IVerificationStatus | undefined
 */
export const getVerificationStatus = (
    userId: string
  ): IVerificationStatus | undefined => {
    return mockVerificationStatusMap.get(userId);
  };

  /**
 * Type guard to check if a value is a valid IVerificationStatus
 * @param value - The value to check
 * @returns boolean
 */
export const isVerificationStatus = (
  value: unknown
): value is IVerificationStatus => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'currentLevel' in value &&
    'steps' in value &&
    'lastUpdated' in value &&
    Array.isArray((value as IVerificationStatus).steps)
  );
};



/**
 * Type guard to check if a value is a valid IVerificationResult
 * @param value - The value to check
 * @returns boolean
 */
export const isVerificationResult = (
    value: unknown
  ): value is IVerificationResult => {
    return (
      typeof value === 'object' &&
      value !== null &&
      'success' in value &&
      'newLevel' in value &&
      'message' in value &&
      typeof (value as IVerificationResult).success === 'boolean' &&
      typeof (value as IVerificationResult).message === 'string'
    );
  };
 
  
  /**
   * Helper to check if a user has reached a verification level
   * @param userId - The user's identifier
   * @param level - The verification level to check
   * @returns boolean
   */
  export const hasVerificationLevel = (
    userId: string, 
    level: EVerificationLevel
  ): boolean => {
    const status = getVerificationStatus(userId);
    if (!status) return false;
    
    const levelOrder = [
      EVerificationLevel.NONE,
      EVerificationLevel.EMAIL,
      EVerificationLevel.IDENTITY,
      EVerificationLevel.FULL
    ];
    
    return levelOrder.indexOf(status.currentLevel) >= levelOrder.indexOf(level);
  };
  
  /**
   * Helper to get the next required verification step
   * @param userId - The user's identifier
   * @returns EVerificationLevel | undefined
   */
  export const getNextVerificationStep = (
    userId: string
  ): EVerificationLevel | undefined => {
    const status = getVerificationStatus(userId);
    return status?.nextRequiredStep;
  };
  
  /**
 * Type guard to check if a value is a valid IVerificationStep
 * @param value - The value to check
 * @returns boolean
 */
export const isVerificationStep = (
    value: unknown
  ): value is IVerificationStep => {
    return (
      typeof value === 'object' &&
      value !== null &&
      'level' in value &&
      'status' in value &&
      Object.values(EVerificationLevel).includes((value as IVerificationStep).level) &&
      Object.values(EVerificationStepStatus).includes((value as IVerificationStep).status)
    );
  };
  
  /**
   * Helper to get all verification steps for a user
   * @param userId - The user's identifier
   * @returns IVerificationStep[]
   */
  export const getVerificationSteps = <T extends IVerificationStep>(
    userId: string
  ): T[] => {
    const status = getVerificationStatus(userId);
    return (status?.steps || []) as T[];
  };
  
  /**
   * Helper to check if a specific step is completed
   * @param userId - The user's identifier
   * @param level - The verification level to check
   * @returns boolean
   */
  export const isStepCompleted = (
    userId: string, 
    level: EVerificationLevel
  ): boolean => {
    const steps = getVerificationSteps(userId);
    const step = steps.find(s => s.level === level);
    return step?.status === EVerificationStepStatus.COMPLETED;
  };
  
  /**
   * Helper to simulate a verification delay
   * @param ms - Delay in milliseconds
   * @returns Promise<void>
   */
  export const simulateVerificationDelay = (ms: number = 1500): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  
  /**
   * Helper to simulate a verification error
   * @throws Error
   */
  export const simulateVerificationError = (): never => {
    throw new Error('Erreur de vérification : Service temporairement indisponible');
  };