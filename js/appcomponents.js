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
        templateUrl: 'html/dialoginfo.tmpl.html',
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
        templateUrl: 'html/dialogstadt.tmpl.html',
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
        
                if(val != null){

        console.log(val);
        
    var getOptions = positions[val.loader];
                    
    console.log(getOptions);
                    console.log(getOptions.bbox);
        
    $mdDialog.hide();
                    
    map.fitBounds(getOptions.bbox);                  
                
        document.getElementById("hmPM10").disabled = false;
        document.getElementById("hmPM2.5").disabled = false;
        document.getElementById("hmtemp").disabled = false;
        document.getElementById("hmhumi").disabled = false;
        
        
    var meanMinMax = getMeans(getOptions.bbox);
        
    console.log(meanMinMax);
        
        console.log(val);
        
//                    AJOUTER TOUTES LES POSSIBILIES ICI
                    
                    
        texte = "In " + val.display + " sind die Mittelwerte folgende: PM10= " + meanMinMax.PM10[0] +" und PM2.5= "+ meanMinMax.PM25[0] + " %23luftdaten http://luftdaten.info";
                console.log(texte);
//
                document.getElementById("twitter").disabled = false;   
    
        
        var content1 = "<table id='results'><tr><th class ='titre'>Wert</th><th class ='titre'>PM10<br>&micro;g/m&sup3;</th><th class ='titre'>PM2.5<br>&micro;g/m&sup3;</th><th class ='titre'>Temp.<br>&#8451;</th><th class ='titre'>Feucht.<br>%</th><th class ='titre'>Druck<br>hPa</th></tr><tr><td class='typ'>Mean</td><td class='val1'>";
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
        
         
        var content1bis = "<table id='results'><tr><th class ='titre'>Wert</th><th class ='titre'>PM10<br>&micro;g/m&sup3;</th><th class ='titre'>PM2.5<br>&micro;g/m&sup3;</th><th class ='titre'>Temp.<br>&#8451;</th><th class ='titre'>Feucht.<br>%</th></tr><tr><td class='typ'>Mean</td><td class='val1'>";
        
        var titre = val.display;
        
        var part1 = "<md-dialog aria-label='Werte'><md-toolbar><div class='md-toolbar-tools'><h2>";
        
        
        var part2 = "</h2><span flex></span><md-button class='md-icon-button' ng-click='ctrl.cancel()'><md-icon md-svg-src='images/ic_close_24px.svg' aria-label='Close dialog'></md-icon></md-button></div></md-toolbar><md-dialog-content ng-cloak><div class='md-dialog-content'>";
        
        var partfin = "</div></md-dialog-content></md-dialog>"
        
                
                console.log(meanMinMax);

        if(Number.isInteger(meanMinMax.Druck[1]) && Number.isInteger(meanMinMax.Humi[1])){

            
        document.getElementById("hmdruck").disabled = false;
        document.getElementById("hmhumi").disabled = false;

        
        dynamictemplate = part1+ titre + part2 + content1 + meanMinMax.PM10[0] + content2+meanMinMax.PM25[0] + content3+meanMinMax.Temp[0] + content4 + meanMinMax.Humi[0] + content5 + meanMinMax.Druck[0] + content6 +meanMinMax.PM10[1] + content7+meanMinMax.PM25[1] + content8+meanMinMax.Temp[1] + content9 + meanMinMax.Humi[1] + content10 + meanMinMax.Druck[1] + content11+ meanMinMax.PM10[2] + content12+meanMinMax.PM25[2] + content13+meanMinMax.Temp[2] + content14 + meanMinMax.Humi[2] + content15 + meanMinMax.Druck[2] +content16 + partfin;
                    
        };
                                        
                                
        if(!Number.isInteger(meanMinMax.Druck[1]) && Number.isInteger(meanMinMax.Humi[1])){

            
            document.getElementById("hmdruck").disabled = true;
            document.getElementById("hmhumi").disabled = false;

            
            dynamictemplate = part1+ titre + part2 + content1bis + meanMinMax.PM10[0] + content2+meanMinMax.PM25[0] + content3+meanMinMax.Temp[0] + content4 + meanMinMax.Humi[0] + content6 +meanMinMax.PM10[1] + content7+meanMinMax.PM25[1] + content8+meanMinMax.Temp[1] + content9 + meanMinMax.Humi[1] + content11+ meanMinMax.PM10[2] + content12+meanMinMax.PM25[2] + content13+meanMinMax.Temp[2] + content14 + meanMinMax.Humi[2] +content16 + partfin; 
        };
                    
                
        if(Number.isInteger(meanMinMax.Druck[1]) && !Number.isInteger(meanMinMax.Humi[1])){

            
            document.getElementById("hmdruck").disabled = false;
            document.getElementById("hmhumi").disabled = true;
                         
                         
                dynamictemplate = part1+ titre + part2 + content1 + meanMinMax.PM10[0] + content2+meanMinMax.PM25[0] + content3+meanMinMax.Temp[0] + content5 + meanMinMax.Druck[0] + content6 +meanMinMax.PM10[1] + content7+meanMinMax.PM25[1] + content8+meanMinMax.Temp[1] + content10 + meanMinMax.Druck[1] + content11+ meanMinMax.PM10[2] + content12+meanMinMax.PM25[2] + content13+meanMinMax.Temp[2] + content15 + meanMinMax.Druck[2] +content16 + partfin;         
                         
        };
                    
        
                        document.getElementById("werte").disabled = false;  
    
    };

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
            
            
            
               if( localStorage.getItem('mySensor')!= null) {
                
          console.log('data');
                   
                   
               
                   
                   var sensorID = localStorage.getItem('mySensor');
            
            var sensorStored = arraySensors.find(function (i) { return i.id == sensorID; });
                   
            console.log(sensorStored);            
            
            map.setView(new L.LatLng(sensorStored.latitude, sensorStored.longitude), 17);  
                
    var elementPM = hmhexaPM.filter(item => item.id == sensorStored.id);
    var elementTemp = hmhexatemp.filter(item => item.id == sensorStored.id);
    var elementHumi = hmhexahumi.filter(item => item.id == sensorStored.id);
    var elementDruck = hmhexadruck.filter(item => item.id == sensorStored.id);
    
    var titre ="";
    var content ="";
              
    var dialogDiv  = document.getElementsByClassName("map"); 
    var rect = dialogDiv[0].getBoundingClientRect(); 
    
    var widthGraph = parseInt(rect.width);
                
    if (elementPM.length != 0){
        
        document.getElementById("hmPM10").disabled = false;
        document.getElementById("hmPM2.5").disabled = false;
        document.getElementById("hmtemp").disabled = true;
        document.getElementById("hmhumi").disabled = true;
        document.getElementById("hmdruck").disabled = true;
        
        
        reload("hmPM10");  
        
        titre = "Feinstaub Sensor #"+ sensorStored.display;
        
        content = "<table id='results'><tr><th class ='titre'>PM10<br>&micro;g/m&sup3;</th><th class ='titre'>PM2.5<br>&micro;g/m&sup3;</th></tr><tr><td class='val1'>" +elementPM[0].data.PM10 +"</td><td class='val2'>" + elementPM[0].data.PM25 +"</td></tr></table></br><img src='https://api.luftdaten.info/grafana/render/dashboard-solo/db/single-sensor-view?panelId=1&amp;orgId=1&amp;width="+ widthGraph +"&amp;height=200&amp;tz=UTC%2B02%3A00&amp;var-node="+sensorStored.display+"'><br><br><img src='https://api.luftdaten.info/grafana/render/dashboard-solo/db/single-sensor-view?orgId=1&amp;panelId=2&amp;width="+ widthGraph +"&amp;height=200&amp;tz=UTC%2B02%3A00&amp;var-node="+sensorStored.display+"'>";
        
                    
    texte = "Mein Sensor zeigt gerade die Werte " + elementPM[0].data.PM10 + " μg/m³ für PM10 und "  + elementPM[0].data.PM25 + " μg/m³ für PM2.5! %23luftdaten http://luftdaten.info";
                console.log(texte);
                        
    }else{
        document.getElementById("hmPM10").disabled = true;
        document.getElementById("hmPM2.5").disabled = true;
    };
        
    if (elementTemp.length != 0 && elementHumi.length != 0 && elementDruck.length == 0 ){
    
        document.getElementById("hmtemp").disabled = false;
        document.getElementById("hmhumi").disabled = false;
        document.getElementById("hmdruck").disabled = true;
        
        reload("hmtemp");
        
        titre = "Temp. + Feucht. Sensor #"+ sensorStored.display;
        
         content = "<table id='results'><tr><th class ='titre'>Temp.<br>&#8451;</th><th class ='titre'>Feucht.<br>%</th></tr><tr><td class='val1'>" +elementTemp[0].data.Temp +"</td><td class='val2'>" + elementHumi[0].data.Humi +"</td></tr></table>";
        
        
        texte = "Mein Sensor hat die Werte " + elementTemp[0].data.Temp + "°C für die Temperatur und " + elementHumi[0].data.Humi + " percent für die Feuchtigkeit! %23luftdaten http://luftdaten.info";
                console.log(texte);
            
    };
                   
        
     if (elementTemp.length != 0 && elementHumi.length == 0 && elementDruck.length != 0 ){
    
        document.getElementById("hmtemp").disabled = false;
        document.getElementById("hmhumi").disabled = true;
        document.getElementById("hmdruck").disabled = false;
        
        reload("hmtemp");
        
        titre = "Temp. + Druck Sensor #"+ sensorStored.display;
        
         content = "<table id='results'><tr><th class ='titre'>Temp.<br>&#8451;</th><th class ='titre'>Druck<br>hPa</th></tr><tr><td class='val1'>" +elementTemp[0].data.Temp +"</td><td class='val2'>" + parseInt(elementDruck[0].data.Press/100) +"</td></tr></table>";
        
        
        texte = "Mein Sensor hat die Werte " + elementTemp[0].data.Temp + "°C für die Temperatur und " + parseInt(elementDruck[0].data.Press/100) + " hPa für die Feuchtigkeit! %23luftdaten http://luftdaten.info";
                console.log(texte);
            
    };
                   
                           
    if (elementTemp.length != 0 && elementHumi.length != 0 && elementDruck.length != 0){
     
        document.getElementById("hmtemp").disabled = false;
        document.getElementById("hmhumi").disabled = false;
        document.getElementById("hmdruck").disabled = false;
        
        reload("hmtemp");

        titre = "Temp. + Feucht. + Druck Sensor #"+ sensorStored.display;
        
        content = "<table id='results'><tr><th class ='titre'>Temp.<br>&#8451;</th><th class ='titre'>Feucht.<br>%</th><th class ='titre'>Druck<br>hPa</th></tr><tr><td class='val1'>" +elementTemp[0].data.Temp +"</td><td class='val2'>" + elementHumi[0].data.Humi +"</td><td class='val3'>" + parseInt(elementDruck[0].data.Press/100) + "</td></tr></table>";
    
        texte = "Mein Sensor hat die Werte " + elementTemp[0].data.Temp + "°C für die Temp., " + elementHumi[0].data.Humi + " percent für die Feucht. und " + parseInt(elementDruck[0].data.Press/100) + " hPa für den Druck! %23luftdaten http://luftdaten.info";
        console.log(texte);
         
        
    };

        document.getElementById("twitter").disabled = false; 
        
       var part1 = "<md-dialog aria-label='Werte'><md-toolbar><div class='md-toolbar-tools'><h2>";
        var part2 = "</h2><span flex></span><md-button class='md-icon-button' ng-click='ctrl.cancel()'><md-icon md-svg-src='images/ic_close_24px.svg' aria-label='Close dialog'></md-icon></md-button></div></md-toolbar><md-dialog-content ng-cloak><div class='md-dialog-content'>";

        var partfin = "</div></md-dialog-content></md-dialog>"
        
        dynamictemplate = part1+ titre + part2 + content + partfin;
        document.getElementById("werte").disabled = false;   
                   
    
      }else{
          
          console.log('no data');     
      $mdDialog.show({
        controller: DialogCtrlSensor,
        controllerAs: 'ctrl',
        templateUrl: 'html/dialogsensor.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose:true
      })
      
        };
      
    };          
    
  };
    
    
    
   function DialogCtrlSensor ($timeout, $q, $scope, $mdDialog) {
              
    var self = this;
       
           
    document.getElementById("twitter").disabled = true;
    document.getElementById("werte").disabled = true;   
    self.sensors  = arraySensors;
    self.querySearch   = querySearch;
    var arrayID = arraySensors.map(function(item) {return item.display});

       
    self.cancel = function($event) {
      $mdDialog.cancel();
    };
    self.finish = function($event,val) {  
        
        if(val != null){
    console.log(val);
        
    $mdDialog.hide();
    map.setView(new L.LatLng(val.latitude, val.longitude), 17);  
            
            localStorage.setItem('mySensor', val.id);
        
        
//        REVOIR ICI
        
    var elementPM = hmhexaPM.filter(item => item.id == val.id);
    var elementTemp = hmhexatemp.filter(item => item.id == val.id);
    var elementHumi = hmhexahumi.filter(item => item.id == val.id);
    var elementDruck = hmhexadruck.filter(item => item.id == val.id);
    
//    console.log(elementPM);
//    console.log(elementTemp);
//    console.log(elementDruck);
    
    var titre ="";
    var content ="";
              
//    var dialogDiv  = document.getElementsByClassName("md-dialog-content"); 
//    var rect = dialogDiv[0].getBoundingClientRect(); 
            
            var dialogDiv  = document.getElementsByClassName("map"); 
    var rect = dialogDiv[0].getBoundingClientRect(); 
            
    
    var widthGraph = parseInt(rect.width);
                
    if (elementPM.length != 0){
        
        document.getElementById("hmPM10").disabled = false;
        document.getElementById("hmPM2.5").disabled = false;
        document.getElementById("hmtemp").disabled = true;
        document.getElementById("hmhumi").disabled = true;
        document.getElementById("hmdruck").disabled = true;

        
        reload("hmPM10");  
        
        titre = "Feinstaub Sensor #"+ val.display;
        
        content = "<table id='results'><tr><th class ='titre'>PM10<br>&micro;g/m&sup3;</th><th class ='titre'>PM2.5<br>&micro;g/m&sup3;</th></tr><tr><td class='val1'>" +elementPM[0].data.PM10 +"</td><td class='val2'>" + elementPM[0].data.PM25 +"</td></tr></table></br><img src='https://api.luftdaten.info/grafana/render/dashboard-solo/db/single-sensor-view?panelId=1&amp;orgId=1&amp;width="+ widthGraph +"&amp;height=200&amp;tz=UTC%2B02%3A00&amp;var-node="+val.display+"'><br><br><img src='https://api.luftdaten.info/grafana/render/dashboard-solo/db/single-sensor-view?orgId=1&amp;panelId=2&amp;width="+ widthGraph +"&amp;height=200&amp;tz=UTC%2B02%3A00&amp;var-node="+val.display+"'>";
        
                    
    texte = "Mein Sensor zeigt gerade die Werte " + elementPM[0].data.PM10 + " μg/m³ für PM10 und "  + elementPM[0].data.PM25 + " μg/m³ für PM2.5! %23luftdaten http://luftdaten.info";
                console.log(texte);
                
        
//        METTRE LE RELOAD DANS LE IF + METTRE TOUTES LES POSSIBILITES => PAR DEFAUT REPASSER SUR PM10 OU TEMP SI SENSOR TYPE DIFFERENT
        
    }else{
         document.getElementById("hmPM10").disabled = true;
        document.getElementById("hmPM2.5").disabled = true;
          
    };
        
    if (elementTemp.length != 0 && elementHumi.length != 0 && elementDruck.length == 0 ){
    
       
        document.getElementById("hmtemp").disabled = false;
        document.getElementById("hmhumi").disabled = false;
        document.getElementById("hmdruck").disabled = true;
        
        reload("hmtemp");
        
        titre = "Temp. + Feucht. Sensor #"+ val.display;
        
         content = "<table id='results'><tr><th class ='titre'>Temp.<br>&#8451;</th><th class ='titre'>Feucht.<br>%</th></tr><tr><td class='val1'>" +elementTemp[0].data.Temp +"</td><td class='val2'>" + elementHumi[0].data.Humi +"</td></tr></table>";
        
        
        texte = "Mein Sensor hat die Werte " + elementTemp[0].data.Temp + "°C für die Temperatur und " + elementHumi[0].data.Humi + " percent für die Feuchtigkeit! %23luftdaten http://luftdaten.info";
                console.log(texte);
            
    };
        
    if (elementTemp.length != 0 && elementHumi.length != 0 && elementDruck.length != 0){
        
        document.getElementById("hmtemp").disabled = false;
        document.getElementById("hmhumi").disabled = false;
        document.getElementById("hmdruck").disabled = false;
        
        reload("hmtemp");

        titre = "Temp. + Feucht. + Druck Sensor #"+ val.display;
        
        content = "<table id='results'><tr><th class ='titre'>Temp.<br>&#8451;</th><th class ='titre'>Feucht.<br>%</th><th class ='titre'>Druck<br>hPa</th></tr><tr><td class='val1'>" +elementTemp[0].data.Temp +"</td><td class='val2'>" + elementHumi[0].data.Humi +"</td><td class='val3'>" + parseInt(elementDruck[0].data.Press/100) + "</td></tr></table>";
    
        texte = "Mein Sensor hat die Werte " + elementTemp[0].data.Temp + "°C für die Temp., " + elementHumi[0].data.Humi + " percent für die Feucht. und " + parseInt(elementDruck[0].data.Press/100) + " hPa für den Druck! %23luftdaten http://luftdaten.info";
        console.log(texte);
        
    };
            
            if (elementTemp.length != 0 && elementHumi.length == 0 && elementDruck.length != 0){
        
        document.getElementById("hmtemp").disabled = false;
        document.getElementById("hmhumi").disabled = true;
        document.getElementById("hmdruck").disabled = false;
        
        reload("hmtemp");

        titre = "Temp. + Druck Sensor #"+ val.display;
        
        content = "<table id='results'><tr><th class ='titre'>Temp.<br>&#8451;</th><th class ='titre'>Druck<br>hPa</th></tr><tr><td class='val1'>" +elementTemp[0].data.Temp +"</td><td class='val3'>" + parseInt(elementDruck[0].data.Press/100) + "</td></tr></table>";
    
        texte = "Mein Sensor hat die Werte " + elementTemp[0].data.Temp + "°C für die Temp. und " +  parseInt(elementDruck[0].data.Press/100) + " hPa für den Druck! %23luftdaten http://luftdaten.info";
        console.log(texte);
        
    };
            
        document.getElementById("twitter").disabled = false; 
        
       var part1 = "<md-dialog aria-label='Werte'><md-toolbar><div class='md-toolbar-tools'><h2>";
        var part2 = "</h2><span flex></span><md-button class='md-icon-button' ng-click='ctrl.cancel()'><md-icon md-svg-src='images/ic_close_24px.svg' aria-label='Close dialog'></md-icon></md-button></div></md-toolbar><md-dialog-content ng-cloak><div class='md-dialog-content'>";

        var partfin = "</div></md-dialog-content></md-dialog>"
        
        dynamictemplate = part1+ titre + part2 + content + partfin;
        document.getElementById("werte").disabled = false;   
    };
   };
    function querySearch (query) {
        
      return query ? self.sensors.filter( createFilterFor(query) ) : self.sensors;
    }

    function createFilterFor(query) {
      var stringQuery = query.toString(); 
        var len = stringQuery.length;
        
        if (arrayID.indexOf(stringQuery) === -1){
            return function filterFn(sensor) {return (sensor.display.indexOf(stringQuery) === 0)};
        }else{
            return function filterFn(sensor) {return (sensor.display.indexOf(stringQuery) === 0 && sensor.display.length === len)};      
    };
    };
  }; 
    
    
function twitter(txt){    
    window.open('https://twitter.com/intent/tweet?text='+txt+'&source=webclient');
};
    
    
function getMeans(bounds){
    
    console.log(bounds);
    
  var bbox = L.latLngBounds(bounds);
    
    console.log(bbox);


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
    
    
    var inboundshumi = hmhexahumi.filter(function(item){
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
    
    
    
    arrayPM10 = inboundsPM.map(function(item){return parseFloat(item.data.PM10)});
    arrayPM25 = inboundsPM.map(function(item){return parseFloat(item.data.PM25)});
    arrayTemp = inboundstemp.map(function(item){return parseFloat(item.data.Temp)});
    arrayHumi = inboundshumi.map(function(item){return parseFloat(item.data.Humi)});
    arrayDruck = inboundsdruck.map(function(item){return parseFloat(item.data.Press)});
    
    
    var meanPM10 = parseInt(d3.mean(arrayPM10));
    var minPM10 = d3.min(arrayPM10);
    var maxPM10 = d3.max(arrayPM10);

    var meanPM25 = parseInt(d3.mean(arrayPM25));
    var minPM25 = d3.min(arrayPM25);
    var maxPM25 = d3.max(arrayPM25);

    var meanTemp = parseInt(d3.mean(arrayTemp));
    var minTemp = d3.min(arrayTemp);
    var maxTemp = d3.max(arrayTemp);

    var meanHumi = parseInt(d3.mean(arrayHumi));
    var minHumi = d3.min(arrayHumi);
    var maxHumi = d3.max(arrayHumi);

    var meanDruck = parseInt(d3.mean(arrayDruck));
    var minDruck = d3.min(arrayDruck);
    var maxDruck = d3.max(arrayDruck);

    
    return {"PM10":[meanPM10,minPM10,maxPM10],"PM25":[meanPM25,minPM25,maxPM25],"Temp":[meanTemp,minTemp,maxTemp],"Humi":[meanHumi,minHumi,maxHumi],"Druck":[parseInt(meanDruck/100),parseInt(minDruck/100),parseInt(maxDruck/100)]};
    
};
