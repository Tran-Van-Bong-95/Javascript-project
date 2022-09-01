const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: 'zgnl8oobznuc',
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: 'J-CkdNRKNKRW3IZNXD0Xm1gj0-vksyaCyioVtaOl3ds',
})

// console.log(client);

// variables

const cartBtn = document.querySelector('.cart-btn')
const closeCartBtn = document.querySelector('.close-cart')
const clearCartBtn = document.querySelector('.clear-cart')
const cartDOM = document.querySelector('.cart')
const cartOverlay = document.querySelector('.cart-overlay')
const cartItems = document.querySelector('.cart-items')
const cartTotal = document.querySelector('.cart-total')
const cartContent = document.querySelector('.cart-content')
const productsDOM = document.querySelector('.products-center')

// cart
let cart = []

// buttons
let buttonsDOM = []

// getting the products
class Products {
  async getProduct() {
    try {
      let contentful = await client.getEntries({
        content_type: 'comfyHouseProducts',
      })
      console.log(contentful)

      // let result = await fetch('products.json')
      // console.log(result)
      // let data = await result.json()

      let products = contentful.items
      products = products.map((item) => {
        const { title, price } = item.fields
        const { id } = item.sys
        const image = item.fields.image.fields.file.url
        return { title, price, id, image }
      })
      return products
      // return data;
    } catch (erro) {
      console.log('error')
    }
  }
}

// display products
class UI {
  // truyền data vào
  displayProducts(products) {
    let result = ''
    products.forEach((product) => {
      result += `
     <!-- single product -->
<article class="products">
  <div class="img-container">
    <img src="https:${product.image}" alt="product" class="product-img">
    <button class="bag-btn" data-id="${product.id}">
      <i class="fas fa-shopping-cart"></i>add to cart
    </button>
  </div>
  <h3>${product.title}</h3>
  <h4>$${product.price}</h4>
</article>
  <!-- end of single product -->
    `
    })

    productsDOM.innerHTML = result
  }

  getBagButtons() {
    const buttons = [...document.querySelectorAll('.bag-btn')]
    buttonsDOM = buttons
    buttons.forEach((button) => {
      // get id each buttons
      let id = button.dataset.id
      // when we not add at all it still empty array
      let inCart = cart.find((item) => item.id === id)
      // if inCart True means that we finded id
      if (inCart) {
        // make item in Cart can't click the button
        button.innerText = 'In Bag'
        button.disabled = true
      }
      button.addEventListener('click', (event) => {
        // event.target to get element
        event.target.innerText = 'In Bag'
        event.target.disabled = true

        // get product from products data by id and add amount property = 1
        let cartItem = { ...Storage.getProduct(id), amount: 1 }
        console.log(cartItem)

        // add product to the cart using spread operator
        cart = [...cart, cartItem]
        console.log(cart)

        // save cart in local storage
        Storage.saveCart(cart)

        // set cart values to calculate total price
        this.setCartValues(cart)

        // display item in cart container
        this.addCartItems(cartItem)

        //click addItems button and  show the cart
        this.showCart()
      })
    })
  }

  // when we have cart, we set up total items and total price and display in Cart UI and cartButton
  setCartValues(cart) {
    let tempTotal = 0
    let itemsTotal = 0
    cart.map((item) => {
      tempTotal += item.price * item.amount
      itemsTotal += item.amount
    })
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2))
    cartItems.innerText = itemsTotal
    console.log(cartTotal, cartItems)
  }

  addCartItems(item) {
    const div = document.createElement('div')
    div.classList.add('cart-item')
    div.innerHTML = `
   <img src="https://${item.image}" alt="">     
      <div>
      <h4>${item.title}</h4>
      <h5>$${item.price}</h5>
      <span class="remove-item"  data-id = ${item.id}> remove </span>
      </div>
      <div>
        <i class="fas fa-chevron-up" data-id=${item.id}></i>
        <p class="item-amount">${item.amount}</p>
        <i class="fas fa-chevron-down"  data-id=${item.id}>
        </i>
      </div>
   `
    cartContent.appendChild(div)
    console.log(cartContent)
  }

  showCart() {
    cartOverlay.classList.add('transparentBcg')
    cartDOM.classList.add('showCart')
  }

  // set up cart
  setupAPP() {
    cart = Storage.getCart()
    // by setting setCartValues and populateCart thì không mất dữ liệu when you have cart
    // when you update and remove product from cart. The information will update too
    this.setCartValues(cart)
    // when get cart that update by adding or removing we display cart again
    this.populateCart(cart)
    cartBtn.addEventListener('click', this.showCart)
    closeCartBtn.addEventListener('click', this.hideCart)
  }

  populateCart(cart) {
    cart.forEach((item) => this.addCartItems(item))
  }

  hideCart() {
    cartOverlay.classList.remove('transparentBcg')
    cartDOM.classList.remove('showCart')
  }

  // processing events cart
  cartLogic() {
    // clear cart button
    clearCartBtn.addEventListener('click', () => {
      this.clearCart()
    })
    //cart functionality
    cartContent.addEventListener('click', (event) => {
      if (event.target.classList.contains('remove-item')) {
        let removeItem = event.target
        let id = removeItem.dataset.id
        cartContent.removeChild(removeItem.parentElement.parentElement)
        this.removeItem(id)
      } else if (event.target.classList.contains('fa-chevron-up')) {
        let addAmount = event.target
        let id = addAmount.dataset.id
        let tempItem = cart.find((item) => item.id === id)
        tempItem.amount = tempItem.amount + 1
        Storage.saveCart(cart)
        this.setCartValues(cart)
        addAmount.nextElementSibling.innerText = tempItem.amount
      } else if (event.target.classList.contains('fa-chevron-down')) {
        let lowerAmount = event.target
        let id = lowerAmount.dataset.id
        let tempItem = cart.find((item) => item.id === id)
        tempItem.amount = tempItem.amount - 1
        if (tempItem.amount > 0) {
          Storage.saveCart(cart)
          this.setCartValues(cart)
          lowerAmount.previousElementSibling.innerText = tempItem.amount
        } else {
          cartContent.removeChild(lowerAmount.parentElement.parentElement)
          this.removeItem(id)
        }
      }
    })
  }

  clearCart() {
    //get id and remove data in cart one by one product
    let cartItems = cart.map((item) => item.id)
    cartItems.forEach((id) => this.removeItem(id))

    // remove div children
    while (cartContent.children.length > 0) {
      // remove from top to down
      cartContent.removeChild(cartContent.children[0])
    }

    this.hideCart()
  }

  removeItem(id) {
    cart = cart.filter((item) => item.id !== id)
    this.setCartValues(cart)
    Storage.saveCart(cart)
    let button = this.getSingleButton(id)
    // thiết lập lại button by getting id
    button.disabled = false
    button.innerHTML = `
   <i class="fas fa-shopping-cart"></i> add to cart
   `
  }

  // thiết lập lại các tính năng của button cho các item trong cart bị xoá
  getSingleButton(id) {
    // trong tất cả button trả về các button có cùng id mà trong trường hợp này là id của các item bị xoá
    return buttonsDOM.find((button) => button.dataset.id === id)
  }
}

// local storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products))
  }

  // get item
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem('products'))
    return products.find((product) => product.id === id)
  }

  static saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  // get cart arrray
  static getCart() {
    return localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : []
  }
}

// The DOMContentLoaded event is fired when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading. A very different event load should be used only to detect a fully-loaded page. It is an incredibly common mistake to use load where DOMContentLoaded would be much more appropriate, so be cautious.
document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI()
  const products = new Products()

  //setup app để khi bạn refresh load content sau khi bạn thêm hay xóa products from cart thì sẽ không mất dữ liệu
  ui.setupAPP()

  // get all products
  products
    .getProduct()
    // display data and save data
    .then((products) => {
      ui.displayProducts(products)

      Storage.saveProducts(products)
    })
    // processing for cart
    .then(() => {
      ui.getBagButtons()
      ui.cartLogic()
    })
    // expand more feature for this project
    .then(() => console.log('ca'))
    .then(() => console.log('co'))
})

// từ đây chúng ta hiểu hàm bất đồng bộ dựa trên promise này mà không return 1 new Promise mới có thể thực hiện nhiều resolve bằng cách sử dụng nhiều then
// then thứ nhất nó dùng đến parameter của resolve để thực hiện công việc cần dùng đến data đó
// then thứ 2 trở đi nó không cần dùng đến data đó để thực hiện công việc
// sự kiện xảy ra sẽ theo thứ tự từ then() thứ 1 đến then() thứ 2

/*
Đây là lí do sử dụng promise :
As compared to Callback function, It is very easy to debug the error with Promise like try-catch block.

A promise made the chaining of functions straightforward and simplified the code. Common need of chaining is to execute two or more asynchronous operations back to back, making it much easier to read. Each subsequent operation starts with the result from the previous step when the previous operation succeeds.

Promises are built over callbacks, it is much more readable then Callback function code because The truth is, making use of callbacks in a clean and concise way is challenging.

*/
