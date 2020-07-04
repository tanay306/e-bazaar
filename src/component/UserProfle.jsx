import React, {useState, useEffect} from 'react';
import './UserProfile.css';

const UserProfile = () => {
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    fetch(`/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then((res) => {
      console.log(res);
      setuserDetails(res.user_details);
    })
    .catch(err => console.log(err));
  })
  const [userDetails, setuserDetails] = useState(null);

      return (
        <div>
        <section className="section about-section gray-bg" id="about">
        <div className="container">
          <div className="row align-items-center flex-row-reverse">
            <div className="col-lg-6">
              <div className="about-text go-to">
                <h3 className="dark-color">My Profile</h3>
      <h6 className="theme-color lead">{userDetails.fullName}</h6>
                <div className="row about-list"> 
                  <div className="col-md-6">
                    <div className="media">
                      <label>Username</label>
      <p>{userDetails.userName}</p>
                    </div>
                    <div className="media">
                      <label>Email</label>
                      <p>{userDetails.email}</p>
                    </div>
                    <div className="media">
                      <label>Address</label>
                      <p>{userDetails.address}</p>
                    </div>
                    <div className="media">
                      <label>Area</label>
                      <p>{userDetails.area}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="media">
                      <label>Pin Code</label>
                      <p>{userDetails.pinCode}</p>
                    </div>
                    <div className="media">
                      <label>State</label>
                      <p>{userDetails.state}</p>
                    </div>
                    <div className="media">
                      <label>Mobile Number</label>
                      <p>{userDetails.mobileNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-avatar">
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" title alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
        </div>
      );
    }
export default UserProfile;