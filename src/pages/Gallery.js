import React, { useState, useEffect, useCallback, useMemo } from 'react';
import '../stylesheets/Gallery.css';
import placeholder1 from '../img/Logo/1.png';
import placeholder2 from '../img/Logo/2.png';
import placeholder3 from '../img/Logo/3.png';


const Gallery = () => {
  const images = useMemo(() => [
    { src: placeholder1, alt: 'Placeholder 1' },
    { src: placeholder2, alt: 'Placeholder 2' },
    { src: placeholder3, alt: 'Placeholder 3' },
  ], []);

  const [selectedIndex, setSelectedIndex] = useState(null);

  const openModal = (index) => setSelectedIndex(index);
  const closeModal = useCallback(() => setSelectedIndex(null), []);
  const prevImage = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images, setSelectedIndex]);
  const nextImage = useCallback(() => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images, setSelectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex !== null) {
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'Escape') closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, prevImage, nextImage, closeModal]);

  return (
    <div className="container">
      <h2>Our Face Painting Gallery</h2>
      <div className="gallery-grid">
        {images.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            onClick={() => openModal(i)}
          />
        ))}
      </div>
     {selectedIndex !== null && (
  <div className="modal-overlay" onClick={closeModal}>
    <div className="modal-window" onClick={(e) => e.stopPropagation()}>
      <div className="modal-image-container">
        <button className="prev-button" onClick={prevImage}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <img src={images[selectedIndex].src} alt={images[selectedIndex].alt} className="modal-image" />
        <button className="next-button" onClick={nextImage}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 19l7-7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Gallery;