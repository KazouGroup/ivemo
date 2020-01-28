<?php


Route::resource('dashboard/testimonials','TestimonialController');
Route::get('dashboard/change_status_testimonials/{id}', 'TestimonialController@status');
Route::get('dashboard/testimonials/v/{testimonial}', 'TestimonialController@vector');
