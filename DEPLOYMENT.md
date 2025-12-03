# Vercel Deployment Guide

This guide will help you deploy your portfolio to Vercel in production.

## Prerequisites

- ✅ GitHub repository: `https://github.com/JRodAmazing/JRodAmazing-Portfolio`
- ✅ Vercel CLI installed (version 48.5.0)
- ✅ Project is Next.js 16 with proper build configuration
- ⚠️ Need: OpenAI API key for AXIOM chatbot

## Option 1: Deploy via Vercel Dashboard (Recommended for First Deployment)

### Step 1: Sign in to Vercel
1. Go to [https://vercel.com](https://vercel.com)
2. Click "Sign Up" or "Login"
3. Choose "Continue with GitHub" (recommended)

### Step 2: Import Your Repository
1. Click "Add New..." → "Project"
2. In "Import Git Repository", find `JRodAmazing-Portfolio`
3. Click "Import"

### Step 3: Configure Project
Vercel will auto-detect Next.js settings. Review:

**Framework Preset:** Next.js ✓
**Root Directory:** `./` ✓
**Build Command:** `next build` ✓
**Output Directory:** `.next` ✓
**Install Command:** `npm install` ✓

### Step 4: Add Environment Variables
Click "Environment Variables" section and add:

```
Name: OPENAI_API_KEY
Value: [Your OpenAI API Key - starts with sk-...]
Environment: Production, Preview, Development (select all)
```

**⚠️ IMPORTANT:** You need to add your OpenAI API key for the AXIOM chatbot to work.

### Step 5: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. Vercel will provide your live URL (e.g., `your-portfolio.vercel.app`)

### Step 6: Set Up Custom Domain (Optional)
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain (e.g., `jrodroden.com`)
4. Follow DNS configuration instructions

---

## Option 2: Deploy via Vercel CLI

### Step 1: Login to Vercel
```bash
vercel login
```

This will open your browser to authenticate.

### Step 2: Navigate to Project
```bash
cd C:\Users\jcrod\JRodAmazing-Portfolio
```

### Step 3: Set Environment Variable
```bash
# Add OpenAI API key to Vercel project
vercel env add OPENAI_API_KEY
```

When prompted:
- Select: "Production, Preview, Development" (all environments)
- Paste your OpenAI API key

### Step 4: Deploy to Production
```bash
vercel --prod
```

The CLI will:
1. Build your project
2. Upload to Vercel
3. Return your production URL

### Step 5: View Deployment
```bash
vercel inspect
```

Or visit: [https://vercel.com/dashboard](https://vercel.com/dashboard)

---

## Post-Deployment Checklist

### ✅ Verify Deployment
- [ ] Portfolio loads at Vercel URL
- [ ] All animations work (GSAP scroll triggers)
- [ ] Light/dark mode toggle functions
- [ ] AXIOM chatbot responds (requires API key)
- [ ] Resume downloads correctly (PDF)
- [ ] Featured Builds links work
- [ ] Contact form/section displays

### ✅ Test AXIOM Chatbot
1. Open chat panel
2. Try quick action: "📄 Get Resume"
3. Ask a question: "Tell me about your experience"
4. Verify streaming responses work

**If chatbot doesn't work:**
- Check environment variable is set: `OPENAI_API_KEY`
- Verify API key is valid in OpenAI dashboard
- Check Vercel Function logs for errors

### ✅ Performance Check
Run Lighthouse audit:
1. Open DevTools (F12)
2. Navigate to "Lighthouse" tab
3. Run audit
4. Target scores:
   - Performance: 90+
   - Accessibility: 95+
   - Best Practices: 95+
   - SEO: 100

### ✅ Mobile Testing
Test on:
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Tablet views
- [ ] Responsive breakpoints

---

## Environment Variables Reference

### Required
- `OPENAI_API_KEY` - For AXIOM chatbot functionality
  - Get from: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
  - Format: `sk-proj-...` (starts with sk-proj or sk-)

### Optional (if you add features later)
- `RESEND_API_KEY` - If you implement contact form email
- `DATABASE_URL` - If you add analytics database
- `NEXT_PUBLIC_GA_ID` - If you add Google Analytics

---

## Continuous Deployment

Once deployed, Vercel automatically:
- ✅ Deploys every push to `main` branch (production)
- ✅ Creates preview deployments for pull requests
- ✅ Runs builds in isolated environments
- ✅ Provides instant rollback if needed

### To Update Your Site:
```bash
# Make changes locally
git add .
git commit -m "Update portfolio content"
git push origin main

# Vercel automatically deploys in ~2 minutes
```

---

## Troubleshooting

### Build Fails
**Error:** "Module not found"
**Fix:**
```bash
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push origin main
```

### Chatbot Not Working
**Error:** "Failed to fetch"
**Fix:**
1. Check Vercel dashboard → Settings → Environment Variables
2. Verify `OPENAI_API_KEY` is set for Production
3. Redeploy: Deployments → Latest → "Redeploy"

### Resume Download Not Working
**Error:** "404 Not Found"
**Fix:**
- Verify `public/Justin_Roden_Resume.pdf` exists in repo
- Check file is committed: `git ls-files public/`
- Push if missing: `git add public/ && git commit -m "Add resume" && git push`

### Videos/Images Not Loading
**Error:** Large assets failing
**Fix:**
- Vercel has 50MB limit per file
- Optimize video: Use Handbrake or FFmpeg to reduce size
- Or host on external CDN (Cloudinary, AWS S3)

---

## Vercel Project Settings

### Recommended Settings

**General:**
- Node.js Version: 20.x (or latest LTS)
- Framework: Next.js
- Root Directory: `./`

**Build & Development:**
- Build Command: `next build`
- Output Directory: `.next`
- Install Command: `npm install`
- Development Command: `next dev`

**Git:**
- Production Branch: `main`
- Auto-deploy: Enabled ✓
- Deploy Hooks: (optional) for external triggers

**Domains:**
- Primary: `your-portfolio.vercel.app`
- Custom: Add your domain (e.g., `jrodroden.com`)

---

## Performance Optimization Tips

### Already Implemented ✓
- Next.js 16 with App Router
- React 19 Server Components
- GSAP animations with `will-change`
- Vercel Analytics package
- Image optimization (if you add images)
- Font optimization with `next/font`

### Recommended Additions
1. **Add Vercel Speed Insights:**
   ```bash
   npm install @vercel/speed-insights
   ```

2. **Enable Vercel Analytics:**
   Already installed via `@vercel/analytics` package

3. **Add OG Images:**
   Create `public/og-image.png` (1200x630px)
   Update `app/layout.tsx` metadata

4. **Implement Caching:**
   Next.js handles this automatically with ISR

---

## Getting Your OpenAI API Key

### Step 1: Create OpenAI Account
1. Go to [https://platform.openai.com](https://platform.openai.com)
2. Sign up or login
3. Add payment method (required for API access)

### Step 2: Generate API Key
1. Navigate to [API Keys](https://platform.openai.com/api-keys)
2. Click "Create new secret key"
3. Name it: "Portfolio AXIOM Chatbot"
4. Copy the key (starts with `sk-proj-...`)
5. **⚠️ Save it securely - you can't view it again!**

### Step 3: Set Usage Limits (Recommended)
1. Go to Settings → Limits
2. Set monthly budget: $20 (adjust as needed)
3. Enable email notifications for usage

### Estimated Costs
- AXIOM chatbot uses GPT-4
- Average cost: $0.10-0.30 per conversation
- Expected monthly: $5-20 (depending on traffic)
- Set Vercel Functions timeout to 30s max to prevent runaway costs

---

## Success! 🎉

Your portfolio is now live at: `https://your-portfolio.vercel.app`

### Next Steps:
1. ✅ Test all features on production URL
2. ✅ Share URL with recruiters and potential employers
3. ✅ Add custom domain (optional)
4. ✅ Monitor analytics via Vercel dashboard
5. ✅ Update resume and content as needed

### Quick Commands Reference:
```bash
# View deployment logs
vercel logs

# List all deployments
vercel ls

# Open project in browser
vercel open

# Check deployment status
vercel inspect

# Rollback to previous deployment
vercel rollback
```

---

## Support Resources

- **Vercel Documentation:** [https://vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment:** [https://nextjs.org/docs/app/building-your-application/deploying](https://nextjs.org/docs/app/building-your-application/deploying)
- **Vercel Support:** [https://vercel.com/support](https://vercel.com/support)

---

**Need Help?** Open an issue in the GitHub repo or contact Vercel support.

**Built with precision. Deployed with confidence.**
