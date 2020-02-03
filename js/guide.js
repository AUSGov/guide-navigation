/*jshint browser: true, devel: true, jquery: true*/

$(document).ready(function () {

    
    /*----------- SAB Navigation 1 functionality  ----------- */
    
    
    var full_path = window.location.pathname,
        subpath_location = full_path.lastIndexOf('/'),
        initial_path = full_path.slice(0, subpath_location),
        end_path = full_path.slice((subpath_location + 1), full_path.length);
    
    var href = $('.side_nav a').attr("href");
    
    $('.side_nav a').each(function(){
        if( $(this).attr("href") == end_path ){
            $(this).addClass('current_page');
            
            var parent_ul = $(this).parent().parent();
            parent_ul.addClass('current');
            parent_ul.prev().addClass('current');
        }
    });
    
    
    
    // Toggle SAB nav 1 open and shut
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
    
    $('.side_nav .sub-menu-toggle').on('click', function(){
        
        if($(this).hasClass('current')) {
            $(this).removeClass('current');
            $(this).next('.sub-menu').removeClass('current');
            $('.side_nav .sub-menu-toggle').removeClass('current');
        } else if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(this).next('.sub-menu').removeClass('open');
            $('.side_nav .sub-menu-toggle').removeClass('open');
        } else {
            $('.side_nav .sub-menu-toggle').removeClass('current').removeClass('open');
            $('.sub-menu').removeClass('current').removeClass('open');
            $(this).addClass('open');
            $(this).next('.sub-menu').addClass('open');
        }
    });
    
    
    /*----------- SAB Navigation 1 Appearance  ----------- */
    var page_height = $(document).height();
    $(".side_nav").height(page_height);
    
    $(window).resize(function(){
        var page_height = $(document).height();
        $(".side_nav").height(page_height);
    });
    
    
    
    
    /*----------- SAB Navigation 2 functionality  ----------- */
    
    // Activate submenu functionality
    // https://stackoverflow.com/questions/44467377/bootstrap-4-multilevel-dropdown-inside-navigation
    $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
        if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').removeClass('show');
        }
        var $subMenu = $(this).next('.dropdown-menu');
        $subMenu.toggleClass('show');

        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
            $('.dropdown-submenu .show').removeClass('show');
    });

    return false;
    });
    
    $('#guide_navlink').hover(
        function(){
            $(this).addClass('open');
        },
        function(){
            $(this).removeClass('open');
        }                           
    );
    
    
    // Reset disabled links so they take the user to the required url (disabled so dropdown opens on hover rather than click)
    // NOTE: hover on dropdown is performed with CSS NOT javascript
    $('.dropdown-submenu').on('click', function(){
        $(this).children('a').css('text-decoration', 'underline');
        href = $(this).children('a').attr('href');
        window.location = href;
    });

   
 
    
    /*----------- SAB Navigation 2 Appearance  ----------- */
    
    // Set width of SAB link in sub-landing page side panel   
    $('#sab-landing-2 .sticky-list-back-button').css('width', $('.twoColSab-left').outerWidth() + 'px');
    
    $(window).resize(function(){
        $('#sab-landing-2 .sticky-list-back-button').css('width', $('.twoColSab-left').outerWidth() + 'px'); 
        });
    
    
    
    
    /*----------- General page issues ----------- */
    
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
    // Finding full path so links work on files viewed locally through the file tree as well as when hosted through a local server.
        full_path = window.location.pathname;
        subpath_location = full_path.lastIndexOf('/');
        initial_path = full_path.slice(0, subpath_location);
    
    $('#header-registrations-link').on('click',function(){
        window.location.pathname = initial_path + "/other-Registrations.html";
    });
    $('#header-business-link').on('click',function(){
        window.location.pathname = initial_path + "/other-Business-Information.html";
    });
    $('#header-grants-link').on('click',function(){
        window.location.pathname = initial_path + "/other-Grants-programs.html";
    });
    $('#header-advice-link').on('click',function(){
        window.location.pathname = initial_path + "/other-Expertise-advice.html";
    });
    $('#header-events-link').on('click',function(){
        window.location.pathname = initial_path + "/other-Events-training.html";
    });
    $('#header-news-link').on('click',function(){
        window.location.pathname = initial_path + "/other-News.html";
    });    

    
    
    /*----------- Add side-menu (sticky_list) functionality ----------- */
    
    // Function to change active side menu state on scroll (called within the if .anchor-menu .sticky-container  exisits block)
    function add_position(positions) {
            for ( var i = 0; i < positions.length; i++) {
                var top_position = positions[i] - 40;
                if ( $(window).scrollTop() >= top_position) {
                    $('.anchor-menu a').removeClass('active-sticky');
                    $('.anchor-menu a[data-value=' + positions[i] + ']').addClass('active-sticky');
                }
            }
        }
    
    if ($( ".anchor-menu .sticky-container" ).length) {
    
        // Get text from each sticky list a-tag and convert it into an id.
        // Replace spaces with hyphens and remove numerical characters & punctuation at the start where necessary       
        var sticky_list_2 = {};
        $('.anchor-menu a').each(function(){
            var a_text = $(this).text(),
                text_no_num = a_text.replace(/[0-9]/g, ''),
                text_no_punctuation = text_no_num.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?\']/g,''),
                final_text = text_no_punctuation.trim();
        
            var a_lower_text = final_text.replace(/\s+/g, '-').toLowerCase();
            sticky_list_2[a_text] = a_lower_text;
            
        }); 

     
        // Side menu stickyness
        if ($(window).width() > 480) {
            $('.anchor-menu').css('position','relative');
                var stickyPosition = $('.anchor-menu').offset(),
                    stickyWidth = $('.twoCol39-left').width(),
                    footerPosition = $('.footer-wrapper').offset(),
                    stickyHeight = $('.sticky-container ul').height(),
                    footerHeight = $('.footer-wrapper').height(),
                    pageHeight = $(document).height(),
                    unstickyPosition = pageHeight - footerHeight - stickyHeight - 60;
        
            $('.anchor-menu').css('width',stickyWidth);
    
            $(window).scroll(function(){
                if($(window).scrollTop() > stickyPosition.top && $(window).scrollTop() < unstickyPosition){
                    $('.anchor-menu').css('position','fixed').css('top','0');
                } else {
                    $('.anchor-menu').css('position','relative');
                }    
            });
            $(window).resize(function(){
                var stickyWidth = $('.twoCol39-left').width();
                $('.anchor-menu').css('width',stickyWidth);
            });
        }
    
        
        // Side menu scroll to section of the page
        // And add top position of element to anchor link as a data-value
        $('.anchor-menu a').each(function(){
            var a_text = $(this).text(),
                element_id = '#' + sticky_list_2[a_text],
                element_position = $(element_id).offset();
            $(this).attr('data-value', element_position.top);
        
            $(this).on('click', function(){
                $([document.documentElement, document.body]).animate(
                    { scrollTop: $(element_id).offset().top }, 400);
                $('.anchor-menu a').removeClass('active-sticky');
                $(this).addClass('active-sticky');
            });
        });    
        
    
        // Change menu active state on scroll to different sections of the page
        var positions = [];
        $('.anchor-menu a').each(function(){
            var element_position = $(this).attr('data-value');
            positions.push(element_position);
        }); 
    
        $(window).scroll(function(){
            add_position(positions); 
        });
    
    } // END if .anchor-menu .sticky-container EXISTS
    
    
    
   
    

    
}); // END doc ready

