import { createContext, ReactNode, useContext, useState } from 'react'

type ShoppingCartProviderProps = {
  // Kiểu dữ liệu này cho phép nhận vào mọi loại dữ liệu để hiển thị trong component, bao gồm các đối tượng React, các phần tử HTML, chuỗi, số, boolean, null hoặc undefined
  children: ReactNode
}
// định nghĩa kiểu của sản phẩm trong giỏ hàng
type CartItem = {
  id: number
  quantity: number
}
// định nghĩa giỏ hàng và hàm xử lí giỏ hàng
type ShoppingCartContext = {
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeCartQuantity: (id: number) => void
}

export const ShoppingCartContext = createContext({} as ShoppingCartContext)
export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItem, setCartItem] = useState<CartItem[]>([])
  function getItemQuantity(id: number) {
    return cartItem.find((item) => item.id === id)?.quantity || 0
  }
  function increaseCartQuantity(id: number) {
    // currItems đại diện cho danh sách sản phẩm hiện tại trong giỏ hàng và trả về danh sách sản phẩm
    setCartItem((currItems) => {
      // Nếu id sản phẩm không được tìm thấy trong danh sách sản phẩm hiện tại, nghĩa là sản phẩm chưa có trong giỏ hàng của người dùng, thì thêm một sản phẩm mới vào giỏ hàng với giá trị số lượng ban đầu là 1.
      if (currItems.find((item) => item.id === id) == null) {
        // rả về danh sách sản phẩm mới đã thêm sản phẩm mới.
        return [...currItems, { id, quantity: 1 }]
      } else {
        // nếu đã có sp trong giỏ thì t tìm sản phẩm đó và tăng sl lên
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function decreaseCartQuantity(id: number) {
    setCartItem((currItems) => {
      // Nếu số lượng của sản phẩm có id tương ứng trong giỏ hàng bằng 1, nghĩa là sản phẩm đó cần bị xóa khỏi giỏ hàng vì số lượng đã bằng 0.
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id)
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  // delete sp in cart

  function removeCartQuantity(id: number) {
    setCartItem((currItems) => {
      return currItems.filter((item) => item.id !== id)
    })
  }

  return (
    <ShoppingCartContext.Provider
      value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeCartQuantity }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}
