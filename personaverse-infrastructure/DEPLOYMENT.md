# PersonaVerse AI Infrastructure - Deployment Guide

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Redis (Upstash recommended)
- Vercel account
- API keys for AI providers

## Step 1: Database Setup

```bash
# Install PostgreSQL locally or use Railway/Supabase
# Create database
createdb personaverse

# Run migrations
npx prisma migrate dev
npx prisma generate
```

## Step 2: Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
DATABASE_URL="postgresql://..."
UPSTASH_REDIS_REST_URL="..."
UPSTASH_REDIS_REST_TOKEN="..."
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."
```

## Step 3: Local Testing

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Test AI routing
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Hello","model":"gpt-3.5-turbo"}'
```

## Step 4: Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## Step 5: Configure Vercel Environment

In Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add all variables from `.env.local`
3. Redeploy

## Step 6: Database Connection

Option A: Vercel Postgres (Easiest)
```bash
vercel postgres create
```

Option B: External PostgreSQL
- Use Railway, Supabase, or AWS RDS
- Add connection string to env vars

## Step 7: Redis Setup

1. Create Upstash account: https://upstash.com
2. Create Redis database
3. Copy REST URL and token to env vars

## Monitoring

### Cost Alerts
Set up alerts when:
- Daily cost > $100
- User spends > $10 in one session
- Error rate > 5%

### Dashboard Access
Admin dashboard at: `/admin/dashboard`
View real-time costs and usage

## Scaling Considerations

### Database
- Use connection pooling (PgBouncer)
- Enable read replicas for analytics
- Archive old request logs

### Redis
- Upgrade to larger instance if needed
- Enable persistence for critical data

### AI Providers
- Set up multiple provider accounts
- Implement circuit breaker pattern
- Cache responses aggressively

## Security Checklist

- [ ] Rate limiting enabled
- [ ] API keys rotated regularly
- [ ] Database encrypted at rest
- [ ] HTTPS only
- [ ] CORS configured properly
- [ ] Input validation on all endpoints
- [ ] Abuse detection active

## Troubleshooting

### High Costs
1. Check which users are expensive
2. Review model routing logic
3. Implement stricter caching
4. Lower token limits for free tier

### Slow Responses
1. Check Redis connection
2. Enable response caching
3. Use cheaper models for simple queries
4. Optimize database queries

### Rate Limit Errors
1. Check Redis connection
2. Verify rate limit config
3. Clear blocked IPs if needed
4. Adjust limits per tier

## Cost Optimization Tips

1. **Cache aggressively** - 80% of queries are repeats
2. **Route smartly** - Use cheap models for simple queries
3. **Limit tokens** - Set max response length per tier
4. **Batch requests** - Combine multiple user messages
5. **Monitor anomalies** - Block suspicious usage patterns

## Support

For issues:
- Check logs in Vercel dashboard
- Review Redis metrics in Upstash
- Monitor database performance
- Contact support@personaverse.space
