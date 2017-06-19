(function ($) {
	/**
	 * Moves elements to/from the first positions of their respective parents.
	 * @param {jQuery} $elements Elements (or selector) to move.
	 * @param {bool} condition If true, moves elements to the top. Otherwise, moves elements back to their original locations.
	 */
	$.prioritize = function ($elements, condition) {

		var key = '__prioritize';

		// Expand $elements if it's not already a jQuery object.
		if (typeof $elements != 'jQuery')
			$elements = $($elements);

		// Step through elements.
		$elements.each(function () {

			var $e = $(this), $p,
				$parent = $e.parent();

			// No parent? Bail.
			if ($parent.length == 0)
				return;

			// Not moved? Move it.
			if (!$e.data(key)) {

				// Condition is false? Bail.
				if (!condition)
					return;

				// Get placeholder (which will serve as our point of reference for when this element needs to move back).
				$p = $e.prev();

				// Couldn't find anything? Means this element's already at the top, so bail.
				if ($p.length == 0)
					return;

				// Move element to top of parent.
				$e.prependTo($parent);

				// Mark element as moved.
				$e.data(key, $p);

			}

			// Moved already?
			else {

				// Condition is true? Bail.
				if (condition)
					return;

				$p = $e.data(key);

				// Move element back to its original location (using our placeholder).
				$e.insertAfter($p);

				// Unmark element as moved.
				$e.removeData(key);

			}

		});

	};

})(jQuery);

function namehash(name) {
    var node = '0x0000000000000000000000000000000000000000000000000000000000000000';
    if (name != '') {
        var labels = name.split(".");
        for(var i = labels.length - 1; i >= 0; i--) {
            node = web3.sha3(node + web3.sha3(labels[i]).slice(2), {encoding: 'hex'});
        }
    }
    return node.toString();
}


function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(cname) {
    return getCookie(cname) != "";
} 