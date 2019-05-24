function CartService($http, $q) {

  const service = this;

  // this displays all items in the cart

  service.getAllItems = () => {
    return $q(function(resolve, reject) {
      $http.get('/cart-items') 
        .then( (response) => {
          console.log(response.data);
          resolve(response.data);
        })
        .catch( (err) => {
          console.error(err);
          reject(err);
        })
    })
  }

  
  // this removes an item from the cart based on user interaction

  service.removeItem = (id) => {
    return $http({
      url: "/cart-items/" + id,
      method: "DELETE"
    }).then((response) => {
      return response.data;
    });
  }

  
  // this adds an item to the cart based on the add item form

  service.addItem = (newItem) => {
    return $http({
      url: "/cart-items",
      method: "POST",
      data: newItem
    }).then((response) => {
      return response.data;
    });
  }

}

angular
.module('CartApp')
.service('CartService', CartService);