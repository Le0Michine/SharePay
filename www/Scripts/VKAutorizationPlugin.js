var url_parser={
        get_args: function (s) {
            var tmp=new Array();
            s=(s.toString()).split('&');
            for (var i in s) {
                i=s[i].split("=");
                tmp[(i[0])]=i[1];
            }
            return tmp;
        },
        get_args_cookie: function (s) {
            var tmp=new Array();
            s=(s.toString()).split('; ');
            for (var i in s) {
                i=s[i].split("=");
                tmp[(i[0])]=i[1];
            }
            return tmp;
        }
};

var plugin_vk = {
    wwwref: false,
    plugin_perms: "friends",
	friendsref: false,
    friendslist: false,
	
    auth: function (force) {
		Log('plugin_vk.auth('+force+')');
        if (!window.localStorage.getItem("plugin_vk_token") || force || window.localStorage.getItem("plugin_vk_perms")!=plugin_vk.plugin_perms) {
            var authURL="https://oauth.vk.com/authorize?client_id=12345&scope="+this.plugin_perms+"&redirect_uri=http://oauth.vk.com/blank.html&display=touch&response_type=token";            
			Log('opening url: '+authURL);
			this.wwwref = window.open(encodeURI(authURL), '_blank', 'location=no');
            this.wwwref.addEventListener("loadstop", this.auth_event_url);
        }
		else{
			Log('do nothing');
		}
    },
    auth_event_url: function (event) {
		Log('plugin_vk.auth_event_url');
        var tmp=(event.url).split("#");
        if (tmp[0]=='https://oauth.vk.com/blank.html' || tmp[0]=='http://oauth.vk.com/blank.html') {
            plugin_vk.wwwref.close();
			ShowLoader();
            var tmp=url_parser.get_args(tmp[1]);
            window.localStorage.setItem(plugins.plugin_vk_token, tmp['access_token']);
			Log('access token: '+tmp['access_token']);
            window.localStorage.setItem(plugins.plugin_vk_user_id, tmp['user_id']);
			Log('user id: '+tmp['user_id']);
            window.localStorage.setItem(plugins.plugin_vk_exp, tmp['expires_in']);
			Log('token life time in seconds: '+tmp['expires_in']);
            window.localStorage.setItem(plugins.plugin_vk_perms, plugin_vk.plugin_perms);
			
			plugin_vk.load_friends(plugin_vk.go_to_debts);
			plugin_vk.get_user_info(tmp['user_id']);
			//plugin_vk.go_to_debts(friends_load_finished);
        }
    },
	go_to_debts: function() {
		Log('change page');
		$.mobile.changePage('#ListOfDebts');
		Log('page changed');
		HideLoader();
	},
	load_friends: function(callback) {
		Log('plugin_vk.load_friends');
		var uid=window.localStorage.getItem(plugins.plugin_vk_user_id);
		Log('for uid: '+uid);
		contacts_list = getObj(contacts_info.list_id);
		Log('contacts_list: '+contacts_list);
		if(contacts_list != null && contacts_list.length > 0) {
			Log('contacts_list.length: '+contacts_list.length);
			this.fill_friends_list(contacts_list);
		}
		else {
			var friendsURL="https://api.vk.com/method/friends.get?user_id="+uid+"&fields=first_name,last_name&order=name";
			$.ajax({
				type: "GET",
				url: friendsURL,
				dataType: "jsonp",
				success: function(response) {
					plugin_vk.cache_contact_list(response['response']);
					plugin_vk.fill_friends_list(response['response']);
					if(callback != null)
						Log('callback')
						callback();
				}
			});
		}
		return true;
	},
	cache_contact_list: function(list) {
		Log('plugin_vk.cache_contact_list');
		var contacts = new Array();
		jQuery.each(list,function() {
			contacts[contacts.length]=this;
		});
		Log('frients count: '+contacts.length);
		saveObj(contacts,contacts_info.list_id);
	},
	add_contact_to_list: function(contact) {
		saveObjToList(contact,contacts_info.list_id);
	},
	fill_friends_list: function (list) {
		Log('add_contact_to_list');
		$("#FriendsList").find('li').remove();
		jQuery.each(list,function() {
			$("#FriendsList").append(create("li",{},
				create("a",{href:"#",onclick:"plugin_listview.listItemMultiSelect(this.id)","data-theme":"c",id:this.uid},
				this.first_name+' '+this.last_name)))
		});
		try {
			Log('attempt to refresh "FriendList" listview');
			$("#FriendsList").listview("refresh");
		} catch(e) {
			Log(e);
		}
	},
	get_user_info: function(uid) {
		Log('get_user_info');
		var userURL="https://api.vk.com/method/users.get?user_id="+uid+"&fields=first_name,last_name,photo_medium,photo_big";
		$.ajax({
			type: "GET",
			url: userURL,
			dataType: "jsonp",
			success: this.fill_user_info
		})
	},
	fill_user_info: function(data) {
		Log('fill_user_info');
		if(data['response'].length == 1) {
			var user = data['response'][0];
			window.localStorage.setItem(user_info.first_name, user.first_name);
			Log('user_info.first_name: '+user.first_name);
			window.localStorage.setItem(user_info.last_name, user.last_name);
			Log('user_info.last_name: '+user.last_name);
			window.localStorage.setItem(user_info.photo, user.photo_medium);
			Log('user_info.photo: '+user.photo_medium);
			window.localStorage.setItem(user_info.photo_big, user.photo_big);
			Log('user_info.photo_big: '+user.photo_big);
		}
	},
	reset: function() {
		window.localStorage.removeItem("plugin_vk_token");
		window.localStorage.removeItem("plugin_vk_user_id");
		window.localStorage.removeItem("plugin_vk_exp");
		window.localStorage.removeItem("plugin_vk_perms");
	}
};

var test = function(){
	//debug function
	var authURL="https://oauth.vk.com/authorize?client_id=12345&scope="+this.plugin_perms+"&redirect_uri=http://oauth.vk.com/blank.html&display=touch&response_type=token";
	var ref = window.open(encodeURI(authURL), '_blank', 'location=no');
    ref.addEventListener('loadstart', function(event) { alert('start: ' + event.url); });
    ref.addEventListener('loadstop', function(event) { alert('stop: ' + event.url); });
    ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
    ref.addEventListener('exit', function(event) { alert(event.type); });
};