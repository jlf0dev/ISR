$( document ).ready(function() {
    // Validation for contact us form
    window.verifyRecaptchaCallback = function (response) {
        $('input[data-recaptcha]').val(response).trigger('change')
    }
    window.expiredRecaptchaCallback = function () {
        $('input[data-recaptcha]').val("").trigger('change')
    }
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            form.classList.add('was-validated');
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
                grecaptcha.reset();
            }
            else {
                event.preventDefault();
                var name = $('#nameInput').val();
                var email = $('#emailInput').val();
                var msg = $('#messageTextArea').val();
                $.ajax({
                    type: 'POST',
                    url: '../php/contact_us.php',
                    data: { 
                        name: name,
                        email: email,
                        msg: msg,
                        captcha: grecaptcha.getResponse()
                    },
                    success: function(result) {
                        $('#modalContact').modal('hide');
                        $('#nameInput').val("");
                        $('#emailInput').val("");
                        $('#messageTextArea').val("");
                        form.classList.remove('was-validated');
                        grecaptcha.reset();
                    },
                    error: function(exception) {
                        console.log(exception);
                    }
                });
            }
        }, false);
    });
    // Contact us scroll button
    $('#contact').on('click', function(e) {
        $('html, body').animate({
            scrollTop: $(document).height()-$(window).height()},
            1400,
            "swing"
        );
    });
    // Learn more button
    $('.learn').on('click', function(e) {
        $('html, body').animate({
            scrollTop: $("#content").offset().top - $('.navbar').height()},
            1400,
            "swing"
        );
    });
    // Natural disaster tab
    $('.nd-link').on('click', function(e) {
        // Get id of clicked tab
        var currentAttrValue = $(this).attr('name');
        //Show tab content and hide all others
        $(currentAttrValue).show().siblings().hide();
        //Change active tab to this one
        $(this).addClass('nd-active').siblings().removeClass('nd-active');
    });

});