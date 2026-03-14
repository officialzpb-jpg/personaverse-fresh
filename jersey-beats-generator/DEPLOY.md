# Jersey Beats Generator - Deployment Guide

## Quick Start (Local Development)

### 1. Backend Setup

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt

# Create .env file
copy .env.example .env
# Edit .env and add your REPLICATE_API_TOKEN

# Run server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will be at `http://localhost:5173`
Backend at `http://localhost:8000`

---

## Deployment Options

### Option A: Render.com (Recommended for Backend)

1. Push code to GitHub
2. Connect Render.com to your repo
3. Create Web Service:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Environment: Python 3.11
4. Add environment variable: `REPLICATE_API_TOKEN`
5. Deploy

**Cost**: $7/month (always-on) or free (sleeps after 15min)

### Option B: Railway.app (Alternative)

Similar process to Render. Good free tier but sleeps.

### Option C: Vercel (Frontend Only)

```bash
cd frontend
npm run build
vercel --prod
```

**Cost**: Free tier sufficient

---

## Getting Replicate API Token

1. Go to https://replicate.com
2. Sign up / Log in
3. Go to Account Settings → API Tokens
4. Create new token
5. Copy to your `.env` file

---

## Cost Breakdown (Realistic Usage)

| Component | Monthly Cost |
|-----------|-------------|
| Render (always-on) | $7 |
| Replicate API (~100 gens) | $10-20 |
| Vercel (frontend) | $0 |
| **Total** | **~$17-27/month** |

---

## Next Steps / Roadmap

- [ ] Integrate Demucs for real stem separation
- [ ] Fine-tune MusicGen on Jersey Club dataset
- [ ] Add user accounts and beat history
- [ ] Stripe integration for paid tiers
- [ ] TikTok direct sharing

---

## Troubleshooting

**CORS errors**: Make sure backend CORS allows your frontend URL

**Replicate errors**: Check API token is valid and has credits

**Audio not playing**: Check browser console for mixed content errors (http vs https)
