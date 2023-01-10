let isEditable = false;
let cart = document.querySelector("#cartLeft");

let data = [
  {
    id: 1,
    title: "CCTV Camera",
    desc: "This is an awesome product",
    stock: 2,
    price: 120,
    quantity: 1,
  },
  {
    id: 2,
    title: "Digital Clock",
    desc: "This is an awesome product",
    stock: 20,
    price: 60,
    quantity: 1,
  },
  {
    id: 3,
    title: "Wifi",
    desc: "This is an awesome product",
    stock: 6,
    price: 75,
    quantity: 1,
  },
];

const addToCart = async (id) => {
  const dt = {
    id: id,
    title: "New Item",
    desc: "This is a new product",
    stock: 5,
    price: 34,
    quantity: 1,
  };
  await data.push(dt);
  await localStorage.setItem("cartItems", JSON.stringify(data));
};

const items = JSON.parse(localStorage.getItem("cartItems"));

const displayItems = async (removeId = 0) => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === removeId) {
      items.splice(i, 1);
    }
  }
  // await items.filter((item) => {
  //   return item.id === removeId;
  // });
  console.log(items);
  let sub = 0,
    total = 0,
    shipping = 0;
  cart.innerHTML = "";
  items.length === 0
    ? cart.innerHTML === "<h1>Empty Cart</h1>"
    : items.forEach((item) => {
        cart.innerHTML += `<div class="cartItem">
            <div class="cartItemLeft">
              <img class="cartItemImg" src="./images/image 1.png" alt="" />
              <div class="itemDetail">
                <div class="itemNameDesc">
                  <h1 class="itemName">${item.title}</h1>
                  <p class="itemDesc">${item.desc}</p>
                </div>
                <div class="itemQuantity">
                  <p>Quantity:</p>
                  <span class="quantityBox"
                    ><span class="qty">${item.quantity}</span>
                    <span class="arrows"
                      ><i
                        onclick="increaseQty(${item.id})"
                        class="fa fa-arrow-up"
                        aria-hidden="true"></i
                      ><i
                        onclick="decreaseQty(${item.id})"
                        class="fa fa-arrow-down"
                        aria-hidden="true"></i></span
                  ></span>
                </div>
              </div>
            </div>
            <div id="cartItemRight" class="cartItemRight">
              <span class="itemPrice">$${item.price}</span>
              <span class="removeItem" onclick= "{removeItem(${item.id})}"
                ><i class="fa fa-times" aria-hidden="true"></i
              ></span>
            </div>
          </div>`;
        sub += parseInt(item.price) * item.quantity;
      });

  if (sub > 100) {
    shipping = 10;
  }
  total = sub + shipping;
  let subPrice = document.querySelector(".subPrice");
  let shippingCost = document.querySelector(".shippingPrice");
  let totalPrice = document.querySelector(".totalPrice");
  subPrice.innerHTML = `
      <span>$${sub}</span>
      `;
  shippingCost.innerHTML = `
      <span>$${shipping}</span>
      `;
  totalPrice.innerHTML = `
      <span>$${total}</span>
      `;
};

const increaseQty = async (id) => {
  items.forEach((item) => {
    if (item.id === id && item.quantity === item.stock) {
      alert(
        `Sorry! We do not have more than ${item.quantity} ${item.title} items in our stock.`
      );
    } else if (item.id === id && item.quantity < item.stock) {
      item.quantity += 1;
      displayItems();
    }
  });
};

const decreaseQty = async (id) => {
  items.forEach((item) => {
    if (item.id === id && item.quantity === 1) {
      alert("Sorry! You cannot decrease anymore.");
    } else if (item.id === id && item.quantity > 1) {
      item.quantity -= 1;
      displayItems();
    }
  });
};

const removeItem = async (id) => {
  displayItems(id);
};



