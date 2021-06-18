import React from 'react'
import Collapsible from 'react-collapsible'
import Title from './Title'
import useWindowSize from '../../useHook/widthBrowser'
import './footer.css'
const Footer = () => {
  const [width] = useWindowSize()
  const open = width > 900 ? true : false
  const triggerDisabled = width > 900 ? true : false
  return (
    <div className="footer-copy-right">
      <div className="footer">
        <div className="colum">
          <Collapsible
            trigger={<Title title="Company" showIcon={open} />}
            open={open}
            triggerDisabled={triggerDisabled}
          >
            <a className="css-7blzqa" href="/en/about" target="_self">
              About travelWorld
            </a>
            <a className="css-7blzqa" href="/en/cashback" target="_self">
              About Cashback World
            </a>
            <a className="css-7blzqa" href="/en/eliteClub" target="_self">
              About EliteClub
            </a>
            <a className="css-7blzqa" href="/en/sustainability" target="_self">
              Sustainability Contribution
            </a>
            <a className="css-7blzqa" href="/en/faquser" target="_self">
              FAQs
            </a>
            <a className="css-7blzqa" href="/en/careers" target="_self">
              Careers
            </a>
          </Collapsible>
        </div>
        <div className="colum">
          <Collapsible
            trigger={<Title title="Legal Information" showIcon={open} />}
            open={open}
            triggerDisabled={triggerDisabled}
          >
            <a className="css-7blzqa" href="/en/tos" target="_self">
              General Terms and Conditions
            </a>
            <a className="css-7blzqa" href="/en/tou" target="_self">
              Terms of Use
            </a>
            <a className="css-7blzqa" href="/en/dataprivacy" target="_self">
              Privacy Policy and Cookie Statement
            </a>
            <a className="css-7blzqa" href="/en/dispute" target="_self">
              Dispute Resolution
            </a>
            <div className="css-348eoy"></div>
            <a className="css-7blzqa" href="/en/imprint" target="_self">
              Imprint
            </a>
          </Collapsible>
        </div>
        <div className="colum">
          <Collapsible
            trigger={<Title title="Support" showIcon={open} />}
            open={open}
            triggerDisabled={triggerDisabled}
          >
            <a className="css-7blzqa" href="/en/faquser#profile" target="_self">
              About my Profile
            </a>
            <a className="css-7blzqa" href="/en/faquser#booking" target="_self">
              All about Booking
            </a>
            <a className="css-7blzqa" href="/en/faquser#payment" target="_self">
              About Payment
            </a>
            <a
              className="css-7blzqa"
              href="/en/faquser#cancellation"
              target="_self"
            >
              About Cancellations
            </a>
          </Collapsible>
        </div>
        <div className="colum">
          <Collapsible
            trigger={<Title title="For hotels" showIcon={open} />}
            open={open}
            triggerDisabled={triggerDisabled}
          >
            <a className="css-7blzqa" href="/en/info" target="_self">
              Partner Info
            </a>
            <a href="/ll" className="css-d9fh8s" type="button">
              List your Property
            </a>
            <a
              className="css-7blzqa"
              href="https://extranet.travelworld.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Extranet Login
            </a>
          </Collapsible>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0977424798302!2d105.85017601550302!3d21.028774735998315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab953357c995%3A0x1babf6bb4f9a20e!2zSOG7kyBIb8OgbiBLaeG6v20!5e0!3m2!1svi!2s!4v1617008326730!5m2!1svi!2s"
            width="250"
            height="200"
            loading="lazy"
            title="location"
          ></iframe>
        </div>
      </div>
      <div className="copy-right">
        <span className="text css-1c7zdkb">
          © 2020 VietTravelUet Global Limited. All rights reserved.
          <span className="css-3u3jcm">GIT_VERSION</span>
        </span>
      </div>
    </div>
  )
}

export default Footer
