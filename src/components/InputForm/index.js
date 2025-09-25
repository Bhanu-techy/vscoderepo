import {Component} from 'react'

class InputForm extends Component {
  state = {name: '', email: '', username: ''}

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  render() {
    const {id, editDetails} = this.props
    const {name, email, username} = this.state
    const data = {id, name, email, username}

    return (
      <div>
        <form>
          <input
            type="text"
            placeholder="Name"
            onChange={this.onChangeName}
            id="name"
          />
          <input
            type="text"
            placeholder="username"
            onChange={this.onChangeUsername}
          />
          <input
            type="text"
            placeholder="email"
            onChange={this.onChangeEmail}
          />
          <button type="button" onClick={() => editDetails(data)}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default InputForm
