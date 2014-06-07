function saveBill(bill) {
	saveObjToList(bill, bills_info.list_id);
}

function getBill_list() {
	bills = getObj(bills_info.list_id);
	return bills;
}

function getBill(bill_name) {
	bill_list = getBill_list();
	bill = bill_list[bill_name];
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
	item = create("li",{},create("a",{href:"#billPopup",id:bill.id,"data-rel":"popup"},
						create("h3",{class:"bill-name"},bill.id),
						create("p",{class:"bill-summary"},bill.summary),
						create("p",{class:"ui-li-aside bill-total"},create("strong",{},bill.total),bill.currency)),
						create("a",{href:"#",class:"delete",onclick:"plugin_listview.delete_item(this.parentElement)"},"Delete"));
	return item;
}

function fill_participant_list() {

}

function testBillBase() {
	var bills = new Array();
	bills[bills.length] = new Bill("bill1","125","$","summary..",["23452","37642"]);
	bills[bills.length] = new Bill("bill2","145","£","summary..",["23452","64372"]);
	bills[bills.length] = new Bill("bill3","345","$","summary..",["23543","17632","21354"]);
	return bills;
}

function fill_bills_test() {
	bills = testBillBase();
	jQuery.each(bills,function(){$("#billsList").append(billToListItem(this))});
	$("#billsList").listview("refresh");
}