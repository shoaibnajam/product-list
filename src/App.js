import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const dummyData = [
  {
    id: 1000,
    product: 'Tomatoes',
    useByDate: '2024-10-03',
  },
  {
    id: 2000,
    product: 'Bread',
    useByDate: '2024-05-05',
  },
  {
    id: 3000,
    product: 'Butter',
    useByDate: '2024-03-24',
  },
  {
    id: 4000,
    product: 'Aubergine',
    useByDate: '2024-08-07',
  },
]

const today = new Date().toISOString().split('T')[0];

const validateString = (input) => {
  return input && typeof input === 'string' && input.trim() !== ""
};

const formatDate = (dateString) => {
  if (!validateString(dateString)) {
    return today;
  } 
  return dateString.split('-').reverse().join('-');
}

let productSortOrder = false;
let dateSortOrder = false;


const populateDummyData = (data) => {
  window.localStorage.setItem('data', JSON.stringify(data));
}
populateDummyData(dummyData);

const initialLocalStorageData = JSON.parse(window.localStorage.getItem('data'));

const App = () => {
  const [product, setProduct] = useState('');
  const [useByDate, setUseByDate] = useState(today);
  const [data, setData] = useState(initialLocalStorageData);
  const [id, setId] = useState(1);
  const inputRef = useRef(null);
  
  useEffect(() => {
    // Update data in localStorage
    window.localStorage.setItem('data', JSON.stringify(data));
  }, [data]);

  const handleSubmit = e => {
    e.preventDefault();
    
    // Perform validation
    if (!validateString(product) || !validateString(useByDate)) {
      inputRef.current.focus()
      return;
    }
  
    // Update data state 
    setData((row) => [
      ...row,
      { id: id, product: product, useByDate: useByDate }
    ])
    
    // Increment guid
    setId(prevValue => {
      return prevValue + 1;
    });

    // Focus on and clear input for next entry
    inputRef.current.focus()
    setProduct('')
  }

  const removeProduct = (e, idToBeDeleted) => {
    const productObject = data.find(obj => obj.id === idToBeDeleted);
    if (productObject && window.confirm(`Are you sure you want to delete ${productObject.product}`)) {
      const filteredArr = data.filter((currentProduct) => currentProduct.id !== idToBeDeleted)
      setData(filteredArr);
    }
  }

  const sortProduct = () => {
    // Toggle sorting order
    productSortOrder = !productSortOrder

    function compareFunction(a, b) {
      return productSortOrder ?
        a.product.localeCompare(b.product) :
        b.product.localeCompare(a.product);
    }

    // Make a copy of state, sort it and perform setState
    const unsortedArray = [...data];
    const sortedArr = unsortedArray.sort(compareFunction);
    setData(sortedArr)
  }

  const sortUseByDate = () => {
    // Toggle sorting order
    dateSortOrder = !dateSortOrder
    
    function compareFunction(a, b) {
      return dateSortOrder ?
        new Date(a.useByDate) - new Date(b.useByDate) :
        new Date(b.useByDate) - new Date(a.useByDate);
    }
    
    // Make a copy of state, sort it and perform setState
    const unsortedArray = [...data];
    const sortedArr = unsortedArray.sort(compareFunction);
    setData(sortedArr)
  }

  const NoDataContainer = () => {
    return (
      <div class="no-data-container">No data available</div>
    )
  }

  return (
    <div className="App">
      <div className='form-container'>
        <h1>Enter product</h1>
        <form id="product-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" placeholder="Enter Product..." value={product} onChange={e => setProduct(e.target.value)} ref={inputRef} />
            <input type="date" min={today} value={useByDate} onChange={e => setUseByDate(e.target.value)} />
          </div>
          <button className='btn addBtn' type="submit"  >Add</button>
        </form>
      </div>

      <div className='rowHeader' ><p>Sort by: <button className='btn btn-small' onClick={sortProduct}>Product Name</button><button className='btn btn-small' onClick={sortUseByDate}>Use by Date</button></p></div>

      <div className='container'>
        {(data && data.length > 0) ? data.map(
          (row, index) => {
            return (
              <div key={row.id} className='rowWrapper'>
                <div className='row'>
                  <p>{index + 1}- Name: <strong>{row.product}</strong></p>
                  <p>Best before: <strong>{formatDate(row.useByDate)}</strong></p>
                </div>
                <button className='btn deleteBtn' onClick={(e) => removeProduct(e, row.id)} >Delete</button>
              </div>
            )
          }
        ) : (<NoDataContainer />)}
      </div>
    </div>
  );
}

export default App;
