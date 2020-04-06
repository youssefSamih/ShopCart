const user = {
  name: "Kim",
  active: true,
  cart: [],
  purchases: []
};

let History = [];
const compose = (f, g) => (...args) => f(g(...args));
console.log(
  purchaseItem(emptyCart, buyItem, applyTaxToItems, addItemToCart)(user, {
    name: "laptop",
    price: 200
  }),
  History
);

function purchaseItem(...fns) {
  return fns.reduce(compose);
}

function applyTaxToItems(user) {
  History.push(user);
  const { cart } = user;
  const taxRate = 1.3;
  const updateCart = cart.map(item => {
    return {
      name: item.name,
      price: item.price * taxRate
    };
  });
  return Object.assign({}, user, { cart: updateCart });
}

function addItemToCart(user, item) {
  History.push(user);
  const updateCart = user.cart.concat(item);
  return Object.assign({}, user, { cart: updateCart });
}

function buyItem(user) {
  return Object.assign({}, user, { purchases: user.cart });
}

function emptyCart(user) {
  History.push(user);
  return Object.assign({}, user, { cart: [] });
}
