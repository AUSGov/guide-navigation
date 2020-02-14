/*jshint browser: true, devel: true, jquery: true*/

$(document).ready(function () {

    
    /*----------- SAB Navigation functionality  ----------- */
    
    // Add current page to guide menu. Add class to make it open when menu is initially opened.
    $('.side_nav a').each(function(){
        if( $(this).attr("href") == window.location.pathname ){
            $(this).addClass('current_page');
            
            var parent_ul = $(this).parent().parent();
            parent_ul.addClass('current').addClass('open');
            parent_ul.prev().addClass('current').addClass('open');
        }
    });
    
    // Toggle SAB nav open and shut
    $('#guide_navlink_1').on('click', function(){
        if (!$('#guide_nav_wrapper').hasClass('side_nav_open')) {
            $('.side_nav').addClass('side_nav_open'); 
        }
    });
    
    $('.nav_close').on('click', function(){
        $('.side_nav').removeClass('side_nav_open'); 
    });

    $('body').on('click', function(e) {
        var side_nav = $('#guide_nav_wrapper').has(e.target).length > 0,
            open_link = $('#guide_navlink_1').has(e.target).length > 0;
        if ( !side_nav && !open_link ) {
            $('#guide_nav_wrapper').removeClass('side_nav_open'); 
        } 
    });
      
    
    // SAB side menu functionality
    $('#guide_nav_wrapper .sub-menu-toggle').on('click', function(){
        
        if ($(this).hasClass('open')) {
            console.log("I am open");
            $(this).removeClass('open');
            
            $(this).parent().next('.sub-menu').removeClass('open');
        } else {
            //console.log($(this).parent().next('.sub-menu'));
            
            $(this).addClass('open');
            $(this).parent().next('.sub-menu').addClass('open');
        }
    });
    
    
    /*----------- SAB Navigation Appearance  ----------- */
    var page_height = $(document).height();
    $(".side_nav").height(page_height);
    
    $(window).resize(function(){
        var page_height = $(document).height();
        $(".side_nav").height(page_height);
    });
    
    
   
    /*----------- General page functionality ----------- */

    
    // Reset disabled links in MAIN NAVIGATION so they take the user to the required url (disabled so dropdown opens on hover rather than click)
    // NOTE: hover on dropdown is performed with CSS NOT javascript
    $('.dropdown-submenu').on('click', function(){
        $(this).children('a').css('text-decoration', 'underline');
        var href = $(this).children('a').attr('href');
        window.location = href;
    });
    
    
    // Prevent click empty 'a' tag from causing scrolling
    $('a').on('click', function(e){
        if (! $(this).attr('href') ) {
            e.preventDefault();
        }
    });
    
    // Hide empty breadcrumb links and arrows
    $('a.breadcrumb-link').each(function(){
        if( $(this).is(':empty') ) {
            var wrapper = $(this).parent('.breadcrumb-home-wrapper');
            $(wrapper).css('display', 'none');
        }
    });
    
    
    // Header navigation links   
    $('#header-registrations-link').on('click',function(){
        window.location.pathname = "/sab/pages-topic/Registrations.html";
    });
    $('#header-business-link').on('click',function(){
        window.location.pathname = "/sab/pages-topic/Business-Information.html";
    });
    $('#header-grants-link').on('click',function(){
        window.location.pathname = "/sab/pages-topic/Grants-programs.html";
    });
    $('#header-advice-link').on('click',function(){
        window.location.pathname = "/sab/pages-topic/Expertise-advice.html";
    });
    $('#header-events-link').on('click',function(){
        window.location.pathname = "/sab/pages-topic/Events-training.html";
    });
    $('#header-news-link').on('click',function(){
        window.location.pathname = "/sab/pages-content/News.html";
    });    

    
    
    /*----------- Add side-menu (sticky_list) functionality ----------- */
    
    function create_id(text){
        var text_no_num = text.replace(/[0-9]/g, ''),
            text_no_punctuation = text_no_num.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?\']/g,''),
            final_text = text_no_punctuation.trim();
        
        var a_lower_text = final_text.replace(/\s+/g, '-').toLowerCase();
        return(a_lower_text);
    }

    // Function for menu stickiness on scroll (called within the if .anchor-menu .sticky-container exists block)
    function add_position(positions) {

        for (var i = 0; i < positions.length; i++) {
            var top_position = positions[i] - 40;
            if ($(window).scrollTop() >= top_position) {
                $('.anchor-menu a').removeClass('active-sticky');
                $('.anchor-menu a[data-value=' + positions[i] + ']').addClass('active-sticky');
            }
        }
    }
    
    
    // Function to make the side menu sticky
    var stickyPosition = $('.anchor-menu').offset(); //This var is outside the function because it needs to be determined BEFORE window resizing,.
    function menuStickiness() {
        
        var win = $(window),
            stickyWidth = $('.twoCol39-left').width();
        
        // Set side-menu initial horizontal position 
        if(win.width() < 575) {
            $('.anchor-menu').css('position', 'relative').css('top', 'auto');
        } else if (win.width() >= 575) {
            if (win.scrollTop() >= stickyPosition.top) {
                $('.anchor-menu').css('position', 'fixed').css('top', '0').css('width', stickyWidth);
            } else {
                $('.anchor-menu').css('position', 'relative').css('top', 'auto').css('width', stickyWidth);
            }
        } 
        
        // Reset side-menu position on scroll
        $(window).scroll(function () {

            stickyWidth = $('.twoCol39-left').width();

            if (win.width() < 575) {
                $('.anchor-menu').css('position', 'relative').css('top', 'auto').css('width', stickyWidth);
            } else if (win.width() >= 575) {
                if (win.scrollTop() >= stickyPosition.top) {
                    $('.anchor-menu').css('position', 'fixed').css('top', '0').css('width', stickyWidth);
                } else if (win.scrollTop() < stickyPosition.top) {
                    $('.anchor-menu').css('position', 'relative').css('top', 'auto').css('width', stickyWidth);
                }
            }
        });
    }

    
    if ($( ".anchor-menu .sticky-container" ).length) {
        
        // Get text from each sticky list a-tag and convert it into an id.
        // Replace spaces with hyphens and remove numerical characters & punctuation at the start where necessary       
        var sticky_list_2 = {};
        $('.anchor-menu a').each(function(){
            //console.log($(this));
            var a_text = $(this).text(),
                text_no_num = a_text.replace(/[0-9]/g, ''),
                text_no_punctuation = text_no_num.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?\']/g,''),
                final_text = text_no_punctuation.trim();
        
            var a_lower_text = final_text.replace(/\s+/g, '-').toLowerCase();
            sticky_list_2[a_text] = a_lower_text;
            
        }); 

        // Apply menu stickiness
        menuStickiness();
    
        
        // Side menu scroll to section of the page
        // and add top position of element to anchor link as a data-value
        $('.anchor-menu a').each(function(){
            
            var a_text = $(this).text(),
                element_id = '#' + sticky_list_2[a_text],
                element_position = $(element_id).offset();
            
            console.log(element_id);
            
            if ($(element_id).length){
                console.log(element_id);
                console.log(element_position);
                $(this).attr('data-value', Math.round(element_position.top));
        
                $(this).on('click', function(){
                    $([document.documentElement, document.body]).animate(
                        { scrollTop: $(element_id).offset().top }, 400);
                    $('.anchor-menu a').removeClass('active-sticky');
                    $(this).addClass('active-sticky');
                });
            }
        });   
        
    
        // Change menu active state on scroll to different sections of the page
        var positions = [];
        $('.anchor-menu a').each(function(){
            var element_position = $(this).attr('data-value');
            positions.push(Math.round(element_position));
        }); 
    
        $(window).scroll(function(){
            add_position(positions); 
        });
    
    } // END if .anchor-menu .sticky-container EXISTS
    
    
    // Menu stickiness on .resize()
    $(window).on('resize', function(){
        if ($( ".anchor-menu .sticky-container" ).length) {
            menuStickiness();
        }
    });
    

    
    
    // Moderator menu
    $(".moderator-toggle").on("click", function(){
        $(".moderator-menu").css('display', 'block');
    });
    $(".moderator-menu .menu-close").on("click", function(){
        $(".moderator-menu").css('display', 'none');
    });
    
   
    // Modal functionality
    // Empty href modal
    $('a[href=""]').on("click", function(){
        if (!$(this).parents('.sticky-container').length && !$(this).hasClass("guide_navlink")){
            $(".modal-wrapper").addClass("active");
            $(".modal-background").addClass("active");
        }
    });
    
    $(".modal-close").on("click", function(){
        $(".modal-wrapper").removeClass("active");
        $(".modal-background").removeClass("active");
    });

    $(".modal-background").on("click", function(){
        $(".modal-wrapper").removeClass("active");
        $(".modal-background").removeClass("active");
    });
    
    // Accordion not working modal
    $(".accordion-group-toggle").on("click", function(){
        $(".modal-wrapper").addClass("active");
        $(".modal-background").addClass("active");
    });
    $(".accordion-item").on("click", function(){
        $(".modal-wrapper").addClass("active");
        $(".modal-background").addClass("active");
    });
    
    // Search not working modal
     $(".btn-search").on("click", function(){
        $(".modal-wrapper").addClass("active");
        $(".modal-background").addClass("active");
    });
    
    
}); // END doc ready

