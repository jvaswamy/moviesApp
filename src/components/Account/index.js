import Cookies from 'js-cookie'
import Footer from '../Footer'
import Header from '../Header'
import './index.css'

const Account = props => {
  const onClickLogout = () => {
    const {history} = props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }
  return (
    <div className="account-container">
      <Header />
      <div className="account-content-container">
        <div className="responsive-account-container">
          <h1 className="account-heading">Account</h1>
          <hr className="hr-line" />
          <div className="membership-container">
            <div className="heading-container">
              <p className="heading">Member ship</p>
            </div>
            <div className="membership-values-container">
              <p className="content-value">Rahul@gmail.com</p>
              <p className="heading">Password : ************</p>
            </div>
          </div>
          <hr className="hr-line" />
          <div className="membership-container">
            <div className="heading-container">
              <p className="heading">Plan details</p>
            </div>
            <div className="membership-detailse-container">
              <p className="content-value">Premium</p>
              <p className="premium">Ultra HD</p>
            </div>
          </div>
          <hr className="hr-line" />
          <button className="logout-btn" type="button" onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Account
