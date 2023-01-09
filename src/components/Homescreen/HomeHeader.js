import React from 'react';
import { Binoculars, PencilSquare, PersonAdd } from 'react-bootstrap-icons';


const HomeHeader = () => {

  const workspaceTitle = 'Sample Workspace Title';

  const boardTitles = ['Board One', 'Board Two', 'Board Three', 'Board Four', 'Board Five', 'Board Six', 'Board Seven' ];
  

  return (
    <div>
     <section className="home-header-title">
     <div className='workspace-title-section'><span className='workspace-icon'><Binoculars/></span><span className='workspace-title'><h3>{workspaceTitle}<PencilSquare className='title-icon'/></h3></span></div>
      <button className="btn btn-info"><PersonAdd/>Invite Workspace Member</button>
     </section>
     <hr className="header-hr"></hr>
    </div>
  );
}

export default HomeHeader;
