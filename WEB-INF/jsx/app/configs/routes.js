/**
 * @author thatcher
 */


//-------------------------------------------------------------------------------------//
//  -   ROUTERS     -
//  - Routers are low level controllers that hijax the browsers/servers normal behaviour 
//  - forwarding control to a high level controller that you've written.  In particular
//  - we use links, form sumbission, and events (Claypool.Server includes support
//  - for http request routing).
(function($){
   $.config("mvc",{
        "hijax:server" : [{
            id:"#sdb-server-routes",
            hijaxMap:
              [{ urls :"/rest/$",    	                          controller:"#restService"},
               { urls :"/rest/<:domain(\\w+):>/$",    	          controller:"#restService"},
               { urls :"/rest/<:domain(\\w+):>/<:id(\\w+):>/?$",  controller:"#restService"},
               { urls :"/sdb/$",    	                          controller:"#sdbProxyService"}]
        }]   
    });
})(jQuery);