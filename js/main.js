const manageMessages = (element, pattern) => {
    $(element).on("input", function () {
        const input = $(this);
        const val = input.val();
        const is_valid = pattern ? pattern.test(val) : true;
        const invalidMessage = input.next('.invalid');
        if (is_valid && val !== '') {
            invalidMessage.stop().animate({ opacity: 0 }, 500, function () {
                $(this).css('visibility', 'hidden');
            });
        }
        else {
            invalidMessage.stop().css('visibility', 'visible').animate({ opacity: 1 }, 500);
        }
    });
}

$(function () {
    manageMessages('#tel', /^\+\d+(-\d+)+$/);
    manageMessages('#pass');
});

const authRequest = () => {
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