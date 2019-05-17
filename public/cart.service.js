function CartService($http, $q) {

  const service = this;

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

}

angular
.module('CartApp')
.service('CartService', CartService);