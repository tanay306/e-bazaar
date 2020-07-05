import React, { useState, useEffect } from 'react';
import {Table,Dropdown,Form} from "react-bootstrap";
import SingleStatus from './SingleStatus';

const OrderTable = () => {
    const [cart, setCart] = useState([]);
    const [count, setCount]=useState(0);
    const [total, setTotal]= useState(0);
    const[user_coins, setUser_coins]=useState(0)
    const [show, setShow] = useState(false);
    const [progress, setProgress] = useState(50);
    useEffect(()=>{
        fetch('/orders',{
          method: 'GET',
          headers: {
            'Content-Type': 'application-json'
      }
        })
      .then(res=>res.json())
      .then((res)=> {
        console.log(res);
        setCart(res.orders);
        setCount(res.count);
        setTotal(res.total);
        setUser_coins(res.user_coins);
      })
      .catch(err=>console.log(err));
        }, []);
        const updateStatus =(id)=>{
            console.log(id)

        }
    return (
        <div className="container">
            <div className="row mb-4">
                <div className="col-sm-12 grid-margin">
                    <div className="card h-100">
                        <div className="card-body">
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                    <th>Order ID:</th>
                                    <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {cart.map((cartItem) => {
                                             
                                             return (
                                                 <tr>
         
                                         <td>{cartItem.id}</td>
                                         <td><SingleStatus id={cartItem.id} prevStatus={cartItem.status}/></td>
                                       
                                        
                                         </tr>
                                             )
                                         })}
                         
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderTable;
