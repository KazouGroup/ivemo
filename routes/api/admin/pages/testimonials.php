<?php
//Route Faqs
Route::get('testimonials', 'TestimonialController@api');
Route::get('testimonials/v/{slug}','TestimonialController@view');
