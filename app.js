function updateContactList() {
	cozysdk.defineRequest('Contact', 'all', 'function(doc) { emit(doc.n); }', function(err, res) {
		if (err != null) {
			return alert(err);
		} else {
			cozysdk.run('Contact', 'all', {}, function(err, res) {
				if (err != null) {
					return alert(err);
				} else {
					var contacts = JSON.parse("" + res);
					contacts.forEach(function(contactName) {
						contactName.key = contactName.key.replace(/ /g, '\u00a0');
					});
					render(contacts);
				}
			});
		}
	});
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
