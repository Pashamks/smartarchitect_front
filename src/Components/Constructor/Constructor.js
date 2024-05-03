import "C:\\Users\\pavlo\\Desktop\\4.1\\Diploma\\front\\smartarchitect\\src\\Styles\\constructor.css"
import UploadIcon from "C:\\Users\\pavlo\\Desktop\\4.1\\Diploma\\front\\smartarchitect\\src\\Images\\upload.png"
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function Constructor(){

    const onDrop = useCallback((acceptedFiles) => {
         
         const imageUrl = URL.createObjectURL(acceptedFiles[0]);
         document.getElementById("uploadedImageId").src = imageUrl;
         document.querySelector(".UploadedImageArea").style.display = 'block';
     }, []);
 
     const { getRootProps } = useDropzone({ onDrop });

    return (
        <div>
            <div className="UploadImagesArea">
                <div className="FirstImageBox">

                </div>
                <div className="SecondImageBox">

                </div>
            </div>
            <div className="BeforeConstructorArea">
                <div className="ImagesArea"></div>
                <div className="ButtonsArea"></div>
            </div>
        </div>
    );
}

export default Constructor;