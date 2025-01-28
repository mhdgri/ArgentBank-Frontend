import { PropTypes } from 'prop-types'
import Button from '../Button'

function Account({title, amount, description}) {
  return (
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">{title}</h3>
                <p className="account-amount">{amount}</p>
                <p className="account-amount-description">{description}</p>
            </div>
            <Button />
        </section>
  )
}

Account.propTypes = {
    title: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}

export default Account

