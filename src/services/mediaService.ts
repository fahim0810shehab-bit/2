const getEnv = (key: string, _default?: string) => {
  const val = (import.meta as any).env[key];
  if (!val || val === 'undefined' || val === 'null' || val.trim() === '') {
    return _default;
  }
  return val;
};

const API_BASE_URL = getEnv('VITE_API_BASE_URL', 'https://api.seliseblocks.com');
const PROJECT_KEY = getEnv('VITE_X_BLOCKS_KEY');

export const mediaService = {
  uploadImage: async (file: File): Promise<string | null> => {
    try {
      // 1. Request a pre-signed upload URL from Selise
      const presignedRes = await fetch(`${API_BASE_URL}/uds/v1/Files/GetPreSignedUrlForUpload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'x-blocks-key': PROJECT_KEY
        },
        body: JSON.stringify({
          name: file.name,
          projectKey: PROJECT_KEY,
          itemId: '',
          metaData: '',
          accessModifier: 'Public',
          configurationName: 'Default',
          parentDirectoryId: '',
          tags: '',
          moduleName: 8 // DefaultConstruct = 8 (must be a number)
        })
      });

      if (!presignedRes.ok) {
        throw new Error('Failed to get presigned URL from Selise');
      }

      const data = await presignedRes.json();
      
      if (!data.isSuccess || !data.uploadUrl) {
        throw new Error('Invalid presigned URL response');
      }

      // 2. Upload the file directly to the Azure Blob via the presigned URL
      const uploadRes = await fetch(data.uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
          'x-ms-blob-type': 'BlockBlob' // Required for Azure blob uploads
        },
        body: file
      });

      if (!uploadRes.ok) {
        throw new Error('Failed to upload file to Azure Blob');
      }

      // 3. Return the public URL (stripped of SAS tokens)
      return data.uploadUrl.split('?')[0];
    } catch (e) {
      console.error('Media upload error:', e);
      return null;
    }
  }
};
