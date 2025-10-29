import { Link } from 'react-router-dom'
import '../App.css'

function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <nav style={{ marginTop: '2rem' }}>
        <Link to="/">Go to Home</Link>
      </nav>
    </div>
  )
}

export default NotFound
