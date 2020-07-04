import React from "react";
import TreeMenu from "react-simple-tree-menu";
import Card from "react-bootstrap/Card";
import styles from "./CategoryView.module.css";

const CategoryView = () => {
  const treeData = [
    {
      key: "Apparels",
      label: "Apparels",

      nodes: [
        {
          key: "Shirt",
          label: "Shirt",
          nodes: [
            {
              key: "Formal",
              label: "Formal",
            },
            {
              key: "Casual",
              label: "Casual",
            },
          ],
        },
      ],
    },
    {
      key: "Electronics",
      label: "Electronics",

      nodes: [
        {
          key: "Mobile",
          label: "Mobile",
        },
        {
          key: "Television",
          label: "Television",
          // you can remove the nodes property or leave it as an empty array
        },
        {
          key: "Refrigerator",
          label: "Refrigerator",
          // you can remove the nodes property or leave it as an empty array
        },
      ],
    },
  ];
  return (
    <div className={styles.CategoryView}>
      <Card style={{ width: "100%" }}>
        <TreeMenu data={treeData} onClickItem={(e) => console.log(e)} />
      </Card>
    </div>
  );
};
export default CategoryView;
