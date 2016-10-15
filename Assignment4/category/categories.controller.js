(function(){
'use strict'

  angular.module('MenuApp').controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['categoriesItems'];
  function CategoriesController(categoriesItems) {
    var catCtrl = this;

    catCtrl.categories = categoriesItems.data;
  }
})()