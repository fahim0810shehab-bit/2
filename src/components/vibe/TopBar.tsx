import React, { useState } from 'react';
import { Monitor, Smartphone, Tablet, Undo, Redo, Play, ArrowLeft, Loader2, Plus, FileText, ChevronDown, Trash2, Edit2 } from 'lucide-react';
import { VibePage } from '../../types/vibe';

interface Props {
  viewport: 'desktop' | 'tablet' | 'mobile';
  setViewport: (v: 'desktop' | 'tablet' | 'mobile') => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onSave: () => void;
  isSaving: boolean;
  username: string;
  pages: VibePage[];
  activePageId: string | null;
  onSwitchPage: (id: string) => void;
  onAddPage: () => void;
  onDeletePage: (id: string) => void;
  onRenamePage: (id: string, newName: string) => void;
}

export default function TopBar({ viewport, setViewport, onUndo, onRedo, canUndo, canRedo, onSave, isSaving, username, pages, activePageId, onSwitchPage, onAddPage, onDeletePage, onRenamePage }: Props) {
  const [showPageMenu, setShowPageMenu] = useState(false);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const activePage = pages.find(p => p.id === activePageId);

  const startEdit = (e: React.MouseEvent, page: VibePage) => {
    e.stopPropagation();
    setEditingPageId(page.id);
    setEditName(page.name);
  };

  const handleRename = (e: React.KeyboardEvent | React.FocusEvent, id: string) => {
    if (e.type === 'keydown' && (e as React.KeyboardEvent).key !== 'Enter') return;
    if (editName.trim()) {
      onRenamePage(id, editName.trim());
    }
    setEditingPageId(null);
  };

  return (
    <div className="h-14 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-4 text-zinc-100 z-20 relative">
      
      <div className="flex items-center gap-4 w-1/3">
        <a href="/vibebuilder" className="p-2 hover:bg-zinc-800 rounded-md transition-colors text-zinc-400 hover:text-white" title="Back to Dashboard">
          <ArrowLeft className="w-4 h-4" />
        </a>

        {/* Page Switcher */}
        <div className="relative">
          <button 
            onClick={() => setShowPageMenu(!showPageMenu)}
            className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-700 hover:border-zinc-500 rounded-md text-xs font-semibold text-zinc-300 transition-colors shrink-0 max-w-[200px]"
          >
            <FileText className="w-4 h-4 text-blue-400" />
            <span className="truncate">{activePage?.name || 'Loading...'}</span>
            <ChevronDown className="w-3 h-3 text-zinc-500" />
          </button>
          
          {showPageMenu && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden z-50">
              <div className="py-1 max-h-64 overflow-y-auto">
                {pages.map(p => (
                  <div key={p.id} className={`flex items-center justify-between group px-2 py-1 ${p.id === activePageId ? 'bg-zinc-800/50' : 'hover:bg-zinc-800/30'}`}>
                    {editingPageId === p.id ? (
                       <input 
                         autoFocus
                         className="flex-1 bg-zinc-950 border border-zinc-700 text-white rounded px-2 py-1 text-xs"
                         value={editName}
                         onChange={e => setEditName(e.target.value)}
                         onKeyDown={e => handleRename(e, p.id)}
                         onBlur={e => handleRename(e, p.id)}
                         onClick={e => e.stopPropagation()}
                       />
                    ) : (
                      <button
                        onClick={() => { onSwitchPage(p.id); setShowPageMenu(false); }}
                        className={`flex-1 text-left px-2 py-1.5 text-xs font-medium cursor-pointer transition-colors truncate ${
                          p.id === activePageId ? 'text-white' : 'text-zinc-400'
                        }`}
                      >
                        {p.name}
                      </button>
                    )}
                    
                    {!editingPageId && (
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={(e) => startEdit(e, p)} className="p-1 hover:bg-zinc-700 rounded text-zinc-400 hover:text-white" title="Rename">
                          <Edit2 className="w-3 h-3" />
                        </button>
                        {pages.length > 1 && (
                          <button 
                            onClick={(e) => { e.stopPropagation(); onDeletePage(p.id); }} 
                            className="p-1 hover:bg-red-500/20 rounded text-zinc-400 hover:text-red-400" 
                            title="Delete"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="border-t border-zinc-800 p-1">
                <button
                  onClick={() => { onAddPage(); }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-xs font-semibold text-blue-400 hover:bg-zinc-800 rounded transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Page
                </button>

              </div>
            </div>
          )}
        </div>

        <div className="flex border border-zinc-800 bg-zinc-900 rounded-md p-0.5 shadow-sm">
          <button disabled={!canUndo} onClick={onUndo} className="p-1.5 rounded hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent text-zinc-400"><Undo className="w-4 h-4" /></button>
          <button disabled={!canRedo} onClick={onRedo} className="p-1.5 rounded hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent text-zinc-400"><Redo className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="flex justify-center w-1/3">
        <div className="flex bg-zinc-900 border border-zinc-800 rounded-full p-1 shadow-sm">
          <button onClick={() => setViewport('desktop')} className={`px-4 py-1.5 rounded-full flex items-center gap-2 transition-all ${viewport === 'desktop' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}>
            <Monitor className="w-4 h-4" /> <span className="text-xs font-semibold">1200px</span>
          </button>
          <button onClick={() => setViewport('tablet')} className={`px-4 py-1.5 rounded-full flex items-center gap-2 transition-all ${viewport === 'tablet' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}>
            <Tablet className="w-4 h-4" /> <span className="text-xs font-semibold">768px</span>
          </button>
          <button onClick={() => setViewport('mobile')} className={`px-4 py-1.5 rounded-full flex items-center gap-2 transition-all ${viewport === 'mobile' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}>
            <Smartphone className="w-4 h-4" /> <span className="text-xs font-semibold">375px</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 w-1/3">
        <a href={`/site/${username}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white transition-colors">
          <Play className="w-4 h-4" /> Preview
        </a>
        <button onClick={onSave} disabled={isSaving} className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-bold transition-colors disabled:opacity-70 shadow-lg shadow-blue-500/20">
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Publish Updates'}
        </button>
      </div>

    </div>
  );
}
