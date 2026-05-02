import { VibeNode } from '../../types/vibe';

export const generateId = () => Math.random().toString(36).substr(2, 9);

export const updateNode = (root: VibeNode, targetId: string, updates: Partial<VibeNode>): VibeNode => {
  if (root.id === targetId) return { ...root, ...updates };
  if (!root.children) return root;
  return {
    ...root,
    children: root.children.map(c => updateNode(c, targetId, updates))
  };
};

export const addNode = (root: VibeNode, targetParentId: string, newNode: VibeNode): VibeNode => {
  if (root.id === targetParentId) {
    return { ...root, children: [...(root.children || []), newNode] };
  }
  if (!root.children) return root;
  return {
    ...root,
    children: root.children.map(c => addNode(c, targetParentId, newNode))
  };
};

export const removeNode = (root: VibeNode, targetId: string): VibeNode | null => {
  if (root.id === targetId) return null;
  if (!root.children) return root;
  return {
    ...root,
    children: root.children.map(c => removeNode(c, targetId)).filter(Boolean) as VibeNode[]
  };
};

export const duplicateNode = (root: VibeNode, targetId: string): VibeNode => {
  const findAndClone = (node: VibeNode): VibeNode => ({
    ...node,
    id: generateId(),
    children: node.children ? node.children.map(findAndClone) : []
  });

  const traverse = (node: VibeNode): VibeNode => {
    if (!node.children) return node;
    const targetChildIndex = node.children.findIndex(c => c.id === targetId);
    if (targetChildIndex > -1) {
      const cloned = findAndClone(node.children[targetChildIndex]);
      const newChildren = [...node.children];
      newChildren.splice(targetChildIndex + 1, 0, cloned);
      return { ...node, children: newChildren };
    }
    return {
      ...node,
      children: node.children.map(traverse)
    };
  };
  
  if (root.id === targetId) return root; // Cannot duplicate the absolute root
  return traverse(root);
};

export const moveNode = (root: VibeNode, targetId: string, direction: 'up' | 'down'): VibeNode => {
  if (root.id === targetId) return root; // Can't move root
  
  const traverse = (node: VibeNode): VibeNode => {
    if (!node.children) return node;
    
    const index = node.children.findIndex(c => c.id === targetId);
    if (index > -1) {
      if (direction === 'up' && index > 0) {
        const newChildren = [...node.children];
        const temp = newChildren[index];
        newChildren[index] = newChildren[index - 1];
        newChildren[index - 1] = temp;
        return { ...node, children: newChildren };
      } else if (direction === 'down' && index < node.children.length - 1) {
        const newChildren = [...node.children];
        const temp = newChildren[index];
        newChildren[index] = newChildren[index + 1];
        newChildren[index + 1] = temp;
        return { ...node, children: newChildren };
      }
      return node; // Can't move further
    }
    
    return {
      ...node,
      children: node.children.map(traverse)
    };
  };

  return traverse(root);
};
