(function () {
  angular.module('MenuApp').config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home if no other URL matches
    $urlRouterProvider.otherwise('/');

    // Set up UI states
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'MenuApp/home.template.html'
      })

      .state('categories', {
        url: '/category',
        templateUrl: 'category/categories.template.html',
        controller: 'CategoriesController as catCtrl',
        resolve: {
          categoriesItems: ['MenuDataService', function(MenuDataService) {
            return MenuDataService.getAllCategories();
          }]  
        }
      })

      .state('categories.category-detail', {
        url: '/items/{categoryShortName}',
        templateUrl: 'items/category-items.template.html',
        controller: 'ItemsController as itemsCtrl',
        resolve: {
          categoryItems: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams) { 
            return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
          }]
        }
      })

      ;
  }
})();
