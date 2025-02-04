export class NodeTree {
  left: NodeTree | string | null;
  right: NodeTree | string | null;

  constructor(
    left: NodeTree | string | null = null,
    right: NodeTree | string | null = null
  ) {
    this.left = left;
    this.right = right;
  }

  children(): [NodeTree | string | null, NodeTree | string | null] {
    return [this.left, this.right];
  }

  toString(): string {
    return `${this.left}+${this.right}`;
  }
}

export function huffmanCodeTree(
  node: NodeTree | string,
  binString: string = ""
): Record<string, string> {
  if (typeof node === "string") {
    return { [node]: binString };
  }

  const [leftNode, rightNode] = node.children();
  const d: Record<string, string> = {};

  Object.assign(
    d,
    huffmanCodeTree(leftNode as NodeTree | string, binString + "0")
  );
  Object.assign(
    d,
    huffmanCodeTree(rightNode as NodeTree | string, binString + "1")
  );

  return d;
}

export function prepareNodes(freqDict: Record<string, number>): NodeTree {
  const freq: [string, number][] = Object.entries(freqDict).sort(
    (a, b) => b[1] - a[1]
  );
  let nodes: [NodeTree | string, number][] = freq;

  while (nodes.length > 1) {
    const [key1, c1] = nodes[nodes.length - 1];
    const [key2, c2] = nodes[nodes.length - 2];
    nodes = nodes.slice(0, -2);
    const node = new NodeTree(key2, key1);
    nodes.push([node, c1 + c2]);

    nodes.sort((a, b) => b[1] - a[1]);
  }

  return nodes[0][0] as NodeTree;
}
