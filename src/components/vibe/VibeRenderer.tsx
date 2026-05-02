import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { VibeNode } from '../../types/vibe';

interface Props {
  key?: React.Key;
  node: VibeNode;
  selectedId: string | null;
  hoveredId: string | null;
  onSelect?: (id: string | null) => void;
  onHover?: (id: string | null) => void;
  onContentChange?: (id: string, content: string) => void;
  onUpdateNode?: (node: Partial<VibeNode> & { id: string }) => void;
  mode: 'edit' | 'preview';
}

export default function VibeRenderer({
  node, selectedId, hoveredId, onSelect, onHover, onContentChange, onUpdateNode, mode
}: Props) {
  const isSelected = selectedId === node.id;
  const isHovered = hoveredId === node.id && !isSelected;
  const isAbsolute = node.styles.position === 'absolute' || node.styles.position === 'fixed';
  const navigate = useNavigate();
  const { username } = useParams();

  // Basic drag implementation for absolute elements
  const handleDragStart = (e: React.DragEvent) => {
    if (mode === 'edit' && isAbsolute && onUpdateNode) {
      e.stopPropagation();
      e.dataTransfer.setData('startX', e.clientX.toString());
      e.dataTransfer.setData('startY', e.clientY.toString());
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      e.dataTransfer.setData('offsetX', (e.clientX - rect.left).toString());
      e.dataTransfer.setData('offsetY', (e.clientY - rect.top).toString());
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (mode === 'edit' && isAbsolute && onUpdateNode) {
      const parentRect = (e.target as HTMLElement).parentElement?.getBoundingClientRect();
      if (!parentRect) return;
      
      const offsetX = parseFloat(e.dataTransfer.getData('offsetX') || '0');
      const offsetY = parseFloat(e.dataTransfer.getData('offsetY') || '0');
      
      const newLeft = e.clientX - parentRect.left - offsetX;
      const newTop = e.clientY - parentRect.top - offsetY;

      onUpdateNode({
        id: node.id,
        styles: {
          ...node.styles,
          left: `${Math.round(newLeft)}px`,
          top: `${Math.round(newTop)}px`,
          bottom: 'auto',
          right: 'auto',
        }
      });
    }
  };

  const interactiveStyle: React.CSSProperties = mode === 'edit' ? {
    outline: isSelected ? '2px solid #3b82f6' : isHovered ? '1px solid #60a5fa' : 'none',
    outlineOffset: '-1px',
    cursor: mode === 'edit' ? 'default' : 'auto',
    transition: 'outline 0.1s ease',
  } : {};

  const handleClick = (e: React.MouseEvent) => {
    if (mode === 'edit') {
      e.stopPropagation();
      e.preventDefault();
      onSelect?.(node.id);
    } else if (mode === 'preview' && node.type === 'button') {
      const href = node.href as string || '';
      if (href.startsWith('/')) {
        e.preventDefault();
        e.stopPropagation();
        if (username) {
          navigate(`/site/${username}${href}`);
        } else {
          // If we are previewing inside the editor without a username path
          console.log(`Navigating to target path ${href} in editor preview`);
        }
      } else if (href) {
        window.location.href = href;
      }
    }
  };

  const handlePointerOver = (e: React.MouseEvent) => {
    if (mode === 'edit') {
      e.stopPropagation();
      onHover?.(node.id);
    }
  };

  const handlePointerOut = (e: React.MouseEvent) => {
    if (mode === 'edit') {
      e.stopPropagation();
      onHover?.(null);
    }
  };

  const commonProps = {
    id: node.elementId || node.id,
    style: { ...node.styles, ...interactiveStyle },
    onClick: handleClick,
    onMouseOver: handlePointerOver,
    onMouseOut: handlePointerOut,
    draggable: mode === 'edit' && isAbsolute,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
  };

  if (node.type === 'image') {
    return <img src={node.src || 'https://via.placeholder.com/300'} alt={node.name} {...commonProps} />;
  }

  if (node.type === 'divider') {
    return <hr {...commonProps} />;
  }
  
  if (node.type === 'spacer') {
    return <div {...commonProps} />;
  }

  if (node.type === 'shape') {
    return <div {...commonProps} />;
  }

  if (node.type === 'text' || node.type === 'button') {
    if (mode === 'edit') {
      const T: any = node.type === 'button' ? 'a' : 'div';
      return React.createElement(T, {
        ...commonProps,
        contentEditable: isSelected && (node.type === 'text' || node.type === 'button'),
        suppressContentEditableWarning: true,
        onBlur: (e: React.FocusEvent<HTMLElement>) => {
          if (isSelected && onContentChange && (node.type === 'text' || node.type === 'button')) {
            onContentChange(node.id, e.currentTarget.innerText);
          }
        }
      }, node.content);
    } else {
      const T: any = node.type === 'button' ? 'a' : 'div';
      return React.createElement(T, {
        ...commonProps,
        ...(node.type === 'button' ? { href: node.href } : {})
      }, node.content);
    }
  }

  const Tag: any = node.type === 'section' ? 'section' : 'div';

  return (
    <Tag {...commonProps}>
      {node.children?.map(child => (
        <VibeRenderer
          key={child.id}
          node={child}
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={onSelect}
          onHover={onHover}
          onContentChange={onContentChange}
          onUpdateNode={onUpdateNode}
          mode={mode}
        />
      ))}
    </Tag>
  );
}
