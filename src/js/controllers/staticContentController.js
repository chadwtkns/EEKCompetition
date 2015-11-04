(function () {
  angular.module('EEK.controllers')
    .controller('staticContentController', function($scope, $routeParams, competitionService) {
      var FAQService = competitionService.getRealJson('content');
      FAQService.get(function(data){
          $scope.FAQs = data.questionsAndAnswers;
      });
    }
  );
}());
