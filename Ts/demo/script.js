$(function () {
    
    var
        IGNORE_KEYS = [
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
        ],
        SPINTEXT_INPUT = '#spintext-input',
        SPINTEXT_ERROR = '#spintext-error',
        SPINTEXT_RESULT_TITLE = '#spintext-title',
        SPINTEXT_RESULT_BODY = '#spintext-result',
        SPINTEXT_RESULT_VARIANTS = '#spintext-variants',
        SPINTEXT_RESULT_MIN_WORDS = '#spintext-min-words',
        SPINTEXT_RESULT_MAX_WORDS = '#spintext-max-words',
        SPINTEXT_INPUT_CARET_POS = '#spintext-input-caret-position',
        PLAINTEXT_LINE_SEP = '\n'

    var timeoutForSpinTextInput = null;

    var appState = {
        loading: true,
        success: true,
        message: '',
        caret: 0
    };

    function setValues(input, spinner) {
        if (spinner !== null) {

            $(SPINTEXT_INPUT).val(input); 

            var result = spinner.toString(),
                values = result.split(PLAINTEXT_LINE_SEP),
                title = values.shift(),
                body = values.join(PLAINTEXT_LINE_SEP).toHtml(),
                min = spinner.countMinWords(),
                max = spinner.countMaxWords();

            $(SPINTEXT_RESULT_TITLE).html(title);
            $(SPINTEXT_RESULT_BODY).html(body);
            $(SPINTEXT_RESULT_VARIANTS).text(spinner.countVariants());
            $(SPINTEXT_RESULT_MIN_WORDS).text(min);
            $(SPINTEXT_RESULT_MAX_WORDS).text(max);
            $(SPINTEXT_RESULT_BODY).unmark().mark('iPhonen');
        }
    }

    function setAppStates(exceptionMessage) {

        // Unexpected } at position 1827
        // { at position 0 is unmatched
        //console.log(exceptionMessage);
        //console.log(typeof (exceptionMessage));

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

            $(SPINTEXT_RESULT_BODY).html(exceptionMessage || '-');
            $(SPINTEXT_RESULT_VARIANTS).text('-');
            $(SPINTEXT_RESULT_MIN_WORDS).text('-');
            $(SPINTEXT_RESULT_MAX_WORDS).text('-');

        } else {
            appState.success = true;
            appState.message = '';
            //appState.caret = 0;
        }

        // handle errors
        if (!appState.success) {
            // show error alert
            $(SPINTEXT_ERROR).html(appState.message).addClass('in');
            // highlight opening or closing char taht created error
            $(SPINTEXT_INPUT).selectRange(appState.caret, appState.caret + 1);
            //$(SPINTEXT_INPUT).caret(appState.caret);
        }
        // hide errors
        else {
            $(SPINTEXT_ERROR).removeClass('in');
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
                proccess($(SPINTEXT_INPUT).val());
            })
            .on('keyup', SPINTEXT_INPUT, function (e) {
                key = window.event ? event.keyCode : e.keyCode;
                if (IGNORE_KEYS.indexOf(key) === -1) {
                    var el = $(this);
                    if (timeoutForSpinTextInput != null)
                        clearTimeout(timeoutForSpinTextInput);

                    timeoutForSpinTextInput = setTimeout(function () {
                        timeoutForSpinTextInput = null;
                        proccess(el.val());
                    }, 300);
                }
                appState.caret = $(SPINTEXT_INPUT)
                    .caret('pos');
                $(SPINTEXT_INPUT_CARET_POS)
                    .text(appState.caret);
            })
            .on('mousedown mouseup', SPINTEXT_INPUT, function (e) {
                appState.caret = $(SPINTEXT_INPUT)
                    .caret('pos');
                $(SPINTEXT_INPUT_CARET_POS)
                    .text(appState.caret);
            })
            .on('change paste cut', SPINTEXT_INPUT, function (e) {
                $(this)
                    .height(0)
                    .height(this.scrollHeight);
            });

        $(SPINTEXT_INPUT).change();

    });

    $('[data-toggle="tooltip"]').tooltip();

});