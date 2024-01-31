const manageMessage = (parent, isShow) => {
    const message = parent instanceof jQuery ? parent.next('.invalid') : $(parent).next('.invalid');
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

const closeModal = () => {
    $("#modal").stop().animate({ opacity: 0 }, 500, function () {
        $(this).css('visibility', 'hidden');
    });
};

const showModal = (header, message) => {
    $("#modal h2").text(header);
    $("#modal p").text(message);
    $("#modal").stop().css('visibility', 'visible').animate({ opacity: 1 }, 500);
};

$(function () {
    validateFormMessage('#tel', /^\+\d+(-\d+)+$/);
    validateFormMessage('#pass');
    $('#modal-close, #modal-close-btn').on("click", closeModal);
});

const authRequest = () => {
    /*if (true) { // Тест
        //showModal("Ошибка аутентификации", "Введите номер телефона");
        $("#auth").fadeOut(500, function () {
        $("#success").css("display", "flex");
            $("#success").stop().animate({ opacity: 1 }, 500);
        });
        return;
    }*/
    if (!$('#tel').data('valid') || !$('#pass').data('valid')) {
        manageMessage('#submit', true);
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
    }).always((response, textStatus, jqXHR) => {
        console.log(response, textStatus);
        switch (jqXHR.status) {
            case 200:
                $("#auth").fadeOut(500, function () {
                    $("#success").css("display", "flex");
                    $("#success").stop().animate({ opacity: 1 }, 500);
                });
                break;
            case 401:
                const error = JSON.parse(jqXHR.responseText);
                showModal("Ошибка аутентификации", Object.values(error.error.errors).join('\n'));
                break;
        }
    });
}