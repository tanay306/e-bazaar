import React,{useEffect, useState} from 'react';
import filter from 'lodash/filter';
import {Table,Dropdown, Button,Modal,ProgressBar} from "react-bootstrap";
import Tracking from './Tracking';
import styles from './UserCart.module.css';

const UserOrders = () => {
    const [cart, setCart] = useState([]);
    const [count, setCount]=useState(0);
    const [total, setTotal]= useState(0);
    const[user_coins, setUser_coins]=useState(0)
    const [show, setShow] = useState(false);
    const [progress, setProgress] = useState(50);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const [price, setPrice]= useState(0);
    // const [discountprice, setdiscountPrice]= useState(0);

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
        const deleteFromCart = (id) => {
            fetch(`/delete_cart/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application-json'
                }
            })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                window.location.reload();
            })
            .catch(err => console.log(err))
        }
         const buyNow =()=>{
            handleShow()
             fetch(`/add_orders`, {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application-json'
                 },
                 body: JSON.stringify({ coin_balance: user_coins-total })
             })
             .then(res => res.json())
             .then((data) => {
                 console.log(data)
                 setProgress(100)
                
             })
             .catch(err => console.log(err))
            

         }
        if (cart &&cart.length > 0 ){
            return (
                <div className="container">
                    <div className={`${styles.title} text-center`} ><h1><u>YOUR ORDERS</u></h1></div>
                    <div className="row mb-4">
                        <div className="col-sm-12 grid-margin">
                                    <Table hover responsive size="sm" variant="dark">
                                        <thead>
                                            <tr>
                                            <th>Item Id</th>
                                            <th>Cart Id</th>
                                            <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map((cartItem) => {
                                             
                                                return (
                                                    <tr>
            
                                            <td>{cartItem.item_id}</td>
                                            <td>{cartItem.cart_id}</td>
                                           <td style={{ margin: 'auto', width: '100px' }}><Tracking orderId={cartItem.id} status={Math.floor((Math.random() * 3) + 1)} /></td>
                                            </tr>
                                                )
                                            })}
                                            
                                        </tbody>
                                    </Table>
                        </div>
                    </div>
                   
                                       
                                    
                </div>
                
            )
        }
    return <h6>Your cart is empty!</h6>
}

export default UserOrders;
