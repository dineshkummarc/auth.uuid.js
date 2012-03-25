// auth.uuid.js 0.1.0
// (c) 2012 Guillaume DE LA RUE, Seventh Side Games.
// auth.uuid may be freely distributed under the MIT license.
// For all details and documentation:
// https://github.com/html5place/auth.uuid.js
(function(exports) {

	// -> Get UUID from mobile device, or generate a random one in fallback
	var AuthUUID = function(key, val) {
		this.key = parseFloat(this.getKey(key)) || parseFloat(this.getKey(key)) ;
		this.val = val || '' ;
		return this; 
	} ;

	// -> Get default key
	AuthUUID.prototype.getKey = function(key) {
		if ( typeof key != 'undefined' ) return key ;
		if ( typeof this.key != 'undefined' ) return this.key ;
		return this.generateKey() ;
	} ;

	// -> Generate an xor Key
	AuthUUID.prototype.generateKey = function(count, base) {
		base = base || 10 ;
		count = count || 12 ;
		var key = '' ;
		for ( var i = 0 ; i < count ; i++ ) {
			key+=(Math.floor(Math.random()*base)).toString(base) ;
		}
		return key ;
	} ;

	// -> Xor Crypt function
	AuthUUID.prototype.crypt = function(val) {
		var str = '' ;
		val = val || this.val ;
		for(i=0;i<val.length;++i) {
			str+=String.fromCharCode(this.key^val.charCodeAt(i));
		}
		return str ;
	}

	// -> Xor decrypt function
	AuthUUID.prototype.decrypt = function(val) {
		var str = '' ;
		val = val || this.val ;
		for(i=0;i<val.length;i++) {
			str += String.fromCharCode(this.key^val.charCodeAt(i));
		}
		return str; 
	}

	// -> Get a token from auth server
	AuthUUID.prototype.register = function(uuid) {

		// Get uuid
		this.uuid = uuid || (new html5uuid()).get() ;

		// Send uuid to sever
		$.getJSON('http://m.stargoalz.com/auth/uuid/?chain='+this.crypt(this.uuid), function(data, err){
			console.log(data, err)
		}) ;

		return this; 

	}

	// Export class
	exports.AuthUUID = AuthUUID ;

// DOM or node.js scope export
})(window||exports) ;