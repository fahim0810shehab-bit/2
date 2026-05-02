import { VibeNode } from '../types/vibe';

export const generateId = () => Math.random().toString(36).substr(2, 9);

export const defaultRootNode: VibeNode = {
  id: 'root',
  type: 'root',
  name: 'Page Body',
  styles: {
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    color: '#09090b',
    fontFamily: 'Inter, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden'
  },
  children: [
    {
      id: generateId(),
      type: 'section',
      name: 'Hero Section',
      styles: {
        padding: '120px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: '24px',
        backgroundColor: '#fafafa',
      },
      children: [
        {
          id: generateId(),
          type: 'text',
          name: 'Hero Heading',
          content: 'Build the Future',
          styles: {
            fontSize: '72px',
            fontWeight: '800',
            letterSpacing: '-0.04em',
            lineHeight: '1.1',
            color: '#09090b',
          },
          children: []
        },
        {
          id: generateId(),
          type: 'text',
          name: 'Hero Subtext',
          content: 'A next-generation visual builder that gives you complete control over every pixel. Design visually, scale endlessly.',
          styles: {
            fontSize: '20px',
            color: '#71717a',
            maxWidth: '600px',
            lineHeight: '1.6',
            fontWeight: '400'
          },
          children: []
        },
        {
          id: generateId(),
          type: 'button',
          name: 'Primary Button',
          content: 'Start Building Now',
          href: '#',
          styles: {
            backgroundColor: '#09090b',
            color: '#ffffff',
            padding: '16px 32px',
            borderRadius: '9999px',
            fontSize: '16px',
            fontWeight: '600',
            textDecoration: 'none',
            marginTop: '16px',
            display: 'inline-block',
            cursor: 'pointer'
          },
          children: []
        }
      ]
    }
  ]
};
