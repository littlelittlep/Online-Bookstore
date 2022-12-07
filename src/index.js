import { createRoot } from 'react-dom/client'
import Router from './route'


const root = createRoot(document.getElementById('root'))
root.render(
    <Router />
)