import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card card-body mb-3" style={{
        borderRadius: "20px",
        backgroundImage: "url('backevent.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover", borderRadius: "20px"
      }}>
        <div className="row">
          <div className="col-2">
            <img src={profile.avatar} alt="Not available" className="rounded-circle" />
          </div>

          <div className="col-lg-6 col-md-4 col-8" style={{ textAlign: "left", marginLeft: "7vw" }}>
            <h3 style={{ color: "white" }}>{profile.name}</h3>
            <br></br>
            <p>
              Marital Status :
              {profile.status}{' '}

            </p>

            <p>
              Disability :
                <span>{profile.disability}</span>
            </p>

            <p>
              Location :
                <span>{profile.location}</span>
            </p>
            <Link to={`/profile/${profile.handle}`} className="btn " style={{
              color: "#474343",
              backgroundColor: "#cbcbcb",
              borderColor: "#17a2b8"


            }}>
              View Profile
            </Link>
          </div>
        </div>
      </div >
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
