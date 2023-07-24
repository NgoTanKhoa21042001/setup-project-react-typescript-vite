import { Button, Card } from 'react-bootstrap'
import { useShoppingCart } from 'src/context/ShoppingCartContext'
import { formatCurrency } from 'src/utilities/formatCurrency'
type StoreItemProps = {
  id: number
  name: string
  price: number
  imgUrl: string
}
const StoreItem = ({ id, name, price, imgUrl }: StoreItemProps) => {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeCartQuantity } = useShoppingCart()
  const quanlity = getItemQuantity(id)

  return (
    <Card className='h-100'>
      <Card.Img variant='top' src={imgUrl} height='200px' style={{ objectFit: 'cover' }} />
      <Card.Body className='d-flex flex-column'>
        <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
          <span className='fs-2'> {name}</span>
          <span className='fs-2 text-muted'> {formatCurrency(price)}</span>
        </Card.Title>
        <div className='mt-auto'>
          {quanlity === 0 ? (
            <Button className='w-100' onClick={() => increaseCartQuantity(id)}>
              + Add to Cart
            </Button>
          ) : (
            <div className='d-flex align-items-center flex-column' style={{ gap: '.5rem' }}>
              <div className='d-flex align-items-center justify-content-center' style={{ gap: '1rem' }}>
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className='fs-3'>{quanlity}</span>
                </div>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button onClick={() => removeCartQuantity(id)}>Remove</Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}

export default StoreItem
