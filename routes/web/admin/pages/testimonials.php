<?php


Route::resource('dashboard/testimonials','TestimonialController');
Route::get('dashboard/change_status_testimonials/{id}', 'TestimonialController@status')->name('active_faqs');
Route::get('dashboard/testimonials/v/{testimonial}', 'TestimonialController@vector');
