import React from 'react';
import VibeRenderer from './VibeRenderer';
import { VibeNode } from '../../types/vibe';

interface Props {
  rootNode: VibeNode;
  selectedId: string | null;
  hoveredId: string | null;
  onSelect: (id: string | null) => void;
  onHover: (id: string | null) => void;
  onContentChange: (id: string, content: string) => void;
  onUpdateNode?: (node: Partial<VibeNode> & { id: string }) => void;
  viewport: 'desktop' | 'tablet' | 'mobile';
  scale: number;
}

export default function VibeCanvas({ rootNode, selectedId, hoveredId, onSelect, onHover, onContentChange, onUpdateNode, viewport, scale }: Props) {
  const widthMap = {
    desktop: '1200px',
    tablet: '768px',
    mobile: '375px'
  };

  return (
    <div 
      className="flex-1 overflow-auto bg-[#09090b] relative custom-scrollbar flex items-start justify-center p-12"
      onClick={() => onSelect(null)} // click outside to deselect
    >
      <div 
        style={{ 
          width: widthMap[viewport],
          transform: `scale(${scale / 100})`,
          transformOrigin: 'top center',
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
        }}
        className="bg-white min-h-[1000px] shadow-2xl relative ring-1 ring-white/10"
      >
        <VibeRenderer 
          node={rootNode} 
          selectedId={selectedId} 
          hoveredId={hoveredId} 
          onSelect={onSelect} 
          onHover={onHover} 
          onContentChange={onContentChange}
          onUpdateNode={onUpdateNode}
          mode="edit" 
        />
      </div>
    </div>
  );
}
