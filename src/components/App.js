import React from 'react';
import '../styles/App.css';
import TaskItem from './taskItem';

function App() {
  const [newItem, setNewItem] = React.useState("");
  const [items, setItems] = React.useState([]);

  const addNewItem = () => {
    setItems([...items, newItem]);
    setNewItem('');
  };

  const handleOnChange = (e) => {
    setNewItem(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">

        <h1>** Proyecto PWA - Lista de la compra v8 **</h1>

        <div style={{ marginBottom: 20 }}>
          {/* <h3>¡Nueva actualización! ¿Quieres actualizar?</h3> */}
          {/* <button onClick={'onLoadNewServiceWorkerAccept'}>
            ¡Actualizar!
          </button> */}
        </div>

        <input style={{ fontSize: 24, marginBottom: 20 }}
          type="text"
          onKeyPress={(e) => (e.key === 'Enter' && addNewItem())}
          onChange={handleOnChange}
          value={newItem}
        />

        <button style={{ fontSize: 24 }}
          onClick={addNewItem}>
          Añadir item
        </button>

        <TaskItem
          items={items}
        />

      </header>
    </div>
  );
}

export default App;
