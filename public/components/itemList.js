function ItemList (CartService) {

  const ctrl = this;

  // display a list of items in the cart

  ctrl.getItems = () => {
    CartService.getAllItems()
    .then( (data) => {
      ctrl.cartItems = data;
    })
    .catch( (err) => {
      console.log(err);
    })
  }


  // remove an item from the cart

  ctrl.removeItem = (id) => {
    CartService.removeItem(id)
    .then( (data) => {
      ctrl.cartItems = data;
      ctrl.getItems();
    })
    .catch( (err) => {
      console.log(err);
    })
  }

  
  // add an item to the cart

  ctrl.addItem = (addProduct, addPrice, addQuantity) => {
    
    let itemToAdd = {
      product: addProduct,
      price: addPrice,
      quantity: addQuantity,
    } 

    CartService.addItem(itemToAdd)
    .then( (data) => {
      ctrl.cartItems = data;
      ctrl.getItems();
      //reset values
      ctrl.add_product = '';
      ctrl.add_price = '';
      ctrl.add_quantity = '';
    })
    .catch( (err) => {
      console.log(err);
    })

  }

  
  // update the quantity of an item in the cart

  ctrl.updateItem = (addQuantity, id) => {
    
    let itemToUpdate = {
      quantity: addQuantity,
    } 

    CartService.updateItem(itemToUpdate, id)
    .then( (data) => {
      ctrl.cartItems = data;
      ctrl.getItems();
    })
    .catch( (err) => {
      console.log(err);
    })

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

      <table class="table table-hover">
        <thead class="thead-dark">
          <tr>
           <th scope="col" class="text-left">Item #</th>
            <th scope="col" class="text-left">Item</th>
            <th scope="col" class="text-left">Price</th>
            <th scope="col" class="text-left">Quantity</th>
            <th scope="col" class="text-right">Remove</th>
         </tr>
        </thead>
       <tbody>         
        <tr ng-repeat="cart in $ctrl.cartItems track by $index">
           <th scope="row">{{ cart.id   }} </th>
           <td class="text-left"> {{ cart.product }} </td>
           <td class="text-left"> {{ cart.price | currency }} </td>
           <td class="text-left"> <input type="number" value="{{ cart.quantity }}" ng-model="qty" style="width: 100px;" class="form-control form-control-sm"> <br><button ng-click="$ctrl.updateItem(qty, cart.id)"  class="btn btn-outline-primary btn-sm ">Update Quantity</button></td>
           <td class="text-left"> 
              <button type="button" class="close" aria-label="Delete" ng-click="$ctrl.removeItem(cart.id)">
                <span aria-hidden="true">&times;</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table> 

      <h3 class="mt-5 pt-5">Add An Item</h2>
      <hr>
      <form class="mb-5 pb-5" ng-submit="$ctrl.addItem($ctrl.add_product, $ctrl.add_price, $ctrl.add_quantity)" name="addItemForm" id="addItemForm">
        <div class="form-group">
          <label for="addProduct">Product</label>
          <input type="text" class="form-control" id="addProduct" class="form-control" type="text" ng-model="$ctrl.add_product" placeholder="Enter the product to add" required>
        </div>

        <div class="form-group">
          <label for="addPrice">Price</label>
          <input type="number" step="any" ng-model="$ctrl.add_price" class="form-control" id="addPrice" placeholder="Enter the product price" required>
          <small id="priceHelp" class="form-text text-muted">This must be a number.</small>
        </div>

        <div class="form-group">
          <label for="addQuantity">Quantity</label>
          <input type="number" ng-model="$ctrl.add_quantity" class="form-control" id="addQuantity" placeholder="Enter the quantity" required>
          <small id="quantityHelp" class="form-text text-muted">This must be a number.</small>
        </div>

        <button class="btn btn-primary" type="submit" >Add an Item</button>
      </form>
  `
});