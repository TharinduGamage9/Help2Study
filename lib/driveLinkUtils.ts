/**
 * Formats Google Drive links to ensure they open correctly
 * @param link - The Google Drive link
 * @returns Formatted link that will open correctly
 */
export function formatDriveLink(link: string): string {
  if (!link) return link;

  // Trim whitespace
  link = link.trim();

  try {
    // Handle relative URLs or malformed URLs
    if (!link.startsWith('http://') && !link.startsWith('https://')) {
      return link;
    }

    const url = new URL(link);
    
    // For folder links, ensure they have the proper format
    if (url.pathname.includes('/drive/folders/')) {
      // Extract folder ID - more flexible regex to catch edge cases
      const folderMatch = url.pathname.match(/\/drive\/folders\/([a-zA-Z0-9_-]+)/);
      if (folderMatch && folderMatch[1]) {
        const folderId = folderMatch[1];
        // Return properly formatted folder link
        return `https://drive.google.com/drive/folders/${folderId}?usp=sharing`;
      }
    }
    
    // For file links - handle /file/d/ID, /file/d/ID/view, /file/d/ID/preview, /file/d/ID/edit
    if (url.pathname.includes('/file/d/')) {
      // Extract file ID - more flexible to handle various ID lengths
      // Match the ID even if it's short or has special characters
      const fileMatch = url.pathname.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (fileMatch && fileMatch[1]) {
        const fileId = fileMatch[1];
        // Use /view format for standard compatibility - works for PDFs and all file types
        // This format ensures files open correctly in Google Drive viewer
        // Note: We don't validate length as some valid IDs can be shorter
        return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
      }
    }

    // For open?id= format (legacy) - this format works for both files and folders
    if (url.searchParams.has('id')) {
      const id = url.searchParams.get('id');
      if (id && id.trim().length > 0) {
        // Keep the open?id= format as it works for both files and folders
        // Just ensure sharing parameter is present
        return `https://drive.google.com/open?id=${encodeURIComponent(id.trim())}&usp=sharing`;
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
        if (uspValue === 'drive_link' || uspValue === 'drive_web') {
          url.searchParams.set('usp', 'sharing');
        }
      } else {
        // Ensure sharing parameter is present
        url.searchParams.set('usp', 'sharing');
      }
      
      // Remove any other problematic parameters that might interfere
      url.searchParams.delete('resourcekey');
      
      return url.toString();
    }

    // Return the original link if we can't format it
    return link;
  } catch (error) {
    // If URL parsing fails, try to extract file/folder ID manually
    try {
      // Try to extract file ID from malformed URLs
      const fileIdMatch = link.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (fileIdMatch && fileIdMatch[1]) {
        return `https://drive.google.com/file/d/${fileIdMatch[1]}/view?usp=sharing`;
      }
      
      // Try to extract folder ID from malformed URLs
      const folderIdMatch = link.match(/\/drive\/folders\/([a-zA-Z0-9_-]+)/);
      if (folderIdMatch && folderIdMatch[1]) {
        return `https://drive.google.com/drive/folders/${folderIdMatch[1]}?usp=sharing`;
      }
      
      // Try to extract ID from open?id= format
      const openIdMatch = link.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (openIdMatch && openIdMatch[1]) {
        return `https://drive.google.com/open?id=${openIdMatch[1]}&usp=sharing`;
      }
    } catch (fallbackError) {
      console.error('Error in fallback formatting:', fallbackError);
    }
    
    // If all else fails, return original link
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

