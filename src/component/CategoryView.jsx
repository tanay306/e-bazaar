import React from 'react';
import TreeView from 'treeview-react-bootstrap';

const CategoryView=()=>{
    var tree = [
        {
          text: 'Apparel',
          nodes: [
            {
              text: "T-shirt",
              nodes: [
                {
                  text: "Grandchild 1"
                },
                {
                  text: "Grandchild 2"
                }
              ]
            },
            {
              text: "Child 2"
            }
          ]
        },
        {
          text: "Parent 2"
        },
        {
          text: "Parent 3"
        },
        {
          text: "Parent 4"
        },
        {
          text: "Parent 5"
        }
      ];
      return (<TreeView data={tree} selectable onClick={e=>console.log(e)} removable/>
        );
}
export default CategoryView;
