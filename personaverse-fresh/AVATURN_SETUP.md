# Avaturn Integration Setup

## Step 1: Get Your API Credentials

1. Sign up at https://www.avaturn.me/
2. Go to Dashboard → API Keys
3. Copy your API key
4. Note your Avatar ID(s)

## Step 2: Add Environment Variables

Create a `.env.local` file in your project root:

```bash
# Avaturn Configuration
AVATURN_API_KEY=your_api_key_here
AVATURN_AVATAR_ID=your_default_avatar_id
```

## Step 3: API Routes (Already Created)

The following API routes are ready:

### Create Avatar from Photo
`POST /api/avaturn/create`

### Get Avatar GLB URL
`GET /api/avaturn/avatar/[id]`

### List Your Avatars
`GET /api/avaturn/avatars`

## Step 4: Usage in Components

```typescript
import { Avatar3D } from "@/components/avatar";

// Use Avaturn avatar
<Avatar3D 
  avatarUrl="https://api.avaturn.me/v1/avatars/YOUR_AVATAR_ID.glb"
  isSpeaking={isSpeaking}
/>
```

## Pricing

- **Free Tier:** 3 avatars, basic features
- **Pro:** $29/month - unlimited avatars
- **Enterprise:** Custom pricing

## Features Available

✅ Photo-to-avatar in 60 seconds
✅ Full body avatars
✅ GLB/GLTF export
✅ Customizable clothing
✅ Facial expressions
✅ Idle animations

## Next Steps

1. Get your API key from Avaturn
2. Add it to `.env.local`
3. Create your first avatar
4. Update the avatar URL in the component

Ready when you are!
