/**
 * Example usage of the File Upload API from frontend
 * This file demonstrates various ways to use the file upload feature
 */

import {
  uploadFiles,
  uploadSingleFile,
  deleteFile,
  checkFileExists,
  type FileUploadItem,
} from '../repositories/FileUpload';

// ============================================
// Example 1: Upload Multiple Files with Custom Names
// ============================================
export const exampleMultipleFilesUpload = async (files: FileList) => {
  try {
    // Prepare files with custom names
    const fileItems: FileUploadItem[] = Array.from(files).map((file, index) => ({
      name: `document-${Date.now()}-${index}`, // Custom name
      file: file,
    }));

    // Upload with progress tracking
    const response = await uploadFiles(fileItems, (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      console.log(`Upload progress: ${percentCompleted}%`);
    });

    console.log('Upload successful:', response);
    console.log(`Uploaded ${response.successfulUploads} of ${response.totalFiles} files`);

    // Access individual file URLs
    response.files.forEach((file) => {
      if (file.success) {
        console.log(`File ${file.fileName} uploaded to: ${file.fileUrl}`);
      } else {
        console.error(`File ${file.fileName} failed: ${file.message}`);
      }
    });

    return response;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};

// ============================================
// Example 2: Upload Single File
// ============================================
export const exampleSingleFileUpload = async (file: File, customName?: string) => {
  try {
    const response = await uploadSingleFile(
      file,
      customName || `file-${Date.now()}`,
      (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Upload progress: ${percentCompleted}%`);
      },
    );

    console.log('File uploaded successfully:', response.fileUrl);
    return response;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};

// ============================================
// Example 3: Upload User Profile Picture
// ============================================
export const uploadProfilePicture = async (file: File, userId: string) => {
  try {
    // Use user ID in filename for easy identification
    const customName = `profile-${userId}`;

    const response = await uploadSingleFile(file, customName);

    // Save the file URL to database/state
    console.log('Profile picture URL:', response.fileUrl);

    return {
      url: response.fileUrl,
      key: response.fileKey,
    };
  } catch (error) {
    console.error('Failed to upload profile picture:', error);
    throw error;
  }
};

// ============================================
// Example 4: Upload Documents with Validation
// ============================================
export const uploadDocuments = async (files: FileList) => {
  try {
    // Validate files before upload
    const validFiles: FileUploadItem[] = [];
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword'];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Check file size
      if (file.size > maxSize) {
        console.error(`File ${file.name} exceeds 10MB limit`);
        continue;
      }

      // Check file type
      if (!allowedTypes.includes(file.type)) {
        console.error(`File ${file.name} has unsupported type: ${file.type}`);
        continue;
      }

      validFiles.push({
        name: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
        file: file,
      });
    }

    if (validFiles.length === 0) {
      throw new Error('No valid files to upload');
    }

    const response = await uploadFiles(validFiles);
    return response;
  } catch (error) {
    console.error('Document upload failed:', error);
    throw error;
  }
};

// ============================================
// Example 5: React Component with File Upload
// ============================================
export const FileUploadComponent = () => {
  const [uploading, setUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [uploadedFiles, setUploadedFiles] = React.useState<string[]>([]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const fileItems: FileUploadItem[] = Array.from(files).map((file, index) => ({
        name: `upload-${Date.now()}-${index}`,
        file: file,
      }));

      const response = await uploadFiles(fileItems, (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percent);
      });

      // Extract successful file URLs
      const urls = response.files.filter((f) => f.success).map((f) => f.fileUrl);

      setUploadedFiles(urls);
      alert(`Successfully uploaded ${response.successfulUploads} files!`);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
      event.target.value = ''; // Reset input
    }
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        disabled={uploading}
        accept="image/*,.pdf,.doc,.docx"
      />

      {uploading && (
        <div>
          <p>Uploading... {uploadProgress}%</p>
          <progress value={uploadProgress} max="100" />
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div>
          <h3>Uploaded Files:</h3>
          <ul>
            {uploadedFiles.map((url, index) => (
              <li key={index}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  File {index + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// ============================================
// Example 6: Delete Uploaded File
// ============================================
export const deleteUploadedFile = async (fileKey: string) => {
  try {
    const response = await deleteFile(fileKey);

    if (response.success) {
      console.log('File deleted successfully');
      return true;
    } else {
      console.error('Failed to delete file:', response.message);
      return false;
    }
  } catch (error) {
    console.error('Delete error:', error);
    return false;
  }
};

// ============================================
// Example 7: Check if File Exists Before Upload
// ============================================
export const checkAndUpload = async (file: File, fileKey: string) => {
  try {
    // Check if file already exists
    const existsResponse = await checkFileExists(fileKey);

    if (existsResponse.exists) {
      const overwrite = confirm('File already exists. Do you want to overwrite it?');

      if (!overwrite) {
        return existsResponse.fileUrl;
      }

      // Delete existing file
      await deleteFile(fileKey);
    }

    // Upload new file
    const uploadResponse = await uploadSingleFile(file, fileKey);
    return uploadResponse.fileUrl;
  } catch (error) {
    console.error('Check and upload error:', error);
    throw error;
  }
};

// ============================================
// Example 8: Upload with Custom Metadata
// ============================================
export const uploadWithMetadata = async (
  file: File,
  metadata: {
    userId: string;
    category: string;
    description: string;
  },
) => {
  try {
    // Create a meaningful filename with metadata
    const timestamp = Date.now();
    const customName = `${metadata.category}-${metadata.userId}-${timestamp}`;

    const response = await uploadSingleFile(file, customName);

    // Save metadata to your database
    const fileRecord = {
      fileUrl: response.fileUrl,
      fileKey: response.fileKey,
      fileName: response.fileName,
      userId: metadata.userId,
      category: metadata.category,
      description: metadata.description,
      uploadedAt: response.uploadedAt,
    };

    // await saveToDatabase(fileRecord);

    return fileRecord;
  } catch (error) {
    console.error('Upload with metadata failed:', error);
    throw error;
  }
};

// ============================================
// Example 9: Drag and Drop Upload
// ============================================
export const DragDropUploadComponent = () => {
  const [dragging, setDragging] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);

    const files = e.dataTransfer.files;
    if (files.length === 0) return;

    try {
      const fileItems: FileUploadItem[] = Array.from(files).map((file, index) => ({
        name: `drag-drop-${Date.now()}-${index}`,
        file: file,
      }));

      const response = await uploadFiles(fileItems);
      alert(`Uploaded ${response.successfulUploads} files successfully!`);
    } catch (error) {
      console.error('Drag and drop upload failed:', error);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        border: '2px dashed ' + (dragging ? '#4CAF50' : '#ccc'),
        padding: '40px',
        textAlign: 'center',
        backgroundColor: dragging ? '#f0f0f0' : 'white',
      }}
    >
      <p>Drag and drop files here</p>
    </div>
  );
};

// ============================================
// Example 10: Bulk Upload with Error Handling
// ============================================
export const bulkUploadWithRetry = async (files: FileList, maxRetries: number = 3) => {
  const results = {
    successful: [] as string[],
    failed: [] as { name: string; error: string }[],
  };

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    let attempts = 0;
    let uploaded = false;

    while (attempts < maxRetries && !uploaded) {
      try {
        const response = await uploadSingleFile(file, `bulk-${Date.now()}-${i}`);
        results.successful.push(response.fileUrl);
        uploaded = true;
      } catch (error) {
        attempts++;
        console.error(`Attempt ${attempts} failed for ${file.name}:`, error);

        if (attempts === maxRetries) {
          results.failed.push({
            name: file.name,
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }
    }
  }

  return results;
};

// ============================================
// Example 11: FormData Usage (Alternative Method)
// ============================================
export const uploadUsingFormData = async (files: FileList) => {
  const formData = new FormData();

  // Add multiple files
  Array.from(files).forEach((file, index) => {
    formData.append('files', file);
    formData.append('names', `custom-name-${index}`);
  });

  try {
    const response = await fetch('http://localhost:8080/api/files/upload', {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type, let browser set it with boundary
        Authorization: 'Bearer YOUR_TOKEN_HERE',
      },
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('FormData upload failed:', error);
    throw error;
  }
};

// Note: Add `import React from 'react';` at the top of your actual component file
