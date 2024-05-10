import './App.css';
import { useState } from 'react';

const catalogue = [
  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
  { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
  { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];

// Reformat catalogue data into this schema
function cataloguerReshape(oldarray) {
  const newarr = [];
  const remind = [];
  for (let i = 0; i < catalogue.length; i++) {
    const element = catalogue[i];
    if (remind.includes(element.category)) {
      const idx = remind.indexOf(element.category);
      newarr[idx].value.push(catalogue[i]);
    }
    else {
      remind.push(element.category);
      newarr.push({ cartegoryName: element.category, value: [catalogue[i]] });
    }
    return newarr;
  }
}

arrlst = cataloguerReshape(catalogue);
console.log(arrlst)

function App() {
  const [searchCatalogueValue, setSearchCatalogueValue] = useState('');
  const [filteredCatalogueData, setFilteredCatalogueData] = useState(catalogue);

  const handleSearchCatalogue = (e) => {
    console.log(e.target.value);
    const value = e.target.value.toLowerCase();
    setSearchCatalogueValue(value);
    const filteredCatalogue = catalogue.filter((item) => item.name.toLowerCase().includes(value));
    console.log(filteredCatalogue);
    setFilteredCatalogueData(filteredCatalogue);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1> List of Catalogues </h1>

        <section
          style={{
            background: 'white',
            width: '20%',
            color: 'black'
          }}
        >
          <div>
            <input
              style={{ width: '90%', padding: '10px 15px', fontSize: '18px' }}
              placeholder="Search"
              type="text"
              value={searchCatalogueValue}
              onChange={handleSearchCatalogue}
            />
          </div>

          {/* Header Section */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              color: 'black'
            }}
          >
            <h2 style={{ fontSize: '1.5rem' }}>Name</h2>
            <h2 style={{ fontSize: '1.5rem' }}>Price</h2>
          </div>

          {/* Category List Section */}
          {filteredCatalogueData.length ? (
            filteredCatalogueData.map((item, id) => {
              return (
                <ul
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    color: 'black',
                    listStyle: 'none'
                  }}
                  key={item.name}
                >
                  <h3 style={{ fontWeight: 'bold', fontSize: '1.7rem' }}> {item.category} </h3>
                  <h3> </h3>
                  <li style={{ color: item.stocked ? 'black' : 'red' }}>{item.name}</li>
                  <li>{item.price}</li>
                </ul>
              );
            })
          ) : (
            <p> This data does not exist </p>
          )}
        </section>
      </header>
    </div>
  );
}

export default App;
