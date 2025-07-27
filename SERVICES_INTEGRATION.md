# Services Integration Guide

This document outlines the integration of Supabase and Cloudinary services in the Marconi Real Estate application.

## 🚀 Overview

The application has been enhanced with robust integrations for:
- **Supabase**: Database, authentication, and real-time functionality
- **Cloudinary**: Image upload, optimization, and management

## 🛠️ Environment Setup

### Required Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset_name
```

### Getting Credentials

#### Supabase
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project or select existing one
3. Go to Settings > API
4. Copy the URL and keys

#### Cloudinary
1. Go to [Cloudinary Console](https://console.cloudinary.com)
2. Copy your Cloud Name, API Key, and API Secret
3. Create an upload preset in Settings > Upload

## 📁 Architecture

### File Structure

```
lib/
├── supabase.ts          # Supabase client configuration
├── cloudinary.ts        # Client-side Cloudinary utilities
├── cloudinary-server.ts # Server-side Cloudinary functions
├── types.ts             # Centralized TypeScript types
├── env.ts               # Environment validation
└── image-utils.ts       # Image compression utilities

hooks/
└── use-realtime.ts      # Real-time subscription hooks

app/api/
├── upload/
│   ├── route.ts         # Single image upload
│   ├── multiple/route.ts # Multiple image upload
│   └── delete/route.ts  # Image deletion
└── properties/          # Property CRUD operations
```

## 🔧 Key Features

### 1. Image Upload & Management

#### Automatic Compression
- Images are automatically compressed before upload
- Target size: 500KB max per image
- Maintains aspect ratio and quality
- Fallback to original if compression fails

#### Multiple Formats Support
- JPEG, PNG, WebP supported
- Automatic format optimization in Cloudinary
- Client-side validation before upload

#### Deletion Handling
- Images deleted from Cloudinary when removed from forms
- Bulk deletion support
- Error handling with graceful fallbacks

### 2. Real-time Updates

#### Property Updates
```typescript
import { useRealtimeProperties } from '@/hooks/use-realtime'

const { data: properties } = useRealtimeProperties(initialProperties)
```

#### Lead Notifications
```typescript
import { useRealtimeNotifications } from '@/hooks/use-realtime'

const { notifications, unreadCount } = useRealtimeNotifications()
```

### 3. Error Handling

#### Environment Validation
- Automatic validation on startup
- Clear error messages for missing variables
- Graceful degradation for optional features

#### Service Health Checks
- Database connection validation
- Cloudinary configuration verification
- Runtime error boundaries

## 🎯 Usage Examples

### Image Upload with Compression

```typescript
import { compressImage } from '@/lib/image-utils'

const handleUpload = async (file: File) => {
  // Compress the image
  const result = await compressImage(file, {
    maxWidth: 1200,
    maxHeight: 800,
    quality: 0.9,
    maxSizeKB: 500
  })
  
  // Upload to server
  const formData = new FormData()
  formData.append('file', result.file)
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  })
}
```

### Property CRUD with Real-time

```typescript
import { PropertyService } from '@/services/properties'
import { useRealtimeProperties } from '@/hooks/use-realtime'

const PropertiesPage = () => {
  const [properties, setProperties] = useState([])
  
  // Real-time updates
  const { data: realtimeProperties } = useRealtimeProperties(properties)
  
  const createProperty = async (data) => {
    const newProperty = await PropertyService.createProperty(data)
    // Real-time will automatically update the UI
  }
}
```

### Optimized Image Display

```typescript
import { getOptimizedImageUrl } from '@/lib/cloudinary'

const PropertyCard = ({ property }) => {
  const imageUrl = getOptimizedImageUrl(property.images[0], {
    width: 400,
    height: 300,
    quality: 'auto',
    format: 'auto'
  })
  
  return <img src={imageUrl} alt={property.title} />
}
```

## 🔒 Security Features

### Server-side Operations
- Sensitive operations use service role key
- Client operations limited to anon key permissions
- Upload presets control client-side uploads

### Image Validation
- File type restrictions (JPEG, PNG, WebP only)
- Size limits (10MB original, 500KB compressed)
- Malicious file detection

### Environment Protection
- Secrets validated at startup
- Clear separation of client/server configs
- No sensitive data in client bundles

## 📊 Performance Optimizations

### Image Handling
- Automatic compression reduces bandwidth
- Progressive loading with placeholders
- Responsive image generation
- CDN delivery via Cloudinary

### Database Operations
- Efficient queries with proper indexing
- Real-time subscriptions for live updates
- Connection pooling and error recovery

### Caching Strategy
- Browser caching for images
- Query result caching
- Optimistic updates for better UX

## 🐛 Troubleshooting

### Common Issues

#### Environment Variables Not Loading
```bash
# Check if .env.local exists and has correct format
# Restart development server after changes
npm run dev
```

#### Cloudinary Upload Fails
- Verify upload preset exists and is unsigned
- Check API credentials in dashboard
- Ensure CORS settings allow your domain

#### Real-time Not Working
- Verify Supabase RLS policies
- Check browser console for connection errors
- Ensure real-time is enabled in Supabase project

### Debug Mode

Enable detailed logging:
```typescript
// In development
localStorage.setItem('debug', 'marconi:*')
```

## 🚀 Deployment Checklist

- [ ] Environment variables configured in production
- [ ] Cloudinary upload presets created
- [ ] Supabase RLS policies configured
- [ ] Database migrations applied
- [ ] Real-time features tested
- [ ] Image upload/deletion tested
- [ ] Error boundaries in place

## 📝 API Endpoints

### Upload APIs
- `POST /api/upload` - Single image upload
- `POST /api/upload/multiple` - Multiple image upload
- `DELETE /api/upload/delete` - Delete single image
- `POST /api/upload/delete` - Bulk delete images

### Property APIs
- `GET /api/properties` - List properties with filters
- `POST /api/properties` - Create property
- `PUT /api/properties/[id]` - Update property
- `DELETE /api/properties/[id]` - Delete property

### Response Formats

#### Upload Response
```json
{
  "success": true,
  "urls": ["https://res.cloudinary.com/..."],
  "uploads": [
    {
      "url": "https://res.cloudinary.com/...",
      "public_id": "marconi/properties/abc123",
      "width": 1200,
      "height": 800,
      "format": "jpg",
      "bytes": 245760
    }
  ]
}
```

## 🔄 Continuous Integration

The integration supports:
- Automated testing of upload flows
- Environment validation in CI/CD
- Health checks for external services
- Rollback capabilities for failed deployments

---

For more details on specific implementations, check the individual files mentioned in the architecture section.