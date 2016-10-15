(function(){
'use strict'

  angular.module('MenuApp').controller('ItemsController', ItemsController);

  ItemsController.$inject = ['categoryItems'];
  function ItemsController(categoryItems) {
    var itemsCtrl = this;

    itemsCtrl.categoryItems = categoryItems.data.menu_items;
  }
})()