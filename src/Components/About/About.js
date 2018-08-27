import React from 'react';
import Andrew from '../../styles/assets/andrew-headshot.png';
import Zak from '../../styles/assets/zachary-headshot.png';

function About() {
    return (
      <div className="About_parent">

        <div className="About_peopleContainer">

          <div className="About_person">
            <img className="About_headshot" src="https://scontent.fphx1-1.fna.fbcdn.net/v/t1.0-9/31946707_10156174403132527_4457505119226822656_n.jpg?_nc_cat=0&oh=275144c227de9569d348ba1d4659c9df&oe=5C369934" alt="Danielle Headshot" />
            <h4 className="About_creatorName" >Danielle Lyn</h4>
            <p className="About_creatorDetails">Danielle comes from Seattle and loves using React to solve problems.</p>
          </div>

          <div className="About_person">
            <img className="About_headshot" src={Andrew} alt="Andrew Headshot" />
            <h4 className="About_creatorName">Andrew Nam</h4>
            <p className="About_creatorDetails">Andrew is from Dallas and enjoys working with Node.js.</p>
          </div>

          <div className="About_person">
            <img className="About_headshot" src={Zak} alt="Zachary Headshot" />
            <h4 className="About_creatorName">Zachary Graham</h4>
            <p className="About_creatorDetails">Zachary is from Phoenix and takes a keen interest in working with APIs.</p>
          </div>

        </div>

      </div>
    );
  }

export default About;
