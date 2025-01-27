import { PropTypes } from 'prop-types'

function RememberMeCheckBox({type, id, checked, onChange }) {
    return (
        <div className="input-remember" >
            <input 
            type={type}
            id={id}
            value={checked} 
            onChange={onChange} 
            />
        </div>
    )
}

RememberMeCheckBox.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
}



export default RememberMeCheckBox