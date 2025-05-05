import { 
    IDocumentUploadResult, 
    EDocumentType, 
    EDocumentStatus 
  } from '../../types/api.types';
  
  /**
   * Uploaded documents for users
   */
  export const mockDocuments = {
    // Documents for the verified user
    'user-2': [
      {
        documentId: 'doc-1',
        type: EDocumentType.ID_CARD,
        status: EDocumentStatus.APPROVED,
        uploadedAt: '2024-03-05T10:00:00Z',
        reviewEstimate: '24 heures'
      },
      {
        documentId: 'doc-2',
        type: EDocumentType.RESIDENCE_PROOF,
        status: EDocumentStatus.APPROVED,
        uploadedAt: '2024-03-06T11:00:00Z',
        reviewEstimate: '48 heures'
      }
    ] as IDocumentUploadResult[],
    
    // Documents for the premium user
    'user-3': [
      {
        documentId: 'doc-3',
        type: EDocumentType.PASSPORT,
        status: EDocumentStatus.APPROVED,
        uploadedAt: '2023-09-01T09:00:00Z',
        reviewEstimate: '24 heures'
      },
      {
        documentId: 'doc-4',
        type: EDocumentType.DRIVER_LICENSE,
        status: EDocumentStatus.APPROVED,
        uploadedAt: '2023-09-02T14:00:00Z',
        reviewEstimate: '24 heures'
      },
      {
        documentId: 'doc-5',
        type: EDocumentType.RESIDENCE_PROOF,
        status: EDocumentStatus.APPROVED,
        uploadedAt: '2023-09-03T10:00:00Z',
        reviewEstimate: '48 heures'
      }
    ] as IDocumentUploadResult[],
    
    // Partially verified documents
    'user-5': [
      {
        documentId: 'doc-6',
        type: EDocumentType.ID_CARD,
        status: EDocumentStatus.PENDING,
        uploadedAt: '2024-04-20T15:00:00Z',
        reviewEstimate: '24-48 heures'
      }
    ] as IDocumentUploadResult[]
  };
  
  /**
   * Rejected document for testing
   * Used for testing rejection cases
   */
  export const mockRejectedDocument: IDocumentUploadResult = {
    documentId: 'doc-rejected-1',
    type: EDocumentType.ID_CARD,
    status: EDocumentStatus.REJECTED,
    uploadedAt: '2024-04-15T09:00:00Z',
    reviewEstimate: 'Document rejeté - Qualité insuffisante'
  };
  
  /**
   * Expired document for testing
   * Used for testing expiration cases
   */
  export const mockExpiredDocument: IDocumentUploadResult = {
    documentId: 'doc-expired-1',
    type: EDocumentType.PASSPORT,
    status: EDocumentStatus.EXPIRED,
    uploadedAt: '2023-01-01T10:00:00Z',
    reviewEstimate: 'Document expiré - Renouvellement requis'
  };
  
  /**
   * Document with corrupted data
   * Used for testing error handling
   */
  export const mockCorruptedDocument: IDocumentUploadResult = {
    documentId: '',  // Empty ID
    type: '' as EDocumentType,  // Invalid type
    status: '' as EDocumentStatus,  // Invalid status
    uploadedAt: 'invalid-date',  // Invalid date
    reviewEstimate: ''
  };
  
  /**
   * Map of documents by user
   */
  export const mockDocumentsMap = new Map<string, IDocumentUploadResult[]>(
    Object.entries(mockDocuments)
  );
  
  /**
   * Possible document upload results
   */
  export const mockDocumentUploadResults = {
    success: {
      documentId: generateDocumentId(),
      type: EDocumentType.ID_CARD,
      status: EDocumentStatus.PENDING,
      uploadedAt: new Date().toISOString(),
      reviewEstimate: '24-48 heures'
    } as IDocumentUploadResult,
    
    rejected: {
      documentId: generateDocumentId(),
      type: EDocumentType.ID_CARD,
      status: EDocumentStatus.REJECTED,
      uploadedAt: new Date().toISOString(),
      reviewEstimate: 'Document illisible - Veuillez soumettre une photo plus claire'
    } as IDocumentUploadResult,
    
    instantApproval: {
      documentId: generateDocumentId(),
      type: EDocumentType.PASSPORT,
      status: EDocumentStatus.APPROVED,
      uploadedAt: new Date().toISOString(),
      reviewEstimate: 'Approuvé automatiquement'
    } as IDocumentUploadResult,
    
    systemError: {
      documentId: generateDocumentId(),
      type: EDocumentType.ID_CARD,
      status: EDocumentStatus.PENDING,
      uploadedAt: new Date().toISOString(),
      reviewEstimate: 'Erreur système - Révision en attente'
    } as IDocumentUploadResult
  };
  
  /**
   * Document ID generator for new uploads
   * @returns string - Unique ID for a document
   */
  export function generateDocumentId(): string {
    return `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  export const createDocument = (
    type: EDocumentType,
    status: EDocumentStatus = EDocumentStatus.PENDING
  ): IDocumentUploadResult => ({
    // This function centralizes document creation to avoid 
    // code duplication and ensure that all created documents 
    // follow the same structure and default values
    documentId: generateDocumentId(),
    type,
    status,
    uploadedAt: new Date().toISOString(),
    reviewEstimate: '24-48 heures'
  });
  
  /**
   * Helper to retrieve a user's documents
   * @param userId - The user's identifier
   * @returns IDocumentUploadResult[]
   */
  export const getUserDocuments = (
    userId: string
  ): IDocumentUploadResult[] => {
    return mockDocumentsMap.get(userId) || [];
  };
  
  /**
   * Type guard to check if a value is a valid IDocumentUploadResult
   * @param value - The value to check
   * @returns boolean
   */
  export const isDocumentUploadResult = (
    value: unknown
  ): value is IDocumentUploadResult => {
    // This defensive approach prevents runtime errors by checking 
    // each property step by step, ensuring that the object 
    // exactly matches our IDocumentUploadResult interface
    if (typeof value !== 'object' || value === null) return false;
    
    const doc = value as Partial<IDocumentUploadResult>;
    
    return Boolean(
      doc.documentId &&
      typeof doc.documentId === 'string' &&
      doc.type &&
      Object.values(EDocumentType).includes(doc.type) &&
      doc.status &&
      Object.values(EDocumentStatus).includes(doc.status) &&
      doc.uploadedAt &&
      typeof doc.uploadedAt === 'string'
    );
  };
  
  /**
   * Helper to retrieve a specific document
   * @param userId - The user's identifier
   * @param documentId - The document's identifier
   * @returns IDocumentUploadResult | undefined
   */
  export const getDocumentById = (
    userId: string,
    documentId: string
  ): IDocumentUploadResult | undefined => {
    const documents = getUserDocuments(userId);
    return documents.find(doc => doc.documentId === documentId);
  };
  
  /**
   * Helper to filter documents by type
   * @param userId - The user's identifier
   * @param type - The document type
   * @returns IDocumentUploadResult[]
   */
  export const getDocumentsByType = (
    userId: string,
    type: EDocumentType
  ): IDocumentUploadResult[] => {
    const documents = getUserDocuments(userId);
    return documents.filter(doc => doc.type === type);
  };
  
  /**
   * Helper to filter documents by status
   * @param userId - The user's identifier
   * @param status - The document status
   * @returns IDocumentUploadResult[]
   */
  export const getDocumentsByStatus = (
    userId: string,
    status: EDocumentStatus
  ): IDocumentUploadResult[] => {
    const documents = getUserDocuments(userId);
    return documents.filter(doc => doc.status === status);
  };
  
  /**
   * Helper to check if a user has a specific approved document type
   * @param userId - The user's identifier
   * @param type - The document type
   * @returns boolean
   */
  export const hasApprovedDocument = (
    userId: string,
    type: EDocumentType
  ): boolean => {
    const documents = getDocumentsByType(userId, type);
    return documents.some(doc => doc.status === EDocumentStatus.APPROVED);
  };
  
  /**
   * Helper to get the total number of documents for a user
   * @param userId - The user's identifier
   * @returns number
   */
  export const getDocumentCount = (
    userId: string
  ): number => {
    return getUserDocuments(userId).length;
  };
  
  /**
   * Helper to simulate an upload delay
   * @param ms - Delay in milliseconds
   * @returns Promise<void>
   */
  export const simulateUploadDelay = (ms: number = 1000): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  
  /**
   * Helper to simulate an upload error
   * @throws Error
   */
  export const simulateUploadError = (): never => {
    throw new Error('Erreur de téléversement : Connexion instable');
  };
  
  /**
   * Helper to simulate document validation
   * @param type - The document type
   * @returns Promise<boolean>
   */
  export const simulateDocumentValidation = async (
    type: EDocumentType
  ): Promise<boolean> => {
    await simulateUploadDelay(500);
    
    // Simulation: passports have a higher approval rate
    if (type === EDocumentType.PASSPORT) {
      return Math.random() > 0.1; // 90% success
    }
    
    return Math.random() > 0.3; // 70% success for others
  };