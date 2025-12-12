import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Profile() {
  const { user, role, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    navigate("/login")
    return null
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <section className="profile">
      <h2>👤 Perfil del Usuario</h2>

      <div className="profile-card">
        <p><strong>Usuario:</strong> {user}</p>
        <p><strong>Rol:</strong> {role}</p>
      </div>

      <button onClick={handleLogout} className="btn-logout">
        Cerrar Sesión
      </button>
    </section>
  )
}
