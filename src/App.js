import './App.css';
import Form from './Form/Form';
import Map from './Map/Map';
import Locations from './Locations/Locations';
import { LocationProvider } from './LocationProvider/LocationContext';

function App() {
  return (
    <LocationProvider>
      <div className="App">
        <Form />
        <div className="results">
          <Map />
          <Locations />
        </div>
      </div>
    </LocationProvider>
  );
}

export default App;
