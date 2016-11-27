function updateContactList() {
	cozysdk.defineRequest('BankOperation', 'all', 'function(doc) {emit(doc.date);}', function(err, res) {
		if (err != null) {
			return alert(err);
		} else {
			cozysdk.run('BankOperation', 'all', {"include_docs":true,"startkey":"2016-01","endkey":"2016-02"}, function(err, res) {
				if (err != null) {
					return alert(err);
				} else {
					var operations = JSON.parse("" + res);
					operations.forEach(function(operations) {
						amount.key = amount.key.replace(/ /g, '\u00a0');
					});
					render(operations);
				}
			});
		}
	});
}

function render(operations) {
	var i;
	var HTML = '';
	for (i = 0; i < operations.length; i++) {
		var template = '<tr data-id="' + operations[i].id + '">' 
		+ '<td><label>' + operations[i].key + '</label></td>' 
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
