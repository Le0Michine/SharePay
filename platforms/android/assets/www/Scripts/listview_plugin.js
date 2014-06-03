plugin_listview={
	selectedItems: false,
	init: function() {
		this.selectedItems=new Object();
	},
	
	listItemSelect: function(itemId, selectedItems){
		var listItem=$("#"+itemId);
		if(this.selectedItems[itemId]){
			listItem.removeClass( "ui-btn-active" );
			delete(this.selectedItems[itemId]);
		}
		else {
			listItem.addClass( "ui-btn-active" );
			this.selectedItems[itemId]=true;
		}
	}

}