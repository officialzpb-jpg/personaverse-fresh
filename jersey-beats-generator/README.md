# Jersey Beats Generator

AI-powered Jersey Club beat generator. Upload songs or describe vibes, get TikTok-ready Jersey beats.

## Architecture

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: FastAPI + Replicate API (MusicGen/Audio models)
- **Audio Processing**: Demucs (stem separation) + custom Jersey pattern engine
- **Deployment**: Render/Railway backend + Vercel frontend

## Quick Start

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Cost Estimate

- Replicate API: ~$0.10-0.50 per generation (pay-as-you-go)
- Render/Railway: $7-20/month (always-on)
- Vercel: Free tier sufficient
- **Total MVP**: ~$50-100/month at moderate usage
