import './App.css';
import Form from './Form/Form.js';
import Map from './Map/Map.js';
import Locations from './Locations/Locations.js';
import { LocationProvider } from './LocationProvider/LocationContext.js';

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
