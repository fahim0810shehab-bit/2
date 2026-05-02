import React from 'react';

export type VibeNodeType = 'root' | 'section' | 'container' | 'grid' | 'text' | 'image' | 'button' | 'shape' | 'spacer' | 'divider';

export interface VibeNode {
  id: string;
  type: VibeNodeType;
  name: string;
  elementId?: string;
  content?: string;
  src?: string;
  href?: string;
  shapeType?: 'rectangle' | 'circle' | 'triangle' | 'pill';
  animationData?: {
    type: string;
    duration: string;
    delay: string;
    easing: string;
  };
  styles: React.CSSProperties;
  children?: VibeNode[];
}

export interface VibePage {
  id: string;
  name: string;
  path: string;
  rootNode: VibeNode;
}

export interface SiteData {
  user_id: string;
  username: string;
  is_published: boolean;
  pages: VibePage[];
}
