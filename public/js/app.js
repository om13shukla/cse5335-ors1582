
var app = angular.module('myApp', ['uiGmapgoogle-maps','chart.js','ngAnimate']).config(
    ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
        GoogleMapApiProviders.configure({
            key:'AIzaSyAhp6ud3AmXvLbMNuiL8J_z4uI94kkCQSk',
            china: true
        });
    }]
);;

app.controller('myCtrl1', function($scope, $http) {
    $scope.preMsg="Click the button atleast !!";
    $scope.callServer=function() {
                $http.get("http://cse5335-ors1582.herokuapp.com/jsonfiles/userinfo.json")
                        .then(function(response) {
                $scope.ujson=response.data;
                $scope.preMsg="";
                $scope.details=true;
                $scope.active=" not active";
                var st=$scope.ujson.linked.users[0].isActive;    
                    if(st)                                      //Evaluating User is Active or Not
                        $scope.active="active";
                console.log(st);
                  
                //console.log(response);
    });
    }
    
    
});

app.controller('myCtrl2', function($scope, $http, uiGmapIsReady) {
    $scope.preMsg="Click the button atleast !!";
    $scope.callServer=function() {
                $http.get("http://cse5335-ors1582.herokuapp.com/jsonfiles/frndsinfo.json")
                        .then(function(response) {
                $scope.longj=response.data;
                $scope.preMsg="";
                $scope.details=true;
                $scope.data1=[];
                $scope.labels=[];
                angular.forEach($scope.longj,function(value,key){
                    
                    $scope.labels.push(value.name);
                    $scope.data1.push(value.balance);
                    
                })
                console.log($scope.labels);                           //for Debugginh angular.foreach !!
                console.log($scope.data1);    
                $scope.map = { center: { latitude: 32.729182, longitude: -97.115219 }, zoom: 10 };   
                    
                //console.log(response);
    });
    }
    
});

app.controller('myCtrl3', function($scope, $http) {
    $scope.preMsg="Click the button atleast !!";
    $scope.callServer=function() {
                $http.get("http://cse5335-ors1582.herokuapp.com/jsonfiles/chartData.json")
                        .then(function(response) {
                $scope.msg=response.data;
                $scope.preMsg="";
                $scope.details=true;    
                //console.log(response);
    });
    }
    
});
    
app.controller('myCtrl4', function($scope, $http,$interval) {
    $scope.preMsg="Click the button atleast !!";
    $scope.emps=[];
    var i=1;
    $scope.cnt=1;
    $scope.show=[];
    $scope.callServer=function() {
                $http.get("http://cse5335-ors1582.herokuapp.com/jsonfiles/empData.json")
                        .then(function(response) {
                $scope.empd=response.data;
                $scope.preMsg="";
                $scope.details=true;    
                //console.log(response);
                });
    }
    
    
    $scope.callWidTimOut= function(){
        var delay=500;
        $interval(function(){  $scope.callDbfind(i); i++; console.log(i); }, 
                  delay, 
                  105);
    }
    
    
    
    $scope.callDbCreate=function(emp) {                                                //Creating Employer.
            $http.post('http://cse5335-ors1582.herokuapp.com/api/emps/createEmp', emp).then(handleSuccess, handleError);
    }
    
     $scope.callDbfind=function(empno) {                                                //finding Employer.
            var fparam= '{"empno":' + empno + '}' ;
            console.log(fparam);
            $scope.showRaw=true;
            $http.post('http://cse5335-ors1582.herokuapp.com/api/emps/findOne',fparam).then(handleSuccess, handleError);
    }
     function handleSuccess(res) {
            var l=$scope.emps.length;
             if( l>20){
                    $scope.emps.slice(0,-1);
                    $scope.show[(l)]=true
                    
             }
            var sd=false;
            $scope.emps.splice(0, 0, res.data);
            $scope.show.push(sd);        
            $scope.premsg41 = res.data;
        }

        function handleError(res) {
            console.log(res);
            $scope.premsg41 = res.data;
            return res;
        }

    
});
app.animation('.slide', function () {
    return {
        enter: function (element, done) {
          console.log('enter');
            element.hide().slideDown(600, done);
            element.style.color()
        },
        move: function(element, done) {
            console.log('move');
            element.slideUp(500, done);
        },
        leave: function(element, done) {
          console.log('slide up', element.text())
            element.slideUp(500, done);
        },
        active: function(element, done) {
          console.log('slide up', element.text())
            element.style.color("blue);
    };
    
});
    