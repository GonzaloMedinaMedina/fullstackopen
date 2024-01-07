import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationProvider } from './NotificationContext'
import { UserProvider } from './UserContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
  <NotificationProvider>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
  </NotificationProvider>
  </UserProvider>
)