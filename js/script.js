$( document ).ready(function() {
    // Validation for contact us form
    function submitContactUsForm() {
        var forms = document.getElementsByClassName('needs-validation');
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
                },
                error: function(exception) {
                    console.log(exception);
                }
            });
        }
    }
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