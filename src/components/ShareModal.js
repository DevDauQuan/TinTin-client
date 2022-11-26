import React from 'react'
import {
    EmailShareButton, EmailIcon,
    FacebookShareButton, FacebookIcon,
    TwitterShareButton, TwitterIcon,
} from 'react-share'

const ShareModal = ({ url, theme }) => {
    return (
        <div className="d-flex justify-content-around px-4 py-2"
            style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}>
            <FacebookShareButton url={url} >
                <FacebookIcon round={true} size={32} />
            </FacebookShareButton>

            <TwitterShareButton url={url} >
                <TwitterIcon round={true} size={32} />
            </TwitterShareButton>

            <EmailShareButton url={url} >
                <EmailIcon round={true} size={32} />
            </EmailShareButton>

        </div>
    )
}

export default ShareModal