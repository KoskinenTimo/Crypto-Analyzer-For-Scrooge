import React from 'react'
import './Project.scss'

const Project = () => {
  return (
    <div className="home-project">
      <h4 className='home-project__title'>Project Details</h4>
      <p className='home-project__txt'>
        <strong>Front End: </strong>Front is built with React to take advantage to keep building simple and easy to scale. Also the tools in React are very well built. ESLint is used to clean up the code, it was easy to set up so it was an easy choice. For communication with APIs, Axios was installed to have default headers and functions that otherwise would have to be coded using fetch. JS-cookie is used to handle cookies, and authorization cookies in particular. Inside React I also implemented redux for more clean state handling.

        <br/><br/><strong>Back End: </strong>

        <br/><strong>DB: </strong>
      </p>
    </div>
  )
}

export default Project