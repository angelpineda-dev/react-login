
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
      <aside className="bg-slate-800 p-2">
          <ul>
              <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
      </aside>
  )
}

export default Sidebar