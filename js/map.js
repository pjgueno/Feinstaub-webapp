    var hexagonheatmap;
    var hmhexaPM;
    var hmhexatemp;
    var hmhexahumi;
    var hmhexadruck;
    var arraySensors;
    var arraySensorsHumi;
    var arraySensorsDruck;

    var map;
    var tiles;

    var selector = "hmPM10";

    var dynamictemplate = "";

    var options = {
                valueDomain: [20, 40, 60, 100, 500],
                colorRange: ['#00796B', '#F9A825', '#E65100', '#DD2C00', '#960084']	
                };


   var div = d3.select("body").append("div")
    .attr("id", "tooltip")
    .style("display", "none");


    window.onload=function(){
        
        map.setView([50.495171, 9.730827], 6);
        
    hexagonheatmap = L.hexbinLayer(options).addTo(map);
        
       d3.queue()
    .defer(d3.json, "https://api.luftdaten.info/static/v2/data.dust.min.json")
    .defer(d3.json, "https://api.luftdaten.info/static/v2/data.temp.min.json")
    .awaitAll(ready); 
                   
   d3.interval(function(){ 
    
                   d3.selectAll('path.hexbin-hexagon').remove();

         d3.queue()
    .defer(d3.json, "https://api.luftdaten.info/static/v2/data.dust.min.json")
    .defer(d3.json, "https://api.luftdaten.info/static/v2/data.temp.min.json")
    .awaitAll(ready); 
            
            console.log('reload')
           
    }, 300000);
//            }, 5000);

 
        map.on('moveend', function() {
                   
            
//            ON GARDE LES BOUTONS ACTIFS
            
//            document.getElementById("twitter").disabled = true; 
//            document.getElementById("werte").disabled = true;              
//            
            hexagonheatmap._zoomChange();
            
//            CHECK IF TYPE OF SENSOR IN NEW ZOOM
            
       var bbox = map.getBounds();
            
//            console.log(bbox);

            var inboundsPM = hmhexaPM.filter(function(item){
            var position = new L.LatLng(item.latitude, item.longitude);
            if (bbox.contains(position) == true){
                document.getElementById("hmPM10").disabled = false;
                document.getElementById("hmPM2.5").disabled = false;            
            };    
            });


            var inboundstemp = hmhexatemp.filter(function(item){
            var position = new L.LatLng(item.latitude, item.longitude);
            if (bbox.contains(position) == true){
                document.getElementById("hmtemp").disabled = false;
               };    
            });

            
            var inboundshumi = hmhexahumi.filter(function(item){
            var position = new L.LatLng(item.latitude, item.longitude);
            if (bbox.contains(position) == true){
                document.getElementById("hmhumi").disabled = false;
            };    
            });
            
            

            var inboundsdruck = hmhexadruck.filter(function(item){
            var position = new L.LatLng(item.latitude, item.longitude);
            if (bbox.contains(position) == true){
                document.getElementById("hmdruck").disabled = false;
            };    
            });
    
        });
        
        map.on('move', function() { 
        div.style("display", "none");
        });

        map.on('click', function() { 
        div.style("display", "none");
        });
       
//        
//        console.log(localStorage.getItem('mySensor'));
//        console.log(typeof localStorage.getItem('mySensor'));
        
    };
    

 map = L.map('map',{ zoomControl:false });
        map.options.minZoom = 2;


    tiles = L.tileLayer('https://{s}.tiles.madavi.de/{z}/{x}/{y}.png',{
				attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
				maxZoom: 18}).addTo(map);
    
    
  function ready(error,data) {
  if (error) throw error;

      hmhexaPM = data[0].map(function(item){return {"data":{"PM10": parseInt(getRightValue(item.sensordatavalues,"P1")) , "PM25":parseInt( getRightValue(item.sensordatavalues,"P2"))}, "id":item.sensor.id, "latitude":item.location.latitude,"longitude":item.location.longitude}});
      
      
      hmhexatemp = data[1].map(function(item){return {"data":{"Temp": parseInt(getRightValue(item.sensordatavalues,"temperature"))}, "id":item.sensor.id, "latitude":item.location.latitude,"longitude":item.location.longitude}});

      
      hmhexahumi = data[1].reduce(function(filtered, item) {
          
          if (item.sensor.sensor_type.name == "BME280" || item.sensor.sensor_type.name == "DHT22") {
              
              filtered.push({"data":{"Humi":parseInt(getRightValue(item.sensordatavalues,"humidity"))}, "id":item.sensor.id, "latitude":item.location.latitude,"longitude":item.location.longitude})}
              return filtered;
            }, []);
                
//            console.log(hmhexahumi);

      
      
       hmhexadruck = data[1].reduce(function(filtered, item) {
                             
           
//           if (item.sensordatavalues.length == 3) {
           
                 if (item.sensor.sensor_type.name == "BME280" || item.sensor.sensor_type.name == "BMP180" || item.sensor.sensor_type.name == "BMP280" ) {
                         
                 filtered.push({"data":{"Press":parseInt(getRightValue(item.sensordatavalues,"pressure_at_sealevel"))}, "id":item.sensor.id, "latitude":item.location.latitude,"longitude":item.location.longitude})}
              return filtered;
            }, []);
      
//      console.log(hmhexadruck);
      
      
      var tab1 = data[0].map(function(item){return {"id":item.sensor.id, "display":item.sensor.id.toString(), "latitude":item.location.latitude,"longitude":item.location.longitude,"type":"PM"}});
      var tab2 = data[1].map(function(item){return {"id":item.sensor.id, "display":item.sensor.id.toString(), "latitude":item.location.latitude,"longitude":item.location.longitude,"type":"THD"}});
       
     
      arraySensors = tab1.concat(tab2);
      arraySensors.sort(function(a,b) {return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0);});
      
      
      
      
        arraySensorsHumi = data[1].reduce(function(filtered, item) {
            
            
            if (item.sensor.sensor_type.name == "BME280" || item.sensor.sensor_type.name == "DHT22") {
              
              
             filtered.push({"id":item.sensor.id, "display":item.sensor.id.toString(), "latitude":item.location.latitude,"longitude":item.location.longitude,"type":"H"});
          }
          return filtered;
        }, []);
      
      arraySensorsHumi.sort(function(a,b) {return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0);});
      
      
        arraySensorsDruck = data[1].reduce(function(filtered, item) {
            
            
//          if (item.sensordatavalues.length == 3) {
              
              if (item.sensor.sensor_type.name == "BME280" || item.sensor.sensor_type.name == "BMP180" || item.sensor.sensor_type.name == "BMP280" ) {
              
              
             filtered.push({"id":item.sensor.id, "display":item.sensor.id.toString(), "latitude":item.location.latitude,"longitude":item.location.longitude,"type":"P"});
          }
          return filtered;
        }, []);
      
      arraySensorsDruck.sort(function(a,b) {return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0);});

      if(selector == "hmPM10" || selector == "hmPM2.5") {makeHexagonmap(hmhexaPM);};      
      if(selector == "hmtemp"){makeHexagonmap(hmhexatemp);};
      if(selector == "hmhumi"){makeHexagonmap(hmhexahumi);};
      if(selector == "hmdruck" ){makeHexagonmap(hmhexadruck);};
        
 };      
    
    
        
function makeHexagonmap(data){

    
    
    if(selector == "hmPM10" || selector == "hmPM2.5" ){
    
    
     options = {
                valueDomain: [20, 40, 60, 100, 500],
                colorRange: ['#00796B', '#F9A825', '#E65100', '#DD2C00', '#960084']	
                };

    };
    

        if(selector == "hmtemp" ){

    
      options = {
                valueDomain: [-20, 0, 50],
                colorRange: ['#0022FE', '#FFFFFF', '#FF0000']	
            };
            
        };
    
    
            if(selector == "hmhumi" ){

             options = {
                valueDomain: [0,100],
		      colorRange: ['#FFFFFF', '#0000FF']	
            };
            
            };
    
    
    
     if(selector == "hmdruck" ){

             options = {
               valueDomain: [92600, 101300, 110000],
                colorRange: ['#FF0000', '#FE9E01', '#00796B']	
            };

            };
    

            hexagonheatmap.initialize(options);
            hexagonheatmap.data(data);                   

};
    
    
    

        function reload(val){
            div.style("display", "none");
            d3.selectAll('path.hexbin-hexagon').remove();
            
            selector = val;
    
            if(selector == "hmPM10" || selector == "hmPM2.5" ){
                
            document.getElementById('legenddruck').style.visibility='hidden';
            document.getElementById('legendtemp').style.visibility='hidden';
            document.getElementById('legendhumi').style.visibility='hidden';
            document.getElementById('legendpm').style.visibility='visible';
                
             options = {
            valueDomain: [20, 40, 60, 100, 500],
            colorRange: ['#00796B', '#F9A825', '#E65100', '#DD2C00', '#960084']	
            };
                hexagonheatmap.initialize(options);
                hexagonheatmap.data(hmhexaPM); 
            };
    
        if(selector == "hmtemp" ){
            
            document.getElementById('legenddruck').style.visibility='hidden';
            document.getElementById('legendtemp').style.visibility='visible';
            document.getElementById('legendhumi').style.visibility='hidden';
            document.getElementById('legendpm').style.visibility='hidden';            
            
         options = {
                valueDomain: [-20, 0, 50],
                colorRange: ['#0022FE', '#FFFFFF', '#FF0000']	
            };
            
             hexagonheatmap.initialize(options);
                hexagonheatmap.data(hmhexatemp);
        };
    
        if(selector == "hmhumi" ){
            
            document.getElementById('legenddruck').style.visibility='hidden';
            document.getElementById('legendtemp').style.visibility='hidden';
            document.getElementById('legendhumi').style.visibility='visible';
            document.getElementById('legendpm').style.visibility='hidden';            
            
            
             options = {
                valueDomain: [0,100],
		      colorRange: ['#FFFFFF', '#0000FF']	
            };
            
             hexagonheatmap.initialize(options);
                hexagonheatmap.data(hmhexahumi);
            };
    
     if(selector == "hmdruck" ){
         
            document.getElementById('legenddruck').style.visibility='visible';
            document.getElementById('legendtemp').style.visibility='hidden';
            document.getElementById('legendhumi').style.visibility='hidden';
            document.getElementById('legendpm').style.visibility='hidden';
         
         
             options = {
               valueDomain: [90000, 101300, 110000],
                colorRange: ['#FF0000', '#FE9E01', '#00796B']	
            };
         
         
               hexagonheatmap.initialize(options);
                hexagonheatmap.data(hmhexadruck);  
            };            
    };
    
    function getRightValue(array,type){
    var value;
    array.forEach(function(item){  
       if (item.value_type == type){value = item.value;};       
    });        
    return value;
};
    