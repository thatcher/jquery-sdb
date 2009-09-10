(function($){
  	// RSpec/Bacon Style
	$.config("env", {
	    defaults:{
		    db:'jQuery.sdb',
			resturl:'/jquery-sdb/rest/'
	    },
        test:{
            client:{
                resturl:'http://localhost:8080/jquery-sdb/rest/',
                dbconnection:{'default':{
                    method:'POST'
                    //raw:true //returns raw aws response
                }}
            }
        }
    });
    $.config("logging",[
        { category:"Claypool",level:"DEBUG" },
        { category:"jQuery",level:"DEBUG" }
    ]);     
    $.env('defaults', 'test.client');
    $.boot();
    var Artists =  $.model('artists', {
            $id:{
                pattern:/\d{3}/,
                not:[null],
                msg:'$id must be defined and should be "000" to "999"'
            },
            $uri:{
                pattern:/^[a-z_]{1,64}$/,
                not:[null],
                msg:'$uri must be defined, less than 64 characters and \
                       should use only lowercase letters and underscores'
            },
            $name:{
                pattern:/^.{1,64}$/,
                not:[null],
                msg:'$name must be defined, less than 64 characters and \
                       can use any characters'
            },
            description:{
                type:'XMLList',
                msg:'description is not required but must be a valid xml \
                       list when defined'
            }
        }
    ),
    Contacts = $.model('contacts', {
            $id:{
                pattern:/\d{13}-\d+$/,
                not:[null],
                msg:'$id must be defined',
                generate:function(){
                    return new Date().getTime()+"-"+Math.floor(Math.random()*(100000000));
                },
            },
            $firstName:{
                pattern:/^[a-zA-Z_]{1,64}$/,
                msg:'$firstName is optional, less than 64 characters and \
                       should use only letters and underscores'
            },
            $lastName:{
                pattern:/^.{1,64}$/,
                not:[null],
                msg:'$lastName must be defined, less than 64 characters and \
                       can use any characters'
            },
            $email:{
                pattern:/^[^@]{1,64}@[^@.]{1,64}\.[^@.]{1,12}$/,
                msg:'$email must a valid email address'
            },
            physical:{
                type:'jsam',//i am!
                msg:'address can be any valid json'
            },
            //extensibility mark lets you add any other json serializable fields
            //which are serialized based on introspection
            __anything__:true
        }
    );
    //required to allow tests to progress
    //in order
    $.ajaxSetup({async:false});
    

	with (jqUnit) {
		
		//tests basic init functionality
		describe('Claypool Models', 'Amazon SDB', {
            
			before: function(){
                //reset the query
                _ = $.query();
			}
            
		}).should('create the domain', function(){
           
           Artists.create({
               async:false,
               success:function(result){
                    equals(result.$xmlns$db, 'http://sdb.amazonaws.com/doc/2009-04-15',
                        'got db response metadata -> db implementation');
                    ok(result.$db$request, 'got db response metadata -> request id');
                    ok(result.$db$cpu, 'got db response metadata -> cpu usage');
                    equals(result.$db$domain, 'artists', 
                        'got db response metadata -> db operation domain');
               },
			   error: function(){
                   ok(false, 'got error response');
               }
           });
           Contacts.create({
               async:false,
               success: function(result){
                    equals(result.$xmlns$db, 'http://sdb.amazonaws.com/doc/2009-04-15',
                        'got db response metadata -> db implementation');
                    ok(result.$db$request, 'got db response metadata -> request id');
                    ok(result.$db$cpu, 'got db response metadata -> cpu usage');
                    equals(result.$db$domain, 'contacts', 
                        'got db response metadata -> db operation domain');
               },
               error: function(){
                   ok(false, 'got error response');
               }
           });
           
		}).should('invalidate an invalid record', function(){
            
            var artist = {
               $id:'abc',
               $uri:'vox_populi!',
               $name:'Vox Populi awefuhaweifuhawiefhawiefhaiwehfaiweuhfaiwuefhaoiwuehfaoiweufhoawieufhaoiweufhaoiweufhaoiweufhaowieufhaoiweufhaowieufhaoiweufhaoiweufhaowieufhaowieufhaowieufhaowiefuha',
               description:'They really rock the cat box!'
            };
            Artists.validate({
                data: artist, 
                success: function(){
                    ok(false, 'artist should not validate successfully');
                },
                error: function(model, flash){
                    equals(flash.length, 3, 'found all invalid fields ');
                }
           });
           
		}).should('validate a valid record', function(){
            
            var artist = {
               $id:'100',
               $uri:'vox_populi',
               $name:'Vox Populi',
               description:'They really rock the cat box!'
            };
            Artists.validate({
                data: artist, 
                success: function(model){
                    ok(true, "Correctly validated model");
                },
                error: function(model, flash){
                    ok(false, "Should find no invalid fields : \n"+flash.join('\n'));
                }
           });
           
		}).should('save a new record', function(){
            
            var artist = {
               $id:'100',
               $uri:'vox_populi',
               $name:'Vox Populi',
               description:'They really rock the cat box!'
            };
            
            Artists.validate({
                data:artist, 
                success: function(data){
                    Artists.save({
                        async:false,
                        id: data.$id, 
                        data: data,  
                        success: function(result){
                            equals(result.$xmlns$db, 'http://sdb.amazonaws.com/doc/2009-04-15',
                                'got db response metadata -> db implementation');
                            ok(result.$db$request, 'got db response metadata -> request id');
                            ok(result.$db$cpu, 'got db response metadata -> cpu usage');
                            equals(result.$db$domain, 'artists', 
                                'got db response metadata -> db operation domain');
                            equals(result.$db$id, '100',
                                'got db response metadata -> db operation item id');
                        },
                        error:function(){
                            ok(false, 'failed to save data to artists ');
                        }
                    });
                },
                error: function(model, flash){
                    ok(false, 'data should have validated');
                }
           });
           
		}).should('post a query to the rest service', function(){
           
           Artists.find({
               async:false,
               select:'select * from `artists` where `$name` = \'Vox Populi\'',
               success: function(result){
                    equals(result.$xmlns$db, 'http://sdb.amazonaws.com/doc/2009-04-15',
                        'got db response metadata -> db implementation');
                    ok(result.$db$request, 'got db response metadata -> request id');
                    ok(result.$db$cpu, 'got db response metadata -> cpu usage');
                    equals(result.db$data[0].$id, '100', 'got expected $id value');
                    equals(result.db$data[0].$uri, 'vox_populi', 'got expected $uri value');
                    equals(result.db$data[0].$name, 'Vox Populi', 'got expected $name value');
                    equals(result.db$data[0].description, 'They really rock the cat box!', 'got expected description');
               },
               error: function(result){
                   ok(false, 'query failed');
               }
           }); 
           
		}).should('bulk save some records', function(){
            
            var addressbook = {
                '001': {
                    "$firstName": "Jason",
                    "$lastName": "Jones",
                    "physical": [{
                        '$type':'home',
                        "$city": "San Francisco",
                        "$state":"CA",
                        "$zip": 94121,
                        "$address": "444 Columbus Ave"
                    },{
                        '$type':'work',
                        "$city": "San Francisco, CA",
                        "$state":"CA",
                        "$zip": 94121,
                        "$address": "123 Sesame St."
                    }],
                    "$email": ["jason@sf.com", "sjones@adobe.com"]
                }, 
                '002':{
                    "$firstName": "Briana",
                    "$lastName": "Banks",
                    "physical": [{
                        '$type':'home',
                        "$city": "Los Angeles",
                        "$state":"CA",
                        "$zip": 94001,
                        "$address": "333 West Muenster Ave",
                        "$apt":'123B'
                    },{
                        '$type':'work',
                        "$city": "New York",
                        "$state":"NY",
                        "$zip": 34567,
                        "$address": "555 E 13th"
                    }],
                    "$email": ["bbanks@wm.com", "bb@blahdeeblah.com"]
                }
            }; 
            Contacts.validate({
                batch:true,
                data:addressbook,
                success: function(data){
                    ok(true, 'data should validate');
                    Contacts.save({
                        async:false,
                        batch:true,
                        data: data,  
                        success: function(result){
                            equals(result.$xmlns$db, 'http://sdb.amazonaws.com/doc/2009-04-15',
                                'got db response metadata -> db implementation');
                            ok(result.$db$request, 'got db response metadata -> request id');
                            ok(result.$db$cpu, 'got db response metadata -> cpu usage');
                            equals(result.$db$domain, 'contacts', 
                                'got db response metadata -> db operation domain');
                        },
                        error: function(result){
                            ok(false, 'failed to batch save data')
                        }
                   });
               },
               error: function(data, flash){
                   ok(false, 'data should validate');
               }
           });
            
        }).should('post a query on nested jsam values', function(){
            
            Contacts.find({
                async:false,
                //data:_.items(['$firstName', '$lastName']).where('physical').islike("*.$state='NY'"),
                select:'select  `$lastName` , `$firstName`  from `contacts` where `physical` like "%.$state=\'NY\'" ',
                success: function(result){
                   ok(true, 'one small step forward');
                },
                error: function(result){
                   ok(false, 'one small step back');
                }
           }); 
            
        });
	}
    
})(jQuery);
