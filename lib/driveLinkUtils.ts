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
    
    // For file links - handle /file/d/ID, /file/d/ID/view, /file/d/ID/preview, /file/d/ID/edit
    if (url.pathname.includes('/file/d/')) {
      // Extract file ID (captures ID even if followed by /view, /preview, /edit, etc.)
      const fileMatch = url.pathname.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (fileMatch) {
        const fileId = fileMatch[1];
        // Use /view format for standard compatibility - works for PDFs and all file types
        // This format ensures files open correctly in Google Drive viewer
        return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
      }
    }

    // For open?id= format (legacy) - this format works for both files and folders
    if (url.searchParams.has('id')) {
      const id = url.searchParams.get('id');
      if (id) {
        // Keep the open?id= format as it works for both files and folders
        // Just ensure sharing parameter is present
        return `https://drive.google.com/open?id=${id}&usp=sharing`;
      }
    }

    // If it's already a valid Google Drive URL, ensure it has sharing parameter
    if (url.hostname === 'drive.google.com') {
      // Clean up the URL - remove any trailing slashes or unwanted path segments
      if (url.pathname.endsWith('/') && url.pathname.length > 1) {
        url.pathname = url.pathname.slice(0, -1);
      }
      
      // Normalize usp parameter - replace drive_link with sharing for better compatibility
      if (url.searchParams.has('usp')) {
        const uspValue = url.searchParams.get('usp');
        if (uspValue === 'drive_link') {
          url.searchParams.set('usp', 'sharing');
        }
      } else {
        // Ensure sharing parameter is present
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

