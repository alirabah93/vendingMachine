import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import ItemHolder from "./NewApproach/components/ItemHolder";
import { products } from "./Products";


const Container1 = styled.div`
  width: 400px;
  height: 400px;
  border: 1px solid black;
  border-radius: 50px;
  text-align: center;
`;

const Container = styled.div`
  width: 350px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Take = styled.div`
  font-size: 1.3em;
  margin: 25px 15px 0 15px;
  padding: 5px;
  text-align: center;
  background-color: TOMATO;
  color: white;
  width: 200px;
  border-radius: 50px;
  &:hover {
    cursor: pointer;
  }
`;

const Purchase = styled.div`
  font-size: 1.2em;
  margin: 10px 10px;
  padding: 5px;
  text-align: center;
  background-color: Green;
  color: white;
  width: 200px;
  border-radius: 50px;
  &:hover {
    cursor: pointer;
  }
`;

function Operation({ coin, onPurchase, message }) {
  const [productList] = useState(products);
  const [selectedCode, setSelectedCode] = useState('');
  const [dispensedItem, setDispensedItem] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect (() =>{
    axios.get('http://localhost:8000/api/items')
        .then(res => {
            setItems(res.data);
            // setLoaded(true);
        })
        .catch(err => console.error(err));
}, [items]);

  // parameters:
  //
  // returns:
  const handlePurchase = () => {
    const item = productList.find(item => item.code === selectedCode);
    if (item && coin >= item.price) {
    onPurchase(item.price);
    setDispensedItem([...dispensedItem, item]);
    setErrorMessage('');
    } else {
    setErrorMessage('Invalid selection or insufficient balance');
    }
}

const onTake = () => {
  setDispensedItem([]);
};

  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <Container1>
          <h1>Welcome Stanger...</h1>
          <h3>Please Insert your coins first then select the required items based on the green color</h3>
          <div style={{height: '100px',   scrollBehavior: 'auto'}}>
          {message.map(message => (
              <p key={message}>{message}</p>
              ))}
          </div>
          {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
      </Container1>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div className="items">
          <div>Enter item code:</div>
          <input type="text" value={selectedCode} onChange={e => setSelectedCode(e.target.value)} />
          <Purchase onClick={handlePurchase}>Purchase</Purchase>
        </div>
        <Container>
          {productList &&
            productList.map(p => {
              return <ItemHolder key={p.code} product={p} coin={coin} onPurchase={onPurchase} />;
            })}
        </Container>
        <Take onClick={onTake}>
          <p>Your Items: </p>
          {dispensedItem && (
            <div className="dispensed-item">
            {dispensedItem.map(item => (
              <p key={item.code}>{item.name}</p>
              ))}
            </div>
          )}
        </Take>
      </div>
    </div>
  );
}
export default Operation;
