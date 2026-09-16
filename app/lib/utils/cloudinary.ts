/**
 * Cloudinary Upload Helper
 * Handles client-side uploading of image files, document attachments,
 * and voice note audio recordings directly to Cloudinary.
 */

export type CloudinaryUploadResult = {
  url: string;
  publicId?: string;
  format?: string;
  resourceType?: string;
  bytes?: number;
};

export const uploadToCloudinary = async (
  fileOrBlob: File | Blob,
  fileName?: string,
  folder: string = 'schoolog_discussions'
): Promise<CloudinaryUploadResult | null> => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'schoolog';
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'schoolog_preset';

  try {
    const formData = new FormData();
    const name = fileName || (fileOrBlob instanceof File ? fileOrBlob.name : `voice-note-${Date.now()}.webm`);
    formData.append('file', fileOrBlob, name);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', folder);

    // Audio/Voice notes use 'video' or 'auto' resource type in Cloudinary API
    const isAudio = fileOrBlob.type.startsWith('audio/') || name.endsWith('.webm') || name.endsWith('.mp3') || name.endsWith('.wav');
    const resourceType = isAudio ? 'video' : 'auto';

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      console.warn('[Cloudinary] Upload response error:', await response.text());
      return null;
    }

    const data = await response.json();
    return {
      url: data.secure_url || data.url,
      publicId: data.public_id,
      format: data.format,
      resourceType: data.resource_type,
      bytes: data.bytes,
    };
  } catch (err) {
    console.error('[Cloudinary] Client upload exception:', err);
    return null;
  }
};
