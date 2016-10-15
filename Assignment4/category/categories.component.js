(function(){
'use strict'

  angular.module('MenuApp').component('catComponent', {
    templateUrl: 'category/categories-component.template.html',
    bindings: {
      categories: '<'
    }
  });

})()