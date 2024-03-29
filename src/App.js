import React, { useState, useEffect, useRef } from 'react';

import './App.css';
import {
  isLocalStoragePopulated,
  populateDummyData,
  today,
  validateString,
  dummyData
} from './helper';
import ProductRow from './ProductRow';

let productSortOrder = false;
let dateSortOrder = false;

if (!isLocalStoragePopulated) {
  populateDummyData(dummyData);
}

const initialLocalStorageData = JSON.parse(window.localStorage.getItem('data'));

const App = () => {
  const [product, setProduct] = useState('');
  const [useByDate, setUseByDate] = useState(today);
  const [data, setData] = useState(initialLocalStorageData);
  const [id, setId] = useState(initialLocalStorageData?.length + 1);
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

    // Increment uid
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
      <div class="noDataContainer">No data available</div>
    )
  }

  return (
    <div className="App">
      <div className='formContainer'>
        <h1>Enter product</h1>
        <form id="productForm" onSubmit={handleSubmit}>
          <div className="inputGroup">
            <input type="text" placeholder="Enter Product..." value={product} onChange={e => setProduct(e.target.value)} ref={inputRef} />
            <input type="date" min={today} value={useByDate} onChange={e => setUseByDate(e.target.value)} />
          </div>
          <button className='btn addBtn' type="submit"  >Add</button>
        </form>
      </div>

      <div className='rowHeader' ><p>Sort by: <button className='btn btnSmall' onClick={sortProduct}>Product Name</button><button className='btn btnSmall' onClick={sortUseByDate}>Use by Date</button></p></div>

      <div className='container'>
        {(data && data.length > 0) ? data.map(
          (row, index) => {
            return (
              <ProductRow key={row.id} row={row} index={index} removeProduct={removeProduct} />
            )
          }
        ) : (<NoDataContainer />)}
      </div>
    </div>
  );
}

export default App;
