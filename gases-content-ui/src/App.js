import Map from "./components/map/Map";
import Header from "./components/header/Header";
import ButtonBurger from "./components/UI elements/buttons/buttonBurger/ButtonBurger";
import {useState} from "react";
import Settings from "./components/settings/Settings";
import Charts from "./components/charts/Charts";
import './styles/App.scss'
import ButtonChart from "./components/UI elements/buttons/buttonChart/ButtonChart";
import LanguagesList from "./components/languages/LanguagesList";

function App() {
    const [settingsActive, setSettingsActive] = useState(false);
    const [languagesActive, setLanguagesActive] = useState(false);
    const [chartsActive, setChartsActive] = useState(false);
    const [dark, setDark] = useState(false);

  return (
      <div className="App">
          <Map/>
          <Header darkmode={dark} dark={dark} setDark={setDark} active={languagesActive}
                  setActive={setLanguagesActive}/>
          <Settings darkmode={dark} active={settingsActive} setActive={setSettingsActive}/>
          <Charts darkmode={dark} active={chartsActive} setActive={setChartsActive}/>
          <LanguagesList darkmode={dark} active={languagesActive} setActive={setLanguagesActive}/>
          <ButtonBurger darkmode={dark} onClick={() => setSettingsActive(!settingsActive)}/>
          <ButtonChart darkmode={dark} onClick={() => setChartsActive(!chartsActive)}/>
      </div>
  );
}

export default App;
