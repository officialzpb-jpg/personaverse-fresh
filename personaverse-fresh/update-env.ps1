# Run this in PowerShell to update the DATABASE_URL in Vercel:

$env:VERCEL_TOKEN = (vercel whoami)

vercel env add DATABASE_URL --value "postgresql://postgres:[+?GhRhxD8Aa!ddk]@db.hjkrvrholyibdlcmxnyd.supabase.co:5432/postgres"
