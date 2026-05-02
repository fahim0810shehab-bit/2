import React, { useState } from 'react';
import { VibeNode, VibeNodeType } from '../../types/vibe';
import { generateId } from './vibeUtils';
import { vibeTemplates } from '../../utils/vibeTemplates';
import { Layers, Plus, Type, Image as ImageIcon, Box, LayoutGrid, MousePointer2, Copy, Trash2, Grid, Triangle, Space, Minus, LayoutTemplate, ArrowUp, ArrowDown } from 'lucide-react';

interface Props {
  rootNode: VibeNode;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onAddElement: (parentId: string, node: VibeNode) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onMove?: (id: string, direction: 'up' | 'down') => void;
  onApplyTemplate?: (templateNode: VibeNode) => void;
}

export default function LeftSidebar({ rootNode, selectedId, onSelect, onAddElement, onDuplicate, onDelete, onMove, onApplyTemplate }: Props) {
  const [activeTab, setActiveTab] = useState<'add' | 'layers' | 'templates'>('add');

  const findValidParentId = (startId: string | null): string => {
    if (!startId) return rootNode.id;
    // Helper to traverse and find if element is a container
    const findNode = (root: VibeNode, id: string): VibeNode | null => {
      if (root.id === id) return root;
      if (!root.children) return null;
      for (const child of root.children) {
        const found = findNode(child, id);
        if (found) return found;
      }
      return null;
    };
    const node = findNode(rootNode, startId);
    if (node && (node.type === 'section' || node.type === 'container' || node.type === 'grid' || node.type === 'root')) {
      return node.id;
    }
    // If we selected a text node or image, add to root for now
    return rootNode.id;
  };

  const handleAdd = (type: VibeNodeType) => {
    const parentId = findValidParentId(selectedId);
    const newNode: VibeNode = {
      id: generateId(),
      type,
      name: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      styles: {
        display: type === 'container' || type === 'section' ? 'flex' : type === 'grid' ? 'grid' : undefined,
        flexDirection: type === 'section' || type === 'container' ? 'column' : undefined,
        gridTemplateColumns: type === 'grid' ? 'repeat(2, 1fr)' : undefined,
        padding: type === 'section' ? '40px 24px' : type === 'container' ? '16px' : undefined,
        gap: type === 'container' || type === 'section' || type === 'grid' ? '16px' : undefined,
        fontSize: type === 'text' ? '16px' : undefined,
        width: type === 'image' || type === 'divider' ? '100%' : type === 'shape' ? '100px' : undefined,
        height: type === 'spacer' ? '50px' : type === 'divider' ? '1px' : type === 'shape' ? '100px' : undefined,
        backgroundColor: type === 'shape' ? '#3b82f6' : type === 'divider' ? '#e4e4e7' : undefined,
        maxWidth: type === 'image' ? '300px' : undefined,
      },
      content: type === 'text' ? 'Double click to edit text' : type === 'button' ? 'Click me' : undefined,
      shapeType: type === 'shape' ? 'rectangle' : undefined,
      children: []
    };
    if (type === 'button') {
      newNode.styles = { ...newNode.styles, padding: '12px 24px', backgroundColor: '#3b82f6', color: '#fff', borderRadius: '6px', textAlign: 'center', cursor: 'pointer', display: 'inline-block', fontWeight: '600' };
    }
    if (type === 'shape') {
      newNode.styles = { ...newNode.styles, clipPath: 'none' };
    }
    onAddElement(parentId, newNode);
  };

  const LayerNode = ({ node, depth = 0 }: { key?: string | number, node: VibeNode, depth?: number }) => {
    const isSelected = selectedId === node.id;
    return (
      <div className="w-full">
        <div 
          className={`group flex items-center justify-between py-1.5 px-3 border-l-2 cursor-pointer transition-colors ${isSelected ? 'border-blue-500 bg-blue-500/10 text-blue-100' : 'border-transparent hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-200'}`}
          style={{ paddingLeft: `${depth * 12 + 12}px` }}
          onClick={() => onSelect(node.id)}
        >
          <div className="flex items-center gap-2 truncate">
            {node.type === 'section' && <LayoutGrid className="w-3.5 h-3.5 opacity-70" />}
            {node.type === 'container' && <Box className="w-3.5 h-3.5 opacity-70" />}
            {node.type === 'grid' && <Grid className="w-3.5 h-3.5 opacity-70" />}
            {node.type === 'text' && <Type className="w-3.5 h-3.5 opacity-70" />}
            {node.type === 'image' && <ImageIcon className="w-3.5 h-3.5 opacity-70" />}
            {node.type === 'button' && <MousePointer2 className="w-3.5 h-3.5 opacity-70" />}
            {node.type === 'shape' && <Triangle className="w-3.5 h-3.5 opacity-70" />}
            {node.type === 'spacer' && <Space className="w-3.5 h-3.5 opacity-70" />}
            {node.type === 'divider' && <Minus className="w-3.5 h-3.5 opacity-70" />}
            {node.type === 'root' && <Layers className="w-3.5 h-3.5 opacity-70" />}
            <span className="text-[11px] font-medium truncate">{node.name}</span>
          </div>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {node.id !== 'root' && (
              <>
                <button onClick={(e) => { e.stopPropagation(); if(onMove) onMove(node.id, 'up'); }} className="p-1 hover:text-white" title="Move Up">
                  <ArrowUp className="w-3 h-3" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); if(onMove) onMove(node.id, 'down'); }} className="p-1 hover:text-white" title="Move Down">
                  <ArrowDown className="w-3 h-3" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); onDuplicate(node.id); }} className="p-1 hover:text-white" title="Duplicate">
                  <Copy className="w-3 h-3" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); onDelete(node.id); }} className="p-1 hover:text-red-400" title="Delete">
                  <Trash2 className="w-3 h-3" />
                </button>
              </>
            )}
          </div>
        </div>
        {node.children && node.children.length > 0 && (
          <div className="flex flex-col">
            {node.children.map(child => <LayerNode key={child.id} node={child} depth={depth + 1} />)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 bg-zinc-950 border-r border-zinc-800 h-full flex flex-col pt-2 text-zinc-100 z-10 flex-shrink-0">
      <div className="flex gap-1 px-4 mb-4">
        <button onClick={() => setActiveTab('add')} className={`flex-1 py-1.5 text-[10px] font-bold rounded uppercase tracking-wider transition-colors ${activeTab === 'add' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'}`}>Add</button>
        <button onClick={() => setActiveTab('layers')} className={`flex-1 py-1.5 text-[10px] font-bold rounded uppercase tracking-wider transition-colors ${activeTab === 'layers' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'}`}>Layers</button>
        <button onClick={() => setActiveTab('templates')} className={`flex-1 py-1.5 text-[10px] font-bold rounded uppercase tracking-wider transition-colors ${activeTab === 'templates' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'}`}>Templates</button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
        {activeTab === 'add' ? (
          <>
            <div className="p-4 grid grid-cols-2 gap-3 flex-1">
               <AddBtn icon={<LayoutGrid size={16}/>} label="Section" onClick={() => handleAdd('section')} description="Full width block" />
               <AddBtn icon={<Box size={16}/>} label="Container" onClick={() => handleAdd('container')} description="Group elements" />
               <AddBtn icon={<Grid size={16}/>} label="Freeform" onClick={() => {
                  const parentId = findValidParentId(selectedId);
                  const newNode: VibeNode = {
                    id: generateId(),
                    type: 'container',
                    name: `Freeform Container`,
                    styles: {
                      position: 'relative',
                      width: '100%',
                      minHeight: '400px',
                      backgroundColor: '#fafafa',
                    },
                    children: []
                  };
                  onAddElement(parentId, newNode);
               }} description="Absolute drag" />
               <AddBtn icon={<Grid size={16}/>} label="Grid" onClick={() => handleAdd('grid')} description="CSS Grid layout" />
               <AddBtn icon={<Type size={16}/>} label="Text" onClick={() => handleAdd('text')} description="Paragraph or heading" />
               <AddBtn icon={<ImageIcon size={16}/>} label="Image" onClick={() => handleAdd('image')} description="Upload an image" />
               <AddBtn icon={<MousePointer2 size={16}/>} label="Button" onClick={() => handleAdd('button')} description="Clickable link" />
               <AddBtn icon={<Triangle size={16}/>} label="Shape" onClick={() => handleAdd('shape')} description="Decorative shapes" />
               <AddBtn icon={<Space size={16}/>} label="Spacer" onClick={() => handleAdd('spacer')} description="Empty space" />
               <AddBtn icon={<Minus size={16}/>} label="Divider" onClick={() => handleAdd('divider')} description="Horizontal line" />
            </div>
            
            <div className="p-4 border-t border-zinc-800 bg-zinc-900/50 mt-auto">
              <p className="text-[10px] text-zinc-400 leading-relaxed text-center font-medium">
                <span className="text-white block mb-1">How it works:</span>
                Click on any element above to add it to your design. It will be placed inside your currently selected container.
              </p>
            </div>
          </>
        ) : activeTab === 'layers' ? (
          <div className="py-2">
            <LayerNode node={rootNode} />
          </div>
        ) : (
          <div className="p-4 flex flex-col gap-3 pb-8">
            <p className="text-xs text-zinc-400 mb-2 leading-relaxed">
              Start with a pre-designed, modern layout.
              <br/><br/>
              <span className="text-amber-400 font-bold">Warning:</span> Applying a template will replace your entire page.
            </p>
            {vibeTemplates.map(t => (
              <button 
                key={t.id} 
                onClick={() => {
                  if (onApplyTemplate) onApplyTemplate(JSON.parse(JSON.stringify(t.rootNode)));
                }}
                className="flex flex-col items-start p-3 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-blue-500 transition-all text-left group"
              >
                <div className="flex items-center gap-2 mb-1 text-zinc-200 group-hover:text-blue-400">
                  <LayoutTemplate className="w-4 h-4" />
                  <span className="text-sm font-bold">{t.name}</span>
                </div>
                <span className="text-xs text-zinc-500 font-medium">{t.description}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const AddBtn = ({ icon, label, description, onClick }: any) => (
  <button onClick={onClick} className="flex flex-col items-center justify-center py-4 px-2 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-blue-500 hover:bg-blue-500/5 transition-all group text-center min-h-[90px]">
    <div className="text-zinc-500 group-hover:text-blue-500 mb-2 transition-colors">{icon}</div>
    <span className="text-[11px] font-bold tracking-wide text-zinc-200">{label}</span>
    <span className="text-[9px] text-zinc-500 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity leading-tight">{description}</span>
  </button>
);
