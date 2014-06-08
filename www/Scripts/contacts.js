function saveContact(contact) {
	saveObjToList(contact, contacts_info.list_id);
}

function getContact_list() {
	contacts = getObj(contacts_info.list_id);
	return contacts;
}

function getContact(contact_id) {
	contacts = getContact_list();
	var contact = undefined;
	jQuery.each(contacts,function(){
		if(this.uid==contact_id) {
			contact=this;
		}
	});
	return contact;
}

function getContacts(contact_id_list) {
	contacts = getContact_list();
	var contact = new Array();
	jQuery.each(contacts,function(){
		for(i=0; i < contact_id_list.length; i++) {
			if(this.uid==contact_id_list[i]) {
				contact[contact.length]=this;
			}
		}
	});
	return contact;
}