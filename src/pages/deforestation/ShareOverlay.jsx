import React, { useState } from 'react';
import './ShareOverlay.css';

const HOMEPAGE_URL = 'https://terra-360.vercel.app/';
const SHARE_MESSAGE = 'Hey! Do you want to learn how to save the earth? Learn How:';
const URL_TITLE = 'Terra 360 - Save the Earth';

const ShareOverlay = ({ onHide }) => {
  const handleShare = async () => {
    // const url = window.location.href;
    // const title = document.title;
    const url = HOMEPAGE_URL;
    const title = URL_TITLE;
    const text = `${SHARE_MESSAGE}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url,
        });
        console.log('Link shared successfully');
      } catch (error) {
        console.error('Error sharing link:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard');
      } catch (error) {
        console.error('Error copying link:', error);
      }
    }
  };

  return (
    <div className="share-overlay">
      <div className="share-card">
        <button 
          className="close-button"
          onClick={onHide}
        >
          ✕
        </button>
        
        <h3 className="share-title">Share</h3>
        <button className="share-button" onClick={handleShare}>
          Share or Copy Link
        </button>
      </div>
    </div>
  );
};

export default ShareOverlay;