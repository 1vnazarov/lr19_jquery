const manageMessage = (parent, isShow) => {
    const message = parent.next('.invalid');
    if (isShow) {
        message.stop().css('visibility', 'visible').animate({ opacity: 1 }, 500);
    }
    else {
        message.stop().animate({ opacity: 0 }, 500, function () {
            $(this).css('visibility', 'hidden');
        });
    }
}

const validateFormMessage = (element, pattern) => {
    $(element).on("input", function () {
        const input = $(this);
        const val = input.val();
        const is_valid = pattern ? pattern.test(val) : true;
        if (is_valid && val !== '') {
            manageMessage(input, false);
            input.data('valid', true);
        }
        else {
            manageMessage(input, true);
            input.data('valid', false);
        }
        manageMessage($('button'), false);
    });
}

$(function () {
    validateFormMessage('#tel', /^\+\d+(-\d+)+$/);
    validateFormMessage('#pass');
});

const authRequest = () => {
    if (!$('#tel').data('valid') || !$('#pass').data('valid')) {
        manageMessage($('button'), true);
        return;
    }

    $.ajax({
        url: "http://busstation.сделай.site/api/login",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        data: JSON.stringify($("#auth").serializeArray().reduce((obj, item) => {
            obj[item.name] = item.value;
            return obj;
        }, {}))
    }).done((response) => {
        console.log(response);
    });
}