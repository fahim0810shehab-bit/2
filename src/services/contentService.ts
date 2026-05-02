import { VibeNode, SiteData } from '../types/vibe';
import { defaultRootNode } from '../utils/vibeDefaults';

const API_BASE_URL = (import.meta as any).env.VITE_API_BASE_URL || 'https://api.seliseblocks.com';
const BLOCKS_KEY = (import.meta as any).env.VITE_X_BLOCKS_KEY;
const PROJECT_SLUG = (import.meta as any).env.VITE_PROJECT_SLUG || 'vibesite';

// Assuming a content model named "websites" exists in Selise Content Block
const BASE_COLLECTION_URL = `${API_BASE_URL}/api/content/v1/projects/${PROJECT_SLUG}/collections/websites/records`;

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'x-blocks-key': BLOCKS_KEY,
  // If user auth depends on token, include Authorization header:
  // 'Authorization': `Bearer ${localStorage.getItem('access_token')}`
});

export const contentService = {
  getSiteData: async (userId: string): Promise<SiteData | null> => {
    try {
      const response = await fetch(`${BASE_COLLECTION_URL}?filter=user_id:eq:${userId}`, {
        headers: getHeaders()
      });
      if (!response.ok) throw new Error('API fetch failed');
      const data = await response.json();
      
      if (data && data.items && data.items.length > 0) {
        return data.items[0].payload as SiteData;
      }
    } catch (e) {
      console.error('Failed to fetch from Selise Content Block:', e);
    }
    return null;
  },

  getSiteDataByUsername: async (username: string): Promise<SiteData | null> => {
    try {
      const response = await fetch(`${BASE_COLLECTION_URL}?filter=username:eq:${username}`, {
        headers: getHeaders()
      });
      if (!response.ok) throw new Error('API fetch failed');
      const data = await response.json();
      
      if (data && data.items && data.items.length > 0) {
        return data.items[0].payload as SiteData;
      }
    } catch (e) {
      console.error('Failed to fetch from Selise Content Block:', e);
    }
    return null;
  },

  saveSiteData: async (payload: SiteData): Promise<void> => {
    // 1. Save to Selise Blocks
    try {
      // Check if it already exists to determine POST vs PUT
      const listResponse = await fetch(`${BASE_COLLECTION_URL}?filter=user_id:eq:${payload.user_id}`, {
        headers: getHeaders()
      });
      
      let existingRecordId = null;
      if (listResponse.ok) {
        const listData = await listResponse.json();
        if (listData.items && listData.items.length > 0) {
          existingRecordId = listData.items[0].id;
        }
      }

      if (existingRecordId) {
        // Update existing
        await fetch(`${BASE_COLLECTION_URL}/${existingRecordId}`, {
          method: 'PUT',
          headers: getHeaders(),
          body: JSON.stringify({ payload })
        });
      } else {
        // Create new
        await fetch(BASE_COLLECTION_URL, {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify({ payload })
        });
      }
    } catch (e) {
      console.error('Failed to save to Selise Content Block:', e);
      throw e;
    }
  },

  createDefaultSiteData: (userId: string, username: string): SiteData => ({
    user_id: userId,
    username,
    is_published: false,
    pages: [
      {
        id: 'page_home',
        name: 'Home',
        path: '/',
        rootNode: JSON.parse(JSON.stringify(defaultRootNode))
      }
    ]
  })
};
