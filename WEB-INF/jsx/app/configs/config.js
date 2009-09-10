/**
 * @author thatcher
 */

(function($){
 	
    
    //______________________________________________________________________________________//
	
   $.config("ioc", [
            
            //-------------------------------------------------------------------------------------//
            //  -   SERVICES  (aka SERVER Objects) -
            //  - Services usually run on the server but, in the case of integration with Gears or HTML5,
            //  - may run on the client as well.  Services are simply specialized Controllers that
            //  - treat a special kind of event, an HTTP request. 
            {scan:"SDB.Services", factory:$.mvc_scanner},
            //
            //  This is a built in proxy controller for server-side claypool.  It makes it easy 
            //  to consume resources through ajax via other domains.  The url and the rewrite are
            //  required parameter, and you can optionally override the returned contentType
            //  set in the response headers.
	        { id:"#sdbProxyService",    clazz:"Claypool.Server.WebProxyServlet", 
	            options:[{
	                proxyHost:"localhost",
	                rewriteMap:
	                    [{ urls: "sdb/$",
	                       rewrite: "https://sdb.amazonaws.com/"
	                     }]
	            }]
	        }
            //_____________________________________________________________________________________//
            
    ]);
})(jQuery);