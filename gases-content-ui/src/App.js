import Map from "./components/map/Map";
import Header from "./components/header/Header";
import ButtonBurger from "./components/UI elements/buttons/buttonBurger/ButtonBurger";
import {useState} from "react";
import Settings from "./components/settings/Settings";
import Charts from "./components/charts/Charts";
import './styles/App.scss'
import ButtonChart from "./components/UI elements/buttons/buttonChart/ButtonChart";

function App() {
    const [settingsActive, setSettingsActive] = useState(false);
    const [chartsActive, setChartsActive] = useState(false);
  return (
    <div className="App">
        <Map/>
        <Header/>
        <Settings active={settingsActive} setActive={setSettingsActive} />
        <Charts active={chartsActive} setActive={setChartsActive} />
        <ButtonBurger onClick={() => setSettingsActive(!settingsActive)} />
        <ButtonChart onClick={() => setChartsActive(!chartsActive)} />
    </div>
  );
}

export default App;
