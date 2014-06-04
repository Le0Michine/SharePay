plugin_listview={
	selectedItems: false,
	init: function() {
		this.selectedItems=new Object();
	},
	
	listItemMultiSelect: function(itemId){
		var listItem=$("#"+itemId);
		if(itemId in this.selectedItems){
			listItem.removeClass( "ui-btn-active" );
			delete(this.selectedItems[itemId]);
		}
		else {
			listItem.addClass( "ui-btn-active" );
			this.selectedItems[itemId]=true;
		}
	},
	
	listItemSingleSelect: function(listItem) {
		var tmp=true;
		if(listItem in this.selectedItems){
			tmp=false;
		}
		for(key in this.selectedItems) {
			$(key).removeClass( "ui-btn-active" );
			delete(this.selectedItems[key]);
		}
		if(tmp) {
			$(listItem).addClass( "ui-btn-active" );
			this.selectedItems[listItem]=true;
		}
	},
	
	fill_list: function(listId) {
		var item ="<li id=\"123\"><a href=\"#\" class=\"topic\"><h3>Name</h3><p>Summary, one line</p><p class=\"ui-li-aside\"><strong>Share</strong>(Currency)</p></a><a href=\"#\" cass=\"delete\" onclick=\"plugin_listview.delete_item(this.parentElement,'deleteBillConfirm')\">Delete</a></li>";
		var list=$("#"+listId);
		list.append(item);
		list.listview("refresh");
	},
	
	delete_item: function(listItem,popupId) {
		$(listItem).children(".ui-btn").addClass("ui-btn-active");
		$("#"+popupId+" .topic").remove();
        $(listItem).find(".topic").clone().insertAfter("#question");
        $("#"+popupId).popup("open");
		$("#"+popupId+" #yes").on("click", function() {
			$(listItem).remove();
			$(listItem.parentElement).listview( 'refresh' );
		});
		$("#"+popupId+" #cancel").on( "click", function() {
            $(listItem).children(".ui-btn").removeClass("ui-btn-active");
            $("#"+popupId+" #yes").off();
        });
	}
}