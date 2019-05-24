function ItemList (CartService) {

  const ctrl = this;

  ctrl.getItems = () => {
    CartService.getAllItems()
    .then( (data) => {
      ctrl.cartItems = data;
    })
    .catch( (err) => {
      console.log(err);
    })
  }

  ctrl.removeItem = (id) => {
    CartService.removeItem(id)
    .then( (data) => {
      ctrl.cartItems = data;
    })
    .catch( (err) => {
      console.log(err);
    })
    ctrl.getItems();
  }

  ctrl.addItem = (addName, addPrice, addQuantity) => {
    
    let itemToAdd = {
      product: addName,
      price: addPrice,
      quantity: addQuantity,
    } 

    CartService.addItem(itemToAdd)
    .then( (data) => {
      ctrl.cartItems = data;
    })
    .catch( (err) => {
      console.log(err);
    })
    
    ctrl.getItems();
    
  }

  ctrl.getItems();

}

angular
.module('CartApp')
.component('itemList', {
  controller: ItemList,
  template: `
    <div class="container mt-5">
      
      <h2 class="mt-2 mb-5">Your Cart</h2>

      <table class="table">
        <thead>
          <tr>
           <th scope="col">Item #</th>
            <th scope="col">Item</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Remove</th>
         </tr>
        </thead>
       <tbody>
         <tr ng-repeat="item in $ctrl.cartItems">
           <th scope="row">{{ item.id   }} </th>
           <td> {{ item.product }} </td>
           <td> {{ item.price }} </td>
           <td> {{ item.quantity }} </td>
           <td> <span ng-click="$ctrl.removeItem(item.id)">X</span> </td>
          </tr>
        </tbody>
      </table> 

      <h2>Add An Item</h2>
        <label>Name</label>: <input type="text" ng-model="$ctrl.add_name"><br />
        <label>Price</label>: <input type="number" ng-model="$ctrl.add_price"><br />
        <label>Quantity:</label>: <input type="number" ng-model="$ctrl.add_quantity"><br />

        <button ng-click="$ctrl.addItem($ctrl.add_name, $ctrl.add_price, $ctrl.add_quantity)">Add an Item</button>

  `
});