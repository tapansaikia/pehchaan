import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import DescText from '../common/DescText';
import Time from '../common/Time';
import Date from '../common/Date';
import { addEvent } from '../../actions/eventActions';

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            eventDate: '',
            eventTime: '',
            venue: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const eventData = {
            title: this.state.title,
            description: this.state.description,
            eventDate: this.state.eventDate,
            eventTime: this.state.eventTime,
            venue: this.state.venue,
        };

        this.props.addEvent(eventData, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row" style={{ border: "1px solid #00000030", borderRadius: "20px" }}>
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Create Event</h1>

                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>

                                <div style={{ textAlign: "left" }}>Title :
                                    <br></br>
                                </div>


                                <TextFieldGroup
                                    placeholder=""
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChange}
                                    error={errors.title}
                                    info=""
                                />





                                <div style={{ textAlign: "left" }}>Description :
                                    <br></br>
                                </div>

                                <DescText
                                    placeholder=""
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                    info=""
                                />



                                <div style={{
                                    textAlign: "left", display: "inline",
                                    position: "relative",
                                    left: " -22vw"
                                }}>Date :
                                    <br></br>
                                </div>
                                <Date
                                    placeholder=""
                                    name="eventDate"
                                    value={this.state.eventDate}
                                    onChange={this.onChange}
                                    error={errors.eventDate}
                                    info=""


                                />


                                <div style={{
                                    textAlign: "left", display: "inline",
                                    position: "relative",
                                    left: " -7vw",
                                    top: "-5vh"
                                }}>Time :
                                    <br></br>
                                </div>

                                <Time
                                    placeholder=""
                                    name="eventTime"
                                    value={this.state.eventTime}
                                    onChange={this.onChange}
                                    error={errors.eventTime}
                                    info=""
                                />


                                <div style={{ textAlign: "left" }}>Venue :
                                    <br></br>
                                </div>
                                <TextFieldGroup
                                    placeholder="venue"
                                    name="venue"
                                    value={this.state.venue}
                                    onChange={this.onChange}
                                    error={errors.venue}
                                    info="City or city & state suggested (eg. Boston, MA)"
                                />
                                <input
                                    type="submit"
                                    value="Submit"
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Event.propTypes = {
    event: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    event: state.event,
    errors: state.errors
});

export default connect(mapStateToProps, { addEvent })(
    withRouter(Event)
);