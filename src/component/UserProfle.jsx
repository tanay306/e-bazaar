import React from 'react'; 
const UserProfile = () => {
      return (
      //  <Form.Control type="text" placeholder="Readonly input here..." readOnly />
        <section className="section about-section gray-bg" id="about">
          <div className="container">
            <div className="row align-items-center flex-row-reverse">
              <div className="col-lg-6">
                <div className="about-text go-to">
                  <h3 className="dark-color">My Profile</h3>
                  <h6 className="theme-color lead">Tanay Gandhi</h6>
                  <div className="row about-list"> 
                    <div className="col-md-6">
                      <div className="media">
                        <label>Birthday</label>
                        <p>xyz</p>
                      </div>
                      <div className="media">
                        <label>Age</label>
                        <p>xyz</p>
                      </div>
                      <div className="media">
                        <label>Residence</label>
                        <p>xyz</p>
                      </div>
                      <div className="media">
                        <label>Address</label>
                        <p>xyz</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="media">
                        <label>E-mail</label>
                        <p>xyz</p>
                      </div>
                      <div className="media">
                        <label>Phone</label>
                        <p>xyz</p>
                      </div>
                      <div className="media">
                        <label>Skype</label>
                        <p>xyz</p>
                      </div>
                      <div className="media">
                        <label>Gender</label>
                        <p>xyz</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>
      );
    }
export default UserProfile;