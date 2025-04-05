import { useEffect, useState } from "react";
import React from "react";
import Tree from "react-d3-tree";
import { TreeLinkDatum, Orientation } from "react-d3-tree";
import { NodeTree } from "./functions/algorithms/haffman";

function convertNodeToD3Tree(node: NodeTree | string): object {
  if (typeof node === "string") {
    return { name: node };
  }

  const [left, right] = node.children();
  return {
    name: node.toString(),
    children: [
      convertNodeToD3Tree(left as NodeTree | string),
      convertNodeToD3Tree(right as NodeTree | string),
    ],
  };
}

const HuffmanVisual2: React.FC<{ rootNode: NodeTree | null }> = ({
  rootNode,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [treeData, setTreeData] = useState<any>(null);

  useEffect(() => {
    if (rootNode !== null) {
      const d3TreeData = convertNodeToD3Tree(rootNode);
      setTreeData(d3TreeData);
    }
  }, [rootNode]);

  const straightPathFunc = (
    linkDatum: TreeLinkDatum,
    orientation: Orientation
  ): string => {
    const { source, target } = linkDatum;
    return orientation === "horizontal"
      ? `M${source.y},${source.x}L${target.y},${target.x}` // Горизонтальная ориентация
      : `M${source.x},${source.y}L${target.x},${target.y}`; // Вертикальная ориентация
  };

  if (!treeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="w-6xl h-96">
        <Tree
          zoom={0.6}
          data={treeData}
          orientation="vertical"
          // pathFunc="straight"
          pathFunc={straightPathFunc}
          collapsible={false}
          translate={{
            x: window.innerWidth / 2 - 100,
            y: window.innerHeight / 12,
          }}
          nodeSize={{ x: 150, y: 100 }}
          separation={{ siblings: 0.7, nonSiblings: 0.8 }}
          renderCustomNodeElement={(rd3tProps) => {
            const { nodeDatum } = rd3tProps;
            const isLeaf =
              !nodeDatum.children || nodeDatum.children.length === 0; // Проверка на лист

            return (
              <g>
                {/* Круглый узел */}
                <circle r={15} fill={isLeaf ? "#82ca9d" : "#ff7f50"} />{" "}
                {/* Листы другого цвета */}
                {/* Текст внутри круга (если это лист) */}
                {isLeaf && (
                  <text
                    x={0} // Центрируем текст по горизонтали
                    y={5} // Смещаем текст вниз для выравнивания
                    textAnchor="middle" // Выравнивание по центру
                    fill="#333" // Цвет текста
                    fontSize={18} // Размер текста
                  >
                    {nodeDatum.name === " " || nodeDatum.name === ""
                      ? "_"
                      : nodeDatum.name}
                  </text>
                )}
                {/* Текст над узлом (если это не лист) */}
                {!isLeaf && (
                  <text
                    x={0} // Позиция текста по центру узла
                    y={-20} // Смещение текста вверх
                    textAnchor="middle" // Выравнивание по центру
                    fill="" // Цвет текста
                    fontSize={18} // Размер текста
                  >
                    {nodeDatum.name} {/* Текст из данных узла */}
                  </text>
                )}
                {nodeDatum.children &&
                  nodeDatum.children.map((_, index) => {
                    const isLeftChild = index === 0;
                    const label = isLeftChild ? "0" : "1";

                    return (
                      <text
                        key={index}
                        x={isLeftChild ? -20 : 20} // Позиция текста по X
                        y={20} // Позиция текста по Y
                        textAnchor="middle" // Выравнивание текста по центру
                        fill="#333" // Цвет текста
                        fontSize="16" // Размер текста
                      >
                        {label}
                      </text>
                    );
                  })}
              </g>
            );
          }}
        />
      </div>
    </div>
  );
};

export default HuffmanVisual2;
