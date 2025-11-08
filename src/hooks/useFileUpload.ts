import { useCallback, useMemo } from 'react';
import type { CreateStaff, CreateStudent, LevelDetails } from '../types';
import { uploadFiles, type FileUploadItem } from '../repositories/FileUpload';

const useFileUpload = () => {
  const handleFileUpload = useCallback(async (values: CreateStaff | CreateStudent) => {
    const fileItems: FileUploadItem[] = [];
    const targets: Array<{ kind: 'profile' } | { kind: 'level'; idx: number }> = [];

    // 1) profileUrl
    if (values?.profileUrl && typeof values?.profileUrl !== 'string') {
      fileItems.push({
        name: `profile-${values.name ?? 'user'}-${Date.now()}`,
        file: values.profileUrl,
      } as FileUploadItem);
      targets.push({ kind: 'profile' });
    }

    // 2) levelDetails documents
    if (Array.isArray(values.levelDetails)) {
      values.levelDetails.forEach((ld, idx) => {
        // if document is a File (or Blob) then queue it for upload
        const doc = ld.document;
        if (doc && typeof doc !== 'string') {
          fileItems.push({
            name: `level-${idx}-${values.name ?? 'user'}-${Date.now()}`,
            file: doc,
          } as FileUploadItem);
          targets.push({ kind: 'level', idx });
        }
      });
    }

    // If nothing to upload, return original values unchanged
    if (fileItems.length === 0) {
      return values;
    }

    // 3) call upload API once
    const response = await uploadFiles(fileItems);
    // assume response.files is an array in same order as fileItems
    // and each file entry has fileUrl property (as in your snippet)
    const uploadedFiles = response?.files ?? [];

    // 4) map uploaded urls back to correct fields using targets
    for (let i = 0; i < uploadedFiles.length; i++) {
      const uploaded = uploadedFiles[i];
      const target = targets[i];
      const url = uploaded?.fileUrl ?? null;

      if (!target) continue;

      if (target.kind === 'profile') {
        values.profileUrl = url;
      } else if (target.kind === 'level') {
        // ensure levelDetails exists and index is valid
        if (!values.levelDetails) values.levelDetails = [];
        // preserve other fields of LevelDetails
        const existing =
          values.levelDetails[target.idx] ??
          ({
            level: target.idx + 1,
            date: null,
            document: null,
            remarks: '',
          } as LevelDetails);

        existing.document = url;
        values.levelDetails[target.idx] = existing;
      }
    }

    return values;
  }, []);

  return useMemo(
    () => ({
      handleFileUpload,
    }),
    [handleFileUpload],
  );
};

export default useFileUpload;
