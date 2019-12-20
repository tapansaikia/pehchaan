import React from 'react'
import { Link } from 'react-router-dom'

const schemeItem = ({
    name,
    link
}) => {
    return (
        <div className="card">
            <h5 className="card-header" style={{ backgroundColor: "#4f9e9e" }}>{name}</h5>
            <div className="card-body" style={{ backgroundColor: "#e5e5e5", marginBottom: "15px" }}>
                <Link to={link} >{link}</Link>
            </div>
        </div>
    )
}

export default schemeItem
