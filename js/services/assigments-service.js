(function() {
  
   angular.module('assigmentsApp')
    .factory('AssigmentsService', function(){ 
     
      var assigmentid = 0;

      return {
        getAssigmentid : function(){
          return assigmentid;
        },
        setAssigmentid : function(value){
          assigmentid = value;
        } 
      };
      
    });
}());