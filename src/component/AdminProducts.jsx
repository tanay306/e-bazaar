import React,{useEffect, useState} from 'react';
import filter from 'lodash/filter';
import {Table, Button} from "react-bootstrap";
import styles from './UserCart.module.css';

const UserCart = () => {
    useEffect(()=>{
        fetch('/admin_products',{
          method: 'GET',
          headers: {
            'Content-Type': 'application-json'
      }
        })
      .then(res=>res.json())
      .then((res)=> {
        console.log(res);})
      .catch(err=>console.log(err));
        }, []);
        const deleteFromProducts = (title) => {
            fetch(`/delete_item/${title}`, {
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
        if (cart &&cart.length > 0 ){
            return (
                <div className="container">
                    <div className={`${styles.title} text-center`} ><h1><u>YOUR CART</u></h1></div>
                    <div className="row mb-4">
                        <div className="col-sm-12 grid-margin">
                                    <Table hover responsive size="sm" variant="dark">
                                        <thead>
                                            <tr>
                                            <th>Product ID</th>
                                            <th>Product Name</th>
                                            <th>Description</th>
                                            <th>Discounted Price</th>
                                            <th>Price</th>
                                            <th>Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map((cartItem) => {
                                             
                                                return (
                                                    <tr>
                                            <td>{cartItem.id}</td>
                                            <td>{cartItem.title}</td>
                                            <td>{cartItem.description}</td>
                                            <td>{cartItem.disc_price}</td>
                                            <td>{cartItem.price}</td>
                                            <td><Button variant="danger" onClick={() => deleteFromCart(cartItem.title)}>Remove</Button></td>
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
    return <h6>No product has been added by you!!!!</h6>
}

export default UserCart;
