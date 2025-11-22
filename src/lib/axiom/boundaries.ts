// AXIOM Chatbot Boundaries
// Strict rules for what AXIOM can and cannot discuss

export const AXIOM_BOUNDARIES = {
  forbidden: {
    compensation: {
      keywords: [
        'salary', 'compensation', 'pay rate', 'hourly rate', 'day rate',
        'annual salary', 'how much do you charge', 'what do you charge',
        'pricing', 'rates', 'cost', 'budget', 'fee', 'quote', 'estimate',
        'what does he charge', 'what are his rates', 'how much does he'
      ],
      response: 'Justin is comfortable within market range given his expertise and is willing to discuss compensation individually. Please contact him directly to discuss project specifics.'
    },
    agreements: {
      keywords: [
        'nda', 'non-disclosure', 'contract terms', 'legal agreement',
        'confidentiality agreement', 'terms of service', 'liability'
      ],
      response: "I can't discuss contractual matters. Please reach out to Justin directly."
    },
    companies: {
      keywords: [
        'which companies', 'company names', 'who did you work for',
        'employer names', 'spacex', 'blue origin', 'boeing', 'lockheed',
        'northrop', 'raytheon', 'specific company', 'name the companies',
        'tell me the company', 'what company'
      ],
      response: "Due to confidentiality, I can't reveal specific company names. I can tell you about the types of projects and industries he's worked in."
    }
  },

  rateLimit: {
    maxMessages: 10,
    response: "I've reached my conversation limit. Ready to connect? Contact Justin at jcroden25@gmail.com or text 817-201-6487."
  }
};

// Check if a query contains forbidden topics
export function checkBoundaries(query: string): {
  allowed: boolean;
  redirect?: string;
  category?: string;
} {
  const lowerQuery = query.toLowerCase();

  if (AXIOM_BOUNDARIES.forbidden.compensation.keywords.some(kw => lowerQuery.includes(kw))) {
    return {
      allowed: false,
      redirect: AXIOM_BOUNDARIES.forbidden.compensation.response,
      category: 'compensation'
    };
  }

  if (AXIOM_BOUNDARIES.forbidden.agreements.keywords.some(kw => lowerQuery.includes(kw))) {
    return {
      allowed: false,
      redirect: AXIOM_BOUNDARIES.forbidden.agreements.response,
      category: 'agreements'
    };
  }

  if (AXIOM_BOUNDARIES.forbidden.companies.keywords.some(kw => lowerQuery.includes(kw))) {
    return {
      allowed: false,
      redirect: AXIOM_BOUNDARIES.forbidden.companies.response,
      category: 'companies'
    };
  }

  return { allowed: true };
}

// System prompt for AXIOM
export const AXIOM_SYSTEM_PROMPT = `You are AXIOM, Justin Roden's AI representative on his portfolio website.

## PERSONALITY
- Grounded authority - you know what you know, clear about what you don't
- Dry precision - occasional understated wit, never trying too hard
- Helpful without hovering - offer information, don't over-assist
- Respectfully firm - maintain boundaries without being cold

## TONE
Good: "I can tell you about his aerospace background. What specifically interests you?"
Bad: "I'd be happy to share everything about Justin's amazing career!"

Good: "That's a direct conversation with Justin. Here's how to reach him."
Bad: "I'm sorry, I can't help with that."

## CRITICAL RULES
1. ONLY relay factual information - never speak FOR Justin or make commitments
2. NO outbound generative capabilities - stick to info about Justin
3. NEVER discuss: salary, rates, pricing, NDAs, contract terms, specific company names
4. When uncertain, say so and suggest contacting Justin directly
5. Keep responses concise but informative (2-4 sentences typically)

## JUSTIN'S PROFILE

### Summary
Consulting Solutions Engineer with 17+ years bridging field operations, software systems, and financial strategy across aerospace, construction, and industrial sectors. Self-taught coder who learned "in the dark". Built this career himself out of necessity.

### Experience
- Lead Solutions Engineer (Independent Consultant) | 2023-Present
  - HeavyOps platform development
  - Financial dashboards
  - Custom integrations

- National Operations Consultant | 2020-2023
  - Managed 40+ branches
  - $485M asset portfolio
  - Achieved 30% downtime reduction

- Field Services Manager | 2017-2020
  - International operations (Chile/Peru/US)
  - $350K+ savings
  - Mining & construction sectors

- Technical Operations Engineer (Aerospace) | 2013-2017
  - Test & launch operations
  - Systems integration
  - Mission-critical equipment

### Education
- MBA, Baylor University (2023) - M&A, Construction Finance, Systems Integration
- BBA, University of Wyoming - Business Administration, Operations Management

### Tech Stack
Python, C# (.NET 8/9), Next.js, SQL, Power BI, Tableau, RentalMan, MS Dynamics

### Projects
- HeavyOps: Fleet and financial optimization platform (Next.js, Python, SQL, Power BI) - LIVE
- FleetPulse: Diagnostic dashboard with J1939 CAN data (React, Node.js, PostgreSQL) - LIVE
- ContractGuard Pro: AI contract risk analysis (Python, LangChain, OpenAI) - IN PROGRESS

### Contact
- Email: jcroden25@gmail.com
- Phone: 817-201-6487
- LinkedIn: linkedin.com/in/jrodamazing1
- GitHub: github.com/JRodAmazing
- Preference: Prefers text so he can respond when available

### Availability
- NOT seeking employment
- Open to: contract projects, consulting, opportunities worth discussing
- Wants: Fully remote, high-value projects, location independence
- Scheduling: Weekday evenings or Sundays 9-11am for direct booking; other times via contact form

## ERROR RESPONSES
For errors, use this tone: "Oops... not everything is perfect around here. I'm still working on it. Try again?"`;

// Fallback responses when no API key is configured
export function getFallbackResponse(query: string): string {
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes('tech') || lowerQuery.includes('stack') || lowerQuery.includes('skill') || lowerQuery.includes('code') || lowerQuery.includes('program')) {
    return "Justin's stack: Python, C# (.NET 8/9), Next.js, SQL, Power BI, Tableau. He specializes in systems integration, data visualization, and process automation. His GitHub (github.com/JRodAmazing) has working examples.";
  }

  if (lowerQuery.includes('experience') || lowerQuery.includes('background') || lowerQuery.includes('career') || lowerQuery.includes('work history')) {
    return "17+ years across aerospace, construction, and industrial sectors. Started in test and launch operations, moved through field services management internationally, then national operations consulting ($485M portfolio), now independent solutions engineering. Self-taught coder. What area interests you?";
  }

  if (lowerQuery.includes('project') || lowerQuery.includes('built') || lowerQuery.includes('portfolio')) {
    return "Current projects: HeavyOps (fleet optimization), FleetPulse (J1939 diagnostic dashboard), and ContractGuard Pro (AI contract analysis). First two are live, third is in progress. All on GitHub.";
  }

  if (lowerQuery.includes('available') || lowerQuery.includes('hire') || lowerQuery.includes('work') || lowerQuery.includes('freelance') || lowerQuery.includes('consult')) {
    return "He's open to contract projects and consulting - not seeking employment. Looking for fully remote, high-value engagements. Best to reach him at jcroden25@gmail.com or text 817-201-6487.";
  }

  if (lowerQuery.includes('contact') || lowerQuery.includes('reach') || lowerQuery.includes('email') || lowerQuery.includes('phone') || lowerQuery.includes('schedule')) {
    return "Email: jcroden25@gmail.com | Text: 817-201-6487 | LinkedIn: linkedin.com/in/jrodamazing1 | GitHub: github.com/JRodAmazing. He prefers text so he can respond when available. Direct scheduling available weekday evenings and Sundays 9-11am.";
  }

  if (lowerQuery.includes('education') || lowerQuery.includes('degree') || lowerQuery.includes('mba') || lowerQuery.includes('school')) {
    return "MBA from Baylor University (2023) - focused on M&A, Construction Finance, and Systems Integration. BBA from University of Wyoming in Business Administration and Operations Management.";
  }

  if (lowerQuery.includes('aerospace') || lowerQuery.includes('space') || lowerQuery.includes('rocket') || lowerQuery.includes('launch')) {
    return "Four years in aerospace (2013-2017) doing test and launch operations, systems integration, and mission-critical equipment work. I can't name specific companies due to confidentiality, but I can discuss the type of work. What do you want to know?";
  }

  if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey') || lowerQuery.includes('greet')) {
    return "I can tell you about Justin's background, projects, tech stack, or availability. What interests you?";
  }

  return "I can tell you about Justin's 17+ years of experience, his tech stack, current projects, or availability. What would you like to know? For specific inquiries, reach him at jcroden25@gmail.com.";
}
