import './App.css';
// import Button from './custom/button';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home'
// import * as e from '.π/pages/exports'

import 
{LithuaniaComponent,
GermansComponent,
BelarussianComponent,
IzhorkiComponent,
PolandComponent,
JewMasterlistComponent,
UkraineComponent,
GretchnayaComponent,
ArmeniaComponent,
// GeorgiansComponent
} from './pages/exports'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Lithuania" element={<LithuaniaComponent />} />
            <Route path="/Germans" element={<GermansComponent />} />
            <Route path="/Belarussian" element={<BelarussianComponent />} />
            <Route path="/Izhorki" element={<IzhorkiComponent />} />
            <Route path="/Poland" element={<PolandComponent />} />
            <Route path="/JewMasterlist" element={<JewMasterlistComponent />} />
            <Route path="/Ukraine" element={<UkraineComponent />} />
            <Route path="/Gretchnaya" element={<GretchnayaComponent />} />
            <Route path="/Armenia" element={<ArmeniaComponent />} />
            {/* <Route path="/Georgians" element={<GeorgiansComponent />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
