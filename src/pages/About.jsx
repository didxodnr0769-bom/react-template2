import { Link } from 'react-router-dom'
import '../App.css'

function About() {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is a React template with routing configured using react-router-dom.</p>
      <nav style={{ marginTop: '2rem' }}>
        <Link to="/">Go to Home</Link>
      </nav>
    </div>
  )
}

export default About
