import { Card } from 'react-bootstrap'

// khai báo
type StoreItemsProps = {
  id: number
  name: string
  price: number
  imgUrl: string
}
export function StoreItem({ id, name, price, imgUrl }: StoreItemsProps) {
  return (
    <>
      <Card>
        <Card.Img variant='top' src={imgUrl} height='200px' style={{ objectFit: 'cover' }} />
      </Card>
    </>
  )
}
