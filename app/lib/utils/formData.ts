export const fileToBase64 = (file: File | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = () => {
      const result = reader.result as string | ArrayBuffer | null;
      if (!result) return resolve('');
      // if result is ArrayBuffer convert to base64
      if (typeof result === 'string') return resolve(result);
      const bytes = new Uint8Array(result as ArrayBuffer);
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      resolve(
        `data:${(file as any).type || 'application/octet-stream'};base64,${btoa(binary)}`
      );
    };
    reader.readAsDataURL(file as Blob);
  });
};

/**
 * Build FormData for file upload
 */
export const buildUploadFormData = (
  file: File,
  options?: {
    name?: string;
    folderId?: string;
    classGradeId?: string;
    classId?: string;
    subjectId?: string;
    metadata?: Record<string, any>;
  }
): FormData => {
  const formData = new FormData();
  formData.append('file', file);

  const appendField = (key: string, value: string | undefined) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  };

  appendField('name', options?.name);
  appendField('folderId', options?.folderId);
  appendField('classGradeId', options?.classGradeId);
  appendField('classId', options?.classId);
  appendField('subjectId', options?.subjectId);

  if (options?.metadata) {
    formData.append('metadata', JSON.stringify(options.metadata));
  }

  return formData;
};
