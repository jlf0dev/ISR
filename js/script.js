$( document ).ready(function() {
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
    // Subscribe button
    $('#subscribe').click(function(e) {
        e.preventDefault();
        var email = $('#email_input').val();
        $.ajax({
            type: 'POST',
            url: '../php/contact_us.php',
            data: { 
                email: email
            },
            success: function(result) {
                $('#subscription_success').show();
                $('#email_input').val("");
            },
            error: function(result) {
                $('#subscription_failure').show();
                $('#email_input').val("");
            }
        });
        var time = 10;
        window.setInterval(timer, 1000);
        function timer()
        {
            //update time
            time -=1;
            //hide the div if the time is 0
            if(time == 0)        
            {
                $('#subscription_success').hide();
                $('#subscription_failure').hide();
            }
        }
    });
    // Close Subscribe alerts
    $('.close').click(function(e) {
        $('#subscription_success').hide();
        $('#subscription_failure').hide();
    });

});