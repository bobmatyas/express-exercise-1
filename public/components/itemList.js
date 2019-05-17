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
         </tr>
        </thead>
       <tbody>
         <tr ng-repeat="item in $ctrl.cartItems">
           <th scope="row">{{ item.id   }} </th>
           <td> {{ item.product }} </td>
           <td> {{ item.price }} </td>
           <td> {{ item.quantity }} </td>
          </tr>
        </tbody>
      </table> 
  `
});