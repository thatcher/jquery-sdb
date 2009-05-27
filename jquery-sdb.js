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
         * @implements CreateDomain
         */
        create: function(domain){
            //CreateDomain
            //  - operation only available at the domian level
            $.ajax({});
        },
        /**
         * @implements DeleteAttribute, DeleteDomain
         */
        rm: function(){
            //assume arg[0] is options object
            if (!options.item) {
                //DeleteDomain
                //  - no options.item implies a deletion of domain
                $.ajax({});
            }else{
                //DeleteAttribute
                $.ajax({});
            }
        },
        /**
         * @implements DomainMetadata
         */
        metadata: function(domain){
            //DomainMetadata
            //  - operation only available at the domian level
            $.ajax({});
        },
        /**
         * @implements PutAttributes, BatchPutAttributes
         */
        save: function(){
            //assume arg[0] is options object
            if (!options.item) {
                //PutAttributes
                //  - no options.item implies a batch operation
                $.ajax({});
            }else{
                // BatchPutAttributes
                $.ajax({});
            }
        },
        /**
         * @implements ListDomains
         * @options Object
         *     @max Number         - The maximum number of domain names you want 
         *                         - returned. (not required)
         *     @range Number       - 1 to 100 
         *         @default        - 100 
         *     @next String        - that tells Amazon SimpleDB where to start the 
         *                         - next list of domain names. (not required) 
         *     @callback Object
         *        @names Array     - array of strings of available domain names
         *                         - that match the expression
         *        @token String    - An opaque token indicating that there are more 
         *                         - than 'max' domains still available.
         *        @errors Exceptions  
         *            @InvalidParameterValue  - Value (" + value + ") for parameter 
         *                                    - 'max'  is invalid. 'max' must be between 
         *                                    - 1 and 100.
         *            @InvalidNextToken       - The specified next token is not valid.
         *            
         *  @coretemplate $.ajax({ 
         *      url:'https://sdb.amazonaws.com/',
         *      data:{
         *          Action:'ListDomains',
         *          AWSAccessKeyId:'[valid access key id]',
         *          MaxNumberOfDomains:2,
         *          NextToken:'[valid next token]',
         *          SignatureVersion:2,
         *          SignatureMethod:'HmacSHA256',
         *          Timestamp:'2007-06-25T15%3A02%3A19-07%3A00',
         *          Version:'2009-04-15',
         *          Signature:'V6TddLRIYdWnXRc3spjv9KAzihE%3D
         *      }
         *  });
         */
        get: function(options){
            if (!options.item) {
                //ListDomains
                //  - no options.item implies a domain list operation
                $.ajax({});
            }else{
                //GetAttributes
                $.ajax({});
            }
        },
        /**
         * @implements Select
         */
        find: function(){
            
        }
        
    });
    
})(jQuery);
