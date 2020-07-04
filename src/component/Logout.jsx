import React from 'react';
import { Button } from 'react-bootstrap';

const handleLogout = () => {
    localStorage.clear();
    fetch('/logout')
    .then(res => res.json())
    .then((response) => {
        console.log(response)
        window.location.reload();
    })
    .catch(err => console.log(err));
}

const Logout = () => {
    return (
        <Button variant="link" onClick={handleLogout}>Logout</Button>
    )
};

export default Logout;
