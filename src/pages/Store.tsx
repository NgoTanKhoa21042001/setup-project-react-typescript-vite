/* eslint-disable @typescript-eslint/no-unused-vars */
import { Row, Col } from 'react-bootstrap'
import Navbar from 'src/components/Navbar'
import StoreItem from '../components/StoreItem'
import storeItems from '../data/items.json'
const Store = () => {
  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3}>
        {storeItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Store
