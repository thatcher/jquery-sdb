/**
 * Example @VERSION - 
 *
 * Copyright (c) 2008-2009 ClaypoolJS
 *
 */
(function($){

	//-------------------------------------------------------------------------------------//
	//  -   ENVIRONMENTAL CONFIGURATION   -
	//______________________________________________________________________________________//
	$.config("env", {
	    defaults:{
			context_dir:cwd,
            app_dir:'/WEB-INF/jsx/',
			templates:'file:'+cwd+'templates/',
            host:'sdb.amazonaws.com',
            dataType:'text',
            db:'jQuery.sdb',
            dbclient:'direct',
            dbconnection:{'default':{
                endpoint:'https://sdb.amazonaws.com/',
                accessKeyId:AWS.accessKeyId,
                secretKey:AWS.secretKey,
                method:'POST'
                //raw:true //returns raw aws response
            }}
	    },
	    //-------------------------------------------------------------------------------------//
	    //  -   DEVELOPMENT CONFIGURATION   -
	    //______________________________________________________________________________________//
	    dev:{
	        server:{
	        }
	    },
	    //-------------------------------------------------------------------------------------//
	    //  -   PRODUCTION CONFIGURATION   -
	    //______________________________________________________________________________________//
	    prod:{
	        server:{
	        }
	    },
	    //-------------------------------------------------------------------------------------//
	    //  -   APPENGINE CONFIGURATION   -
	    //______________________________________________________________________________________//
	    appengine:{
	        server:{
	            templates:'http://jquery-sdb.appspot.com/templates/'
	        }
	    }
	}); 
    
})(jQuery);
    
