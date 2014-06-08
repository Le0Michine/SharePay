plugins={
	plugin_vk_token: "plugin_vk_token",
	plugin_vk_user_id: "plugin_vk_user_id",
	plugin_vk_exp: "plugin_vk_exp",
	plugin_vk_perms: "plugin_vk_perms",
	
	plugin_fb_user_id: "plugin_fb_user_id"
};

user_info={
	first_name: "user_name",
	last_name: "user_last_name",
	photo: "user_photo",
	photo_big: "user_photo_big",
	password: "user_password"
};

contacts_info={
	list_id: "contacts_list"
}

debts_info={
	list_id: "debt_list"
};

bills_info={
	list_id:"bill_list"
};

function Debt(id, owner, owner_id, total, share, currency, summary) {
	this.id=id;
	this.owner=owner;
	this.owner_id=owner_id;
	this.total=total;
	this.share=share;
	this.currency=currency;
	this.summary=summary;
};

function Bill(id, total, currency, summary, participants) {
	this.id=id;
	this.total=total;
	this.currency=currency;
	this.summary=summary;
	this.participants=participants;
}

function Contact(uid, first_name, last_name, photo) {
	this.uid=uid;
	this.first_name=name;
	this.last_name=last_name;
	this.photo=photo;
}

function saveObj(obj, id) {
	window.localStorage.setItem(id, JSON.stringify(obj));
};

function saveObjToList(obj, list_id) {
	obj_list = JSON.parse(window.localStorage.getItem(list_id));
	if (obj_list == null) {
		obj_list=new Object();
	}
	obj_list[obj_list.length] = obj;
	saveObj(obj_list, list_id);
}

function getObj(id) {
	obj = JSON.parse(window.localStorage.getItem(id));
	return obj;
};

function create( name, attributes ) {
	var el = document.createElement( name );
	if ( typeof attributes == 'object' ) {
		for ( var i in attributes ) {
			el.setAttribute( i, attributes[i] );
			
			if ( i.toLowerCase() == 'class' ) {
			el.className = attributes[i]; // for IE compatibility
			
			} else if ( i.toLowerCase() == 'style' ) {
			el.style.cssText = attributes[i]; // for IE compatibility
			}
		}
	}
	for ( var i = 2;i < arguments.length; i++ ) {
		var val = arguments[i];
		if ( typeof val == 'string' ) { val = document.createTextNode( val ) };
		el.appendChild( val );
	}
	return el;
}