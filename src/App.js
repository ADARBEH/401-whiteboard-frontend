import './App.css';
import Auth from './components/Auth';
import AuthContextProvider from './context/AuthContext';




function App() {

  return (

    <AuthContextProvider>
      <Auth />
    </AuthContextProvider>


  );
}

export default App;
