// data for js
/*

DOMContentLoaded
createElement
createAttribute 
appendChild
setAttributeNode

*/

// **** select elements ****
const form = document.querySelector('.grocery-form')
const alert = document.querySelector('.alert')
const input = document.querySelector('.grocery')
const btn_Submit = document.querySelector('.grocery-btn')

const container = document.querySelector('.grocery-container')
const list = document.querySelector('.grocery-list')
const clearItem = document.querySelector('.clear-btn')

// **** Event Listeners
// sự kiện submit, sự kiện click, sự kiện load nội dung dom khi fresh

form.addEventListener('submit', addItems)
// clear list
clearItem.addEventListener('click', clearItems)

// keep data when you refresh the tab
window.addEventListener('DOMContentLoaded', editItem)

// *** Options editor ****
let editElement
let editId = ''
let editFlag = false

// **** functions ***
// add function (mỗi item thêm vào sẽ có 1 id unique)
function addItems(e) {
  e.preventDefault()

  const value = input.value
  const id = new Date().getTime().toString()

  // 3 cases
  // value is true và editFlag false
  if (value && !editFlag) {
    // console.log('add');
    const element = document.createElement('div')
    let attr = document.createAttribute('data-id')

    attr.value = id
    element.classList.add('grocery-item')
    element.setAttributeNode(attr)

    element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `

    // add delete and edit events
    const deleteBtn = element.querySelector('.delete-btn')
    const editBtn = element.querySelector('.edit-btn')

    deleteBtn.addEventListener('click', deleteItems)
    editBtn.addEventListener('click', editItems)

    // apend child
    list.appendChild(element)

    //container
    container.classList.add('show-container')

    // display alert sucess
    displayAlert('item added', 'sucess')

    // add to LocalStorage
    addToLocalStorage(id, value)
    //set back to default
    setBacktoDefault()
  } else if (value && editFlag) {
    // edit value
    // console.log('edit');
    // console.log(editElement.innerHTML)
    // change the content of p tags
    editElement.innerHTML = value
    displayAlert('value changed', 'sucess')

    //  editLocalStorage
    editLocalStorage(editId, value)

    setBacktoDefault()
  } else {
    // console.log('alert');
    // không thêm gì mà đã ấn
    displayAlert('empty item', 'danger')
  }
}

// alert function
function displayAlert(text, action) {
  alert.textContent = text
  alert.classList.add(`alert-${action}`)

  // remove alert
  setTimeout(function () {
    alert.textContent = ''
    alert.classList.remove(`alert-${action}`)
  }, 1000)
}

// delete function
function deleteItems(e) {
  // delete child
  // delete in storage
  // set back
  const element = e.currentTarget.parentElement.parentElement
  list.removeChild(element)
  const id = element.dataset.id

  if (list.children.length == 0) {
    container.classList.remove('show-container')
  }

  displayAlert('item removed', 'danger')

  // delete Locastorage
  deleteLocalStorage(id)

  setBacktoDefault()
}

// edit function
function editItems(e) {
  // currentTarget là element nào lắng nghe sự kiện
  // target nơi sự kiện bắt đầu
  const element = e.currentTarget.parentElement.parentElement
  editElement = e.currentTarget.parentElement.previousElementSibling
  console.log(editElement)
  // giá trị input này sẽ chứa nội dung editElement
  input.value = editElement.innerHTML

  editId = element.dataset.id
  editFlag = true
  btn_Submit.textContent = 'Edit'
}

// clear all Items
// vẫn giữ .list và .clearItem vì vậy ta sẽ không xoá các element có các class này, mà ta sẽ xoá từng item một tức là grocery-item

function clearItems(e) {
  const element = e.currentTarget.previousElementSibling
  // console.log(element);
  // console.log(list);
  const items = element.querySelectorAll('.grocery-item')
  console.log(items)
  // const thunghiem = list.querySelectorAll('grocery-list');
  // console.log(thunghiem);
  // nhớ rằng items chỉ là 1 Node array chứa các element có class grocery-item, còn list là element
  // vì vậy ta không thể viết items.removeChild(item)  được mà để xoá 1 element. Mà phải tìm parentElement sau đó mới xoá được element con
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item)
    })
  }
  // remove class clearItems
  container.classList.remove('show-container')
  displayAlert('all item removed', 'sucess')

  // clearLocal Storage
  clearLocalStorage()
  setBacktoDefault()
}

// setBackToDefault
function setBacktoDefault() {
  input.value = ''
  editFlag = false
  btn_Submit.textContent = 'Submit'
  editId = ''
}

// **** local Storage
// add to local storage
// chúng ta sẽ lưu dưới dạng object
function addToLocalStorage(id, value) {
  const grocery = { id, value }

  let items = getLocalStorage()
  items.push(grocery)

  localStorage.setItem('list1', JSON.stringify(items))
}

// bước này nhằm chuyển đổi nó về dạng array
function getLocalStorage() {
  return localStorage.getItem('list1')
    ? JSON.parse(localStorage.getItem('list1'))
    : []
}

// clear all local Storage
function clearLocalStorage() {
  localStorage.removeItem('list1')
}

/*
nhớ là mỗi khi tạo ra 1 phần tử, 1 item ta sẽ tạo 1 id cho nó 
*/
// edit local storage
function editLocalStorage(id, value) {
  let items = getLocalStorage()

  // lặp lại từng phần tử và gán lại giá trị value mới của chúng, tạo ra 1 new array phiên bản mới
  // để tìm phần tử đang edit ta sử dụng map để lặp từng phần tử và tìm
  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value
    }
    return item
  })

  // thiết lập lại list1
  localStorage.setItem('list1', JSON.stringify(items))
}

// delete local storage
function deleteLocalStorage(id) {
  let items = getLocalStorage()

  items = items.filter(function (item) {
    if (item.id !== id) {
      return item
    }
  })
  // trả về 1 new array mà chỉ chứa các object, items không chứa id được truyền vào và cuối cùng trả về 1 array với các item có  id không giống nhau

  // thiết lập lại giá trị cho key list1
  localStorage.setItem('list1', JSON.stringify(items))
}

//  edit Item
function editItem() {
  const items = getLocalStorage()

  if (items.length > 0) {
    items.forEach(function (item) {
      createElementByHand(item.id, item.value)
    })
    container.classList.add('show-container')
  }
}

function createElementByHand(id, value) {
  const element = document.createElement('div')
  let attr = document.createAttribute('data-id')

  attr.value = id
  element.classList.add('grocery-item')
  element.setAttributeNode(attr)

  element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `

  // add event listeners to both buttons;
  const deleteBtn = element.querySelector('.delete-btn')
  deleteBtn.addEventListener('click', deleteItems)
  const editBtn = element.querySelector('.edit-btn')
  editBtn.addEventListener('click', editItems)

  list.appendChild(element)
}
