import React from 'react';
import Andrew from '../../styles/assets/andrew-headshot.png';
import Zak from '../../styles/assets/zachary-headshot.png';
import Danielle from '../../styles/assets/Danielle-profile-pic.jpg';


function About() {
    return (
      <div className="About_parent">

      <div className="About_developers">About the Developers: </div>

        <div className="About_peopleContainer">

          <div className="About_person">
           <div className="About_profile_pic"> <img className="About_headshot" src={Danielle} alt="Danielle Headshot" /> </div>
            <div className="About_name"> <h4 className="About_creatorName" >Danielle Lyn</h4></div>
            <div className="About_description"><p className="About_creatorDetails">Danielle comes from Seattle and loves using React to solve problems.</p></div>
            <div className="About_linkedin">Linkedin</div> 
          </div>

          <div className="About_person">
           <div className="About_profile_pic"> <img className="About_headshot" src={Andrew} alt="Andrew Headshot" /></div>
           <div className="About_name"> <h4 className="About_creatorName">Andrew Nam</h4> </div>
           <div className="About_description"><p className="About_creatorDetails">Andrew is from Dallas and enjoys working with Node.js!</p> </div>
           <div className="About_linkedin">Linkedin</div> 
          </div>

          <div className="About_person">
           <div className="About_profile_pic"> <img className="About_headshot" src={Zak} alt="Zachary Headshot" /> </div>
           <div className="About_name"> <h4 className="About_creatorName">Zachary Graham</h4> </div>
           <div className="About_description"> <p className="About_creatorDetails">Zachary is from Phoenix and takes a keen interest in working with APIs.</p></div>
           <div className="About_linkedin">Linkedin</div> 
          </div>

        </div>

      </div>
    );
  }

export default About;
