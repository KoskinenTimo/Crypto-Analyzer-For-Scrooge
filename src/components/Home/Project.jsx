import React from 'react'
import './Project.scss'

const Project = () => {
  return (
    <div className="home-project">
      <h4 className='home-project__title'>Project Details</h4>
      <p className='home-project__txt'>
        <strong>Front End: </strong>Front is built with React to take advantage to keep building simple and easy to scale. Also the tools in React are very well built. ESLint is used to clean up the code, it was easy to set up so it was an easy choice. For communication with APIs, Axios was installed to have default headers and functions that otherwise would have to be coded using fetch. JS-cookie is used to handle cookies, and authorization cookies in particular. Inside React I also implemented redux for more clean state handling.<br/>
        Frontend uses docker containers to keep final build environment detached from project building environment to make sure project works on other computers the same way. For styling, Sass was installed and BEM naming convention used to better separate styling for each component and their blocks/elements. Testing takes advantage of Jest library to mock targets more easy.

        <br/><br/><strong>Back End/DB: </strong> Back is build with express, mongoose and mongoDB. Mongoose offers easy validation and express fast way to build API endpoints. Bcryptjs is used for hashing passwords in DB. Jsonwebtoken gives easy token based login logic to be used by front/back. Docker containerization is used to build a development environment with mongo DB as one container, so no outside DB is used during development unless wanted. docker-compose file is configured to watch changes in the code and automatically update container according to changes.
      </p>
    </div>
  )
}

export default Project