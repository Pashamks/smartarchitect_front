import "C:\\Users\\pavlo\\Desktop\\4.1\\Diploma\\front\\smartarchitect\\src\\Styles\\detector.css"
import UploadIcon from "C:\\Users\\pavlo\\Desktop\\4.1\\Diploma\\front\\smartarchitect\\src\\Images\\upload.png"
import { useDropzone } from 'react-dropzone';
import React, { useState, useCallback } from 'react';

function Detector(){
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [isDetectStarted, setIsDetectStarted] = useState(false);
    const [isImageSaved, setIsImageSaved] = useState(false);


    const onDrop = useCallback((acceptedFiles) => {
       setIsFileUploaded(true);
        
        const imageUrl = URL.createObjectURL(acceptedFiles[0]);
        document.getElementById("uploadedImageId").src = imageUrl;
        document.querySelector(".UploadedImageArea").style.display = 'block';
    }, []);

    const { getRootProps } = useDropzone({ onDrop });
    
    function detectClick(){
        setIsDetectStarted(true);
        document.querySelector(".UploadedImageArea").style.display = 'none';
        document.getElementById("originImageId").src = document.getElementById("uploadedImageId").src;
    }

    function tryAgainClick(){
        setIsDetectStarted(false);
        setIsFileUploaded(false);
        setIsImageSaved(false);
        document.getElementById('popupId').style.display = 'none';
    }

    function saveToGallery(){
        var txt = "Image successfully saved to gallery!";
        var speed = 100;
        var i = 0;

        function typeWriter() {
            if (i < txt.length) {
                document.getElementById("textId").innerHTML += txt.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
            }

        if(isImageSaved){
            txt = "You can not save one image twice!"
            document.getElementById("textId").innerHTML = "";
            typeWriter();
            return;
        }
        document.getElementById('popupId').style.display = 'block';
        setIsImageSaved(true);

        document.getElementById("textId").innerHTML = "";
        typeWriter();
       
    }

    return(
        <div> 
            <div className = "UploadImageBox" {...getRootProps()} style={{ display: isFileUploaded ? 'none' : 'block' }}>
                <div className="DetectFrame"> 
                    <button className="UploadPhoto">
                        <img src={UploadIcon}></img>    
                    </button>
                    <div>
                        Drag and drop file here
                    </div>
                </div>
            </div>

            <div className="UploadedImageArea" >
                <div className="DetectBox">
                    <img className="UploadedImage" id="uploadedImageId"></img>
                </div>
                <div className="DetectButtonArea">
                    <button className="DetectButton" onClick={detectClick}>Detect</button>
                </div>  
            </div>
                <div className="DetectionResultBox" style={{ display: isDetectStarted ? 'block' : 'none' }}>
                    <div className="TextArea">
                        <div className="OriginalText">
                            Original
                        </div>
                        <div className="ResultsText">
                            Results
                        </div>
                    </div>
                    <div className="BoxesArea">
                        <div className="OriginImageBox">
                            <img id="originImageId"></img>
                        </div>
                        <div className="ResultsArea">
                            <div className="ResultsBox"></div>
                        </div>
                    </div>
                    <div className="ButtonsArea">
                        <button className="SaveGalleryButton" onClick={saveToGallery}>Save to gallery</button>
                        <button className="TryAgainButton" onClick={tryAgainClick}>Try another picture</button>
                    </div>
                </div> 
                <div className="Popup" id="popupId" style={{display : 'block'}}>
                    <div className="PopupText">
                        <p id="textId"></p>
                    </div>
                </div>      
        </div>
    );
}
export default Detector;