import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import { getEvents } from '../../actions/eventActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import EventItem from './EventItem';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getEvents();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const { events } = this.props.event;

    let eventItems;

    if (events === null) {
      eventItems = <Spinner />;
    } else {
      if (events.length > 0) {
        eventItems = events.map(event => (
          <EventItem key={event._id} event={event} />
        ));
      } else {
        eventItems = <h4>No events found...</h4>;
      }
    }

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div style={{
            position: "relative",
            left: "22vw",

            borderRadius: "10px",
            width: "24vw",
            height: "48vh",
            padding: "43px",
            backgroundColor: "#5b9597"


          }}>
            <p className="lead " style={{ color: "black" }}>
              Welcome <span style={{ color: "white" }}>{profile.name}</span>
            </p>

            <div className="col-2" style={{ marginBottom: "8px" }}>
              <img src={profile.avatar} alt="Not available" className="rounded-circle" style={{ position: "relative", left: "2vw" }} />
            </div>



            <ProfileActions />
            <div style={{ marginBottom: '20px' }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome <span style={{ fontSize: "1.3em" }}> {user.name}</span></p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12" style={{

              padding: "10px"
            }}>
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
        <div style={{ marginTop: "85px" }}>
          <h2>EVENTS</h2>
          {eventItems}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  getEvents: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  event: state.event,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount, getEvents })(Dashboard);
