import  PropTypes  from "prop-types"

function Feature({ imgSrc,imgAlt, title, children }) {
  return (
    <div className="feature-item">
        <img src={imgSrc} alt={imgAlt} className="feature-icon" />
        <h3 className="feature-item-title">{title}</h3>
        <p>{children}</p>
    </div>
  )
}

Feature.propTypes = {
    imgSrc: PropTypes.string,
    imgAlt: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.node
}

export default Feature