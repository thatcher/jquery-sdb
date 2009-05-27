/**
 * @author thatcher
 */
(function($){
    
    var connections = {};
    
    /**
     * @constructor
     */
    $.sdb = function(options){
        $.extend(true, this, options);  
    };
    
    $.extend($.sdb,{
        /**
         * @implements CreateItem, (implies CreateDomain)
         */
        create: function(){
            
        },
        /**
         * @implements DeleteAttribute, DeleteDomain
         */
        rm: function(){
            
        },
        /**
         * @implements DomainMetadata
         */
        metadata: function(){
            
        },
        /**
         * @implements PutAttributes, BatchPutAttributes
         */
        put: function(){
            
        },
        /**
         * @implements ListItems (implies ListDomains)
         */
        list: function(){
            
        },
        /**
         * @implements GetAttributes
         */
        get: function(){
            
        },
        /**
         * @implements Select
         */
        find: function(){
            
        }
        
    });
    
})(jQuery);
