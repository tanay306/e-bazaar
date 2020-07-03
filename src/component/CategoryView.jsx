import React from 'react';
import TreeMenu from 'react-simple-tree-menu';
import Card from 'react-bootstrap/Card';
import styles from './CategoryView.module.css';

const CategoryView=()=>{
    const treeData = [
        {
          key: 'first-level-node-1',
          label: 'Node 1 at the first level',
        
          nodes: [
            {
              key: 'second-level-node-1',
              label: 'Node 1 at the second level',
              nodes: [
                {
                  key: 'third-level-node-1',
                  label: 'Last node of the branch',
                  nodes: [] // you can remove the nodes property or leave it as an empty array
                },
              ],
            },
          ],
        },
        {
          key: 'first-level-node-2',
          label: 'Node 2 at the first level',
        },
      ];
      return (<div className={styles.CategoryView}><Card style={{ width: '50%' }}>
      <TreeMenu data={treeData} onClickItem={(e) => console.log(e)}/>

    </Card></div>
      );
}
export default CategoryView;
