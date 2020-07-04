import React, {useState, useEffect} from 'react';
import './UserProfile.css';

const UserProfile = () => {
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    fetch(`/user_details/${userId}`, {
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
  }, [userId])
  const [userDetails, setuserDetails] = useState(null);
  console.log(userDetails)
if (userDetails) {
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
                  <h6 className="text-dark info">Username:</h6>
                  <h6 className="text-dark info"> {userDetails.username}</h6>
                </div>
                <div className="media">
                  <h6 className="text-dark info">Email:</h6>
                  <h6 className="text-dark info"> {userDetails.email}</h6>
                </div>
                <div className="media">
                  <h6 className="text-dark info">Address:</h6>
                  <h6 className="text-dark not_info"> {userDetails.address}</h6>
                </div>
              </div>
              <div className="col-md-6">
                <div className="media">
                  <h6 className="text-dark info">Area:</h6>
                  <h6 className="text-dark info"> {userDetails.area}</h6>
                </div>
                <div className="media">
                  <h6 className="text-dark info">State:</h6>
                  <h6 className="text-dark info"> {userDetails.state_name}</h6>
                </div>
                <div className="media">
                  <h6 className="text-dark info">Number:</h6>
                  <h6 className="text-dark info"> {userDetails.mobile_number}</h6>
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
return null;
    
    }
export default UserProfile;