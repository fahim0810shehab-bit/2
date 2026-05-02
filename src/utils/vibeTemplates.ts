import { VibeNode } from '../types/vibe';
import { generateId } from './vibeDefaults';

export interface VibeTemplate {
  id: string;
  name: string;
  description: string;
  rootNode: VibeNode;
}

const modernSaaS: VibeNode = {
  id: 'root', type: 'root', name: 'Page Body',
  styles: { minHeight: '100vh', backgroundColor: '#09090b', color: '#fafafa', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column' },
  children: [
    {
      id: generateId(), type: 'section', name: 'Dark Hero',
      styles: { padding: '160px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '32px' },
      children: [
        { id: generateId(), type: 'text', name: 'Badge', content: 'v2.0 is out now ->', styles: { padding: '6px 16px', borderRadius: '50px', backgroundColor: '#27272a', color: '#a1a1aa', fontSize: '13px', fontWeight: '500' } },
        { id: generateId(), type: 'text', name: 'Heading', content: 'Ship faster with our API', styles: { fontSize: '80px', fontWeight: '800', letterSpacing: '-0.05em', lineHeight: '1.1', maxWidth: '800px', background: '-webkit-linear-gradient(0deg, #fff, #71717a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } },
        { id: generateId(), type: 'text', name: 'Subheading', content: 'The complete toolkit for modern teams.', styles: { fontSize: '20px', color: '#a1a1aa', maxWidth: '500px' } },
        { id: generateId(), type: 'button', name: 'CTA', content: 'Get Started', styles: { padding: '16px 32px', backgroundColor: '#fafafa', color: '#09090b', borderRadius: '8px', fontWeight: 'bold' } }
      ]
    }
  ]
};

const boldPortfolio: VibeNode = {
  id: 'root', type: 'root', name: 'Page Body',
  styles: { minHeight: '100vh', backgroundColor: '#e2e8f0', color: '#0f172a', fontFamily: 'Playfair Display, serif', display: 'flex', flexDirection: 'column' },
  children: [
    {
      id: generateId(), type: 'section', name: 'Hero',
      styles: { padding: '100px 40px', display: 'flex', flexDirection: 'column', gap: '24px' },
      children: [
        { id: generateId(), type: 'text', name: 'Intro', content: 'HELLO.', styles: { fontSize: '120px', fontWeight: '900', letterSpacing: '-0.06em', lineHeight: '1' } },
        { id: generateId(), type: 'text', name: 'Desc', content: 'I create digital experiences that blend art and code.', styles: { fontSize: '32px', maxWidth: '600px', fontStyle: 'italic', color: '#475569' } }
      ]
    },
    {
      id: generateId(), type: 'grid', name: 'Projects Grid',
      styles: { gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px', backgroundColor: '#0f172a' },
      children: [
        { id: generateId(), type: 'container', name: 'Project 1', styles: { minHeight: '400px', backgroundColor: '#f8fafc', padding: '40px' }, children: [{ id: generateId(), type: 'text', name: 'Title', content: 'Project Alpha', styles: { fontSize: '24px', fontWeight: 'bold' } }] },
        { id: generateId(), type: 'container', name: 'Project 2', styles: { minHeight: '400px', backgroundColor: '#f8fafc', padding: '40px' }, children: [{ id: generateId(), type: 'text', name: 'Title', content: 'Project Beta', styles: { fontSize: '24px', fontWeight: 'bold' } }] }
      ]
    }
  ]
};

const startupLanding: VibeNode = {
  id: 'root', type: 'root', name: 'Page Body',
  styles: { minHeight: '100vh', backgroundColor: '#ffffff', color: '#0a0a0a', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column' },
  children: [
    {
      id: generateId(), type: 'section', name: 'Nav',
      styles: { padding: '24px 40px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eaeaea' },
      children: [
        { id: generateId(), type: 'text', name: 'Logo', content: 'Acme Corp', styles: { fontSize: '20px', fontWeight: 'bold' } },
        { id: generateId(), type: 'button', name: 'Login', content: 'Login', styles: { padding: '8px 16px', backgroundColor: 'transparent', color: '#0a0a0a', border: '1px solid #eaeaea', borderRadius: '6px' } }
      ]
    },
    {
      id: generateId(), type: 'section', name: 'Hero',
      styles: { padding: '120px 24px', textAlign: 'center', alignItems: 'center', gap: '24px', display: 'flex', flexDirection: 'column' },
      children: [
        { id: generateId(), type: 'text', name: 'Heading', content: 'Revolutionize your workflow', styles: { fontSize: '64px', fontWeight: '800', letterSpacing: '-0.04em' } },
        { id: generateId(), type: 'text', name: 'Subheading', content: 'Join thousands of teams already using Acme.', styles: { fontSize: '24px', color: '#666' } },
        { id: generateId(), type: 'button', name: 'CTA', content: 'Start Free Trial', styles: { padding: '16px 32px', backgroundColor: '#0070f3', color: '#fff', borderRadius: '8px', fontSize: '18px', fontWeight: '600' } }
      ]
    }
  ]
};

const creatorLinktree: VibeNode = {
  id: 'root', type: 'root', name: 'Page Body',
  styles: { minHeight: '100vh', backgroundColor: '#fdf2f8', color: '#831843', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  children: [
    {
      id: generateId(), type: 'container', name: 'Profile Card',
      styles: { width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '60px 20px' },
      children: [
        { id: generateId(), type: 'image', name: 'Avatar', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop', styles: { width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' } },
        { id: generateId(), type: 'text', name: 'Name', content: '@creator', styles: { fontSize: '24px', fontWeight: 'bold' } },
        { id: generateId(), type: 'text', name: 'Bio', content: 'Digital Artist & Content Creator', styles: { fontSize: '16px', opacity: '0.8', marginBottom: '24px' } },
        { id: generateId(), type: 'button', name: 'Link 1', content: 'My Portfolio', styles: { width: '100%', padding: '16px', backgroundColor: '#fbcfe8', color: '#831843', borderRadius: '99px', textAlign: 'center', fontWeight: '600', transition: 'all 0.2s', boxShadow: '0 4px 14px 0 rgba(236, 72, 153, 0.39)' } },
        { id: generateId(), type: 'button', name: 'Link 2', content: 'YouTube Channel', styles: { width: '100%', padding: '16px', backgroundColor: '#fbcfe8', color: '#831843', borderRadius: '99px', textAlign: 'center', fontWeight: '600', transition: 'all 0.2s', boxShadow: '0 4px 14px 0 rgba(236, 72, 153, 0.39)' } },
      ]
    }
  ]
};

const modernAgency: VibeNode = {
  id: 'root', type: 'root', name: 'Page Body',
  styles: { minHeight: '100vh', backgroundColor: '#111827', color: '#f9fafb', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column' },
  children: [
    {
      id: generateId(), type: 'section', name: 'Agency Hero',
      styles: { minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 40px', position: 'relative' },
      children: [
        { id: generateId(), type: 'shape', name: 'Blur', styles: { position: 'absolute', top: '10%', right: '10%', width: '400px', height: '400px', backgroundColor: '#3b82f6', borderRadius: '50%', filter: 'blur(100px)', opacity: '0.3', zIndex: '0' } },
        { id: generateId(), type: 'text', name: 'Title', content: 'We build digital products that people love.', styles: { fontSize: '90px', fontWeight: '900', lineHeight: '1.05', letterSpacing: '-0.04em', zIndex: '1', maxWidth: '900px' } },
        { id: generateId(), type: 'button', name: 'CTA', content: 'Our Work ->', styles: { marginTop: '40px', padding: '20px 40px', backgroundColor: 'transparent', color: '#f9fafb', border: '1px solid #374151', borderRadius: '50px', width: 'fit-content', fontWeight: '600', zIndex: '1' } }
      ]
    }
  ]
};

const minimalistBlog: VibeNode = {
  id: 'root', type: 'root', name: 'Page Body',
  styles: { minHeight: '100vh', backgroundColor: '#fff', color: '#111', fontFamily: 'Playfair Display, serif', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  children: [
    {
      id: generateId(), type: 'container', name: 'Content',
      styles: { width: '100%', maxWidth: '680px', padding: '120px 20px', display: 'flex', flexDirection: 'column', gap: '32px' },
      children: [
        { id: generateId(), type: 'text', name: 'Date', content: 'October 12, 2026', styles: { fontSize: '14px', color: '#666', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em' } },
        { id: generateId(), type: 'text', name: 'Title', content: 'The Art of Minimalist Living', styles: { fontSize: '48px', fontWeight: '700', lineHeight: '1.2' } },
        { id: generateId(), type: 'divider', name: 'Line', styles: { width: '100%', height: '1px', backgroundColor: '#eaeaea', margin: '20px 0' } },
        { id: generateId(), type: 'text', name: 'Para', content: 'Minimalism is not about having less, it is about making room for more of what matters. When we clear the physical clutter, we often find that our minds also begin to clear.', styles: { fontSize: '20px', lineHeight: '1.8', color: '#444' } }
      ]
    }
  ]
};

const brutalistShop: VibeNode = {
  id: 'root', type: 'root', name: 'Page Body',
  styles: { minHeight: '100vh', backgroundColor: '#FFFF00', color: '#000000', fontFamily: 'JetBrains Mono, monospace', display: 'flex', flexDirection: 'column' },
  children: [
    {
      id: generateId(), type: 'section', name: 'Header',
      styles: { padding: '24px', borderBottom: '4px solid #000', display: 'flex', justifyContent: 'space-between' },
      children: [
        { id: generateId(), type: 'text', name: 'Logo', content: 'SUPERSTORE🛒', styles: { fontSize: '24px', fontWeight: '900' } }
      ]
    },
    {
      id: generateId(), type: 'grid', name: 'Products',
      styles: { gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', backgroundColor: '#000', borderBottom: '4px solid #000' },
      children: [
        { id: generateId(), type: 'container', name: 'Item1', styles: { backgroundColor: '#fff', padding: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }, children: [{ id: generateId(), type: 'text', name: 'Name', content: 'PRODUCT A', styles: { fontWeight: 'bold', fontSize: '32px' } }, { id: generateId(), type: 'button', name: 'Buy', content: 'BUY 99$', styles: { backgroundColor: '#000', color: '#fff', padding: '12px', border: 'none', width: '100%', fontSize: '20px', fontWeight: 'bold' } }] },
        { id: generateId(), type: 'container', name: 'Item2', styles: { backgroundColor: '#fff', padding: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }, children: [{ id: generateId(), type: 'text', name: 'Name', content: 'PRODUCT B', styles: { fontWeight: 'bold', fontSize: '32px' } }, { id: generateId(), type: 'button', name: 'Buy', content: 'BUY 49$', styles: { backgroundColor: '#000', color: '#fff', padding: '12px', border: 'none', width: '100%', fontSize: '20px', fontWeight: 'bold' } }] },
        { id: generateId(), type: 'container', name: 'Item3', styles: { backgroundColor: '#fff', padding: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }, children: [{ id: generateId(), type: 'text', name: 'Name', content: 'PRODUCT C', styles: { fontWeight: 'bold', fontSize: '32px' } }, { id: generateId(), type: 'button', name: 'Buy', content: 'BUY 199$', styles: { backgroundColor: '#000', color: '#fff', padding: '12px', border: 'none', width: '100%', fontSize: '20px', fontWeight: 'bold' } }] }
      ]
    }
  ]
};

const photoGallery: VibeNode = {
  id: 'root', type: 'root', name: 'Page Body',
  styles: { minHeight: '100vh', backgroundColor: '#000000', color: '#ffffff', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', padding: '40px' },
  children: [
    { id: generateId(), type: 'text', name: 'Title', content: 'Exhibition 01', styles: { fontSize: '48px', fontWeight: '300', marginBottom: '40px' } },
    {
      id: generateId(), type: 'grid', name: 'Gallery Grid',
      styles: { gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' },
      children: [
        { id: generateId(), type: 'image', name: 'Photo1', src: 'https://images.unsplash.com/photo-1621619856624-42fd193a0661?w=600&h=800&fit=crop', styles: { width: '100%', height: '400px', objectFit: 'cover', borderRadius: '8px', transition: 'all 0.3s ease', filter: 'grayscale(100%)' } },
        { id: generateId(), type: 'image', name: 'Photo2', src: 'https://images.unsplash.com/photo-1621619856624-42fd193a0661?w=600&h=800&fit=crop', styles: { width: '100%', height: '400px', objectFit: 'cover', borderRadius: '8px', transition: 'all 0.3s ease', filter: 'grayscale(100%)' } },
        { id: generateId(), type: 'image', name: 'Photo3', src: 'https://images.unsplash.com/photo-1621619856624-42fd193a0661?w=600&h=800&fit=crop', styles: { width: '100%', height: '400px', objectFit: 'cover', borderRadius: '8px', transition: 'all 0.3s ease', filter: 'grayscale(100%)' } }
      ]
    }
  ]
};

const glassmorphismApp: VibeNode = {
  id: 'root', type: 'root', name: 'Page Body',
  styles: { minHeight: '100vh', backgroundColor: '#1e1b4b', backgroundImage: 'radial-gradient(circle at 10% 20%, rgb(90, 92, 106) 0%, rgb(32, 45, 58) 81.3%)', color: '#fff', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  children: [
    {
      id: generateId(), type: 'container', name: 'Glass Card',
      styles: { width: '400px', padding: '40px', backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '24px', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)' },
      children: [
        { id: generateId(), type: 'shape', name: 'Icon', styles: { width: '60px', height: '60px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '16px', display: 'flex' } },
        { id: generateId(), type: 'text', name: 'Title', content: 'Welcome Back', styles: { fontSize: '32px', fontWeight: 'bold' } },
        { id: generateId(), type: 'button', name: 'Login', content: 'Sign In ->', styles: { width: '100%', padding: '16px', backgroundColor: '#fff', color: '#000', borderRadius: '12px', fontWeight: 'bold' } }
      ]
    }
  ]
};

const bentoGrid: VibeNode = {
  id: 'root', type: 'root', name: 'Page Body',
  styles: { minHeight: '100vh', backgroundColor: '#f4f4f5', color: '#18181b', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', padding: '80px' },
  children: [
    { id: generateId(), type: 'text', name: 'Title', content: 'Dashboard', styles: { fontSize: '40px', fontWeight: 'bold', marginBottom: '32px' } },
    {
      id: generateId(), type: 'grid', name: 'Bento Layout',
      styles: { gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', height: '600px' },
      children: [
        { id: generateId(), type: 'container', name: 'Big Block', styles: { gridColumn: 'span 2', gridRow: 'span 2', backgroundColor: '#fff', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }, children: [{ id: generateId(), type: 'text', name: 'Widget 1', content: 'Analytics Overview', styles: { fontWeight: '600', fontSize: '20px' } }] },
        { id: generateId(), type: 'container', name: 'Small Block 1', styles: { gridColumn: 'span 1', gridRow: 'span 1', backgroundColor: '#fff', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }, children: [{ id: generateId(), type: 'text', name: 'Widget 2', content: 'Sales', styles: { fontWeight: '600', fontSize: '16px', color: '#71717a' } }, { id: generateId(), type: 'text', name: 'Value', content: '$4,200', styles: { fontSize: '32px', fontWeight: 'bold', marginTop: '16px' } }] },
        { id: generateId(), type: 'container', name: 'Small Block 2', styles: { gridColumn: 'span 1', gridRow: 'span 1', backgroundColor: '#fff', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }, children: [{ id: generateId(), type: 'text', name: 'Widget 3', content: 'Clicks', styles: { fontWeight: '600', fontSize: '16px', color: '#71717a' } }, { id: generateId(), type: 'text', name: 'Value', content: '1,234', styles: { fontSize: '32px', fontWeight: 'bold', marginTop: '16px' } }] },
        { id: generateId(), type: 'container', name: 'Wide Block', styles: { gridColumn: 'span 2', gridRow: 'span 1', backgroundColor: '#fff', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }, children: [{ id: generateId(), type: 'text', name: 'Widget 4', content: 'Recent Activity', styles: { fontWeight: '600', fontSize: '20px' } }] }
      ]
    }
  ]
};

const neobrutalismPort: VibeNode = {
  id: 'root', type: 'root', name: 'Page Body',
  styles: { minHeight: '100vh', backgroundColor: '#e2e8f0', color: '#000000', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', padding: '40px' },
  children: [
    {
      id: generateId(), type: 'container', name: 'Card',
      styles: { backgroundColor: '#ffffff', padding: '40px', border: '4px solid #000000', borderRadius: '16px', boxShadow: '8px 8px 0px 0px #000000', display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px', margin: '0 auto' },
      children: [
        { id: generateId(), type: 'text', name: 'Headline', content: 'Design That Demands Attention', styles: { fontSize: '48px', fontWeight: '900', textTransform: 'uppercase' } },
        { id: generateId(), type: 'text', name: 'Subheadline', content: 'Stand out from the boring corporate web with harsh shadows and strong borders.', styles: { fontSize: '20px', fontWeight: '500' } },
        { id: generateId(), type: 'button', name: 'CTA', content: 'Explore Now', styles: { backgroundColor: '#3b82f6', color: '#ffffff', padding: '16px 32px', fontSize: '20px', fontWeight: '900', border: '4px solid #000000', borderRadius: '8px', boxShadow: '4px 4px 0px 0px #000000', width: 'fit-content' } }
      ]
    }
  ]
};

const darkCrypto: VibeNode = {
  id: 'root', type: 'root', name: 'Page Body',
  styles: { minHeight: '100vh', backgroundColor: '#0f172a', backgroundImage: 'radial-gradient(circle at 50% -20%, #1e1b4b 0%, #0f172a 100%)', color: '#f8fafc', fontFamily: 'JetBrains Mono, monospace', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  children: [
    {
      id: generateId(), type: 'section', name: 'Hero',
      styles: { padding: '120px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '40px', width: '100%' },
      children: [
        { id: generateId(), type: 'shape', name: 'Orb', styles: { width: '120px', height: '120px', backgroundColor: '#38bdf8', borderRadius: '50%', filter: 'blur(30px)', opacity: '0.4', position: 'absolute', top: '100px', zIndex: '0' } },
        { id: generateId(), type: 'text', name: 'Title', content: 'Web3 Trading Protocol.', styles: { fontSize: '72px', fontWeight: '700', zIndex: '1', lineHeight: '1.1', textShadow: '0 0 40px rgba(56, 189, 248, 0.4)' } },
        {
          id: generateId(), type: 'grid', name: 'Data Grid',
          styles: { gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', width: '100%', maxWidth: '800px', zIndex: '1' },
          children: [
            { id: generateId(), type: 'container', name: 'Stat 1', styles: { backgroundColor: 'rgba(30, 41, 59, 0.5)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(56, 189, 248, 0.2)', backdropFilter: 'blur(10px)' }, children: [{ id: generateId(), type: 'text', name: 'Label', content: 'Total Volume', styles: { color: '#94a3b8', fontSize: '14px' } }, { id: generateId(), type: 'text', name: 'Value', content: '$4.2B', styles: { fontSize: '32px', fontWeight: 'bold', color: '#e0f2fe' } }] },
            { id: generateId(), type: 'container', name: 'Stat 2', styles: { backgroundColor: 'rgba(30, 41, 59, 0.5)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(56, 189, 248, 0.2)', backdropFilter: 'blur(10px)' }, children: [{ id: generateId(), type: 'text', name: 'Label', content: 'Active Users', styles: { color: '#94a3b8', fontSize: '14px' } }, { id: generateId(), type: 'text', name: 'Value', content: '128K+', styles: { fontSize: '32px', fontWeight: 'bold', color: '#e0f2fe' } }] },
            { id: generateId(), type: 'container', name: 'Stat 3', styles: { backgroundColor: 'rgba(30, 41, 59, 0.5)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(56, 189, 248, 0.2)', backdropFilter: 'blur(10px)' }, children: [{ id: generateId(), type: 'text', name: 'Label', content: 'Networks', styles: { color: '#94a3b8', fontSize: '14px' } }, { id: generateId(), type: 'text', name: 'Value', content: '14+', styles: { fontSize: '32px', fontWeight: 'bold', color: '#e0f2fe' } }] }
          ]
        }
      ]
    }
  ]
};

export const vibeTemplates: VibeTemplate[] = [
  { id: 'modern-saas', name: 'Modern SaaS', description: 'Dark, sleek, gradient text for tech startups', rootNode: modernSaaS },
  { id: 'bold-portfolio', name: 'Bold Portfolio', description: 'Large typography & editorial grids', rootNode: boldPortfolio },
  { id: 'startup-landing', name: 'Startup Landing', description: 'Clean, professional corporate entry', rootNode: startupLanding },
  { id: 'creator-linktree', name: 'Creator Profile', description: 'Mobile-first links tree for creators', rootNode: creatorLinktree },
  { id: 'modern-agency', name: 'Modern Agency', description: 'Dark minimal with glowing accent blurs', rootNode: modernAgency },
  { id: 'minimalist-blog', name: 'Minimalist Blog', description: 'Clean, typographic layout for reading', rootNode: minimalistBlog },
  { id: 'brutalist-shop', name: 'Brutalist Shop', description: 'High contrast, bold, raw store layout', rootNode: brutalistShop },
  { id: 'photo-gallery', name: 'Photo Gallery', description: 'Dark cinematic photo grid', rootNode: photoGallery },
  { id: 'glassmorphism', name: 'Glassmorphism', description: 'Frosted glass UI elements on gradient', rootNode: glassmorphismApp },
  { id: 'bento-grid', name: 'Bento Dashboard', description: 'Modern dashboard with bento grid cards', rootNode: bentoGrid },
  { id: 'neobrutalism', name: 'Neo-Brutalism', description: 'Harsh shadows and bold colors', rootNode: neobrutalismPort },
  { id: 'dark-crypto', name: 'Web3 Protocol', description: 'Dark tech layout with glowing orbs', rootNode: darkCrypto }
];
