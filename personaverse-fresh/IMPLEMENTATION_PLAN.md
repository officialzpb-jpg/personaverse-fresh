# PersonaVerse Implementation Plan

## ✅ COMPLETED

### 1. AI Personas (12 Total)
- [x] Viral Vince - Content Creator
- [x] Tech Titan - Entrepreneur  
- [x] Mindful Maya - Life Coach
- [x] Game Guru - Gaming Streamer
- [x] Dating Doctor - Relationship Coach
- [x] Code Wizard - Senior Developer
- [x] Fit Felix - Fitness Coach (NEW)
- [x] Chef Carlos - Professional Chef (NEW)
- [x] Lingua Lisa - Language Tutor (NEW)
- [x] Money Mike - Financial Advisor (NEW)
- [x] Travel Tara - Travel Guide (NEW)
- [x] Style Sam - Fashion Stylist (NEW)

### 2. Chat System
- [x] Real AI integration (OpenAI)
- [x] Personality-driven responses
- [x] Site assistant chat widget
- [x] Individual persona chat pages
- [x] Typing animation
- [x] Model selector (GPT-4, Claude, Gemini)

---

## 🚧 REMAINING FEATURES

## Feature 2: User Authentication

### Files to Create/Modify:

**1. Environment Variables (.env.local)**
```
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=postgresql://user:pass@localhost:5432/personaverse
```

**2. Update Signup Page** (`src/app/signup/page.tsx`)
- Create account form
- Email/password validation
- Auto-login after signup
- Redirect to dashboard

**3. Update Login Page** (`src/app/login/page.tsx`)
- Email/password form
- "Remember me" option
- Forgot password link
- Social login buttons (optional)

**4. Create Auth Middleware** (`src/middleware.ts`)
- Protect routes that require login
- Redirect unauthenticated users
- Handle session expiration

**5. Create Session Provider** (`src/components/providers/SessionProvider.tsx`)
- Wrap app with NextAuth session
- Provide user context throughout app

### Database Setup:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## Feature 3: Chat History

### Database Schema (Already in schema.prisma):
```prisma
model Chat {
  id        String   @id @default(cuid())
  userId    String
  personaId String
  title     String?
  messages  Json
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### Files to Create:

**1. API Route** (`src/app/api/chats/route.ts`)
- GET: List user's chats
- POST: Create new chat
- DELETE: Delete chat

**2. API Route** (`src/app/api/chats/[id]/route.ts`)
- GET: Get specific chat
- PUT: Update chat (add messages)

**3. Chat History Page** (`src/app/chats/page.tsx`)
- List of previous chats
- Group by persona
- Search/filter chats
- Delete chat option

**4. Update ChatInterface** (`src/components/chat/ChatInterface.tsx`)
- Auto-save messages to database
- Load previous chat if resuming
- Show chat title in header

---

## Feature 4: Persona Creator Improvements

### Files to Create/Modify:

**1. Enhanced Create Page** (`src/app/create/page.tsx`)
Current: Basic form
Needed:
- Avatar upload (image file)
- Voice selection dropdown
- Personality sliders (friendly ↔ professional, funny ↔ serious, etc.)
- Knowledge base upload (PDF, text files)
- Sample conversation generator
- Preview mode (test persona before publishing)

**2. API Route** (`src/app/api/personas/route.ts`)
- POST: Create custom persona
- GET: List user's personas
- Upload avatar to cloud storage (Cloudinary/AWS S3)

**3. Voice Selection Component** (`src/components/personas/VoiceSelector.tsx`)
- Integration with ElevenLabs or similar
- Voice preview
- Voice cloning option

**4. Knowledge Base Upload** (`src/components/personas/KnowledgeUpload.tsx`)
- Drag & drop file upload
- PDF parsing
- Text extraction
- Chunking for RAG (Retrieval Augmented Generation)

---

## Feature 5: Monetization

### Files to Create:

**1. Stripe Setup**
```bash
npm install stripe @stripe/stripe-js
```

**2. Environment Variables**
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**3. API Routes**
- `src/app/api/stripe/checkout/route.ts` - Create checkout session
- `src/app/api/stripe/webhook/route.ts` - Handle webhooks
- `src/app/api/stripe/portal/route.ts` - Customer portal

**4. Pricing Page Updates** (`src/app/pricing/page.tsx`)
- Stripe Checkout integration
- Plan comparison
- FAQ section

**5. Creator Dashboard** (`src/app/dashboard/page.tsx`)
- Earnings overview
- Subscriber count
- Chat usage stats
- Payout settings

**6. Database Schema Addition**
```prisma
model Subscription {
  id        String   @id @default(cuid())
  userId    String   @unique
  status    String   // active, canceled, past_due
  priceId   String
  currentPeriodEnd DateTime
  
  user User @relation(fields: [userId], references: [id])
}

model Payout {
  id        String   @id @default(cuid())
  userId    String
  amount    Decimal
  status    String   // pending, paid
  createdAt DateTime @default(now())
  
  user User @relation(fields: [userId], references: [id])
}
```

---

## Feature 6: Voice/Audio (Text-to-Speech)

### Options:

**Option A: ElevenLabs (Recommended)**
```bash
npm install elevenlabs
```
- High quality voices
- Voice cloning
- Per-persona voice selection

**Option B: OpenAI TTS**
- Cheaper
- Good quality
- Limited voice options

**Option C: Browser Native**
- Free
- Lower quality
- No customization

### Files to Create:

**1. TTS Service** (`src/lib/tts.ts`)
- ElevenLabs API integration
- Voice caching
- Audio playback management

**2. Audio Player Component** (`src/components/chat/AudioPlayer.tsx`)
- Play/pause button on messages
- Volume control
- Download audio option

**3. Update ChatInterface**
- Add speaker icon to AI messages
- Auto-play option in settings

---

## Feature 7: Analytics Dashboard

### Files to Create:

**1. Dashboard Page** (`src/app/dashboard/page.tsx`)
- Stats cards (total chats, unique users, revenue)
- Charts (chat volume over time, popular personas)
- Recent activity feed

**2. API Routes**
- `src/app/api/analytics/overview/route.ts`
- `src/app/api/analytics/chats/route.ts`
- `src/app/api/analytics/revenue/route.ts`

**3. Chart Components**
- `src/components/analytics/LineChart.tsx`
- `src/components/analytics/BarChart.tsx`
- `src/components/analytics/StatsCard.tsx`

**4. Database Views**
```sql
-- Chat statistics per persona
-- Revenue by time period
-- User retention metrics
```

---

## Feature 8: Social Features

### Files to Create:

**1. Share Functionality**
- `src/components/personas/ShareButton.tsx`
- Social media sharing (Twitter, Facebook, LinkedIn)
- Copy link to clipboard
- QR code generation

**2. Ratings & Reviews**
- `src/components/personas/RatingStars.tsx`
- `src/components/personas/ReviewCard.tsx`
- `src/app/api/reviews/route.ts`

**3. Follow System**
```prisma
model Follow {
  id          String @id @default(cuid())
  followerId  String
  followingId String
  
  @@unique([followerId, followingId])
}
```

**4. Public Profile Pages**
- `src/app/creators/[id]/page.tsx`
- Show all personas by creator
- Follow button
- Stats (followers, total chats)

---

## Feature 9: Developer API

### Files to Create:

**1. API Key Management**
- `src/app/api/keys/route.ts` - Generate/revoke API keys
- `src/app/settings/api/page.tsx` - Manage keys UI

**2. External API Routes**
- `src/app/api/v1/chat/route.ts` - External chat endpoint
- `src/app/api/v1/personas/route.ts` - List available personas

**3. Rate Limiting**
- `src/lib/rate-limit.ts`
- Redis or in-memory store
- Tier-based limits (free: 100/day, pro: 1000/day)

**4. Documentation**
- `src/app/developers/docs/page.tsx`
- Interactive API explorer
- Code examples (curl, JavaScript, Python)

**5. API Authentication**
- API key header validation
- `X-API-Key: your-key-here`

---

## Implementation Priority

### Phase 1 (Core - 1-2 weeks)
1. ✅ AI Personas (DONE)
2. Complete User Authentication
3. Chat History

### Phase 2 (Engagement - 2-3 weeks)
4. Persona Creator Improvements
5. Social Features (sharing, ratings)

### Phase 3 (Monetization - 2-3 weeks)
6. Stripe Integration
7. Creator Dashboard

### Phase 4 (Advanced - 3-4 weeks)
8. Voice/Audio
9. Analytics Dashboard
10. Developer API

---

## Testing Checklist

### Before Each Deploy:
- [ ] All personas respond with correct personality
- [ ] Chat widget works on all pages
- [ ] Authentication flows work
- [ ] API routes return correct data
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Dark mode works

### Load Testing:
- [ ] 100 concurrent users
- [ ] API rate limiting works
- [ ] Database connections stable

---

## Environment Variables Summary

```env
# Database
DATABASE_URL=postgresql://...

# Authentication
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000

# AI APIs
OPENAI_API_KEY=...
ANTHROPIC_API_KEY=...
GOOGLE_API_KEY=...

# Payments
STRIPE_SECRET_KEY=...
STRIPE_PUBLISHABLE_KEY=...
STRIPE_WEBHOOK_SECRET=...

# Voice (Optional)
ELEVENLABS_API_KEY=...

# Storage (Optional)
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```
