(function(){
'use strict'

  angular.module('MenuApp').component('items', {
    templateUrl: 'items/items-component.template.html',
    bindings: {
      categoryItems: '<'
    }
  });

})()