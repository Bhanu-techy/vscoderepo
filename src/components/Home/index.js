import {Component} from 'react'
import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'
import Card from '../Card'
import './index.css'

const apiConstantState = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILED',
}


class Home extends Component{

    state = {
    details: [],
    name: '',
    username: '',
    email: '',
    count: 100,
    serachInput: '',
    apiState: apiConstantState.initial,
  }

  componentDidMount() {
    this.getDeatils()
  }

  getDeatils = async () => {
    this.setState({apiState: apiConstantState.inProgress})
    const url = 'https://jsonplaceholder.typicode.com/users'

    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
      this.setState({details: data, apiState: apiConstantState.success})
    } else {
      this.setState({apiState: apiConstantState.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({serachInput: event.target.value})
  }

  onClickSearchByName = () => {
    const {serachInput, details} = this.state
    const filteredData = details.filter(user =>
      user.name.toLowerCase().includes(serachInput.toLocaleLowerCase()),
    )

    this.setState({details: filteredData, serachInput: ''})
  }

  onClickSearchByUserName = () => {
    const {serachInput, details} = this.state
    const filteredData = details.filter(user =>
      user.username.toLowerCase().includes(serachInput.toLocaleLowerCase()),
    )
    this.setState({details: filteredData, serachInput: ''})
  }

  onClickSearchByEmail = () => {
    const {serachInput, details} = this.state
    const filteredData = details.filter(user =>
      user.email.toLowerCase().includes(serachInput.toLocaleLowerCase()),
    )
    this.setState({details: filteredData, serachInput: ''})
  }

   onClickSearchBtn = () => {
    const {serachInput, details} = this.state
    const searchDetails = details.filter(
      each =>
        each.name.toLowerCase().includes(serachInput) ||
        each.username.toLowerCase().includes(serachInput) ||
        each.email.toLowerCase().includes(serachInput),
    )

    this.setState({details: searchDetails})
  }

   deleteDetails = async id => {
    this.setState({apiState: apiConstantState.inProgress})
    const {details} = this.state
    const url = `https://jsonplaceholder.typicode.com/users/${id}`
    const options = {
      method: 'DELETE',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const filteredData = details.filter(each => each.id !== id)
      this.setState({details: filteredData, apiState: apiConstantState.success})
    } else {
      this.setState({apiState: apiConstantState.failure})
    }
  }

  editDetails = async data => {
    this.setState({apiState: apiConstantState.inProgress})
    const {details} = this.state
    const {id, name, email, username} = data
    const url = `https://jsonplaceholder.typicode.com/users/${id}`
    const options = {
      method: 'PUT',
      body: JSON.stringify(data),
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const newdata = details.map(user =>
        user.id === id ? {...user, name, email, username} : user,
      )
      this.setState({details: newdata, apiState: apiConstantState.success})
    }
  }

  addDetails = async event => {
    event.preventDefault()
    this.setState({apiState: apiConstantState.inProgress})
    const {name, email, username, details, count} = this.state
    const userDetails = {
      id: count,
      name,
      username,
      email,
    }
    const url = 'https://jsonplaceholder.typicode.com/users'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    if (name !== '' && username !== '' && email !== '') {
      const response = await fetch(url, options)
      if (response.ok) {
        const newDetails = [...details, userDetails]
        this.setState({
          details: newDetails,
          apiState: apiConstantState.success,
          count: count + 1,
          name: '',
          username: '',
          email: '',
        })
      } else {
        this.setState({apiState: apiConstantState.failure})
      }
    } else {
      this.setState({apiState: apiConstantState.success})
    }
  }

   onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  renderSuccessView = () => {
    const {details} = this.state

    return (
      <div className="home-container scroll-items">
        <div className="header">
          <div className="searchbar-adddetails-btn">
            <h1 className="heading">User Details</h1>
            <Popup
              trigger={
                <button className="button" type="button">
                  Filter By
                </button>
              }
            >
              <div className="search-heading">
                <h1>Search by</h1>
                <label htmlFor="firstname">First Name</label>

                <input
                  className="search-input"
                  type="search"
                  onChange={this.onChangeSearchInput}
                  id="firstname"
                />
                <button
                  type="button"
                  className="search-btn"
                  onClick={this.onClickSearchByName}
                >
                  search
                </button>

                <label htmlFor="secondname">Second Name</label>
                <input
                  className="search-input"
                  type="search"
                  onChange={this.onChangeSearchInput}
                  id="secondname"
                />
                <button
                  type="button"
                  className="search-btn"
                  onClick={this.onClickSearchByUserName}
                >
                  search
                </button>
                <label htmlFor="email">Email</label>
                <input
                  className="search-input"
                  type="search"
                  onChange={this.onChangeSearchInput}
                  id="email"
                />
                <button
                  type="button"
                  className="search-btn"
                  onClick={this.onClickSearchByEmail}
                >
                  search
                </button>
              </div>
            </Popup>
          </div>
          <div className="searchbar-adddetails-btn">
            <div className="search-bar">
              <input
                type="search"
                className="search-icon"
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                className="search-icon icon"
                onClick={this.onClickSearchBtn}
              >
                search
              </button>
            </div>
            <Popup
              modal
              trigger={
                <button type="button" className="button">
                  Add Details
                </button>
              }
            >
              {close => (
                <div>
                  <form onSubmit={this.addDetails}>
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
                    <div className="form-btn-container">
                      <button type="submit" className="button">
                        Submit
                      </button>
                      <button
                        type="button"
                        className="trigger-button"
                        onClick={() => close()}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </Popup>
          </div>
        </div>
        <ul className="list-container">
          {details.map(each => (
            <Card
              key={each.id}
              data={each}
              editDetails={this.editDetails}
              deleteDetails={this.deleteDetails}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container">
        <p>Loading...</p>
        </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.getDeatils}>
        Try again
      </button>
    </div>
  )

 renderResultView = () => {
    const {apiState} = this.state

    switch (apiState) {
      case apiConstantState.success:
        return this.renderSuccessView()
      case apiConstantState.inProgress:
        return this.renderLoader()
      case apiConstantState.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        
        {this.renderResultView()}
      </>
    )
  }

}

export default Home