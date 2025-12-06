# Justin "JRod" Roden - AI Solutions Architect & Engineering Lead

> **AI systems architecture that scales—from concept to production.**

A premium portfolio showcasing 17+ years of aerospace and industrial AI expertise, emphasizing solutions architecture and AI engineering. Built with Next.js 16, React 19, and GSAP animations.

## Demo

https://github.com/user-attachments/assets/portfolio-demo.mp4

*Full interactive demo of the portfolio featuring smooth GSAP animations, light/dark mode toggle, AXIOM AI chatbot, and featured builds.*

## About This Portfolio

This is the professional portfolio of **Justin "JRod" Roden**, an AI Solutions Architect and AI Engineering Lead specializing in production AI systems. The portfolio demonstrates:

- **Solutions Architecture Excellence** - End-to-end system design from ML pipelines to microservices
- **AI Engineering Leadership** - LLM integration, RAG systems, vector databases, real-time inference
- **17+ years of experience** in aerospace test operations and heavy equipment management ($485M+ portfolios)
- **Production AI systems** currently deployed and generating business value
- **Full-stack engineering** from Python/PyTorch to FastAPI/Node.js to React/Next.js to MLOps

## Key Features

### Interactive AXIOM AI Chatbot
- Real-time AI assistant powered by OpenAI GPT-4
- Streaming responses with Vercel AI SDK
- Context-aware conversations about projects, experience, and availability
- Smart boundaries to keep conversations professional and relevant

### Premium Animations
- GSAP-powered scroll-triggered animations
- Smooth entrance sequences with stagger effects
- Custom easing functions for professional motion design
- Accessibility-friendly with prefers-reduced-motion support

### Light/Dark Theme Toggle
- Interactive bulb toggle with pull cord animation
- Smooth theme transitions across all components
- Persistent theme selection via localStorage
- Custom CSS variables for seamless color switching

### Featured Production Systems & PoCs

#### **Dream_Trip (PoC - Active Development)**
AI-powered travel planning platform demonstrating advanced solutions architecture:

**System Architecture:**
![Dream_Trip Architecture](./public/dreamtrip-architecture.svg)

**User Flow:**
![Dream_Trip Flowchart](./public/dreamtrip-flowchart.svg)

**Key Architecture Highlights:**
- **LLM Integration** - GPT-4 powered itinerary generation with RAG pipeline
- **Vector Search** - Semantic similarity matching using Pinecone
- **API Gateway** - FastAPI with auth, rate limiting, and validation
- **Microservices** - Modular service architecture (Node.js, Python, FastAPI)
- **External APIs** - Multi-source aggregation (Flights, Hotels, Maps, Weather)
- **Data Layer** - PostgreSQL, Vector DB, Redis cache, S3 storage
- **Infrastructure** - AWS/Azure, Docker/K8s, CI/CD with GitHub Actions
- **Observability** - Prometheus, Grafana, ELK stack for full system visibility

This PoC demonstrates production-grade architecture patterns for AI systems at scale.

---

#### **Production Systems**
- **HeavyOps AI Platform** - Fleet optimization with predictive analytics
- **Estimator AI v5** - Construction automation via Discord bot
- **Contract Analyzer** - NLP-powered contract risk analysis
- **CoreFlow** - Industrial workflow management system
- **BrainSpan** - Kanban + AI prioritization system

### Resume Integration
- Downloadable PDF resume (production-ready)
- Integrated into both hero section and AXIOM chatbot
- Markdown version available for reference

## Tech Stack

### Frontend
- **Next.js 16.0.3** with App Router
- **React 19** with Server Components
- **Tailwind CSS v4** for utility-first styling
- **GSAP** with ScrollTrigger for animations

### AI/Chatbot
- **OpenAI GPT-4** for conversational AI
- **Vercel AI SDK** for streaming responses
- Custom boundary detection system
- Resume keyword recognition

### Design System
- Custom color palette (Void, Tungsten, Steel, Plasma, Thrust, Ion, Nebula)
- Responsive typography system with display/body variants
- Accessibility-first component architecture
- Light/dark theme support

### Development
- **TypeScript** for type safety
- **ESLint** for code quality
- **Git/GitHub** for version control
- **Vercel** for deployment

## Project Structure

```
JRodAmazing-Portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes (chatbot endpoint)
│   │   ├── globals.css        # Global styles & theme variables
│   │   ├── layout.tsx         # Root layout with font configuration
│   │   └── page.tsx           # Home page
│   ├── components/
│   │   ├── axiom/             # AXIOM AI chatbot components
│   │   │   ├── chat-panel.tsx
│   │   │   ├── chat-message.tsx
│   │   │   └── chat-input.tsx
│   │   ├── layout/            # Layout components
│   │   │   ├── navigation.tsx
│   │   │   └── footer.tsx
│   │   ├── sections/          # Page sections
│   │   │   ├── hero.tsx
│   │   │   ├── philosophy.tsx
│   │   │   ├── current-focus.tsx
│   │   │   ├── selected-work.tsx
│   │   │   ├── domain-translation.tsx
│   │   │   └── contact.tsx
│   │   └── ui/                # Reusable UI components
│   │       ├── button.tsx
│   │       ├── section.tsx
│   │       └── theme-toggle.tsx
│   └── lib/
│       └── axiom/             # AXIOM chatbot logic
│           ├── system-prompt.ts
│           └── boundaries.ts
├── public/
│   ├── Justin_Roden_Resume.pdf
│   ├── Justin_Roden_AI_Specialist_Resume.md
│   └── portfolio-demo.mp4
└── package.json
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/JRodAmazing/JRodAmazing-Portfolio.git

# Navigate to project directory
cd JRodAmazing-Portfolio

# Install dependencies
npm install

# Set up environment variables
# Create .env.local with:
# OPENAI_API_KEY=your_openai_api_key_here
```

### Development

```bash
# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

## Design Philosophy

This portfolio embodies the same principles Justin applies to AI solutions architecture:

1. **Architecture-First**: End-to-end system design with scalability in mind
2. **Production-Ready**: Every component is built to ship, not just demo
3. **Performance-First**: Optimized animations, lazy loading, minimal bundle size
4. **Observability**: Built-in monitoring, logging, and performance tracking patterns
5. **Maintainable**: TypeScript for type safety, modular component architecture
6. **Scalable**: Designed to grow with new projects and features

The portfolio itself demonstrates architectural principles with a technical blueprint watermark background—a visual representation of systems thinking.

## Key Differentiators

### AXIOM AI Chatbot
Unlike basic contact forms, AXIOM provides:
- Intelligent conversation about technical expertise
- Contextual responses based on project portfolio
- Smart boundary detection to maintain professionalism
- Resume delivery and portfolio navigation
- Streaming responses for better UX

### Premium Animation System
- Scroll-triggered GSAP animations with proper easing
- Stagger effects for list items
- Entrance sequences on page load
- Performance-optimized with `will-change` and GPU acceleration
- Respects user motion preferences

### Production AI Integration
The portfolio doesn't just talk about AI—it demonstrates it:
- Live chatbot with GPT-4 integration
- Real production systems with GitHub links
- Actual business metrics and ROI data
- Technical depth with accessibility

## Contact

**Justin "JRod" Roden**
- Email: jcroden25@gmail.com
- LinkedIn: [linkedin.com/in/jrodamazing](https://linkedin.com/in/jrodamazing1)
- GitHub: [github.com/JRodAmazing](https://github.com/JRodAmazing)
- Phone: 817-201-6487
- Location: Dallas-Fort Worth, TX (Remote/Hybrid)

## Open To
- **AI Solutions Architect** (W2 - Salary Position)
- **AI Engineering Lead** (W2 - Salary Position)
- **Senior AI Engineer** (W2 - Salary Position)
- High-value contract projects (3-12 months)
- Strategic consulting engagements
- AI/ML advisory roles
- Production AI architecture design

## License

All rights reserved. This portfolio and its contents are proprietary.

---

**Built with precision. Deployed with confidence. Just like production AI systems should be.**

*"He's been on both sides of the problem. Most developers haven't stood in a muddy field troubleshooting equipment at 2am. Most operations people can't write production code. Justin's done both."* – AXIOM, AI Representative
