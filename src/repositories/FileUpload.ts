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

/**
 * Upload multiple files to S3
 * @param files Array of file upload items with custom names
 * @param onProgress Optional callback for upload progress
 * @returns Promise with upload response
 */
export const uploadFiles = async (
  files: FileUploadItem[],
  onProgress?: (progressEvent: any) => void,
): Promise<MultiFileUploadResponse> => {
  const formData = new FormData();

  // Append each file and its custom name
  for (const item of files) {
    formData.append('files', item.file);
    formData.append('names', item.name);
  }

  return postMultiPart<MultiFileUploadResponse>(
    'api/files/upload',
    'POST',
    formData as any,
    null,
    onProgress,
  );
};

/**
 * Upload a single file to S3
 * @param file The file to upload
 * @param name Custom name for the file (optional)
 * @param onProgress Optional callback for upload progress
 * @returns Promise with upload response
 */
export const uploadSingleFile = async (
  file: File,
  name?: string,
  onProgress?: (progressEvent: any) => void,
): Promise<FileUploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  if (name) {
    formData.append('name', name);
  }

  return postMultiPart<FileUploadResponse>(
    'api/files/upload-single',
    'POST',
    formData as any,
    null,
    onProgress,
  );
};

/**
 * Delete a file from S3
 * @param fileKey The S3 object key to delete
 * @returns Promise with deletion response
 */
export const deleteFile = async (
  fileKey: string,
): Promise<{ success: boolean; message: string; fileKey: string }> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/files/${encodeURIComponent(fileKey)}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return response.json();
};

/**
 * Check if file exists in S3
 * @param fileKey The S3 object key to check
 * @returns Promise with existence check response
 */
export const checkFileExists = async (
  fileKey: string,
): Promise<{ exists: boolean; fileKey: string; fileUrl: string | null }> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/files/exists/${encodeURIComponent(fileKey)}`,
  );
  return response.json();
};
