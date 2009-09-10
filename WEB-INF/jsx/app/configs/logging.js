/**
 * Example @VERSION - 
 *
 * Copyright (c) 2008-2009 ClaypoolJS
 *
 */
//-------------------------------------------------------------------------------------//
//  -   LOGGERS     -
//  - Loggers can be enabled or disabled, turned up or turned downed here.  There
//  - are five levels for loggers, DEBUG, INFO, WARN, ERROR, and NONE.  Each level
//  - will include log messages from higher levels but not lower.  So DEBUG will
//  - print all messages while WARN will include error messages but not info and 
//  - debug messages.
//  -
//  - Understanding Logging Categories is critical to using logging effectively.  Every
//  - new logger is created with a '.' delimited name, and that name should represent
//  - some hierarchy.  Best practice is to use Namespaces and ClassNames that represent
//  - the given class.  For example 'Example.Controllers.User' would be a good name.
//  - If you want to only get warning messages from the 'Example.Controllers' components, 
//  - but want to get all messages from 'Example.Controllers.User' you can have seperate 
//  - configurations for each.
//  -
//  - By default, all Categories that are not explicitly configured will use the 'root'
//  - configuration (see below).
//_____________________________________________________________________________________//


(function($){ 
    
   $.config("logging",[
        { category:"SDB.Services",                      level:"DEBUG" },
        { category:"Claypool",                          level:"DEBUG" },
        { category:"Claypool.Application",              level:"DEBUG" },
        { category:"Claypool.Server",                   level:"DEBUG" },
        { category:"Claypool.MVC",                      level:"DEBUG" },
        { category:"Claypool.IoC",                      level:"DEBUG" },
        { category:"Claypool.AOP",                      level:"DEBUG" },
        { category:"Claypool.Server.WebProxyServlet",   level:"DEBUG" },
        { category:"jQuery.plugins",                    level:"DEBUG" },
        { category:"root",                              level:"DEBUG" }
    ]);     
	
})(jQuery);
    
