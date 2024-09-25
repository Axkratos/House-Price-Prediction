import React from 'react';
import './about.css'; // Ensure this CSS file is created and linked
import portraitImage from '/hero1.jpg'; // Top portrait image
import profileImage from '/aree.jpg'; // Your profile image

function AboutUs() {
  return (
    <div className="about-us">
      <div className="about-us-header">
       
      </div>

      {/* Top Portrait Image */}
      <div className="portrait-container">
        <img src={portraitImage} alt="Portrait" className="portrait-image" />
      </div>

      <div className="about-us-profile">
        <div className="about-us-image">
          <img src={profileImage} alt="Nabin Phuyal" className="profile-image" />
        </div>
        <div className="about-us-details">
          <blockquote>
            "The only way to do great work is to love what you do."
          </blockquote>
          <p>- Nabin Phuyal</p>
          <div className="about-description">
            <h2>Who I Am</h2>
            <p>
              I am a passionate Software Developer with a background in web development and a keen interest in AI and machine learning. 
              My journey in technology has been driven by a desire to create impactful projects that contribute positively to society.
            </p>
            <h2>My Goals</h2>
            <p>
              I strive to leverage technology to solve real-world problems and enhance the user experience. My ambition is to work on innovative projects that bridge the gap between technology and everyday life.
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
