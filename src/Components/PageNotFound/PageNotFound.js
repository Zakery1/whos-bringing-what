import React, { Component } from 'react';
import SadFace from '../../styles/assets/sadface.png'

class PageNotFound extends Component {

    render() {
            return (
                <div className="page_not_found_parent">
                    <img className="pnf_body sad_pic" src={SadFace} alt="Sad Face"/>
                    <p className="pnf_body error">404 PAGE NOT FOUND</p>
                    <a className="pnf_body icon" href="https://icons8.com">Icon pack by Icons8</a>
                </div>
            )
        }
    }
export default PageNotFound