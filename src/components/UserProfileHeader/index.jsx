import { PropTypes } from 'prop-types'

function UserProfileHeader({username, onEditName}) {
  return (
    <div className="header">
        <h1>Welcome back<br />{username}</h1>
        <button className="edit-button" onClick={onEditName}>Edit Name</button>
    </div>
  )
}

UserProfileHeader.propTypes = {
    username: PropTypes.string,
    onEditName: PropTypes.func
}

export default UserProfileHeader