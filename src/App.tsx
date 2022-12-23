import './App.css';
import type { FC } from 'react';
import routes from './routes';
import {  useRoutes } from 'react-router-dom';

const App: FC = () => {
  const content = useRoutes(routes);

  return (
    <>
      {content ? content : "No content"}
    </>
  );
}

export default App;
