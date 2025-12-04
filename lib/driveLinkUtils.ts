/**
 * Formats Google Drive links to ensure they open correctly
 * @param link - The Google Drive link
 * @returns Formatted link that will open correctly
 */
export function formatDriveLink(link: string): string {
  if (!link) return link;

  try {
    // Handle relative URLs or malformed URLs
    if (!link.startsWith('http://') && !link.startsWith('https://')) {
      return link;
    }

    const url = new URL(link);
    
    // For folder links, ensure they have the proper format
    if (url.pathname.includes('/drive/folders/')) {
      // Extract folder ID
      const folderMatch = url.pathname.match(/\/drive\/folders\/([a-zA-Z0-9_-]+)/);
      if (folderMatch) {
        const folderId = folderMatch[1];
        // Return properly formatted folder link
        return `https://drive.google.com/drive/folders/${folderId}?usp=sharing`;
      }
    }
    
    // For file links
    if (url.pathname.includes('/file/d/')) {
      // Extract file ID
      const fileMatch = url.pathname.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (fileMatch) {
        const fileId = fileMatch[1];
        // Return properly formatted file link
        return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
      }
    }

    // For open?id= format (legacy)
    if (url.searchParams.has('id')) {
      const id = url.searchParams.get('id');
      if (id) {
        // Try folder format first
        return `https://drive.google.com/drive/folders/${id}?usp=sharing`;
      }
    }

    // If it's already a valid Google Drive URL, ensure it has sharing parameter
    if (url.hostname === 'drive.google.com') {
      if (!url.searchParams.has('usp')) {
        url.searchParams.set('usp', 'sharing');
      }
      return url.toString();
    }

    // Return the original link if we can't format it
    return link;
  } catch (error) {
    // If URL parsing fails, return original link
    console.error('Error formatting drive link:', error);
    return link;
  }
}

/**
 * Validates if a string is a valid Google Drive link
 * @param link - The link to validate
 * @returns true if it's a valid Google Drive link
 */
export function isValidDriveLink(link: string): boolean {
  if (!link) return false;
  
  try {
    const url = new URL(link);
    return url.hostname === 'drive.google.com' || 
           url.hostname === 'docs.google.com' ||
           url.hostname.includes('googleusercontent.com');
  } catch {
    return false;
  }
}

