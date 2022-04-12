import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'



export default function UploadedCard(props) {

    const url = props.url + props.response.image;
    const inputRef = useRef(null)
    const [active, setActive] = useState("")

    const handleCopyClick = async () => {
        await navigator.clipboard.writeText(url)
        setActive("active")
        setTimeout(() => {
            setActive("")
        }, 250);
    }

    return (
        <div className="card big--card">
            <FontAwesomeIcon className="fa-solid fa-circle-check" icon={faCircleCheck} />
            <h1>Uploaded Succesfully!</h1>

            <div className="image_div uploaded">
                <img className="uploaded-image" src={url} alt={props.response.name} />
            </div>
            <div className="input-div">
                <input className="url-input" ref={inputRef} type="text" value={url} readOnly />
                <button className={`copy-button ${active}`} onClick={handleCopyClick}>Copy Link</button>
            </div>
        </div>
    )
}
