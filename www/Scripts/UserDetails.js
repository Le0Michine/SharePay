var user_details={
	open_user_details_page: function() {
		var vkLinkButton=document.getElementById("vkLinkButton");
		var fbLinkButton=document.getElementById("fbLinkButton");
		var vk_id=window.localStorage.getItem(plugins.plugin_vk_user_id);
		if(vk_id){
			vkLinkButton.value="Disconnect";
		}
		else {
			vkLinkButton.value="Connect to VK";
		}
		if(window.localStorage.getItem(plugins.plugin_fb_user_id)){
			fbLinkButton.value="Disconnect";
		}
		else {
			fbLinkButton.value="Connect to Facebook";
		}
		$.mobile.changePage("#UserInfo");
	},
	get_user_info: function(uid) {
		plugin_vk.get_user_info(uid);
	},
	fill_user_info: function() {
		var userNameItem=document.getElementById('userNameItem');
		var name=window.localStorage.getItem(user_info.first_name);
		var last_name=window.localStorage.getItem(user_info.last_name);
		var userPhoto=document.getElementById('userPhoto');
		userNameItem.textContent=name+' '+last_name+' (id: '+uid+')';
		userPhoto.src=window.localStorage.getItem(user_info.photo);
	},
	update_user_info_debug: function() {
		//debug function
		var uid=window.localStorage.getItem(plugins.plugin_vk_user_id);
		plugin_vk.get_user_info(uid);
		var name=window.localStorage.getItem(user_info.first_name);
		var last_name=window.localStorage.getItem(user_info.last_name);
		var photo=window.localStorage.getItem(user_info.photo);
		alert("name: "+name);
		alert("last_name: "+last_name);
		alert("photo: "+photo);
		aler("updated");
	} 
}