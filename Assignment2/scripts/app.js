(function(){
  'use strict';
  var ShoppingListCheckOff = angular.module('ShoppingListCheckOff', []);

  ShoppingListCheckOff.controller('ToBuyShoppingController', ToBuyShoppingController);
  ShoppingListCheckOff.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController);
  ShoppingListCheckOff.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyShoppingController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getToBuyItems();

    toBuy.bought = function (itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    }
  }

  AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
    var bought = this;

    bought.items = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService() {
    var service = this;

    // to by items
    var toBuyItems = [
      {
        name: "Peda",
        quantity: 50
      },
      {
        name: "Jamun ",
        quantity: 20
      },
      {
        name: 'Badam Milk',
        quantity: 8
      },
      {
        name: 'Momo',
        quantity: 5
      },
      {
        name: 'Fruit Cake',
        quantity: 20
      },
      {
        name: 'Apples',
        quantity: 10
      }
    ];
    var boughtItems = [];

    service.getToBuyItems = function () {
      return toBuyItems;
    }

    service.getBoughtItems = function () {
      return boughtItems;
    }

    service.buyItem = function (itemIndex) {
      boughtItems.push(toBuyItems[itemIndex]);
      toBuyItems.splice(itemIndex, 1);
    }
  }
})();
