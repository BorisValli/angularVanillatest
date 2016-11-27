function updateContactList() {
	cozysdk.defineRequest('BankOperation', 'all', 'function(doc) { emit(doc.n); }', function(err, res) {
		if (err != null) {
			return alert(err);
		} else {
			cozysdk.run('BankOperation', 'all', {}, function(err, res) {
				if (err != null) {
					return alert(err);
				} else {
					var contacts = JSON.parse("" + res);
					contacts.forEach(function(operations) {
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

function render(contacts) {
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
