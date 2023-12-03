import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Home.jsx';
import {БелорускиComponent, ПолькиComponent, ИжоркиComponent, АрмянкиComponent, ЕврейкиComponent, УкраинкиComponent, ЛитовкиComponent, НемкиComponent, ГречанкиComponent} from "./page_exports.jsx";

function App(){
    return (
        <div className="App">
<HashRouter>
<Routes>
<Route path="/" element={<Home/>}>
</Route>
<Route path='/Белоруски' element={<БелорускиComponent/>}>
</Route>
<Route path='/Польки' element={<ПолькиComponent/>}>
</Route>
<Route path='/Ижорки' element={<ИжоркиComponent/>}>
</Route>
<Route path='/Армянки' element={<АрмянкиComponent/>}>
</Route>
<Route path='/Еврейки' element={<ЕврейкиComponent/>}>
</Route>
<Route path='/Украинки' element={<УкраинкиComponent/>}>
</Route>
<Route path='/Литовки' element={<ЛитовкиComponent/>}>
</Route>
<Route path='/Немки' element={<НемкиComponent/>}>
</Route>
<Route path='/Гречанки' element={<ГречанкиComponent/>}>
</Route>
</Routes>
</HashRouter>
</div>
    )
}

export { App }