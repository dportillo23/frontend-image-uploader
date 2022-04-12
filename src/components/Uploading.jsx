import React from "react";

export default function Uploading(props) {
return (
    <div className="card uploading--card">
        <h1>Uploading...</h1>
        <div className="bar" data-percentage={ `${-100 + props.percentage}%` }></div>
    </div>
)
};