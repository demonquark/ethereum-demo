var pagedata = {
    "resolverContractABI": [{ "constant": true, "inputs": [{ "name": "interfaceID", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "node", "type": "bytes32" }, { "name": "key", "type": "string" }, { "name": "value", "type": "string" }], "name": "setText", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "node", "type": "bytes32" }, { "name": "contentTypes", "type": "uint256" }], "name": "ABI", "outputs": [{ "name": "contentType", "type": "uint256" }, { "name": "data", "type": "bytes" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "node", "type": "bytes32" }, { "name": "x", "type": "bytes32" }, { "name": "y", "type": "bytes32" }], "name": "setPubkey", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "node", "type": "bytes32" }], "name": "content", "outputs": [{ "name": "ret", "type": "bytes32" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "node", "type": "bytes32" }], "name": "addr", "outputs": [{ "name": "ret", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "node", "type": "bytes32" }, { "name": "key", "type": "string" }], "name": "text", "outputs": [{ "name": "ret", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "node", "type": "bytes32" }, { "name": "contentType", "type": "uint256" }, { "name": "data", "type": "bytes" }], "name": "setABI", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "node", "type": "bytes32" }], "name": "name", "outputs": [{ "name": "ret", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "node", "type": "bytes32" }, { "name": "name", "type": "string" }], "name": "setName", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "node", "type": "bytes32" }, { "name": "hash", "type": "bytes32" }], "name": "setContent", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "node", "type": "bytes32" }], "name": "pubkey", "outputs": [{ "name": "x", "type": "bytes32" }, { "name": "y", "type": "bytes32" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "node", "type": "bytes32" }, { "name": "addr", "type": "address" }], "name": "setAddr", "outputs": [], "payable": false, "type": "function" }, { "inputs": [], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "node", "type": "bytes32" }, { "indexed": false, "name": "a", "type": "address" }], "name": "AddrChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "node", "type": "bytes32" }, { "indexed": false, "name": "hash", "type": "bytes32" }], "name": "ContentChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "node", "type": "bytes32" }, { "indexed": false, "name": "name", "type": "string" }], "name": "NameChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "node", "type": "bytes32" }, { "indexed": true, "name": "contentType", "type": "uint256" }], "name": "ABIChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "node", "type": "bytes32" }, { "indexed": false, "name": "x", "type": "bytes32" }, { "indexed": false, "name": "y", "type": "bytes32" }], "name": "PubkeyChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "node", "type": "bytes32" }, { "indexed": true, "name": "indexedKey", "type": "string" }, { "indexed": false, "name": "key", "type": "string" }], "name": "TextChanged", "type": "event" }],
    "resolverContractAddress": "0xefd9340603f635bcab6b2457d7ae57250a7a3add",
    "defaultAccountAddress": "0x14149fad92072e5805e1307502bebd967bcaa13c",
    "defaultAccountPassphrase": "password",
    "rpchost": "http://127.0.0.1:8080"
};
var web3;

$(document).ready(function () {

    // Move to the pay page if we're logged in.
    if (getCookie("loggedin") != 'true' && !($('#login').length > 0)) {
        window.location.href = "http://git.localhost/ethereum/demo/index.html";
    } else if (getCookie("loggedin") == 'true' && $('#login').length > 0) {
        window.location.href = "http://git.localhost/ethereum/demo/pay.html?type=pay";
    } else {
        // skel for the animations
        loadSkel();

        // Create a web3 instance
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            web3 = new Web3(new Web3.providers.HttpProvider(pagedata.rpchost));
        }

        // enable menu
        $('#menu-logout').click(function () { logout(); return false; });

        // page specific code
        if ($('#pay').length > 0) {
            loadPay();
        } else if ($('#login').length > 0) {
            $('#login-form').submit(function () { login(); return false; });
        } else if ($('#history').length > 0) {
            $('#history-form').submit(function () { history(); return false; });
        } else if ($('#register').length > 0) {
            $('#register-form').submit(function () { register(); return false; });
            $('#complete-form').submit(function () { return false; });
            $('#back-btn').click(function () { completeRegistration(); });
        }
    }

});


function loadSkel() {

    // Set break points
    skel.breakpoints({
        xlarge: '(max-width: 1680px)',
        large: '(max-width: 1280px)',
        medium: '(max-width: 980px)',
        small: '(max-width: 736px)',
        xsmall: '(max-width: 480px)'
    });

    // Hack: Enable IE flexbox workarounds.
    if (skel.vars.IEVersion < 12)
        $('body').addClass('is-ie');

    // If animations/transitions aren't available, just load the page.
    if (!skel.canUse('transition'))
        $('body').removeClass('is-loading');

    // Enable animations/transitions once the page has loaded.
    $(window).on('load', function () {
        window.setTimeout(function () {
            $('body').removeClass('is-loading');
        }, 100);
    });

    // Prioritize "important" elements on medium.
    skel.on('+medium -medium', function () {
        $.prioritize(
            '.important\\28 medium\\29',
            skel.breakpoint('medium').active
        );
    });

}

function loadPay() {

    var paymentType = getUrlParameter('type');
    console.log("|" + paymentType + "|");

    // enable interactivity
    $('#pay-form').submit(function () { pay(); return false; });
    $('#verify-form').submit(function () { verifyID(); return false; });
    $('#complete-form').submit(function () { return false; });
    $('#done-btn').click(function () { completePayment(1); });
    $('#register-btn').click(function () { completePayment(2); });
    $('#register2-btn').click(function () { completePayment(2); });
    $('#back-btn').click(function () { completePayment(0); });
    $("#sender").change(function () { getInfo($('#sender').val(), "sender-box"); });
    $("#recipient").change(function () { getInfo($('#recipient').val(), "recipient-box"); });

    if (paymentType == 'pay') {
        // It's the pay page
        $("#menu-pay").addClass("active");
        $('#section-title').text($("#menu-pay").text());
        $("#sender").prop('disabled', true);
        $("#recipient").prop('disabled', false);
        $('#sender').val(getCookie("username"));

    } else if (paymentType == 'collect') {
        // It's the collect page
        $("#menu-collect").addClass("active");
        $('#section-title').text($("#menu-collect").text());
        $("#sender").prop('disabled', false);
        $("#recipient").prop('disabled', true);
        $('#recipient').val(getCookie("username"));

    } else {
        // It's the custom transaction page        
        $("#menu-custom").addClass("active");
        $('#section-title').text($("#menu-custom").text());
        $("#sender").prop('disabled', false);
        $("#recipient").prop('disabled', false);
    }

    // initial triggers
    $('#sender').trigger('change');
    $('#recipient').trigger('change');

}

function getInfo(username, boxid) {

    // whether or not we should query the blockchain
    var paymentType = getUrlParameter('type');
    var validInput = !(paymentType == 'pay' && boxid == 'recipient-box') && !(paymentType == 'collect' && boxid == 'sender-box');
    validInput = validInput || (username.length >= 18 && username.length <= 21 && /^[0-9]+$/.test(username.substr(0, 18)) && /^[a-z0-9]+$/i.test(username));
    console.log("getinfo: " + validInput);

    // default values
    $('#' + boxid + ' span.info-name').text('');
    $('#' + boxid + ' span.info-address').text('');
    $('#' + boxid + ' p.invalid-info').css("display", validInput ? "none" : "inline-block");

    // query the blockchain to get the actual values
    if (validInput) {
        var resolverContract = web3.eth.contract(pagedata.resolverContractABI);
        var resolver = resolverContract.at(pagedata.resolverContractAddress);

        resolver.addr.call(namehash(username), { from: pagedata.defaultAccountAddress }, function (error, result) {
            if (!error && parseInt(result) != 0) {
                $('#' + boxid + ' span.info-address').text(result);
            } else {
                $('#' + boxid + ' p.invalid-info').css("display", "inline-block");
            }
        });
        resolver.text.call(namehash(username), 'name', { from: pagedata.defaultAccountAddress }, function (error, result) {
            if (!error && result != "") {
                $('#' + boxid + ' span.info-name').text(result);
            } else {
                $('#' + boxid + ' p.invalid-info').css("display", "inline-block");
            }
        });
    }
}

function getTransactions(myaccount, startBlockNumber, endBlockNumber) {

    // Default values in case we don't have necessary values
    if (endBlockNumber == null || endBlockNumber < 0) {
        endBlockNumber = web3.eth.blockNumber;
    }
    if (startBlockNumber == null || startBlockNumber < 0) {
        startBlockNumber = endBlockNumber <= 200 ? 0 : endBlockNumber - 200;
    }

    // Update the UI with the total number of blocks scanned
    console.log("address: " + myaccount);
    console.log("blocks: " + startBlockNumber + " - " + endBlockNumber + " (" + (endBlockNumber - startBlockNumber) + ")");

    // Get the transactions from the block
    var count = 0;
    async.whilst(
        function () { return startBlockNumber <= endBlockNumber; },
        function (countTransactions) {
            web3.eth.getBlock(startBlockNumber, true, function (error, block) {
                if (!error && block != null && block.transactions != null) {
                    block.transactions.forEach(function (e) {
                        if ((myaccount == e.from || myaccount == e.to) && (pagedata.defaultAccountAddress != e.from && pagedata.defaultAccountAddress != e.to)) {
                            count++;
                            console.log(startBlockNumber);
                            var time = new Date(block.timestamp * 1000);

                            // Update the UI with the transaction information
                            var tr = "<tr>";
                            tr += "<td>" + e.hash.substr(0, 8) + "&hellip;" + "</td>";
                            tr += "<td>" + e.blockNumber + "</td>";
                            tr += "<td>" + e.from.substr(0, 8) + "&hellip;" + "</td>";
                            tr += "<td>" + e.to.substr(0, 8) + "&hellip;" + "</td>";
                            tr += "<td>" + Number(web3.fromWei(e.value, "kwei").toString()).toFixed(2) + "</td>";
                            tr += "<td>" + time.getUTCFullYear() + "/" + (time.getUTCMonth()+1) + "/" + time.getUTCDate() + " " + time.getUTCHours() + ":" + time.getUTCMinutes() + ":" + time.getUTCSeconds() + "</td>";
                            tr += "</tr>";
                            $("#tx-table tbody").prepend(tr);
                        }
                    })
                }

                // call back function for the end of the while loop
                startBlockNumber++;
                countTransactions(error, count);

            });
        }, function (error, count) {
            $('.invalid2-text').css("display", (count == 0) ? "inline-block" : "none");
            $('#loading-gif').css("display", "none");
            if (!error) {
                console.log("Total number of transactions: " + count);
            } else {
                console.log(error);
            }
        });
}

function pay() {

    // Check if this is a valid input
    var paymentType = getUrlParameter('type');
    var username = paymentType == 'pay' ? $('#recipient').val() : $('#sender').val();
    var validInput = false;
    if (paymentType == 'pay') {
        validInput = (username.length >= 18 && username.length <= 21 && /^[0-9]+$/.test(username.substr(0, 18)) && /^[a-z0-9]+$/i.test(username));
        console.log("menu-pay: validInput = " + validInput);
    } else if (paymentType == 'collect') {
        validInput = (username.length >= 18 && username.length <= 21 && /^[0-9]+$/.test(username.substr(0, 18)) && /^[a-z0-9]+$/i.test(username));
        console.log("menu-collect: validInput = " + validInput);
    } else {
        validInput = true;
        console.log("menu-custom: validInput = " + validInput);
    }

    var sender = $('#sender').val();
    var recipient = $('#recipient').val();
    var value = $('#amount').val();
    var note = $('#note').val();
    var senderaddr = $('#senderaddress').val();
    var recipientaddr = $('#recipientaddress').val();

    console.log("pay: " + paymentType + "|" + sender + "|" + recipient + "|" + value + "|" + note + "|" + senderaddr + "|" + recipientaddr + "|");


    // Look up the account in the registry
    var resolverContract = web3.eth.contract(pagedata.resolverContractABI);
    var resolver = resolverContract.at(pagedata.resolverContractAddress);

    async.waterfall([
        function (callback) {
            // show the loading image
            $('#pay-btn').fadeOut("fast", function () {
                console.log("0.pay.waterfall: " + validInput);
                $('#loading1-gif').fadeIn();
                callback(validInput ? null : new Error(100), validInput ? null : 'input-error');
            });
        },
        function (result1, callback) {
            // verify that the sender is in the registry
            resolver.addr.call(namehash($('#sender').val()), { from: pagedata.defaultAccountAddress }, function (error, result) {
                console.log("1.pay.waterfall: " + namehash($('#sender').val()) + " | " + error + " | " + result);
                if (!error && parseInt(result) != 0) {
                    $('#senderaddress').val(result);
                    callback(null, result);
                } else {
                    callback(!error ? new Error(100) : error, paymentType == 'pay' ? 'input-error' : 'account-error');
                }
            });
        },
        function (result2, callback) {
            // verify that the recipient is in the registry
            resolver.addr.call(namehash($('#recipient').val()), { from: pagedata.defaultAccountAddress }, function (error, result) {
                console.log("2.pay.waterfall: " + namehash($('#recipient').val()) + " | " + error + " | " + result);
                if (!error && parseInt(result) != 0) {
                    $('#recipientaddress').val(result);
                    callback(null, result);
                } else {
                    callback(!error ? new Error(100) : error, paymentType == 'collect' ? 'input-error' : 'account-error');
                }
            });
        },
        function (result3, callback) {
            // verify that the sender has a photohash
            resolver.content.call(namehash(username), { from: pagedata.defaultAccountAddress }, function (error, result) {
                console.log("3.pay.waterfall: " + namehash(username) + " | " + error + " | " + result);
                if (!error && parseInt(result) != 0) {
                    $('#photo-hash').text(result);
                    callback(null, result);
                } else {
                    console.log(error);
                    $('#photo-hash').text('unknown');
                    callback(!error ? new Error(100) : error, 'photohash-error');
                }
            });
        }
    ], function (error, result) {
        console.log("pay.waterfall-final: " + (!error ? "good" : "bad") + " | " + error + " | " + result);
        $('#loading1-gif').fadeOut();
        $('#pay-btn').fadeIn();
        $('#section-payment').fadeOut("fast", function () {
            $('#success-msg-container').css("display", (!error) ? "block" : "none");
            $('#error-msg-container').css("display", (!error) ? "none" : "block");

            if (!error) {
                // log in
                console.log(result);
                $('#back-btn').css("display", "none");
                $('#done-btn').css("display", "inline-block");
                $('#register-btn').css("display", "none");
                $('#register2-btn').css("display", "none");
                $('#section-verify').fadeIn();
            } else {
                // show the error messages
                console.log(error.message + " " + result);
                $('#senderaddress').val('');
                $('#recipientaddress').val('');
                $('.invalid1-text').css("display", (result == 'input-error') ? "inline-block" : "none");
                $('.invalid2-text').css("display", (result == 'account-error') ? "inline-block" : "none");
                $('.invalid3-text').css("display", (result == 'photohash-error') ? "inline-block" : "none");
                $('.invalid4-text').css("display", "none");
                $('#back-btn').css("display", "inline-block");
                $('#done-btn').css("display", "none");
                $('#register-btn').css("display", (result == 'account-error') ? "inline-block" : "none");
                $('#register2-btn').css("display", (result == 'photohash-error') ? "inline-block" : "none");
                $('#section-complete').fadeIn();
            }
        });
    });

}

function verifyID() {
    var sender = $('#sender').val();
    var recipient = $('#recipient').val();
    var value = $('#amount').val();
    var note = $('#note').val();
    var senderaddr = $('#senderaddress').val();
    var recipientaddr = $('#recipientaddress').val();
    var paymentType = getUrlParameter('type');

    console.log("verify: " + paymentType + "|" + sender + "|" + recipient + "|" + value + "|" + web3.toWei(value, "kwei") + "|" + note + "|" + senderaddr + "|" + recipientaddr + "|");

    var resolverContract = web3.eth.contract(pagedata.resolverContractABI);
    var resolver = resolverContract.at(pagedata.resolverContractAddress);

    // send a request to the contract
    async.waterfall([
        function (callback) {
            // show the loading image
            $('#verify-btn').fadeOut("fast", function () {
                console.log("0.verify.waterfall: ");
                $('#loading2-gif').fadeIn();
                callback(null, null);
            });
        },
        function (result1, callback) {
            // get the passphrase to unlock the account
            resolver.text.call(namehash(sender), 'pass', { from: pagedata.defaultAccountAddress }, function (error, result) {
                console.log("1.verify.waterfall: |" + error + "|" + result + "|");
                if (!error && result != "") {
                    callback(null, result);
                } else {
                    callback(new Error(100), 'access-error');
                }
            });
        },
        function (result2, callback) {
            // unlock the account
            $.ajax({
                dataType: "json",
                contentType: "application/json",
                url: pagedata.rpchost,
                method: "POST",
                data: JSON.stringify({ "jsonrpc": "2.0", "method": "personal_unlockAccount", "params": [senderaddr, result2, 60], "id": "1805" }),
                success: function (result) {
                    console.log("2.verify.waterfall: success|" + result + "|" + result['error'] + "|");
                    if (result['error'] == undefined) {
                        callback(null, result);
                    } else {
                        callback(result['error'], 'access-error');
                    }
                },
                error: function (jqxhr, textStatus, error) {
                    console.log("2.verify.waterfall: fail|" + textStatus + "|" + error + "|");
                    callback(new Error("Ajax call for unlockAccount failed."), 'ajax_error');
                }
            });
        },
        function (result3, callback) {
            var transactionobject = { from: senderaddr, to: recipientaddr, value: web3.toWei(value, "kwei") };
            if (note.length > 0) { transactionobject['data'] = web3.toHex(note); }
            web3.eth.sendTransaction(transactionobject, function (error, result) {
                console.log("3.verify.waterfall: |" + error + "|" + result + "|");
                if (!error) {
                    console.log(result);
                    callback(null, result);
                } else {
                    console.log(error);
                    callback(new Error(200), 'transaction-error');
                }
            });
        }
    ], function (error, result) {
        console.log("verify.final.waterfall: |" + error + "|" + result + "|");
        $('#section-verify').fadeOut("fast", function () {
            // load the right info to the complete section
            if (!error) {
                console.log(result)
                $('#summary-txhash').text(result);
                $('#summary-sender-name').text(sender);
                $('#summary-sender-recipient').text(recipient);
                $('#summary-amount').text(value + " RMB");
            } else {
                console.log(error);
                $('.invalid1-text').css("display", "none");
                $('.invalid2-text').css("display", "none");
                $('.invalid3-text').css("display", "none");
                $('.invalid4-text').css("display", "inline-block");
                $('#back-btn').css("display", "inline-block");
                $('#done-btn').css("display", "none");
                $('#register-btn').css("display", "none");
                $('#register2-btn').css("display", "none");
                $('#section-complete').fadeIn();
            }

            // get rid of the loading image
            $('#loading2-gif').fadeOut();
            $('#verify-btn').fadeIn();
            $('#success-msg-container').css("display", (!error) ? "block" : "none");
            $('#error-msg-container').css("display", (!error) ? "none" : "block");
            $('#section-complete').fadeIn();
        });

    });

}

function completePayment(choice = 0) {

    var paymentType = getUrlParameter('type');

    if (choice == 1) {
        $('#senderaddress').val('');
        $('#recipientaddress').val('');
        $('#amount').val('0');
        if (paymentType != 'pay') { $('#sender').val(''); }
        if (paymentType != 'collect') { $('#recipient').val(''); }
        $('#note').val('');

    }

    if (choice < 2) {
        $('#section-complete').fadeOut("fast", function () {
            $('#section-payment').fadeIn();
        });
    } else {
        window.location.href = "http://git.localhost/ethereum/demo/register.html";
    }
}

function history() {

    $("#tx-table tbody tr").not("#tr-empty").remove();
    $('#loading-gif').css("display", "inline-block");
    $('.invalid1-text').css("display", "none");
    $('.invalid2-text').css("display", "none");
    $('.invalid3-text').css("display", "none");

    // Look up the account in the registry
    var resolverContract = web3.eth.contract(pagedata.resolverContractABI);
    var resolver = resolverContract.at(pagedata.resolverContractAddress);

    // send a request to the contract
    async.waterfall([
        function (callback) {
            // find the address
            resolver.addr.call(namehash($('#personid').val()), { from: pagedata.defaultAccountAddress }, function (error, result) {
                console.log("0.history.waterfall: |" + error + "|" + result + "|");
                if (!error && parseInt(result) != 0) {
                    $('#personaddress').val(result);
                    callback(null, result);
                } else {
                    callback(new Error(100), 'account-error');
                }
            });
        },
        function (result1, callback) {
            // get the number of the last block
            web3.eth.getBlockNumber(function (error, result) {
                console.log("1.history.waterfall: |" + error + "|" + result + "|");
                if (!error) {
                    callback(null, result);
                } else {
                    callback(new Error(200), 'transaction-error');
                }
            });
        }
    ], function (error, result) {
        // load the transactions
        console.log("history.final.waterfall: |" + error + "|" + result + "|");
        $('.invalid1-text').css("display", (result == 'account-error') ? "inline-block" : "none");
        $('.invalid2-text').css("display", "none");
        $('.invalid3-text').css("display", (result == 'transaction-error') ? "inline-block" : "none");

        if (!error) {
            console.log(result)
            getTransactions($('#personaddress').val(), result - 300, result);
        } else {
            console.log(error);
            $('#loading-gif').css("display", "none");
        }
    });

}

function register() {
    var username = $('#personid').val();
    var personname = $('#personname').val();
    var password = (Math.random() + 1).toString(36).substr(2) + Math.random().toString(36).substr(2);
    var passphrase = (Math.random() + 1).toString(36).substr(2) + Math.random().toString(36).substr(2);
    var address = null;

    var validInput = personname.trim().length > 0 && (username.length >= 18 && username.length <= 21 && /^[0-9]+$/.test(username.substr(0, 18)) && /^[a-z0-9]+$/i.test(username));
    console.log("register: validInput = " + validInput + "|" + username + "|" + personname + "|" + password + "|" + passphrase);

    if (validInput) {

        // Look up the account in the registry
        var resolverContract = web3.eth.contract(pagedata.resolverContractABI);
        var resolver = resolverContract.at(pagedata.resolverContractAddress);

        // send a request to the contract
        async.waterfall([
            function (callback) {
                // show the loading image
                $('#register-btn').fadeOut("fast", function () {
                    console.log("0.register.waterfall: ");
                    $('#loading-gif').fadeIn();
                    callback(null, null);
                });
            },
            function (result1, callback) {
                // check to see if the account already exists
                resolver.addr.call(namehash(username), { from: pagedata.defaultAccountAddress }, function (error, result) {
                    console.log("1.register.waterfall: |" + error + "|" + result + "|");
                    if (!error && parseInt(result) != 0) {
                        callback(new Error(100), 'duplicate-error');
                    } else {
                        callback(null, result);
                    }
                });
            },
            function (result2, callback) {
                // unlock the default account
                $.ajax({
                    dataType: "json",
                    contentType: "application/json",
                    url: pagedata.rpchost,
                    method: "POST",
                    data: JSON.stringify({ "jsonrpc": "2.0", "method": "personal_unlockAccount", "params": [pagedata.defaultAccountAddress, pagedata.defaultAccountPassphrase, 120], "id": "1806" }),
                    success: function (result) {
                        console.log("2.register.waterfall: success|" + result + "|" + result['error'] + "|");
                        if (result['error'] == undefined) {
                            callback(null, result);
                        } else {
                            callback(result['error'], 'transaction-error');
                        }
                    },
                    error: function (jqxhr, textStatus, error) {
                        console.log("2.register.waterfall: fail|" + textStatus + "|" + error + "|");
                        callback(new Error("Ajax call for unlockAccount failed."), 'ajax_error');
                    }
                });
            },
            function (result3, callback) {
                // create a new account
                $.ajax({
                    dataType: "json",
                    contentType: "application/json",
                    url: pagedata.rpchost,
                    method: "POST",
                    data: JSON.stringify({ "jsonrpc": "2.0", "method": "personal_newAccount", "params": [passphrase], "id": "1807" }),
                    success: function (result) {
                        console.log("3.register.waterfall:success |" + result.result + "|");
                        callback(null, result.result);
                    },
                    error: function (jqxhr, textStatus, error) {
                        console.log("3.register.waterfall:fail |" + textStatus + "|");
                        console.log("Request Failed: " + textStatus + ", " + error);
                        callback(new Error(100), 'transaction-error');
                    }
                });
            }
        ], function (error, result) {
            console.log("register.final.waterfall: |" + error + "|" + result + "|");
            // load the right info to the complete section
            if (!error) {

                console.log(result);
                $('#summary-personid').text(username);
                $('#summary-address').text(result);
                $('#summary-password').text(password);

                async.parallel([
                    function (callback) {
                        resolver.setAddr.sendTransaction(namehash(username), result, { from: pagedata.defaultAccountAddress }, function (error, result) {
                            console.log("0.register.parallel: |" + error + "|" + result + "|");
                            callback((!error) ? null : error, result);
                        });
                    },
                    function (callback) {
                        resolver.setContent.sendTransaction(namehash(username), namehash(password), { from: pagedata.defaultAccountAddress }, function (error, result) {
                            console.log("1.register.parallel: |" + error + "|" + result + "|");
                            callback((!error) ? null : error, result);
                        });
                    },
                    function (callback) {
                        resolver.setText.sendTransaction(namehash(username), 'name', personname, { from: pagedata.defaultAccountAddress }, function (error, result) {
                            console.log("2.register.parallel: |" + error + "|" + result + "|");
                            callback((!error) ? null : error, result);
                        });
                    },
                    function (callback) {
                        resolver.setText.sendTransaction(namehash(username), 'pass', passphrase, { from: pagedata.defaultAccountAddress }, function (error, result) {
                            console.log("3.register.parallel: |" + error + "|" + result + "|");
                            callback((!error) ? null : error, result);
                        });
                    },
                    function (callback) {
                        web3.eth.sendTransaction({ from: pagedata.defaultAccountAddress, to: result, value: web3.toWei(5, "ether") }, function (error, result) {
                            console.log("4.register.parallel: |" + error + "|" + result + "|");
                            if (!error) {
                                callback(null, result);
                            } else {
                                console.log(error);
                                callback(new Error(200), 'transaction-error');
                            }
                        });
                    }
                ],
                    // optional callback
                    function (error, results) {
                        console.log(results);
                        console.log(error);
                        $('#section-register').fadeOut("fast", function () {
                            $('#success-msg-container').css("display", (!error) ? "block" : "none");
                            $('#error-msg-container').css("display", (!error) ? "none" : "block");
                            $('.invalid1-text').css("display", "none");
                            $('.invalid2-text').css("display", "none");
                            $('.invalid3-text').css("display", (!error) ? "none" : "inline-block");
                            $('#section-complete').fadeIn();
                        });
                    });
            } else {
                console.log(error);
                $('#section-register').fadeOut("fast", function () {
                    $('#success-msg-container').css("display", "none");
                    $('#error-msg-container').css("display", "block");
                    $('.invalid1-text').css("display", "none");
                    $('.invalid2-text').css("display", (result == 'duplicate-error') ? "inline-block" : "none");
                    $('.invalid3-text').css("display", (result == 'transaction-error') ? "inline-block" : "none");
                    $('#section-complete').fadeIn();
                });
            }
        });

    } else {
        // go to the failure page
        $('#section-register').fadeOut("fast", function () {
            $('#success-msg-container').css("display", "none");
            $('#error-msg-container').css("display", "block");
            $('.invalid1-text').css("display", "inline-block");
            $('.invalid2-text').css("display", "none");
            $('.invalid3-text').css("display", "none");
            $('#section-complete').fadeIn();
        });
    }
}

function completeRegistration() {
    $('#section-complete').fadeOut("fast", function () {
        $('#loading-gif').fadeOut();
        $('#register-btn').fadeIn();
        $('#section-register').fadeIn();
    });

}

function logout() {
    document.cookie = "username=;"
    document.cookie = "password=;"
    document.cookie = "address=;"
    document.cookie = "loggedin=false;"
    window.location.href = "http://git.localhost/ethereum/demo/index.html";
}

function login() {

    // Validate inputs (must not be empty)
    var username = $('#name').val();
    var password = $('#password').val();
    var validInput = username.trim().length > 0 && password.trim().length > 0;

    // Look up the account in the registry
    var resolverContract = web3.eth.contract(pagedata.resolverContractABI);
    var resolver = resolverContract.at(pagedata.resolverContractAddress);
    async.waterfall([
        function (callback) {
            // show the loading image
            $('#login-btn').fadeOut("fast", function () {
                $('#loading-gif').fadeIn();
                $('#error-msg-container').fadeOut("fast");
                callback(validInput ? null : new Error(100), validInput ? null : 'input-error');
            });
        },
        function (result1, callback) {
            // verify that the name is in the registry
            resolver.addr.call(namehash(username), { from: pagedata.defaultAccountAddress }, function (error, result) {
                if (!error && parseInt(result) != 0) {
                    callback(null, result);
                } else {
                    callback(!error ? new Error(100) : error, 'addr-error');
                }
            });
        },
        function (result2, callback) {
            // verify that the password is in the registry
            resolver.content.call(namehash(username), { from: pagedata.defaultAccountAddress }, function (error, result) {
                if (!error && namehash(password) == result) {
                    callback(null, result2);
                } else {
                    callback(!error ? new Error(100) : error, 'content-error');
                }
            });
        }
    ], function (error, result) {
        if (!error) {
            // log in
            console.log(result);
            document.cookie = "username=" + username + ";"
            document.cookie = "password=" + password + ";"
            document.cookie = "address=" + result + ";"
            document.cookie = "loggedin=true;"
            window.location.href = "http://git.localhost/ethereum/demo/pay.html?type=pay";

        } else {
            // show the error messages
            console.log(error.message + " " + result);
            $('.invalid1-text').css("display", result == 'addr-error' ? "block" : "none");
            $('.invalid2-text').css("display", result == 'content-error' ? "block" : "none");
            $('.invalid3-text').css("display", result == 'input-error' ? "block" : "none");

            // show the login button
            $('#loading-gif').fadeOut("fast", function () {
                $('#login-btn').fadeIn();
                $('#error-msg-container').fadeIn();
            });

        }
    });

}