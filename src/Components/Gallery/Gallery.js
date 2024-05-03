import React, { useState, useEffect } from 'react';
import "C:\\Users\\pavlo\\Desktop\\4.1\\Diploma\\front\\smartarchitect\\src\\Styles\\gallery.css"
import House from "C:\\Users\\pavlo\\Desktop\\4.1\\Diploma\\front\\smartarchitect\\src\\Images\\house.jpg"
import Loupe from "C:\\Users\\pavlo\\Desktop\\4.1\\Diploma\\front\\smartarchitect\\src\\Images\\loupe.png"

const defaultImages = [
    { id: 1, src: House, title: 'Назва стилю 1', description: '3h' },
    { id: 2, src: House, title: 'Назва стилю 2', description: '5h' },
    { id: 2, src: House, title: 'Назва стилю 2', description: '5h' },
    { id: 2, src: House, title: 'Назва стилю 2', description: '5h' },
    { id: 2, src: House, title: 'Назва стилю 2', description: '5h' },
    { id: 2, src: House, title: 'Назва стилю 2', description: '5h' },
    { id: 2, src: House, title: 'Назва стилю 2', description: '5h' },
    { id: 2, src: House, title: 'Назва стилю 2', description: '5h' },
    { id: 2, src: House, title: 'Назва стилю 2', description: '5h' },
    { id: 2, src: House, title: 'Назва стилю 2', description: '5h' },
  ];

function Gallery(){
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages(defaultImages);
      }, []);

    function loadMore(){
        setImages(images.concat(images));
    }

    function showOptions(){
        alert("options");
    }

    return (
        <div>
            <div className='SearchArea'>
                <div className='SearchBox'>
                    <input className='InputText'></input>
                    <button className='ButtonSearch'>
                        <img className='LoupeImage' src={Loupe}></img>
                    </button>
                </div>
            </div>
            <div className='ImageArea'>
            {images.map((image) => (
                <div key={image.id} className="ImageItem">
                    <img className='ImagePhoto' src={image.src} alt={image.title} />
                    <div className='ImageTitle'>{image.title}</div>
                    <div className='ImageSize'>{image.description}</div>
                    <div className='OptionsArea' onClick={showOptions}>
                    <p className='OptionsText'>...</p>
                    </div>
                </div>
            ))}
            </div>
            <div className='LoadMoreArea'>
                <button onClick={loadMore} className='LoadMoreButton'>Load more</button>
            </div>
        </div>
    );
}

export default Gallery;