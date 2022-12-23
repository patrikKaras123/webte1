import DragDropPage from "./pages/DragDropPage";
import WelcomePage from "./pages/WelcomePage";

const routes = [
  {
    path: '/',
    element: <WelcomePage />
  },
  {
    path: '/game',
    element: <DragDropPage />
  }
]

export default routes;