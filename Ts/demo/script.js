


var globalTimeoutForSpinTextInput = null;

$(function () {
    var appState = {
        loading: true,
        success: true,
        message: '',
        caret: 0
    };



    function setValues(input, spinner) {
        if (spinner !== null) {

            $("#spintext-input").val(input); // why?


            var result = spinner.toString(),
                delimiter = '\n',
                values = result.split(delimiter),
                title = values.shift(),
                body = values.join(delimiter).toHtml();


            $("#spintext-title").html(title);
            $("#spintext-result").html(body);


            console.log(
                JSON.stringify(spinner.toArrayString(), function (name, val) {

                    console.log(name);
                    console.log(val);

                    //if (val && val.constructor === 'function') {
                    //    console.log('is simple text', val);
                    //    //return val.toString();
                    //} else if (name === '_rnd') { // 
                    //    console.log('remove', name);
                    //    //return undefined; // remove from result
                    //} else if (name === '_level') { // 
                    //    console.log('remove', name);
                    //    //return undefined; // remove from result
                    //} else {
                    //    console.log('pure', val);
                    //    //return val; // return as is
                    //}

                    return val;

                })
            );



            $("#spintext-variants").text(Math.floor(spinner.countVariants()));
            

            var min = spinner.countMinWords(),
                max = spinner.countMaxWords();

            console.log(min, max);

            $("#spintext-min-words").text(min);
            $("#spintext-max-words").text(max);

            $("#spintext-result").unmark().mark('iPhone');


        }
    }

    function setAppStates(exceptionMessage) {
        // Unexpected } at position 1827
        // { at position 0 is unmatched
        console.log(exceptionMessage);
        console.log(typeof (exceptionMessage));
        //if ('object' === typeof (exceptionMessage))
        //    return;
        var isError = exceptionMessage.substr(0, 12) === 'Unexpected }' || exceptionMessage.substr(0, 13) === '{ at position';
        if (isError) {
            var values = exceptionMessage.split(' '),
                idx = values.length === 5 ? 4 : 3,
                num = Number(values[idx]),
                isError = num !== NaN;
            if (isError) {
                appState.success = !isError;
                appState.message = exceptionMessage;
                appState.caret = num;
            }

            $("#spintext-result").html(exceptionMessage || '-');
            $("#spintext-variants").text('-');
            $("#spintext-min-words").text('-');
            $("#spintext-max-words").text('-');

        } else {
            appState.success = true;
            appState.message = '';
            //appState.caret = 0;

        }

        // handle errors
        if (!appState.success) {
            // show error alert
            $('#spintext-error').html(appState.message).addClass('in');
            // highlight opening or closing char taht created error
            $('#spintext-input').selectRange(appState.caret, appState.caret + 1);
            //$('#spintext-input').caret(appState.caret);

        }
        // hide errors
        else {
            $('#spintext-error').removeClass('in');
        }
    }

    function proccess(spinText, seed) {
        var state = '';
        try {
            var spinner = new SpinTexter.TextSpinner(spinText, new SpinTexter.ParserConfig(!!seed ? seed : -1));
            setValues(spinText, spinner);
            setAppStates(state);
        }
        catch (e) {
            setAppStates(e);
        }
        finally {
        }
    }

    $.get("spintext.txt", function (data) {

        proccess(data);

        $(document)
            .on('click', '.process-spin', function (e) {
                proccess($('#spintext-input').val());
            })
            .on('keyup', '#spintext-input', function (e) {
                key = window.event ? event.keyCode : e.keyCode;
                var ignoreKeys = [
                    16, //shift	16
                    17, //ctrl	17
                    18, //alt	18
                    19, //pause/break	19
                    20, //caps lock	20
                    27, //escape	27
                    33, //page up	33
                    34, //page down	34
                    35, //end	35
                    36, //home	36
                    37, //left arrow	37
                    38, //up arrow	38
                    39, //right arrow	39
                    40 //down arrow	40
                ];
                // if is not ignoreKey
                if (ignoreKeys.indexOf(key) === -1) {
                    var el = $(this);
                    if (globalTimeoutForSpinTextInput != null)
                        clearTimeout(globalTimeoutForSpinTextInput);
                    globalTimeoutForSpinTextInput = setTimeout(function () {
                        globalTimeoutForSpinTextInput = null;
                        proccess(el.val());
                    }, 300);
                }

                appState.caret = $('#spintext-input').caret('pos');
                $('#spintext-input-caret-position').text(appState.caret);

            })
            .on('mousedown mouseup', '#spintext-input', function (e) {
                appState.caret = $('#spintext-input').caret('pos');
                $('#spintext-input-caret-position').text(appState.caret); 
            })
            .on('change paste cut', '#spintext-input', function (e) {
                $(this).height(0).height(this.scrollHeight);
            });


        $('#spintext-input').change();

    });

    $('[data-toggle="tooltip"]').tooltip();

});