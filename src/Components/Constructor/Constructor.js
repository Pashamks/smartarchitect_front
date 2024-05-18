import "../../Styles/constructor.css"
import UploadIcon from "../../Images/upload.png"
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function Constructor(){
    const [isFile1Uploaded, setIsFile1Uploaded] = useState(false);
    const [isFile2Uploaded, setIsFile2Uploaded] = useState(false);
    const [isDetectStarted, setIsDetectStarted] = useState(false);

    const onDrop = useCallback((acceptedFiles) => {
         const imageUrl = URL.createObjectURL(acceptedFiles[0]);
         document.getElementById("uploadedImage1Id").src = imageUrl;
         document.querySelector(".FirstImageBoxUploaded").style.display = 'flex';
         setIsFile1Uploaded(true);
     }, []);
 
     const { getRootProps } = useDropzone({ onDrop });

     const onDrop2 = useCallback((acceptedFiles) => {
        const imageUrl = URL.createObjectURL(acceptedFiles[0]);
        document.getElementById("uploadedImage2Id").src = imageUrl;
        document.querySelector(".SecondImageBoxUploaded").style.display = 'flex';
        setIsFile2Uploaded(true);
    }, []);

    const { getRootProps: getRootPropsSecond } = useDropzone({ onDrop: onDrop2 });
    function tryAgainClick(){
        setIsFile1Uploaded(false);
        document.querySelector('.FirstImageBoxUploaded').style.display = 'none';
    }
    function tryAgain2Click(){
        setIsFile2Uploaded(false);
        document.querySelector('.SecondImageBoxUploaded').style.display = 'none';
    }
    function startConstructing(){
        setIsDetectStarted(true);
    }
    return (
        <div>
            <div className="UploadImagesArea" >
                <div className="FirstImageBox" {...getRootProps()} style={{ display: isFile1Uploaded ? 'none' : 'flex' }} >
                <button className="UploadPhoto">
                        <img src={UploadIcon}></img>    
                    </button>
                    <div>
                        Drag and drop file here
                    </div>
                    
                </div>
                <div className="FirstImageBoxUploaded" style={{ display: isFile1Uploaded ? 'flex' : 'none' }}>
                    <img className="UploadedImage" id="uploadedImage1Id"></img>
                </div>
                <div className="SecondImageBox" {...getRootPropsSecond()}  style={{ display: isFile2Uploaded ? 'none' : 'flex' }}>
                    <button className="UploadPhoto">
                            <img src={UploadIcon}></img>    
                        </button>
                        <div>
                            Drag and drop file here
                        </div>
                    </div>
                <div className="SecondImageBoxUploaded" style={{ display: isFile2Uploaded ? 'flex' : 'none' }}>
                    <img className="UploadedImage" id="uploadedImage2Id"></img>
                </div>
            </div>

            <div className="BeforeConstructorArea" style={{ display: isFile1Uploaded && isFile2Uploaded && !isDetectStarted ? 'flex' : 'none' }}>
            <button className="TryAgainButton" onClick={tryAgainClick}>Try another picture</button>
            <button className="TryAgainButton" onClick={startConstructing}>Start constructing</button>
            <button className="TryAgainButton" onClick={tryAgain2Click}>Try another picture</button>

            </div>
        </div>
    );
}

export default Constructor;