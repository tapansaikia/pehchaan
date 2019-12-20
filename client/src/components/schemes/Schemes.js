import React, { Component } from 'react'
import SchemeItem from './schemeItem'
import Spinner from '../../components/common/Spinner'
import axios from 'axios';

export class Schemes extends Component {
    constructor() {
        super()
        this.state = {
            schemes: []
        }
    }

    componentDidMount() {
        axios.get('https://scrapeschema.herokuapp.com/scrape', {
            headers: {
                'Access-Control-Allow-Origin': true,
            },
        })
            .then(res => {
                const schemes = res.data
                this.setState({ schemes })
            })
            .catch(err => console.log(err))
    }

    render() {
        console.log("Schemes", this.state.schemes)
        let schemeItems
        if (this.state.schemes === null) {
            schemeItems = <Spinner />;
        } else {
            if (this.state.schemes.length > 0) {
                schemeItems = this.state.schemes.map(scheme => (
                    <SchemeItem
                        key={scheme._id}
                        name={scheme.name}
                        link={scheme.link}
                    />
                ));
            }
            else {
                schemeItems = <h4>No information found...</h4>;
            }
        }



        return (
            <div className="profiles">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Information Section</h1>
                            <p className="lead text-center">
                                *Browse and know
                  </p>
                            {schemeItems}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Schemes