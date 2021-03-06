<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="eng" dir="ltr">
    <head profile="http://a9.com/-/spec/opensearch/1.1/">
        <title>A Web 1.6180339... Amazon SDB Example</title>
		
		<!-- /** server side javascripting with jquery-claypool */ -->
		
		<!-- 
		/**
		 *	The common libraries and plugins
		 *	may be useful to the client as well
		 *	so we simply include them from the 
		 *	public server path
		 */ -->
        <script src="../../lib/jquery.js"                   type="text/envjs" ></script>
        <script src="../../lib/jquery.claypool.js"          type="text/envjs" ></script>
		
		
		<!-- /** these are our application specific files */ -->
	
		<!--
		/**
		 * 	- plugins -
		 *	yup plugins work on the server side too
		 */
		-->
        <script src="../../plugins/jquery.jspath.js"       type="text/envjs" ></script>
        <script src="../../plugins/jquery.json.js"         type="text/envjs" ></script>
        <script src="../../plugins/jquery.loremipsum.js"   type="text/envjs" ></script>
        <script src="../../jquery.sdb.js"                  type="text/envjs" ></script>
        <script src="../../jquery.sdb.rest.js"             type="text/envjs" ></script>
	
		<!--
		/**
		 *		- app/configs -
		 * - these files are common to all projects
		 * - giving developers the common knowledge of
		 * - where to go to get an overview of the
		 * - app and how to affect very general settings
		 * - and wiring behaviors
		 * 
		 */
		-->
        <script src="./app/.aws.js"                       type="text/envjs" ></script>
        <script src="./app/configs/config.js"         type="text/envjs" ></script>
        <script src="./app/configs/environments.js"    type="text/envjs" ></script>
        <script src="./app/configs/logging.js"         type="text/envjs" ></script>
        <script src="./app/configs/routes.js"         type="text/envjs" ></script>
	
		<!-- 
		/** 		models - views - services (controllers) - 
		 *
		 * Note: there are many ways to implement models 
		 * and views in server-side jquery-claypool.  
		 * This strategy is just an example, and you could
		 * use jquery.jtemplates or any method of your choosing.
		 * there is no model used in this example.  the reason is
		 * that no model is required ;)  any model, will do. even 
		 * 
		 */ 
		 -->
		
	
		<!-- 
		/** 
		 *	finally boot the app 
		 */ -->
        <script src="./app/boot/server.js"             type="text/envjs" ></script> 
        
    </head>
    <body>
		<div>Hello World!</div>
		<div id="info-panel"></div>
    </body>
</html>
