import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import useRole from '../hooks/useRole'
import LoadingSpinner from '../components/Shared/LoadingSpinner'

const AdminRoute = ({ children }) => {
  const {role, isLoading} = useRole()
  if (isLoading) return <LoadingSpinner></LoadingSpinner>
  if (role === 'Admin') return children
  return <Navigate to='/dashboard' replace='true' />
}

AdminRoute.propTypes = {
  children: PropTypes.element,
}

export default AdminRoute