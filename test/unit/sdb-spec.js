(function($){

    var db;
	
  	// RSpec/Bacon Style
	with (jqUnit) {
		
		//tests basic init functionality
		describe('jQuery SDB', 'Amazon Simple DB API', {
            
			before: function(){
                //no setup for this spec
                db = new $.sdb({'default':{
                    endpoint:'http://localhost:8080/jquery-sdb/sdb/',
		            accessKeyId:AWS.accessKeyId,
		            secretKey:AWS.secretKey,
                    method:'POST'
                    //raw:true //returns raw db response
                }});
			}
            
		}).should('create a new domain by name', function(){
            
			db.create({
                domain: 'zzzzzz_domain_test000',
                async: false,
                success: function(result){
                    equals(result.$xmlns$db, 'http://sdb.amazonaws.com/doc/2009-04-15',
                        'got db response metadata -> db implementation');
                    ok(result.$db$request, 'got db response metadata -> request id');
                    ok(result.$db$cpu, 'got db response metadata -> cpu usage');
                    equals(result.$db$domain, 'zzzzzz_domain_test000', 
                        'got db response metadata -> db operation domain');
                },
                error: function(xhr, status, e){
                    ok(false, 'failed to create sdb domains: status('+(e?e:status)+')');
                }
            });
            
		}).should('get a list of available sdb domains',function(){
            
            db.get({
                async: false,
                success: function(result){
                    equals(result.$xmlns$db, 'http://sdb.amazonaws.com/doc/2009-04-15',
                        'got db response metadata -> db implementation');
                    ok(result.$db$request, 'got db response metadata -> request id');
                    ok(result.$db$cpu, 'got db response metadata -> cpu usage');
                    for(var i=0;i<result.$db$domains.length;i++){
                        if(result.$db$domains[i] == 'zzzzzz_domain_test000'){
                            ok(true, 'found sdb expected domain.');
                            return;
                        }
                    }
                    ok(false, 'failed to find expected domain');
                },
                error: function(xhr, status, e){
                    ok(false, 'failed to get sdb domains: status('+(e?e:status)+')');
                }
            });
            
        }).should('save data by id to specific domain', function(){
            
            var person = {
                firstname:'john',
                lastname:'doe',
                address:'154 Maddex Farm Dr',
                city: 'Shepherdstown',
                state: 'WV',
                zipcode: '25443'
            };
			db.save({
                domain: 'zzzzzz_domain_test000',
                id:'test_person_000',
                data:person,
                async: false,
                success: function(result){
                    equals(result.$xmlns$db, 'http://sdb.amazonaws.com/doc/2009-04-15',
                        'got db response metadata -> db implementation');
                    ok(result.$db$request, 'got db response metadata -> request id');
                    ok(result.$db$cpu, 'got db response metadata -> cpu usage');
                    equals(result.$db$domain, 'zzzzzz_domain_test000', 
                        'got db response metadata -> db operation domain');
                    equals(result.$db$id, 'test_person_000',
                        'got db response metadata -> db operation item id');
                },
                error: function(xhr, status, e){
                    ok(false, 'failed to get sdb domains: status('+(e?e:status)+')');
                }
            });
            
		}).should('batch save data by id to specific domain ', function(){
            
			var people = {
                'test_person_001':{
                    firstname:'jane',
                    lastname:'roe',
                    address:'1234 Maddex Farm Dr',
                    city: 'Shepherdstown',
                    state: 'WV',
                    zipcode: '25443'
                },
                'test_person_002':{
                    firstname:'john',
                    lastname:'deer',
                    address:'234 Potomac St',
                    city: 'Harpers Ferry',
                    state: 'WV',
                    zipcode: '25424'
                },
                'test_person_003':{
                    firstname:'bob',
                    lastname:'dole',
                    address:'435 Deer Park Ln',
                    city: 'Sharpsburg',
                    state: 'MD',
                    zipcode: '25336'
                },
                'test_person_004':{
                    firstname:'chaquita',
                    lastname:'estudiante',
                    address:'354 Thatcher Dr',
                    city: 'Shepherdstown',
                    state: 'WV',
                    zipcode: '25443'
                }
            };
			db.save({
                domain: 'zzzzzz_domain_test000',
                data: people,
                batch: true,
                async: false,
                success: function(result){
                    equals(result.$xmlns$db, 'http://sdb.amazonaws.com/doc/2009-04-15',
                        'got db response metadata -> db implementation');
                    ok(result.$db$request, 'got db response metadata -> request id');
                    ok(result.$db$cpu, 'got db response metadata -> cpu usage');
                    equals(result.$db$domain, 'zzzzzz_domain_test000', 
                        'got db response metadata -> db operation domain');
                },
                error: function(xhr, status, e){
                    ok(false, 'failed to get sdb domains: status('+(e?e:status)+')');
                }
            });
            
		}).should('add attributes by name to specific id and domain', function(){
            //note this is going to add another address, city, state, zipcode
			db.add({
                domain: 'zzzzzz_domain_test000',
                id:'test_person_002',
                data:{
                    address:'419 E. High St',
                    city: 'Shepherdstown',
                    state: 'WV',
                    zipcode: '25443',
                },
                async: false,
                success: function(result){
                    equals(result.$xmlns$db, 'http://sdb.amazonaws.com/doc/2009-04-15',
                        'got db response metadata -> db implementation');
                    ok(result.$db$request, 'got db response metadata -> request id');
                    ok(result.$db$cpu, 'got db response metadata -> cpu usage');
                    equals(result.$db$domain, 'zzzzzz_domain_test000', 
                        'got db response metadata -> db operation domain');
                },
                error: function(xhr, status, e){
                    ok(false, 'failed to get sdb domains: status('+(e?e:status)+')');
                }
            });
            
		}).should('get all data from a specific id and domain', function(){
            
			db.get({
                domain: 'zzzzzz_domain_test000',
                id:'test_person_000',
                async: false,
                success: function(result){
                    equals(result.$xmlns$db, 'http://sdb.amazonaws.com/doc/2009-04-15',
                        'got db response metadata -> db implementation');
                    ok(result.$db$request, 'got db response metadata -> request id');
                    ok(result.$db$cpu, 'got db response metadata -> cpu usage');
                    equals(result.$db$domain, 'zzzzzz_domain_test000', 
                        'got db response metadata -> db operation domain');
                    equals(result.$db$id, 'test_person_000',
                        'got db response metadata -> db operation item id');
                    equals(result.db$data.length, 1, 'got 1 result');
                    equals(result.db$data[0].firstname, 'john', 'Attribute had the expected value');
                    equals(result.db$data[0].lastname, 'doe', 'Attribute had the expected value');
                    equals(result.db$data[0].address, '154 Maddex Farm Dr', 'Attribute had the expected value');
                    equals(result.db$data[0].city, 'Shepherdstown', 'Attribute had the expected value');
                    equals(result.db$data[0].state, 'WV', 'Attribute had the expected value');
                    equals(result.db$data[0].zipcode, '25443', 'Attribute had the expected value');
                    
                },
                error: function(xhr, status, e){
                    ok(false, 'failed to get sdb domains: status('+(e?e:status)+')');
                }
            });
            
		}).should('get data fields by name from a specific id and domain', function(){
            
			db.get({
                domain: 'zzzzzz_domain_test000',
                id:'test_person_000',
                data:['firstname'],
                async: false,
                success: function(result){
                    equals(result.$xmlns$db, 'http://sdb.amazonaws.com/doc/2009-04-15',
                        'got db response metadata -> db implementation');
                    ok(result.$db$request, 'got db response metadata -> request id');
                    ok(result.$db$cpu, 'got db response metadata -> cpu usage');
                    equals(result.$db$domain, 'zzzzzz_domain_test000', 
                        'got db response metadata -> db operation domain');
                    equals(result.$db$id, 'test_person_000',
                        'got db response metadata -> db operation item id');
                    equals(result.db$data.length, 1, 'got 1 result');
                    equals(result.db$data[0].firstname, 'john', 'got expected attribute and value');
                },
                error: function(xhr, status, e){
                    ok(false, 'failed to get sdb domains: status('+(e?e:status)+')');
                }
            });
            
		}).should('get a list of item ids from a specific domain', function(){
            
            db.get({
                domain: 'zzzzzz_domain_test000',
                async: false,
                success: function(result){
                    equals(result.$xmlns$db, 'http://sdb.amazonaws.com/doc/2009-04-15',
                        'got db response metadata -> db implementation');
                    ok(result.$db$request, 'got db response metadata -> request id');
                    ok(result.$db$cpu, 'got db response metadata -> cpu usage');
                    equals(result.db$data.length, 5, 'got 5 ids');
                    equals(result.db$data[0].$db$id, 'test_person_000', 'got expected attribute and value');
                },
                error: function(xhr, status, e){
                    ok(false, 'failed to get sdb domains: status('+(e?e:status)+')');
                }
            });
            
        }).should('delete a field by name and value for a specific id and domain', function(){
            
			db.remove({
                domain: 'zzzzzz_domain_test000',
                id:'test_person_000',
                data:{
                    firstname: 'john'
                },
                async: false,
                success: function(result){
                    equals(result.$xmlns$db, 'http://sdb.amazonaws.com/doc/2009-04-15',
                        'got db response metadata -> db implementation');
                    ok(result.$db$request, 'got db response metadata -> request id');
                    ok(result.$db$cpu, 'got db response metadata -> cpu usage');
                    equals(result.$db$domain, 'zzzzzz_domain_test000', 
                        'got db response metadata -> db operation domain');
                    equals(result.$db$id, 'test_person_000',
                        'got db response metadata -> db operation item id');
                },
                error: function(xhr, status, e){
                    ok(false, 'failed to delete property from item: status('+(e?e:status)+')');
                }
            });
            
		}).should('delete fields by name for a specific id and domain', function(){
            
			db.remove({
                domain: 'zzzzzz_domain_test000',
                id:'test_person_001',
                data:['firstname', 'lastname'],
                async: false,
                success: function(result){
                    equals(result.$xmlns$db, 'http://sdb.amazonaws.com/doc/2009-04-15',
                        'got db response metadata -> db implementation');
                    ok(result.$db$request, 'got db response metadata -> request id');
                    ok(result.$db$cpu, 'got db response metadata -> cpu usage');
                    equals(result.$db$domain, 'zzzzzz_domain_test000', 
                        'got db response metadata -> db operation domain');
                    equals(result.$db$id, 'test_person_001',
                        'got db response metadata -> db operation item id');
                },
                error: function(xhr, status, e){
                    ok(false, 'failed to delete property from item: status('+(e?e:status)+')');
                }
            });
            
		}).should('delete all data by id in a specific domain', function(){
            
			
			db.remove({
                domain: 'zzzzzz_domain_test000',
                id:'test_person_003',
                async: false,
                success: function(result){
                    equals(result.$xmlns$db, 'http://sdb.amazonaws.com/doc/2009-04-15',
                        'got db response metadata -> db implementation');
                    ok(result.$db$request, 'got db response metadata -> request id');
                    ok(result.$db$cpu, 'got db response metadata -> cpu usage');
                    equals(result.$db$domain, 'zzzzzz_domain_test000', 
                        'got db response metadata -> db operation domain');
                    equals(result.$db$id, 'test_person_003',
                        'got db response metadata -> db operation item id');
                },
                error: function(xhr, status, e){
                    ok(false, 'failed to delete property from item: status('+(e?e:status)+')');
                }
            });
            
		}).should('return an error', function(){
            
			
			db.find({
                select:"this is a totally invalid select statement",
                async: false,
                success: function(result){
                    ok(false, 'failed to trigger error callback');
                },
                error: function(result){
                    equals(result.$xmlns$db, 'http://sdb.amazonaws.com/doc/2009-04-15',
                        'got db response metadata -> db implementation');
                    ok(result.$db$request, 'got db response metadata -> request id');
                    ok(result.$db$cpu, 'got db response metadata -> cpu usage');
                    ok(result.db$error, 'error reported');
                    ok(result.db$error.$code, 'http error code reported  ');
                    ok(result.db$error.$type, 'error type reported  ');
                    ok(result.db$error.$msg, 'error msg reported  ');
                }
            });
            
		}).should('find data that match the selection', function(){
            
			db.find({
                select:"select * from `zzzzzz_domain_test000` where `city` = 'Shepherdstown'",
                async: false,
                success: function(result){
                    equals(result.$xmlns$db, 'http://sdb.amazonaws.com/doc/2009-04-15',
                        'got db response metadata -> db implementation');
                    ok(result.$db$request, 'got db response metadata -> request id');
                    ok(result.$db$cpu, 'got db response metadata -> cpu usage');
                    equals(result.db$data.length, 4, 'Got expected number of results');
                    equals(result.db$data[0].firstname, undefined, 'Attribute was deleted');
                    equals(result.db$data[0].lastname, 'doe', 'Attribute had the expected value');
                    equals(result.db$data[0].address, '154 Maddex Farm Dr', 'Attribute had the expected value');
                    equals(result.db$data[0].city, 'Shepherdstown', 'Attribute had the expected value');
                    equals(result.db$data[0].state, 'WV', 'Attribute had the expected value');
                    equals(result.db$data[0].zipcode, '25443', 'Attribute had the expected value');
                    equals(result.db$data[1].firstname, undefined, 'Attribute was deleted');
                    equals(result.db$data[1].lastname, undefined, 'Attribute was deleted');
                    equals(result.db$data[1].address, '1234 Maddex Farm Dr', 'Attribute had the expected value');
                    equals(result.db$data[1].city, 'Shepherdstown', 'Attribute had the expected value');
                    equals(result.db$data[1].state, 'WV', 'Attribute had the expected value');
                    equals(result.db$data[1].zipcode, '25443', 'Attribute had the expected value');
                    equals(result.db$data[2].firstname, 'john', 'Attribute had the expected value');
                    equals(result.db$data[2].lastname, 'deer', 'Attribute had the expected value');
                    equals(result.db$data[2].address[1], '419 E. High St', 'Attribute had the expected value');
                    equals(result.db$data[2].city[1], 'Shepherdstown', 'Attribute had the expected value');
                    equals(result.db$data[2].state, 'WV', 'Attribute had the expected value');
                    equals(result.db$data[2].zipcode[1], '25443', 'Attribute had the expected value');
                    equals(result.db$data[3].firstname, 'chaquita', 'Attribute had the expected value');
                    equals(result.db$data[3].lastname, 'estudiante', 'Attribute had the expected value');
                    equals(result.db$data[3].address, '354 Thatcher Dr', 'Attribute had the expected value');
                    equals(result.db$data[3].city, 'Shepherdstown', 'Attribute had the expected value');
                    equals(result.db$data[3].state, 'WV', 'Attribute had the expected value');
                    equals(result.db$data[3].zipcode, '25443', 'Attribute had the expected value');
                },
                error: function(xhr, status, e){
                    ok(false, 'failed to delete sdb domains: status('+(e?e:status)+')');
                }
            });
            
		}).should('retrieve domain metadata for existing domain', function(){
            
			db.metadata({
                domain: 'zzzzzz_domain_test000',
                async: false,
                success: function(result){
                    equals(result.$xmlns$db, 'http://sdb.amazonaws.com/doc/2009-04-15',
                        'got db response metadata -> db implementation');
                    ok(result.$db$request, 'got db response metadata -> request id');
                    ok(result.$db$cpu, 'got db response metadata -> cpu usage');
                    equals(result.$db$domain, 'zzzzzz_domain_test000', 
                        'got db response metadata -> db operation domain');
                    ok(result.$db$count, 'got domain item count');
                    ok(result.$db$timestamp, 'got domain creation timestamp');
                    ok(result.$db$namesize, 'got domain size of names in bytes');
                    ok(result.$db$valuesize, 'got domain size of values in bytes');
                    ok(result.$db$size, 'got domain total size');
                },
                error: function(xhr, status, e){
                    ok(false, 'failed to get sdb domain metadata: status('+(e?e:status)+')');
                }
            });
            
		}).pending('delete a domain by name', function(){
            
			db.destroy({
                domain: 'zzzzzz_domain_test000',
                async: false,
                success: function(result){
                    equals(result.$xmlns$db, 'http://sdb.amazonaws.com/doc/2009-04-15',
                        'got db response metadata -> db implementation');
                    ok(result.$db$request, 'got db response metadata -> request id');
                    ok(result.$db$cpu, 'got db response metadata -> cpu usage');
                    equals(result.$db$domain, 'zzzzzz_domain_test000', 
                        'got db response metadata -> db operation domain');
                },
                error: function(xhr, status, e){
                    ok(false, 'failed to delete sdb domains: status('+(e?e:status)+')');
                }
            });
            
		});/*.pending('should do something awesome', function(){
            
			// It doesnt matter what you put here it wont be run until
			// you change this to an actual spec
			ok(false);
            
		});*/
			
	}
    
})(jQuery);
