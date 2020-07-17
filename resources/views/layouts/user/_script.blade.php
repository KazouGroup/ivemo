  @routes
  <script>
    Number.prototype.formatMoney = function(decPlaces, thouSeparator, decSeparator) {
        var n = this,
            decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
            decSeparator = decSeparator == undefined ? "." : decSeparator,
            thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
            sign = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
    };
</script>
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
  <!--  Plugin for the DateTimePicker, full documentation here: https://eonasdan.github.io/bootstrap-datetimepicker/ -->
  <script src="/assets/vendor/assets/js/plugins/bootstrap-datetimepicker.js" type="text/javascript"></script>
  <script src="/assets/vendor/assets/js/plugins/jquery.dataTables.min.js" type="text/javascript"></script>
  <script src="/assets/vendor/assets/js/plugins/bootstrap-notify.js"></script>

  <script src="/assets/vendor/assets/js/now-ui-kit.js?v=1.3.1" type="text/javascript"></script>
  <script src="{{ mix('/js/reactjs/axios.js') }}"></script>
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
  setTimeout(function() { window.location=window.location;},10400000);
</script>
