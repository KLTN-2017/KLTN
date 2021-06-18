import React from 'react'
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  EmailIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share'
import './share.scss'
const Share = () => {
    return (
      <div className="share">
        <FacebookShareButton url={window.location.href}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <EmailShareButton url={window.location.href}>
          <EmailIcon size={32} round={true} />
        </EmailShareButton>
        <TwitterShareButton url={window.location.href}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <LinkedinShareButton url={window.location.href}>
          <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>
      </div>
    )
}

export default Share