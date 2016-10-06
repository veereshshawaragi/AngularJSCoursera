(function(){
  'use strict';
  var NarrowItDownApp = angular.module('NarrowItDownApp', []);

  NarrowItDownApp.controller('NarrowItDownController', NIDController);
  NarrowItDownApp.service('MenuSearchService', MenuSearchService );
  NarrowItDownApp.directive('foundItems', FoundItems);
  NarrowItDownApp.directive('itemsLoaderIndicator', ItemsLoaderIndicator)

  NIDController.$inject = ['$scope', 'MenuSearchService'];
  function NIDController($scope, MenuSearchService) {
    var nid = this;

    nid.searchTerm = '';
    nid.found = [];
    nid.totalItems = -1;
    nid.indicator = false;
    nid.onRemove = function (index) {
      nid.found.splice(index,1);
      nid.totalItems = nid.found.length;
    }

    nid.updateFound = function () {
      nid.indicator = true;
      nid.found = [];
      nid.totalItems = -1;
      MenuSearchService.getMatchedMenuItems(nid.searchTerm).then(function(result) {
        nid.found = result;
        nid.totalItems = nid.found.length;
        nid.indicator = false;
      });
      console.log('TotalItems', nid.totalItems);
    }
  }

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
        method: 'GET',
        url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
      }).then(function success(result) {
        // process result and only keep items that match
        var foundItems = [];
        var menuItems = result.data.menu_items;
        var totalItems = menuItems.length;

        for ( var i = 0; i < totalItems; i ++ ) {
          if ( searchTerm != '' && menuItems[i].description.indexOf(searchTerm) != -1 ) {
            foundItems.push({
              short_name : menuItems[i].short_name,
              name : menuItems[i].name,
              description : menuItems[i].description
            });
          }
        }
        console.log('searchTerm', searchTerm);
        console.log('foundItems', foundItems);

        // return processed items
        return foundItems;
      }, function error(error) {

      });
    };
  }

  function FoundItems() {
    var ddo = {
      templateUrl: 'itemlist.template.html',
      restrict: 'E',
      scope: {
        'foundItems' : '<',
        'totalItems' : '<',
        'onRemove' : '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'foundItemsDC',
      bindToController: true
    };
    return ddo;
  }

  function FoundItemsDirectiveController() {
    var foundItemsDC = this;

    foundItemsDC.showItems = function () {
      return foundItemsDC.totalItems > 0;
    }

    foundItemsDC.showAlert = function () {
      console.log('TotalItems', foundItemsDC.totalItems);
      return foundItemsDC.totalItems == 0;
    }
  }

  function ItemsLoaderIndicator() {
    var ddo = {
      templateUrl: 'loader/itemsloaderindicator.template.html',
      restrict: 'E',
    };

    return ddo;
  }
})();
