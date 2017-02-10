function updateContactList() {
	cozysdk.defineRequest('BankOperation', 'all', 'function(doc) {emit(doc.date);}', function(err, res) {
		if (err != null) {
			return alert(err);
		} else {
			cozysdk.run('BankOperation', 'all', {"include_docs":true,"startkey":"2016-01","endkey":"2016-02"}, function(err, operations) {
				if (err != null) {
					return alert(err);
				} else {
					operations = JSON.parse("" + operations);	
					//operations.forEach(function(operation) {
					//	operations.doc.amount = operation.doc.amount;
					//});
					render(operations);
				}
			});
		}
	});
}

function solde() {
	cozysdk.defineRequest('BankOperation', 'all', 'function(doc) {emit(doc.date);}', function(err, res) {
		if (err != null) {
			return alert(err);
		} else {
//			cozysdk.run('BankOperation', 'all', {"include_docs":true,"startkey":"2016-11","endkey":"2016-12"}, function(err, operations) {
			cozysdk.run('BankOperation', 'all', {"include_docs":true,}, function(err, operations) {
				if (err != null) {
					return alert(err);
				} else {

					operations = JSON.parse("" + operations);
					//operations.forEach(function(operation) {
					//	operations.doc.amount = operation.doc.amount;
					//});
					soldeop(operations);
				}
			});
		}
	});
}

function soldeMoisPrecedent() {
	cozysdk.defineRequest('BankOperation', 'all', 'function(doc) {emit(doc.date);}', function(err, res) {
		if (err != null) {
			return alert(err);
		} else {
//			cozysdk.run('BankOperation', 'all', {"include_docs":true,"startkey":"2016-11","endkey":"2016-12"}, function(err, operations) {
			cozysdk.run('BankOperation', 'all', {"include_docs":true,"endkey":"2016-11"}, function(err, operations) {
				if (err != null) {
					return alert(err);
				} else {

					operations = JSON.parse("" + operations);	
					//operations.forEach(function(operation) {
					//	operations.doc.amount = operation.doc.amount;
					//});
					soldeopMoiPrecedent(operations);
		

				}
			});
		}
	});
}


var extra = 0;

function soldeTotal(callback) {
cozysdk.defineRequest('BankOperation', 'all', 'function(doc) {emit(doc.date);}', function(err, res) {
		if (err != null) {
			return alert(err);
		} else {
//			cozysdk.run('BankOperation', 'all', {"include_docs":true,"startkey":"2016-11","endkey":"2016-12"}, function(err, operations) {
			cozysdk.run('BankOperation', 'all', {"include_docs":true,}, function(err, operations) {
				if (err != null) {
					return alert(err);
				} else {

					operations = JSON.parse("" + operations);
					//operations.forEach(function(operation) {
					//	operations.doc.amount = operation.doc.amount;
					//});
					extra = soldeopb(operations);
					callback();
				}
			});
		}
	});
}

function soldeMoisPrec(callback) {

cozysdk.defineRequest('BankOperation', 'all', 'function(doc) {emit(doc.date);}', function(err, res) {
		if (err != null) {
			return alert(err);
		} else {
//			cozysdk.run('BankOperation', 'all', {"include_docs":true,"startkey":"2016-11","endkey":"2016-12"}, function(err, operations) {
			cozysdk.run('BankOperation', 'all', {"include_docs":true,"endkey":"2016-11"}, function(err, operations) {
				if (err != null) {
					return alert(err);
				} else {

					operations = JSON.parse("" + operations);	
					//operations.forEach(function(operation) {
					//	operations.doc.amount = operation.doc.amount;
					//});
					extra -= soldeopMoiPrecedentb(operations);
					callback();
		
				}
			});
		}
	});
}

function calculateExtra() {

soldeTotal(function() {	
	soldeMoisPrec(function() {

		var HTML= '';
		var template = 'Extra = '+ extra;
		HTML = HTML + template;
		document.querySelector('.extra').innerHTML = HTML;

	})
});
}

function soldeopb(operations)
{
	var solde = 0;
	for (i = 0; i < operations.length; i++)
	{
		solde += operations[i].doc.amount;
	}
return (solde);
}

function soldeopMoiPrecedentb(operations)
{
	var solde = 0;
	for (i = 0; i < operations.length; i++)
	{
		solde += operations[i].doc.amount;
	}
return (solde);
}

function soldeop(operations)
{
	var solde = 0;
	var HTML = '';
	for (i = 0; i < operations.length; i++)
	{
		solde += operations[i].doc.amount;
	}
	var aff = '<h1> Solde : '+ solde + '<h1>';
	HTML = HTML + aff;
	document.querySelector('.solde').innerHTML = HTML;
return (solde);
}

function soldeopMoiPrecedent(operations)
{
	var solde = 0;
	var HTML = '';
	for (i = 0; i < operations.length; i++)
	{
		solde += operations[i].doc.amount;
	}
	var aff = '<h1>Au mois précédent tu avais : '+ solde + '<h1>';
	HTML = HTML + aff;
	document.querySelector('.soldeMoiPrecedent').innerHTML = HTML;
return (solde);
}

function render(operations) {
	var i;
	var HTML = '';
	for (i = 0; i < operations.length; i++) {
		console.log(operations[i]);
		var template = '<tr data-id="' + operations[i].id + '">' 
		+ '<td><label>' + operations[i].doc.amount + '</label></td>' 
		+ '</tr>';
		HTML = HTML + template;
	}
	document.querySelector('.operation-list').innerHTML = HTML;
}

function renderb(contacts) {
	var i;
	var HTML = '';
	for (i = 0; i < contacts.length; i++) {
		var template = '<tr data-id="' + contacts[i].id + '">' 
		+ '<td><label>' + contacts[i].key + '</label></td>' 
		+ '</tr>';
		HTML = HTML + template;
	}
	document.querySelector('.contact-list').innerHTML = HTML;
}


document.addEventListener("DOMContentLoaded", updateContactList);
document.addEventListener("DOMContentLoaded", solde);
document.addEventListener("DOMContentLoaded", soldeMoisPrecedent);
document.addEventListener("DOMContentLoaded", calculateExtra);


