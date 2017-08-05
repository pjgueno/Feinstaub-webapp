
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
    
    
    var inbounds = hmhexa.filter(function(item){
        
        var position = new L.LatLng(item.latitude, item.longitude);
        
        if (bbox.contains(position) == true){
            
            return item;
            
        };    
    };

    
    
    
    

    map.eachLayer(function (layer) {
    if (layer._latlng!=undefined){
    if(bbox.contains(layer._latlng)  ){
        if(layer.feature.properties.hasOwnProperty('PM10')){
        if ( layer.feature.properties.PM10!= undefined ){
            arrayPM10.push(parseFloat(layer.feature.properties.PM10))
        };};
        if(layer.feature.properties.hasOwnProperty('PM25')){
        if (layer.feature.properties.PM25!= undefined){
            arrayPM25.push(parseFloat(layer.feature.properties.PM25))
        };};  
    };
    };
});
    
     meanPM10 = parseInt((arrayPM10.reduce(function(sum, value) {return sum + value;}, 0))/arrayPM10.length);
     meanPM25 = parseInt((arrayPM25.reduce(function(sum, value) {return sum + value;}, 0))/arrayPM25.length);
    
//    if(selector == "PM10" || selector == "hmPM10"){document.getElementById('meanwert').innerHTML = meanPM10 +" &micro;g/m&sup3";};
//    if(selector == "PM2.5" ||selector == "hmPM2.5"){document.getElementById('meanwert').innerHTML = meanPM25 +" &micro;g/m&sup3";};
};


    
