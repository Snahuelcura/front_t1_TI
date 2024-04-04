
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import App from './App';
import Home from './pages/home';
import Perfil from './pages/perfil';


function Routing(){

    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/perfil/:userId" element={<Perfil />} />
            </Routes>
        
        
        </BrowserRouter>

        </>





    )
}

export default Routing;
