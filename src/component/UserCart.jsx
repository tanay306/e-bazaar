import React,{useEffect, useState} from 'react';
import {Table,Dropdown, Button} from "react-bootstrap";
import Tracking from './Tracking';

const UserCart = () => {
    const [cart, setCart] = useState([]);
    const [count, setCount]=useState(0);
    const [total, setTotal]= useState(0);
    // const [price, setPrice]= useState(0);
    // const [discountprice, setdiscountPrice]= useState(0);

    useEffect(()=>{
        fetch('/cart',{
          method: 'GET',
          headers: {
            'Content-Type': 'application-json'
      }
        })
      .then(res=>res.json())
      .then((res)=> {
        console.log(res);
        setCart(res.cart_items);
        setCount(res.count);
        setTotal(res.total);
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
        if (cart &&cart.length > 0 ){
            return (
                <div className="container">
                    <div className="row mb-4">
                        <div className="col-sm-12 grid-margin">
                            <div className="card h-100">
                                <div className="card-body">
                                    <Table striped bordered hover size="sm" variant="dark">
                                        <thead>
                                            <tr>
                                            <th>Product Name</th>
                                            <th>Discounted Price</th>
                                            <th>Price</th>
                                            <th>Remove</th>
                                            
                                            
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map((cartItem) => {
                                             
                                                return (
                                                    <tr>
                                            <td>{cartItem.title}</td>
                                            <td>{cartItem.disc_price}</td>
                                            <td>{cartItem.price}</td>
                                            <td><Button variant="primary" onClick={() => deleteFromCart(cartItem.id)}>
                      Remove from Cart
                    </Button></td>
                                            </tr>
                                                )
                                            })}
                                            
                                        </tbody>
                                    </Table>
                                </div> 
                            </div>
                        </div>
                    </div>
                    <div className='row'><h4>Number Of Items-{count}</h4></div>
                    <div className='row'><h4>Total Bill Amount-Rs {total}</h4></div>
                    {/* <div className='row'><h4>Congratulations You Saved-Rs {price}!</h4></div> */}
                                        <div><Button variant='primary' >Proceed to Buy</Button></div>
                </div>
                
            )
        }
    return <h6>Your cart is empty!</h6>
}

export default UserCart;
