import React, { useState } from 'react';
import { VibeNode } from '../../types/vibe';
import { ChevronDown, ChevronRight, Settings, Layout, Type, Palette, MousePointer2 } from 'lucide-react';
import { mediaService } from '../../services/mediaService';

const ControlGroup: React.FC<{label: string, icon?: React.ReactNode, children: React.ReactNode, defaultOpen?: boolean}> = ({label, icon, children, defaultOpen = false}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-zinc-800 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-zinc-900/40 hover:bg-zinc-800 transition-colors"
      >
        <div className="flex items-center gap-2 text-zinc-300">
          {icon}
          <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
        </div>
        {isOpen ? <ChevronDown className="w-4 h-4 text-zinc-500" /> : <ChevronRight className="w-4 h-4 text-zinc-500" />}
      </button>
      {isOpen && <div className="p-4 space-y-4 bg-zinc-950">{children}</div>}
    </div>
  );
};

const Input: React.FC<{label: string, value: string, placeholder?: string, onChange: (v: string)=>void}> = ({label, value, placeholder, onChange}) => (
  <div className="flex flex-col gap-1.5">
    <span className="text-[10px] text-zinc-400 font-semibold">{label}</span>
    <input type="text" className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-xs text-zinc-200 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-zinc-700" placeholder={placeholder} value={value || ''} onChange={e => onChange(e.target.value)} />
  </div>
);

const ColorInput: React.FC<{label: string, value: string, onChange: (v: string)=>void}> = ({label, value, onChange}) => (
  <div className="flex flex-col gap-1.5">
    <span className="text-[10px] text-zinc-400 font-semibold">{label}</span>
    <div className="w-full relative flex items-center">
      <input type="color" className="absolute left-1.5 top-1.5 w-6 h-6 rounded cursor-pointer opacity-0 z-10" value={value || '#000000'} onChange={e => onChange(e.target.value)} />
      <div className="w-6 h-6 rounded border border-zinc-700 absolute left-1.5 flex-shrink-0 pointer-events-none" style={{backgroundColor: value || 'transparent'}}></div>
      <input type="text" className="w-full bg-zinc-900 border border-zinc-800 rounded-md pl-10 pr-3 py-2 text-xs text-zinc-200 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" value={value || ''} onChange={e => onChange(e.target.value)} />
    </div>
  </div>
);

const Select: React.FC<{label: string, value: string, options: string[], onChange: (v: string)=>void}> = ({label, value, options, onChange}) => (
  <div className="flex flex-col gap-1.5">
    <span className="text-[10px] text-zinc-400 font-semibold">{label}</span>
    <div className="relative">
      <select className="w-full bg-zinc-900 border border-zinc-800 rounded-md pl-3 pr-8 py-2 text-xs text-zinc-200 outline-none focus:border-blue-500 appearance-none" value={value || ''} onChange={e => onChange(e.target.value)}>
        <option value="">Auto / Default</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="w-3.5 h-3.5 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  </div>
);

export default function Inspector({ node, onChange }: { node: VibeNode | null, onChange: (n: VibeNode) => void }) {
  const [uploading, setUploading] = useState(false);

  if (!node) {
    return (
      <div className="w-80 bg-zinc-950 border-l border-zinc-800 flex flex-col items-center justify-center p-8 text-center h-full">
        <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-6">
          <MousePointer2 className="w-8 h-8 text-zinc-700" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-200 mb-2">No Element Selected</h3>
        <p className="text-xs text-zinc-500 leading-relaxed">
          1. Use the <strong>Add</strong> tab on the left to click and add a new element.<br/><br/>
          2. Click an element on the canvas to select it.<br/><br/>
          3. Use this panel to change its design, position, color, size, and animations.
        </p>
      </div>
    );
  }

  const handleStyle = (key: keyof React.CSSProperties, value: string) => {
    onChange({ ...node, styles: { ...node.styles, [key]: value } });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      try {
        const file = e.target.files[0];
        const uploadedUrl = await mediaService.uploadImage(file);
        if (uploadedUrl) {
          onChange({ ...node, src: uploadedUrl });
        } else {
          alert('Failed to upload image to Selise blocks.');
        }
      } catch(err) { console.error(err); }
      setUploading(false);
    }
  };

  return (
    <div className="w-80 bg-zinc-950 border-l border-zinc-800 overflow-y-auto h-full text-zinc-300 custom-scrollbar flex flex-col">
      <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 sticky top-0 z-10 backdrop-blur">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-2 truncate">
            Selected: <span className="text-blue-400 truncate">{node.name}</span>
          </h2>
          <span className="bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded text-[10px] font-mono uppercase ml-2 flex-shrink-0">{node.type}</span>
        </div>
      </div>

      <div className="flex-1 pb-10 flex flex-col">
        {/* Quick Identity */}
        <ControlGroup label="General Settings" icon={<Settings className="w-4 h-4"/>} defaultOpen={true}>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Layer Name" value={node.name} onChange={v => onChange({...node, name: v})} />
            <Input label="Element ID" placeholder="e.g. contact" value={node.elementId || ''} onChange={v => onChange({...node, elementId: v})} />
          </div>
          {node.type === 'button' && <Input label="Link Destination" placeholder="https:// or #id" value={node.href || ''} onChange={v => onChange({...node, href: v})} />}
          {node.type === 'shape' && (
             <Select label="Shape Type" value={node.shapeType || 'rectangle'} options={['rectangle', 'circle', 'triangle', 'pill']} onChange={v => {
                let clip = 'none';
                let br = node.styles.borderRadius;
                if (v === 'circle') { clip = 'circle(50% at 50% 50%)'; br = '50%'; }
                if (v === 'triangle') { clip = 'polygon(50% 0%, 0% 100%, 100% 100%)'; br = '0'; }
                if (v === 'pill') { clip = 'none'; br = '9999px'; }
                if (v === 'rectangle') { clip = 'none'; br = '0'; }
                onChange({...node, shapeType: v as any, styles: {...node.styles, clipPath: clip, borderRadius: br}});
             }} />
          )}
          {(node.type === 'text' || node.type === 'button') && (
            <Input label="Text Content" value={node.content || ''} onChange={v => onChange({...node, content: v})} />
          )}
          {node.type === 'image' && (
            <div className="flex flex-col gap-1.5 mt-2">
              <span className="text-[10px] text-zinc-400 font-semibold">Image Source</span>
              <div className="w-full relative">
                 <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={handleImageUpload} />
                 <button className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-blue-500 rounded-md px-3 py-2 text-xs transition-colors font-semibold text-center">
                   {uploading ? 'Uploading...' : 'Upload New Image'}
                 </button>
              </div>
            </div>
          )}
        </ControlGroup>

        {/* Positioning */}
        <ControlGroup label="Positioning" icon={<MousePointer2 className="w-4 h-4"/>}>
          <Select label="Position Mode" value={node.styles.position as string || 'static'} options={['static', 'relative', 'absolute', 'fixed', 'sticky']} onChange={v => handleStyle('position', v)} />
          <div className="grid grid-cols-2 gap-3 mt-3">
            <Input label="Top" placeholder="auto" value={node.styles.top as string} onChange={v => handleStyle('top', v)} />
            <Input label="Bottom" placeholder="auto" value={node.styles.bottom as string} onChange={v => handleStyle('bottom', v)} />
            <Input label="Left" placeholder="auto" value={node.styles.left as string} onChange={v => handleStyle('left', v)} />
            <Input label="Right" placeholder="auto" value={node.styles.right as string} onChange={v => handleStyle('right', v)} />
          </div>
          <div className="mt-3">
            <Input label="Z-Index (Layer Level)" placeholder="auto" value={node.styles.zIndex as string} onChange={v => handleStyle('zIndex', v)} />
          </div>
        </ControlGroup>

        {/* Layout */}
        <ControlGroup label="Layout & Spacing" icon={<Layout className="w-4 h-4"/>}>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Input label="Width" placeholder="e.g. 100% or 300px" value={node.styles.width as string} onChange={v => handleStyle('width', v)} />
            <Input label="Height" placeholder="auto" value={node.styles.height as string} onChange={v => handleStyle('height', v)} />
            <Input label="Min Height" placeholder="e.g. 100vh" value={node.styles.minHeight as string} onChange={v => handleStyle('minHeight', v)} />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3 pt-3 border-t border-zinc-800">
            <Input label="Padding (Inside Space)" placeholder="e.g. 24px" value={node.styles.padding as string} onChange={v => handleStyle('padding', v)} />
            <Input label="Margin (Outside Space)" placeholder="e.g. 24px" value={node.styles.margin as string} onChange={v => handleStyle('margin', v)} />
          </div>

          <div className="pt-3 border-t border-zinc-800 space-y-3">
            <Select label="Display Mode" value={node.styles.display as string} options={['block', 'flex', 'grid', 'inline-block', 'none']} onChange={v => handleStyle('display', v)} />
            {node.styles.display === 'flex' && (
              <div className="grid grid-cols-2 gap-3 mt-3">
                <Select label="Flow Direction" value={node.styles.flexDirection as string} options={['row', 'column', 'row-reverse', 'column-reverse']} onChange={v => handleStyle('flexDirection', v)} />
                <Select label="Justify Items" value={node.styles.justifyContent as string} options={['flex-start', 'center', 'flex-end', 'space-between', 'space-around']} onChange={v => handleStyle('justifyContent', v)} />
                <Select label="Align Items" value={node.styles.alignItems as string} options={['flex-start', 'center', 'flex-end', 'stretch']} onChange={v => handleStyle('alignItems', v)} />
                <Input label="Gap Between Items" placeholder="e.g. 16px" value={node.styles.gap as string} onChange={v => handleStyle('gap', v)} />
              </div>
            )}
            {node.styles.display === 'grid' && (
              <div className="grid grid-cols-2 gap-3 mt-3">
                <Input label="Grid Columns" placeholder="e.g. repeat(2, 1fr)" value={node.styles.gridTemplateColumns as string} onChange={v => handleStyle('gridTemplateColumns', v)} />
                <Input label="Grid Rows" placeholder="e.g. auto" value={node.styles.gridTemplateRows as string} onChange={v => handleStyle('gridTemplateRows', v)} />
                <Input label="Gap" placeholder="e.g. 16px" value={node.styles.gap as string} onChange={v => handleStyle('gap', v)} />
              </div>
            )}
          </div>
        </ControlGroup>

        {/* Typography */}
        {(node.type === 'text' || node.type === 'button') && (
        <ControlGroup label="Typography Settings" icon={<Type className="w-4 h-4"/>} defaultOpen={true}>
          <div className="mb-3">
            <ColorInput label="Text Color" value={node.styles.color as string} onChange={v => handleStyle('color', v)} />
          </div>
          <Select label="Font Family" value={node.styles.fontFamily as string} options={['Inter, sans-serif', 'Playfair Display, serif', 'JetBrains Mono, monospace']} onChange={v => handleStyle('fontFamily', v)} />
          <div className="grid grid-cols-2 gap-3 my-3">
            <Input label="Font Size" placeholder="e.g. 16px or 1rem" value={node.styles.fontSize as string} onChange={v => handleStyle('fontSize', v)} />
            <Select label="Font Weight" value={node.styles.fontWeight?.toString() as string} options={['100', '300', '400', '500', '600', '700', '800', '900']} onChange={v => handleStyle('fontWeight', v)} />
            <Select label="Text Alignment" value={node.styles.textAlign as string} options={['left', 'center', 'right', 'justify']} onChange={v => handleStyle('textAlign', v)} />
            <Input label="Line Height" placeholder="e.g. 1.5" value={node.styles.lineHeight as string} onChange={v => handleStyle('lineHeight', v)} />
          </div>
        </ControlGroup>
        )}

        {/* Decor */}
        <ControlGroup label="Visuals & Styling" icon={<Palette className="w-4 h-4"/>}>
          <div className="mb-3">
            <ColorInput label="Background Color" value={node.styles.backgroundColor as string} onChange={v => handleStyle('backgroundColor', v)} />
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Input label="Border Radius" placeholder="e.g. 8px" value={node.styles.borderRadius as string} onChange={v => handleStyle('borderRadius', v)} />
            <Input label="Opacity (0-1)" placeholder="e.g. 0.5" value={node.styles.opacity?.toString() as string} onChange={v => handleStyle('opacity', v)} />
          </div>
          <div className="space-y-3">
            <Input label="Border Styles" placeholder="e.g. 1px solid #000" value={node.styles.border as string} onChange={v => handleStyle('border', v)} />
            <Input label="Drop Shadow" placeholder="e.g. 0 4px 6px rgba(0,0,0,0.1)" value={node.styles.boxShadow as string} onChange={v => handleStyle('boxShadow', v)} />
            <Input label="Blur Filter" placeholder="e.g. blur(4px)" value={node.styles.filter as string} onChange={v => handleStyle('filter', v)} />
            <Input label="Backdrop Blur (Glass)" placeholder="e.g. blur(10px)" value={node.styles.backdropFilter as string} onChange={v => handleStyle('backdropFilter', v)} />
          </div>
        </ControlGroup>
        
        {/* Transforms & Effects */}
        <ControlGroup label="Transforms & Clip Paths">
          <Input label="CSS Transform" placeholder="e.g. scale(1.1) rotate(5deg)" value={node.styles.transform as string} onChange={v => handleStyle('transform', v)} />
          <Input label="CSS Transition" placeholder="e.g. all 0.3s ease" value={node.styles.transition as string} onChange={v => handleStyle('transition', v)} />
          <Input label="Custom CSS Animation" placeholder="e.g. pulse 2s infinite" value={node.styles.animation as string} onChange={v => handleStyle('animation', v)} />
          <Input label="Custom Clip Path" placeholder="e.g. polygon(...)" value={node.styles.clipPath as string} onChange={v => handleStyle('clipPath', v)} />
        </ControlGroup>
      </div>
    </div>
  );
}
