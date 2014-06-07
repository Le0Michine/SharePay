function saveDebt(debt) {
	saveObjToList(debt, debts_info.list_id);
} 

function getDebt_list() {
	debts = getObj(debts_info.list_id);
	return debts;
}

function getDebt(debt_name) {
	debt_list = getDebt_list();
	debt = debt_list[debt_name];
	return debt;
}

function getCachedDebt(debt_name) {
	debts=testDebtBase();
	var debt;
	jQuery.each(debts,function(){
		if(this.id==debt_name) {
			debt=this;
		}
	});
	return debt;
}

function debtToListItem(debt) {
	item = create("li",{},create("a",{href:"#",id:debt.id,onclick:"fillDebtDetails(this)"},
						create("h3",{class:"debt-name"},debt.id),
						create("p",{class:"debt-owner"},create("strong",{},debt.owner)),
						create("p",{class:"debt-summary"},create("strong",{},debt.summary)),
						create("p",{class:"ui-li-aside debt-share"},create("strong",{},debt.share),debt.currency)),
						create("a",{href:"#",class:"delete",onclick:"plugin_listview.delete_item(this.parentElement)"},"Delete"));
	return item;
}

function testDebtBase() {
	var debts = new Array();
	debts[debts.length] = new Debt("debt1","Rob","234134","23","3","$","summary..");
	debts[debts.length] = new Debt("debt2","Tom","544234","145","15","£","summary..");
	debts[debts.length] = new Debt("debt3","Sam","564213","345","34","$","summary..");
	return debts;
}

function fill_debts_test() {
	debts = testDebtBase();
	jQuery.each(debts,function(){$("#debtsList").append(debtToListItem(this))});
	$("#debtsList").listview("refresh");
}

function fillDebtDetails(item){
	$("#debt-name").children("p").remove();
	$("#debt-owner").children("p").remove();
	$("#debt-total").children("p").remove();
	$("#debt-share").children("p").remove();
	$("#debt-summary").children("p").remove();
	debt=getCachedDebt(item.id);
	$("#debt-name").append(create("p",{class:"debt-name"},debt.id));
	$("#debt-owner").append(create("p",{class:"debt-owner"},debt.owner));
	$("#debt-total").append(create("p",{class:"debt-total"},create("strong",{},debt.total),debt.currency));
	$("#debt-share").append(create("p",{class:"debt-share"},create("strong",{},debt.share),debt.currency));
	$("#debt-summary").append(create("p",{class:"debt-summary"},debt.summary));
	
	$.mobile.changePage('#DebtDetails');
}