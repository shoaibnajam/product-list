import React from 'react';
import './App.css';
import { useState, useEffect, useRef } from 'react';

let productSortOrder = false;
let dateSortOrder = false;

const App = () => {
  const [product, setProduct] = useState('');
  const [useByDate, setUseByDate] = useState('');
  const [data, setData] = useState([]);
  const [id, setId] = useState(1);
  const inputRef = useRef(null)
  useEffect(() => {
  })

  const handleSubmit = e => {
    e.preventDefault();
    setData((row) => [
      ...row,
      { id: id, product: product, useByDate: useByDate }
    ])
    setId(prevValue => {
      return prevValue + 1;
    });
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
    productSortOrder = !productSortOrder
    const unsortedArray = [...data];
    const sortedArr = unsortedArray.sort(compareFunction);
    function compareFunction(a, b) {
      return productSortOrder ?
        a.product.localeCompare(b.product) :
        b.product.localeCompare(a.product);
    }
    setData(sortedArr)
  }

  const sortUseByDate = () => {
    dateSortOrder = !dateSortOrder
    const unsortedArray = [...data];
    const sortedArr = unsortedArray.sort(compareFunction);
    function compareFunction(a, b) {
      return dateSortOrder ?
        new Date(a.useByDate) - new Date(b.useByDate) :
        new Date(b.useByDate) - new Date(a.useByDate);
    }
    setData(sortedArr)
  }

  const NoDataContainer = () => {
    return (
      <div class="no-data-container">Sorry - no data</div>
    )
  }

  return (
    <div className="App">
      <div className='form-container'>
        <h1>Enter product</h1>
        <form id="product-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter Product..." value={product} onChange={e => setProduct(e.target.value)} ref={inputRef} />
          <input type="date" value={useByDate} onChange={e => setUseByDate(e.target.value)} />
          <button className='btn addBtn' type="submit"  >Add</button>
        </form>
      </div>

      <div className='rowHeader' ><p>Sort by: <button className='btn btn-small' onClick={sortProduct}>Product Name</button><button className='btn btn-small' onClick={sortUseByDate}>Use by Date</button></p></div>

      <div className='container'>
        {data.length > 0 ? data.map(
          (row, index) => {
            console.log('hello');
            return (
              <div className='rowWrapper'>
                <div className='row'>
                  <p><span > {index + 1} : <strong>{row.product}</strong></span></p>
                  <p><span> <strong>{row.useByDate}</strong></span> </p>
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



