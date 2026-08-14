# Backend Resources Module Specification

## Overview
This document specifies the requirements for implementing a flexible resource management system with folder structure support and file uploads to local storage.

## Data Structure

### Resource Schema (Unstructured/Flexible)
```json
{
  "_id": "ObjectId",
  "name": "string (required)",
  "type": "enum ['folder', 'material'] (required)",
  "folderId": "ObjectId (optional - parent folder reference)",
  "classGradeId": "ObjectId (optional - associated class)",
  "subjectId": "ObjectId (optional - associated subject)",
  "fileUrl": "string (optional - for materials only)",
  "fileName": "string (optional - original file name)",
  "fileSize": "number (optional - in bytes)",
  "mimeType": "string (optional - file MIME type)",
  "uploadedBy": "ObjectId (reference to User)",
  "metadata": "object (flexible - any additional data)",
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "archived": "boolean (default: false)"
}
```

### Folder Schema Extension
```json
{
  "type": "folder",
  "name": "Folder Name",
  "parentFolderId": "ObjectId (optional - for nested folders)",
  "description": "string (optional)",
  "permissions": ["object (optional - future access control)"]
}
```

## API Endpoints

### 1. Create Folder
**POST** `/api/resources/folders`

**Request Body:**
```json
{
  "name": "Folder Name",
  "parentFolderId": "optional-parent-id",
  "classGradeId": "optional-class-id",
  "subjectId": "optional-subject-id",
  "metadata": {
    "description": "Optional description",
    "customField": "Any custom data"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "folder-id",
    "name": "Folder Name",
    "type": "folder",
    "folderId": null,
    "parentFolderId": "parent-id-if-nested",
    "createdAt": "2026-02-14T10:00:00Z"
  }
}
```

### 2. Upload File
**POST** `/api/resources/upload`

**Content-Type:** `multipart/form-data`

**Form Data:**
- `file`: File (required)
- `name`: string (optional - defaults to filename)
- `folderId`: string (optional - parent folder)
- `classGradeId`: string (optional)
- `subjectId`: string (optional)
- `metadata`: JSON string (optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "resource-id",
    "name": "Document.pdf",
    "type": "material",
    "fileUrl": "/uploads/resources/2026/02/uuid-Document.pdf",
    "fileName": "Document.pdf",
    "fileSize": 1048576,
    "mimeType": "application/pdf",
    "folderId": "optional-folder-id",
    "uploadedBy": "user-id",
    "createdAt": "2026-02-14T10:00:00Z"
  }
}
```

### 3. Get Resources
**GET** `/api/resources`

**Query Parameters:**
- `folderId`: string (optional - filter by folder, null for root)
- `classGradeId`: string (optional)
- `subjectId`: string (optional)
- `type`: enum ['folder', 'material'] (optional)
- `search`: string (optional - search by name)
- `page`: number (default: 1)
- `limit`: number (default: 20)
- `archived`: boolean (default: false)

**Response:**
```json
{
  "success": true,
  "data": {
    "resources": [
      {
        "_id": "resource-id",
        "name": "Resource Name",
        "type": "folder|material",
        "fileUrl": "url-if-material",
        "createdAt": "timestamp"
      }
    ],
    "meta": {
      "count": 10,
      "page": 1,
      "limit": 20,
      "totalPages": 1
    }
  }
}
```

### 4. Get Resource by ID
**GET** `/api/resources/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "resource-id",
    "name": "Resource Name",
    "type": "folder",
    "parentFolderId": "parent-id",
    "metadata": {},
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

### 5. Update Resource
**PATCH** `/api/resources/:id`

**Request Body:**
```json
{
  "name": "New Name",
  "folderId": "new-parent-folder-id",
  "metadata": {
    "customField": "Updated value"
  }
}
```

### 6. Delete Resource
**DELETE** `/api/resources/:id`

**Query Parameter:**
- `permanent`: boolean (default: false - soft delete)

**Response:**
```json
{
  "success": true,
  "message": "Resource deleted successfully"
}
```

### 7. Move Resource
**POST** `/api/resources/:id/move`

**Request Body:**
```json
{
  "targetFolderId": "new-parent-folder-id-or-null-for-root"
}
```

### 8. Download File
**GET** `/api/resources/:id/download`

**Response:**
- File stream with appropriate headers
- Content-Disposition: attachment
- Content-Type: file MIME type

## File Upload Storage

### Local Storage Configuration
```javascript
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Storage path structure: /uploads/resources/YYYY/MM/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const uploadPath = path.join(__dirname, '../uploads/resources', year.toString(), month);
    
    // Create directory if it doesn't exist
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename: uuid-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB max file size
  },
  fileFilter: function (req, file, cb) {
    // Add file type validation if needed
    cb(null, true);
  }
});
```

### Upload Directory Structure
```
/uploads/
  /resources/
    /2026/
      /02/
        uuid-document.pdf
        uuid-image.jpg
      /03/
        uuid-spreadsheet.xlsx
    /2025/
      /12/
        uuid-presentation.pptx
```

## Business Logic

### Folder Creation
1. Validate folder name (required, non-empty)
2. Check if parent folder exists (if parentFolderId provided)
3. Prevent circular references in nested folders
4. Store folder with type='folder'

### File Upload
1. Validate file (size, type if needed)
2. Generate unique filename
3. Store file in local filesystem
4. Create resource record with fileUrl pointing to stored file
5. Extract file metadata (size, MIME type)
6. Associate with folder if folderId provided

### File Download
1. Verify user has access to resource
2. Stream file from local storage
3. Set appropriate headers for download

### Folder Navigation
1. Support breadcrumb generation (parent chain)
2. Allow recursive folder queries
3. Support moving files/folders between folders

## Security Considerations

1. **Authentication**: All endpoints require authentication
2. **Authorization**: Check user permissions for:
   - Creating folders in specific contexts (class/subject)
   - Uploading files
   - Accessing/downloading files
   - Deleting resources
3. **File Validation**:
   - Validate file size
   - Scan for malicious content (optional)
   - Validate file types if restricted
4. **Path Traversal Prevention**: Sanitize all file paths
5. **Rate Limiting**: Limit upload frequency per user

## Database Indexes

```javascript
// Recommended indexes for performance
db.resources.createIndex({ type: 1, archived: 1 })
db.resources.createIndex({ folderId: 1, type: 1 })
db.resources.createIndex({ classGradeId: 1 })
db.resources.createIndex({ subjectId: 1 })
db.resources.createIndex({ uploadedBy: 1 })
db.resources.createIndex({ name: "text" }) // For text search
```

## Error Handling

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {}
  }
}
```

### Common Error Codes
- `FOLDER_NOT_FOUND`: Parent folder doesn't exist
- `FILE_TOO_LARGE`: Uploaded file exceeds size limit
- `INVALID_FILE_TYPE`: File type not allowed
- `CIRCULAR_REFERENCE`: Attempted to create circular folder structure
- `RESOURCE_NOT_FOUND`: Resource ID doesn't exist
- `UNAUTHORIZED`: User doesn't have access to resource
- `STORAGE_ERROR`: Failed to write file to disk

## Future Enhancements

1. **Versioning**: Keep file version history
2. **Sharing**: Share folders/files with specific users/groups
3. **Permissions**: Granular access control
4. **Cloud Storage**: Option to use S3/Cloud Storage instead of local
5. **Thumbnails**: Generate previews for images/PDFs
6. **Search**: Full-text search across file names and metadata
7. **Bulk Operations**: Upload/delete multiple files at once
8. **Recycle Bin**: Temporary storage for deleted items

## Testing Requirements

1. **Unit Tests**:
   - Folder creation validation
   - File upload validation
   - Path generation
   - Circular reference detection

2. **Integration Tests**:
   - Complete upload workflow
   - Folder hierarchy queries
   - Move operations
   - Delete operations

3. **Load Tests**:
   - Multiple concurrent uploads
   - Large file uploads
   - Deep folder hierarchies
