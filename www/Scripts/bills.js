var selectedBill = false;

function clickOnBill(bill_id) {
	selectedBill = bill_id;
}

function saveBill(bill) {
	saveObjToList(bill, bills_info.list_id);
}

function getBill_list() {
	bills = getObj(bills_info.list_id);
	return bills;
}

function getBill(bill_name) {
	bills = getBill_list();
	var bill;
	jQuery.each(bills,function(){
		if(this.id==bill_name) {
			bill=this;
		}
	});
	return bill;
}

function getCachedbill(bill_name) {
	bills=testBillBase();
	var bill;
	jQuery.each(bills,function(){
		if(this.id==bill_name) {
			bill=this;
		}
	});
	return bill;
}

function billToListItem(bill) {
	item = create("li",{},create("a",{href:"#billPopup",id:bill.id,onclick:"clickOnBill(this.id)","data-rel":"popup"},
						create("h3",{class:"bill-name"},bill.id),
						create("p",{class:"bill-summary"},bill.summary),
						create("p",{class:"ui-li-aside bill-total"},create("strong",{},bill.total),bill.currency)),
						create("a",{href:"#",class:"delete",onclick:"plugin_listview.delete_item(this.parentElement)"},"Delete"));
	return item;
}

function fill_bill_details() {
	$("#bill-name").children("p").remove();
	$("#bill-total").children("p").remove();
	$("#bill-summary").children("p").remove();
	$("#bill-participants").find('li').remove();
	
	bill=getBill(selectedBill);
	$("#bill-name").append(create("p",{class:"bill-name"},bill.id));
	$("#bill-total").append(create("p",{class:"bill-total"},create("strong",{},bill.total),bill.currency));
	$("#bill-summary").append(create("p",{class:"bill-summary"},bill.summary));
	
	participant_ids=bill.participants;
	var participants = getContacts(participant_ids);
	
	jQuery.each(participants,function(){
		$("#bill-participants").append(create("li",{},
				create("a",{href:"#",onclick:"plugin_listview.listItemMultiSelect(this.id)","data-theme":"c",id:this.uid,"data-icon":"carat-r"},
				this.first_name+' '+this.last_name)));
	});
	$("#bill-participants").listview("refresh");
	selectedBill=false;
}

function testBillBase() {
	var bills = new Array();
	bills[bills.length] = new Bill("bill1","125","$","summary..",["16907986"]);
	bills[bills.length] = new Bill("bill2","145","£","summary..",["12099300","16907986"]);
	bills[bills.length] = new Bill("bill3","345","$","summary..",["985727","12099300"]);
	return bills;
}

function fill_bills_test() {
	bills = testBillBase();
	jQuery.each(bills,function(){$("#billsList").append(billToListItem(this))});
	$("#billsList").listview("refresh");
}