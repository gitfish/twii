declare const removeAllChildren: (node: Node) => Node[];
declare const shrinkChildren: (node: Node, count: number) => void;
declare const setSingleChild: (node: Node, content: Node) => void;
declare const dispatchWindowResize: () => void;
export { removeAllChildren, shrinkChildren, setSingleChild, dispatchWindowResize };
