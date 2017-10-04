
  var app = angular
    .module('feinstaub', ['ngMaterial']);




app.controller('WerteCtrl', WerteCtrl);


function WerteCtrl($mdDialog) {
    var self = this;

    self.openDialog = function($event) {
      $mdDialog.show({
        controller: DialogCtrlWerte,
        controllerAs: 'ctrl',
        template: dynamictemplate,
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose:true
      })
    }
  };


function DialogCtrlWerte ($mdDialog) {
    var self = this;
    self.cancel = function($event) {
      $mdDialog.cancel();
    };
  };



app.controller('InfoCtrl', InfoCtrl);


  function InfoCtrl($mdDialog) {
    var self = this;

    self.openDialog = function($event) {
      $mdDialog.show({
        controller: DialogCtrlInfo,
        controllerAs: 'ctrl',
        templateUrl: 'http://localhost:8888/CODES/Feinstaub-webapp/html/dialoginfo.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose:true
      })
    }
  };


function DialogCtrlInfo ($mdDialog) {
    var self = this;
    self.cancel = function($event) {
      $mdDialog.cancel();
    };
  };




    app.controller('StadtCtrl', StadtCtrl);


  function StadtCtrl($mdDialog) {
    var self = this;

    self.openDialog = function($event) {
      $mdDialog.show({
        controller: DialogCtrlStadt,
        controllerAs: 'ctrl',
        templateUrl: 'http://localhost:8888/CODES/Feinstaub-webapp/html/dialogstadt.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose:true
      })
    }
  };

  function DialogCtrlStadt ($timeout, $q, $scope, $mdDialog,$http) {
    var self = this;
      
    document.getElementById("twitter").disabled = true;
    document.getElementById("werte").disabled = true;   



    self.places  = loadAll(); 
      
    self.querySearch = querySearch;

    self.cancel = function($event) {
      $mdDialog.cancel();
    };
    self.finish = function($event,val) {
    var getOptions = positions[val.loader];
    $mdDialog.hide();
    map.setView(new L.LatLng(getOptions.coordinates[0], getOptions.coordinates[1]), getOptions.zoom);  
        
        
//        TESTER SI DRUCK DANS LA BBOX?
        
        document.getElementById("hmPM10").disabled = false;
        document.getElementById("hmPM2.5").disabled = false;
        document.getElementById("hmtemp").disabled = false;
        document.getElementById("hmhumi").disabled = false;
        document.getElementById("hmdruck").disabled = false;
        
        
    var meanMinMax = getMeans(map);
        
    console.log(meanMinMax);
        
        console.log(val);
        
        texte = "In " + val.display + " ist der Wert für PM10 " + meanMinMax.PM10[0] +" %23luftdaten http://luftdaten.info";
                console.log(texte);
//
                document.getElementById("twitter").disabled = false;   
    
        
        
        
        
        
        var content1 = "<table id='results'><tr><th class ='titre'>Wert</th><th class ='titre'>PM10 &micro;g/m&sup3;</th><th class ='titre'>PM2.5 &micro;g/m&sup3;</th><th class ='titre'>Temp.</th><th class ='titre'>Feucht.</th><th class ='titre'>Druck hPa</th></tr><tr><td class='typ'>Mean</td><td class='val1'>";
        var content2 = "</td><td class='val2'>";
        var content3 = "</td><td class='val3'>";
        var content4 = "</td><td class='val4'>";
        var content5 = "</td><td class='val5'>";
        var content6 = "</td></tr><tr><td class='typ'>Min</td><td class='val6'>";
        var content7 = "</td><td class='val7'>";
        var content8 = "</td><td class='val8'>";
        var content9 = "</td><td class='val9'>";
        var content10 = "</td><td class='val10'>";
        var content11 = "</td></tr><tr><td class='typ'>Max</td><td class='val11'>";
        var content12 = "</td><td class='val12'>";
        var content13 = "</td><td class='val13'>";
        var content14 = "</td><td class='val14'>";
        var content15 = "</td><td class='val15'>";
        var content16 = "</tr></table>";

        
        var titre = val.display;
        
        
    
     var part1 = "<md-dialog aria-label='Werte'><md-toolbar><div class='md-toolbar-tools'><h2>";
        
        
        var part2 = "</h2><span flex></span><md-button class='md-icon-button' ng-click='ctrl.cancel()'><md-icon md-svg-src='images/ic_close_24px.svg' aria-label='Close dialog'></md-icon></md-button></div></md-toolbar><md-dialog-content ng-cloak><div class='md-dialog-content'>";
        
        var partfin = "</div></md-dialog-content></md-dialog>"
        
        
//                dynamictemplate = part1+ titre + part2 + "lorem ipsum" + partfin;

        
        dynamictemplate = part1+ titre + part2 + content1 + meanMinMax.PM10[0] + content2+meanMinMax.PM25[0] + content3+meanMinMax.Temp[0] + content4 + meanMinMax.Humi[0] + content5 + meanMinMax.Druck[0] + content6 +meanMinMax.PM10[1] + content7+meanMinMax.PM25[1] + content8+meanMinMax.Temp[1] + content9 + meanMinMax.Humi[1] + content10 + meanMinMax.Druck[1] + content11+ meanMinMax.PM10[2] + content12+meanMinMax.PM25[2] + content13+meanMinMax.Temp[2] + content14 + meanMinMax.Humi[2] + content15 + meanMinMax.Druck[2] +content16 + partfin;
        
//        REVOIR LE ZOOM POUR LE BBOX...
        
        
        
                        document.getElementById("werte").disabled = false;  
    
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
//            console.log(arrayPlaces);
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
        templateUrl: 'http://localhost:8888/CODES/Feinstaub-webapp/html/dialogsensor.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose:true
      })
    }
  };
    
    
    
   function DialogCtrlSensor ($timeout, $q, $scope, $mdDialog) {
    var self = this;
    
    document.getElementById("twitter").disabled = true;
    document.getElementById("werte").disabled = true;   



    self.sensors  = arraySensors;
    self.querySearch   = querySearch;

    self.cancel = function($event) {
      $mdDialog.cancel();
    };
    self.finish = function($event,val) {  
        
        console.log(val);
        
    $mdDialog.hide();
    map.setView(new L.LatLng(val.latitude, val.longitude), 17);  
        
        
//        REVOIR ICI
        
    var elementPM = hmhexaPM.filter(item => item.id == val.id);
    var elementTemp = hmhexatemp.filter(item => item.id == val.id);
    var elementDruck = hmhexadruck.filter(item => item.id == val.id);
    var titre ="";
    var content ="";
        
        console.log(elementPM);
      
        
////        METTRE UN AUTRE TESTER QUE SELECTOR AUSSI DANS L INDEX
//        
    if (elementPM.length != 0){
        
        document.getElementById("hmPM10").disabled = false;
        document.getElementById("hmPM2.5").disabled = false;
        document.getElementById("hmtemp").disabled = true;
        document.getElementById("hmhumi").disabled = true;
        document.getElementById("hmdruck").disabled = true;
        reload("hmPM10");  
        
        titre = "Feinstaub Sensor #"+ val.display;
        
        content = "<table id='results'><tr><th class ='titre'>PM10 &micro;g/m&sup3;</th><th class ='titre'>PM2.5 &micro;g/m&sup3;</th></tr><tr><td class='val1'>" +elementPM[0].data.PM10 +"</td><td class='val2'>" + elementPM[0].data.PM25 +"</td></tr></table></br><img src='https://api.luftdaten.info/grafana/render/dashboard-solo/db/single-sensor-view?panelId=1&amp;orgId=1&amp;width=250&amp;height=200&amp;tz=UTC%2B02%3A00&amp;var-node="+val.display+"'><br><br><img src='https://api.luftdaten.info/grafana/render/dashboard-solo/db/single-sensor-view?orgId=1&amp;panelId=2&amp;width=250&amp;height=200&amp;tz=UTC%2B02%3A00&amp;var-node="+val.display+"'>";
        
        
        if (selector =='hmPM10'){
            
            texte = "Mein Sensor hat den Wert " + elementPM[0].data.PM10 + " für PM10! %23luftdaten http://luftdaten.info";
                console.log(texte);
            
        };
        
        if (selector =='hmPM2.5'){
            
            texte = "Mein Sensor hat den Wert " + elementPM[0].data.PM25 + " für PM2.5! %23luftdaten http://luftdaten.info";
                console.log(texte);
            
        };
                
        
    };
        
    if (elementTemp.length != 0 && elementDruck.length == 0 ){
        
        
        document.getElementById("hmPM10").disabled = true;
        document.getElementById("hmPM2.5").disabled = true;
        document.getElementById("hmtemp").disabled = false;
        document.getElementById("hmhumi").disabled = false;
        document.getElementById("hmdruck").disabled = true;
        
        
        reload("hmtemp");
        
        titre = "Temp. + Feucht. Sensor #"+ val.display;
        
         content = "<table id='results'><tr><th class ='titre'>Temp.</th><th class ='titre'>Feucht.</th></tr><tr><td class='val1'>" +elementTemp[0].data.Temp +"</td><td class='val2'>" + elementTemp[0].data.Humi +"</td></tr></table>";
        
         if (selector =='hmtemp'){
            
            texte = "Mein Sensor hat den Wert " + elementTemp[0].data.Temp + " für die Temperatur! %23luftdaten http://luftdaten.info";
                console.log(texte);
            
        };
        
        if (selector =='hmhumi'){
            
            texte = "Mein Sensor hat den Wert " + elementTemp[0].data.Humi + " für die Feuchtigkeit! %23luftdaten http://luftdaten.info";
                console.log(texte);
            
        };
        
        
        
    };
        
    if (elementTemp.length != 0 && elementDruck.length != 0){
        
        document.getElementById("hmPM10").disabled = true;
        document.getElementById("hmPM2.5").disabled = true;
        document.getElementById("hmtemp").disabled = false;
        document.getElementById("hmhumi").disabled = false;
        document.getElementById("hmdruck").disabled = false;
        
        
        reload("hmTemp");
        
        titre = "Temp. + Feucht. + Druck Sensor #"+ val.display;
        
        content = "<table id='results'><tr><th class ='titre'>Temp.</th><th class ='titre'>Feucht.</th><th class ='titre'>Druck</th></tr><tr><td class='val1'>" +elementTemp[0].data.Temp +"</td><td class='val2'>" + elementTemp[0].data.Humi +"</td><td class='val3'>" + elementDruck[0].data.Druck + "</td></tr></table>";
    
        
        if (selector =='hmdruck'){
            
            texte = "Mein Sensor hat den Wert " + elementTemp[0].data.Druck + " für die Feuchtigkeit! %23luftdaten http://luftdaten.info";
                console.log(texte);
            
        };
        
        
    };


        


        document.getElementById("twitter").disabled = false; 
        
        
        
       var part1 = "<md-dialog aria-label='Werte'><md-toolbar><div class='md-toolbar-tools'><h2>";
        
        
        var part2 = "</h2><span flex></span><md-button class='md-icon-button' ng-click='ctrl.cancel()'><md-icon md-svg-src='images/ic_close_24px.svg' aria-label='Close dialog'></md-icon></md-button></div></md-toolbar><md-dialog-content ng-cloak><div class='md-dialog-content'>";
        
        var partfin = "</div></md-dialog-content></md-dialog>"
        
        
        dynamictemplate = part1+ titre + part2 + content + partfin;
        
        
        
        document.getElementById("werte").disabled = false;   

        
        
        
        
        
    };

    function querySearch (query) {
      return query ? self.sensors.filter( createFilterFor(query) ) : self.sensors;
    }

    function createFilterFor(query) {
      var stringQuery = query.toString();

      return function filterFn(sensor) {
        return (sensor.display.indexOf(stringQuery) === 0);
      };

    }
  } ; 
    




    
function twitter(txt){    
    window.open('https://twitter.com/intent/tweet?text='+txt+'&source=webclient');
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
    
    

//    console.log(inboundsPM);
//    console.log(inboundstemp);
//    console.log(inboundsdruck);

    
    
       inboundsPM.forEach(function (item) {
           arrayPM10.push(parseFloat(item.data.PM10));
           arrayPM25.push(parseFloat(item.data.PM25));
       }); 
    
      inboundstemp.forEach(function (item) {
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
    
    console.log(arrayTemp);
        console.log(arrayHumi);

    
    
    return {"PM10":[meanPM10,minPM10,maxPM10],"PM25":[meanPM25,minPM25,maxPM25],"Temp":[meanTemp,minTemp,maxTemp],"Humi":[meanHumi,minHumi,maxHumi],"Druck":[meanDruck,minDruck,maxDruck]};
    
    
};
