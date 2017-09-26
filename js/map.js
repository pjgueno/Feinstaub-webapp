    var texte;
    var hmhexaPM =[];
    var hmhexatemp =[];
    var hmhexadruck =[];

    
    var map;
    var tiles;

    var selector = "hmPM10";
    var hexahmtest = false;
    var arraySensors = [];
    var arraySensorsDruck = [];
           
    var mitDruck = false;

    var dynamictemplate = "";

    
    window.onload=function(){
        
        map = L.map('map',{ zoomControl:false }).setView([48.8, 9.2 ], 6);
        map.options.minZoom = 2;


    tiles = L.tileLayer('https://{s}.tiles.madavi.de/{z}/{x}/{y}.png',{
				attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
				maxZoom: 18}).addTo(map);
          
        
        
        
        
       d3.queue()
    .defer(d3.json, "https://api.luftdaten.info/static/v2/data.dust.min.json")
    .defer(d3.json, "https://api.luftdaten.info/static/v2/data.temp.min.json")
    .awaitAll(ready); 
                   
   d3.interval(function(){ 
    
         d3.queue()
    .defer(d3.json, "https://api.luftdaten.info/static/v2/data.dust.min.json")
    .defer(d3.json, "https://api.luftdaten.info/static/v2/data.temp.min.json")
    .awaitAll(ready); 
            
            console.log('reload')
           
    }, 300000);
 
        map.on('moveend', function() { 
            document.getElementById("twitter").disabled = true; 
            document.getElementById("werte").disabled = true;   


    if(hexahmtest == true){hexagonheatmap._zoomChange();}; 

});
    

map.on('zoomend', function() {
    document.getElementById("twitter").disabled = true; 
    document.getElementById("werte").disabled = true;   

if(hexahmtest == true){hexagonheatmap._zoomChange();};    
});
        
      
        
        
    };
    
    
    
  function ready(error,data) {
  if (error) throw error;
     
     
         data[0].forEach(function(item){
            
               var objecthexa ={"data":{"PM10": parseInt(getRightValue(item.sensordatavalues,"P1")) , "PM25":parseInt( getRightValue(item.sensordatavalues,"P2"))}, "id":item.sensor.id, "latitude":item.location.latitude,"longitude":item.location.longitude};
                
                var objectsensor = {"id":item.sensor.id, "display":item.sensor.id.toString(), "latitude":item.location.latitude,"longitude":item.location.longitude,"type":"PM"};
                                
            hmhexaPM.push(objecthexa); 
            arraySensors.push(objectsensor);
            arraySensors.sort(function(a,b) {return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0);} );

            });
     
     
     
     data[1].forEach(function(item){
            
               var objecthexa ={"data":{"Temp": parseInt(getRightValue(item.sensordatavalues,"temperature")) , "Humi": parseInt(getRightValue(item.sensordatavalues,"humidity"))}, "id":item.sensor.id, "latitude":item.location.latitude,"longitude":item.location.longitude};
                
                var objectsensor = {"id":item.sensor.id, "display":item.sensor.id.toString(), "latitude":item.location.latitude,"longitude":item.location.longitude,"type":"TH"};
                                
            hmhexatemp.push(objecthexa);
            arraySensors.push(objectsensor);
            arraySensors.sort(function(a,b) {return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0);} );

            });
      
      
      
      data[1].forEach(function(item){
            
          
          if(item.sensordatavalues.length == 3){
              
               var objecthexa ={"data":{"Press":parseInt(getRightValue(item.sensordatavalues,"pressure"))}, "id":item.sensor.id, "latitude":item.location.latitude,"longitude":item.location.longitude};
              
              var objectsensor = {"id":item.sensor.id, "display":item.sensor.id.toString(), "latitude":item.location.latitude,"longitude":item.location.longitude,"type":"P"};
                          
              hmhexadruck.push(objecthexa);
              arraySensorsDruck.push(objectsensor);
            arraySensorsDruck.sort(function(a,b) {return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0);} );       
          };
            });
      

      
      
      
      
      
      if(selector == "hmPM10" || selector == "hmPM2.5") {makeHexagonmap(hmhexaPM);};
      
      
        if(selector == "hmtemp" || selector == "hmhumi"){makeHexagonmap(hmhexatemp);};

      if(selector == "hmdruck" ){makeHexagonmap(hmhexadruck);};
        
 };      
    
    
        
function makeHexagonmap(data){

    
    
    if(selector == "hmPM10" || selector == "hmPM2.5" ){
    
    
    var options = {
                valueDomain: [20, 40, 60, 100, 500],
                colorRange: ['#00796B', '#F9A825', '#E65100', '#DD2C00', '#960084']	
                };
        
        
//        if (hexahmtest == false){
//        
//           hexahmtest = true;
//                    hexagonheatmap = L.hexbinLayer(options).addTo(map);
//                    hexagonheatmap.data(data); 
//        }else{
//            hexagonheatmap.initialize(options);
//            hexagonheatmap.data(data)};

    };
    

        if(selector == "hmtemp" ){

    
     var options = {
                valueDomain: [-20, 0, 50],
                colorRange: ['#0022FE', '#FFFFFF', '#FF0000']	
            };
            
//        if (hexahmtest == false){
//    
//               hexahmtest = true;
//                    hexagonheatmap = L.hexbinLayer(options).addTo(map);
//                    hexagonheatmap.data(data); 
//            }else{hexagonheatmap.initialize(options);
//            hexagonheatmap.data(data)};

    
        };
    
    
            if(selector == "hmhumi" ){

            var options = {
                valueDomain: [0,100],
		      colorRange: ['#FFFFFF', '#0000FF']	
            };
    
//        if (hexahmtest == false){
//
//               hexahmtest = true;
//                    hexagonheatmap = L.hexbinLayer(options).addTo(map);
//                    hexagonheatmap.data(data); 
//                
//                    }else{hexagonheatmap.initialize(options);
//            hexagonheatmap.data(data)};

            
            
            };
    
    
                  
    
    
    
    
    
     if(selector == "hmdruck" ){

            var options = {
               valueDomain: [92600, 101300, 110000],
                colorRange: ['#FF0000', '#FE9E01', '#00796B']	
            };

//        if (hexahmtest == false){
//
//            hexahmtest = true;
//                    hexagonheatmap = L.hexbinLayer(options).addTo(map);
//                    hexagonheatmap.data(data); 
//            }else{hexagonheatmap.initialize(options);
//            hexagonheatmap.data(data)};

            };
    
 if (hexahmtest == false){

            hexahmtest = true;
                    hexagonheatmap = L.hexbinLayer(options).addTo(map);
                    hexagonheatmap.data(data); 
            }else{hexagonheatmap.initialize(options);
            hexagonheatmap.data(data)};
                   

};
    
    
    

        function reload(val){
                        
            selector = val;
    
            if(selector == "hmPM10" || selector == "hmPM2.5" ){
                
            document.getElementById('legenddruck').style.visibility='hidden';
            document.getElementById('legendtemp').style.visibility='hidden';
            document.getElementById('legendhumi').style.visibility='hidden';
            document.getElementById('legendpm').style.visibility='visible';
                
                
                
            var options = {
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
            
        var options = {
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
            
            
            var options = {
                valueDomain: [0,100],
		      colorRange: ['#FFFFFF', '#0000FF']	
            };
            
             hexagonheatmap.initialize(options);
                hexagonheatmap.data(hmhexatemp);         
            
            
            };
    
     if(selector == "hmdruck" ){
         
            document.getElementById('legenddruck').style.visibility='visible';
            document.getElementById('legendtemp').style.visibility='hidden';
            document.getElementById('legendhumi').style.visibility='hidden';
            document.getElementById('legendpm').style.visibility='hidden';
         
         
            var options = {
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
    