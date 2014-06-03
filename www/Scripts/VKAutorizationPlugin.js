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
        if (!window.localStorage.getItem("plugin_vk_token") || force || window.localStorage.getItem("plugin_vk_perms")!=plugin_vk.plugin_perms) {
            var authURL="https://oauth.vk.com/authorize?client_id=12345&scope="+this.plugin_perms+"&redirect_uri=http://oauth.vk.com/blank.html&display=touch&response_type=token";            
			this.wwwref = window.open(encodeURI(authURL), '_blank', 'location=no');
            this.wwwref.addEventListener("loadstop", this.auth_event_url);
            
        }
		else{
			//alert("User ID: "+window.localStorage.getItem("plugin_vk_user_id"));
		}
    },
    auth_event_url: function (event) {
        var tmp=(event.url).split("#");
        if (tmp[0]=='https://oauth.vk.com/blank.html' || tmp[0]=='http://oauth.vk.com/blank.html') {
            plugin_vk.wwwref.close();
            var tmp=url_parser.get_args(tmp[1]);
            window.localStorage.setItem(plugins.plugin_vk_token, tmp['access_token']);
            window.localStorage.setItem(plugins.plugin_vk_user_id, tmp['user_id']);
            window.localStorage.setItem(plugins.plugin_vk_exp, tmp['expires_in']);
            window.localStorage.setItem(plugins.plugin_vk_perms, plugin_vk.plugin_perms);
        }
    },
	load_friends: function() {
		//alert("load_friends");
		var uid=window.localStorage.getItem(plugins.plugin_vk_user_id);
		//alert("uid: "+uid);
		var friendsURL="https://api.vk.com/method/friends.get?user_id="+uid+"&fields=first_name,last_name&order=name";
		$.ajax({
			type: "GET",
			url: friendsURL,
			dataType: "jsonp",
			success: this.fill_friends_list
		})
	},
	fill_friends_list: function (list) {
		//alert("list:"+list['response']);
		var leftListTag='<li><a href="#" onclick="plugin_listview.listItemMultiSelect(this.id)" data-theme="c" id="';
		var rightListTag='</a></li>';
		jQuery.each(list['response'],function(){$("#FriendsList").append(leftListTag+this.uid+'">' +this.first_name+' '+this.last_name+rightListTag)})
		//this.uid
		$("#FriendsList").listview("refresh");
		//$.mobile.changePage("#MainPage");
	},
	get_user_info: function(uid) {
		var userURL="https://api.vk.com/method/users.get?user_id="+uid+"&fields=first_name,last_name,photo_big";
		$.ajax({
			type: "GET",
			url: userURL,
			dataType: "jsonp",
			success: this.fill_user_info
		})
	},
	fill_user_info: function(data) {
		jQuery.each(data['response'], function() {
			window.localStorage.setItem(user_info.first_name, this.first_name);
			window.localStorage.setItem(user_info.last_name, this.last_name);
			window.localStorage.setItem(user_info.photo, this.photo);
		})
	},
	reset: function() {
		window.localStorage.removeItem("plugin_vk_token");
		window.localStorage.removeItem("plugin_vk_user_id");
		window.localStorage.removeItem("plugin_vk_exp");
		window.localStorage.removeItem("plugin_vk_perms");
	}
};

var test = function(){
	var authURL="https://oauth.vk.com/authorize?client_id=12345&scope="+this.plugin_perms+"&redirect_uri=http://oauth.vk.com/blank.html&display=touch&response_type=token";
	var ref = window.open(encodeURI(authURL), '_blank', 'location=no');
    ref.addEventListener('loadstart', function(event) { alert('start: ' + event.url); });
    ref.addEventListener('loadstop', function(event) { alert('stop: ' + event.url); });
    ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
    ref.addEventListener('exit', function(event) { alert(event.type); });
};