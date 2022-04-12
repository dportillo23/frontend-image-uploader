import React, { useRef } from "react";
import Mountain from '../images/image.svg'
import { useDropzone } from 'react-dropzone';
import Uploading from "./Uploading";

export default function Card(props) {

    const fileRef = useRef();

    const checkSize = fileSize => {
        const maxSize = 5 * (10 ** 6);
        if (fileSize > maxSize) {
            alert("file is too big, please add files under 5MB")
            return false
        } else { return true }
    }

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: file => {
            if (checkSize(file[0].size)) {
                props.setFile({
                    image: file[0],
                    name: file[0].name
                });
            }
        }
    });

    const handleChange = e => {
        const tempFile = e.target.files[0]
        if (checkSize(tempFile)) {
            props.setFile({
                image: tempFile,
                name: tempFile.name
            })
        }
    };


    return (
        <React.Fragment>
            {props.loading ? <Uploading percentage={ props.percentage } /> :

                <div className="card">
                    <h1>Upload your image</h1>
                    <p>File should be Jpeg, Png,...</p>

                    <div {...getRootProps()} className="image_div pre-loaded">
                        <img className="mountain" src={Mountain} alt="Mountain" />
                        <p>Drag & Drop image here</p>
                        <input {...getInputProps()} />
                    </div>
                    <p className="or">Or</p>
                    <button className="file-button" onClick={() => { fileRef.current.click() }}>Choose a file</button>
                    <input
                        ref={fileRef}
                        accept='image/*'
                        type="file"
                        onChange={handleChange}
                        multiple={false}
                        hidden
                    />
                </div>}
        </React.Fragment>

    )
}