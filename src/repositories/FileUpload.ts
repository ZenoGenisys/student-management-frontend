import { postMultiPart } from './AxiosClient';

/**
 * Interface for file upload request item
 */
export interface FileUploadItem {
  name: string;
  file: File;
}

/**
 * Interface for file upload response
 */
export interface FileUploadResponse {
  fileName: string;
  fileKey: string;
  fileUrl: string;
  contentType: string;
  fileSize: number;
  uploadedAt: string;
  message: string;
  success: boolean;
}

/**
 * Interface for multiple file upload response
 */
export interface MultiFileUploadResponse {
  files: FileUploadResponse[];
  totalFiles: number;
  successfulUploads: number;
  failedUploads: number;
  message: string;
}

export const uploadFiles = async (files: FileUploadItem[]): Promise<MultiFileUploadResponse> => {
  const formData = new FormData();

  // Append each file and its custom name
  for (const item of files) {
    formData.append('files', item.file);
    formData.append('names', item.name);
  }

  return postMultiPart<MultiFileUploadResponse>('api/files/upload', 'POST', formData, null);
};
