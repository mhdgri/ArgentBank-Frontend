import PropTypes from "prop-types";

function RememberMeCheckBox({ label, id, type, checked, onChange }) {
  return (
    <div className="input-remember">
      <input type={type} id={id} checked={checked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

RememberMeCheckBox.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RememberMeCheckBox;