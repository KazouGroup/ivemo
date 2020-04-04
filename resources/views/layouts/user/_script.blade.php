  @routes
  <!--   Core JS Files   -->
  <script src="/assets/vendor/assets/js/core/jquery.min.js" type="text/javascript"></script>
  <script src="/assets/vendor/assets/js/core/popper.min.js" type="text/javascript"></script>
  <script src="/assets/vendor/assets/js/core/bootstrap.min.js" type="text/javascript"></script>
  <!--  Plugin for Switches, full documentation here: http://www.jque.re/plugins/version3/bootstrap.switch/ -->
  <script src="/assets/vendor/assets/js/plugins/bootstrap-switch.js"></script>
  <!--  Plugin for the Sliders, full documentation here: http://refreshless.com/nouislider/ -->
  <script src="/assets/vendor/assets/js/plugins/nouislider.min.js" type="text/javascript"></script>
  <!--  Plugin for the DatePicker, full documentation here: https://github.com/uxsolutions/bootstrap-datepicker -->
  <script src="/assets/vendor/assets/js/plugins/moment.min.js"></script>
  <!--  Plugin for Tags, full documentation here: https://github.com/bootstrap-tagsinput/bootstrap-tagsinputs  -->
  <script src="/assets/vendor/assets/js/plugins/bootstrap-tagsinput.js"></script>
  <!--  Plugin for Select, full documentation here: http://silviomoreto.github.io/bootstrap-select -->
  <script src="/assets/vendor/assets/js/plugins/bootstrap-selectpicker.js" type="text/javascript"></script>
  <!--  Plugin for the DateTimePicker, full documentation here: https://eonasdan.github.io/bootstrap-datetimepicker/ -->
  <script src="/assets/vendor/assets/js/plugins/bootstrap-datetimepicker.js" type="text/javascript"></script>
  <script src="/assets/vendor/assets/js/plugins/jquery.dataTables.min.js" type="text/javascript"></script>
  <script src="/assets/vendor/assets/js/plugins/bootstrap-notify.js"></script>

  <script src="/assets/vendor/assets/js/now-ui-kit.js?v=1.3.1" type="text/javascript"></script>
  <!--
  <script src="{{ mix('/js/reactjs/axios.js') }}"></script>
  -->
  <script src="{{ mix('/js/reactjs/app.js') }}"></script>
  <script>
	$(document).ready(function(){
		$('body').append('<a id="toTop" class="btn btn-primary btn-sm" href="#" title="Go to Top Page"><i class="fa fa-arrow-up"></i></a>');
		$(window).scroll(function () {
			if ($(this).scrollTop() != 0) {
				$('#toTop, #search-top').fadeIn();
			} else {
				$('#toTop, #search-top').fadeOut();
			}
		});
		$('#toTop, #search-top').click(function(){
			$("html, body").animate({ scrollTop: 0 }, 600);
			return false;
		});
  });
  setTimeout(function() { window.location=window.location;},14400000);
</script>
