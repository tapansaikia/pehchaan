import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EventItem extends Component {
    render() {
        const { event } = this.props;

        return (
            <div className="card card-body  mb-3" style={{
                backgroundImage: "url('./postback.png')",
                borderRadius: "20px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",

                borderRadius: "20px"
            }
            }>
                <div className="row">
                    <div className="col-lg-6 col-md-4 col-8" style={{ textAlign: "left" }}>
                        <p style={{ fontWeight: "bold", fontSize: "1.7em", color: "white" }}>Title: {event.title}</p>
                        <p style={{ fontWeight: "bold", fontSize: "1.2em", color: "white" }}>Description: <span style={{ fontWeight: "normal", fontSize: "1.2em" }}>{event.description}</span></p>
                        <p style={{ fontWeight: "bold", fontSize: "1.2em", color: "white" }}>Date: <span style={{ fontWeight: "normal", fontSize: "1.2em" }}>{event.eventDate}</span></p>
                        <p style={{ fontWeight: "bold", fontSize: "1.2em", color: "white" }}>Time: <span style={{ fontWeight: "normal", fontSize: "1.2em" }}>{event.eventItem}</span> </p>
                        <p style={{ fontWeight: "bold", fontSize: "1.2em", color: "white" }}>Venue: <span style={{ fontWeight: "normal", fontSize: "1.2em" }}>{event.venue}</span></p>
                    </div>
                </div>
            </div >
        );
    }
}

EventItem.propTypes = {
    event: PropTypes.object.isRequired
};

export default EventItem;
