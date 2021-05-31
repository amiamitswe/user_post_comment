import { BrowserRouter } from 'react-router-dom'
import { StateProvider } from './context/store'
import Layout from './Pages/Layout/Layout';

function App() {
  return (
    <StateProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </StateProvider>
  );
}

export default App;
