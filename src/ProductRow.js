import { formatDate } from "./helper";

export const ProductRow = ({row, index, removeProduct}) => {
  return (
    <div className='rowWrapper'>
      <div className='row'>
        <p>{index + 1}- Name: <strong>{row.product}</strong></p>
        <p>Best before: <strong>{formatDate(row.useByDate)}</strong></p>
      </div>
      <button className='btn deleteBtn' onClick={(e) => removeProduct(e, row.id)} >Delete</button>
    </div>
  )
}

export default ProductRow;
