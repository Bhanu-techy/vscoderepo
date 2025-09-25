import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import InputForm from '../InputForm'

import './index.css'

const Card = props => {
  const {data, deleteDetails, editDetails} = props

  const {id, name, username, email} = data

  return (
    <li className="card">
      <p>
        <span>Id :</span> {id}
      </p>
      <p>
        <span>Name :</span> {name}
      </p>
      <p>
        <span>Username :</span> {username}
      </p>
      <p>
        <span>Email</span> {email}
      </p>
      <div className="btn-container">
        <Popup
          trigger={
            <button className="button" type="button">
              Edit
            </button>
          }
        >
          <div>
            <InputForm id={id} editDetails={editDetails} />
          </div>
        </Popup>
        <button
          type="button"
          className="del-btn"
          onClick={() => deleteDetails(id)}
        >
          Delete
        </button>
      </div>
    </li>
  )
}

export default Card

