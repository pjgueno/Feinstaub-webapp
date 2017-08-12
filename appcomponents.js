
  var app = angular
    .module('feinstaub', ['ngMaterial']);
    app.controller('StadtCtrl', StadtCtrl);


  function StadtCtrl($mdDialog) {
    var self = this;

    self.openDialog = function($event) {
      $mdDialog.show({
        controller: DialogCtrlStadt,
        controllerAs: 'ctrl',
        templateUrl: 'http://localhost:8888/CODES/FSAPP/html/dialogstadt.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose:true
      })
    }
  };

  function DialogCtrlStadt ($timeout, $q, $scope, $mdDialog,$http) {
    var self = this;

    self.places  = loadAll(); 
      
    self.querySearch = querySearch;

    self.cancel = function($event) {
      $mdDialog.cancel();
    };
    self.finish = function($event,val) {
    var getOptions = positions[val.loader];
    $mdDialog.hide();
    map.setView(new L.LatLng(getOptions.coordinates[0], getOptions.coordinates[1]), getOptions.zoom);  
        
    var mean = getMeans(map);
        
    console.log(mean);
    };

    function querySearch (query) {
      return query ? self.places.filter( createFilterFor(query) ) : self.places;
    }


        function loadAll() {            
            var arrayPlaces = []
            angular.forEach(positions,function(value, key){    
                var item ={value:'',display:'',loader:''};
                    item.value = value.name.toLowerCase();
                    item.display = value.name;
                    item.loader = key;
                arrayPlaces.push(item);
            });
            console.log(arrayPlaces);
            return arrayPlaces;
        };
        
        


    
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(place) {
        return (place.value.indexOf(lowercaseQuery) === 0);
      };

    }
  };
    



      app.controller('SensorCtrl', SensorCtrl);

  function SensorCtrl($mdDialog) {
    var self = this;

    self.openDialog = function($event) {
      $mdDialog.show({
        controller: DialogCtrlSensor,
        controllerAs: 'ctrl',
        templateUrl: 'http://localhost:8888/CODES/FSAPP/html/dialogsensor.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose:true
      })
    }
  };
    
    
    
   function DialogCtrlSensor ($timeout, $q, $scope, $mdDialog) {
    var self = this;

    self.sensors  = arraySensors;
    self.querySearch   = querySearch;

    self.cancel = function($event) {
      $mdDialog.cancel();
    };
    self.finish = function($event,val) {  
    $mdDialog.hide();
    map.setView(new L.LatLng(val.latitude, val.longitude), 17);  
        
        
    var element = hmhexa.filter(item => item.id == val.id);
        
        console.log(element);
        
         texte = "Mein Sensor hat den Wert " + element[0].data.PM10 + " für PM10! %23luftdaten http://luftdaten.info %23luftdaten";
                console.log(texte);

        document.getElementById('info').innerHTML = "<div class='graph'><img src='https://api.luftdaten.info/grafana/render/dashboard-solo/db/single-sensor-view?panelId=1&amp;orgId=1&amp;width=250&amp;height=200&amp;tz=UTC%2B02%3A00&amp;var-node="+val.display+"'></div><div class='graph'><img src='https://api.luftdaten.info/grafana/render/dashboard-solo/db/single-sensor-view?orgId=1&amp;panelId=2&amp;width=250&amp;height=200&amp;tz=UTC%2B02%3A00&amp;var-node="+val.display+"'></div><div class='graph'><img src='http://localhost:8888/codes/fsapp/images/tlw.png' onclick ='twitter(texte)'></div>";   


    };

    function querySearch (query) {
      return query ? self.sensors.filter( createFilterFor(query) ) : self.sensors;
    }

    function createFilterFor(query) {
      var stringQuery = query.toString();

      return function filterFn(sensor) {
        return (sensor.display.indexOf(stringQuery) === 0);
//                  return (sensor.value.indexOf(query) === 0);

      };

    }
  } ; 
    

    
function twitter(txt){
    
    
    window.open('https://twitter.com/intent/tweet?text=Mein Sensor'+txt+'&source=webclient');
    
    
    
};
    
    
function getMeans(map){
    
    
  var bbox = map.getBounds();
    
    console.log(bbox);
    
    var arrayPM10 = [];
    var arrayPM25 = [];
    var arrayTemp = [];
    var arrayHumi = [];
    var arrayDruck = [];

    
    
    var inboundsPM = hmhexaPM.filter(function(item){
        
        var position = new L.LatLng(item.latitude, item.longitude);
        
        if (bbox.contains(position) == true){
            
            return item;
            
        };    
    });
    
    
     var inboundstemp = hmhexatemp.filter(function(item){
        
        var position = new L.LatLng(item.latitude, item.longitude);
        
        if (bbox.contains(position) == true){
            
            return item;
            
        };    
    });
    
    
     var inboundsdruck = hmhexadruck.filter(function(item){
        
        var position = new L.LatLng(item.latitude, item.longitude);
        
        if (bbox.contains(position) == true){
            
            return item;
            
        };    
    });
    
    

    console.log(inboundsPM);
    console.log(inboundstemp);
    console.log(inboundsdruck);

    
    
       inboundsPM.forEach(function (item) {
           arrayPM10.push(parseFloat(item.data.PM10));
           arrayPM25.push(parseFloat(item.data.PM25));
       }); 
    
      inboundsPM.forEach(function (item) {
        arrayTemp.push(parseFloat(item.data.Temp));
        arrayHumi.push(parseFloat(item.data.Humi));
       }); 
    
     inboundsdruck.forEach(function (item) {
           arrayDruck.push(parseFloat(item.data.Press));   
       }); 
        
     var meanPM10 = parseInt((arrayPM10.reduce(function(sum, value) {return sum + value;}, 0))/arrayPM10.length);
     var minPM10 = Math.min(...arrayPM10);
    var maxPM10 = Math.max(...arrayPM10);

    var meanPM25 = parseInt((arrayPM25.reduce(function(sum, value) {return sum + value;}, 0))/arrayPM25.length);
    var minPM25 = Math.min(...arrayPM25);
    var maxPM25 = Math.max(...arrayPM25);
    
    var meanTemp = parseInt((arrayTemp.reduce(function(sum, value) {return sum + value;}, 0))/arrayTemp.length);
    var minTemp = Math.min(...arrayTemp);
    var maxTemp = Math.max(...arrayTemp);
    
    
    var meanHumi = parseInt((arrayHumi.reduce(function(sum, value) {return sum + value;}, 0))/arrayHumi.length);
    var minHumi = Math.min(...arrayHumi);
    var maxHumi = Math.max(...arrayHumi);
    
    var meanDruck = parseInt((arrayDruck.reduce(function(sum, value) {return sum + value;}, 0))/arrayDruck.length);
    var minDruck = Math.min(...arrayDruck);
    var maxDruck = Math.max(...arrayDruck);
    
    
    console.log(meanPM10);
    console.log(minPM10);
    console.log(maxPM10);

    
    
    
    return 4;
};


    
