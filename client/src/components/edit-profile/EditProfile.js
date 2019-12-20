import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handle: '',
            location: '',
            status: '',
            bio: '',
            gender: '',
            disability: '',
            age: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        if (nextProps.profile.profile) {
            const profile = nextProps.profile.profile;

            // If profile field doesnt exist, make empty string
            profile.gender = !isEmpty(profile.gender) ? profile.gender : '';
            profile.disability = !isEmpty(profile.disability) ? profile.disability : '';
            profile.location = !isEmpty(profile.location) ? profile.location : '';
            profile.age = !isEmpty(profile.age) ? profile.age : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';

            // Set component fields state
            this.setState({
                handle: profile.handle,
                gender: profile.gender,
                age: profile.age,
                location: profile.location,
                status: profile.status,
                disability: profile.disability,
                bio: profile.bio
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            gender: this.state.gender,
            age: this.state.age,
            location: this.state.location,
            status: this.state.status,
            disability: this.state.disability,
            bio: this.state.bio
        };

        this.props.createProfile(profileData, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors } = this.state;

        // Select options for status
        const options = [
            { label: '* Select Marital Status', value: 0 },
            { label: 'Married', value: 'Married' },
            { label: 'Not Married', value: 'Unmarried' }
        ];

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
              </Link>
                            <h1 className="display-4 text-center">Edit Profile</h1>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit} encType="multipart/form-data">
                                <TextFieldGroup
                                    placeholder="* Profile Handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="A unique handle for your profile URL. Your full name, company name, nickname"
                                />
                                <SelectListGroup
                                    placeholder="Status"
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    options={options}
                                    error={errors.status}
                                    info="Married or Unmarried"
                                />
                                <TextFieldGroup
                                    placeholder="Impairment"
                                    name="disability"
                                    value={this.state.disability}
                                    onChange={this.onChange}
                                    error={errors.disability}
                                    info="type of impairment"
                                />
                                <TextFieldGroup
                                    placeholder="Age"
                                    name="age"
                                    value={this.state.age}
                                    onChange={this.onChange}
                                    error={errors.age}
                                    info="current age"
                                />
                                <TextFieldGroup
                                    placeholder="gender"
                                    name="gender"
                                    value={this.state.gender}
                                    onChange={this.onChange}
                                    error={errors.gender}
                                    info="Male/Female"
                                />
                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info="City or city & state suggested (eg. Boston, MA)"
                                />
                                <TextAreaFieldGroup
                                    placeholder="Short Bio"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="Tell us a little about yourself"
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

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
    withRouter(CreateProfile)
);
