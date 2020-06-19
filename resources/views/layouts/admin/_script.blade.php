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
<script src="/assets/dashboard/assets/js/core/jquery.min.js"></script>
<script src="/assets/dashboard/assets/js/core/popper.min.js"></script>
<script src="/assets/dashboard/assets/js/core/bootstrap-material-design.min.js"></script>
<script src="/assets/dashboard/assets/js/plugins/perfect-scrollbar.jquery.min.js"></script>
<!--  Plugin for Sweet Alert -->
<script src="/assets/dashboard/assets/js/plugins/sweetalert2.js"></script>
<!-- Forms Validations Plugin -->
<script src="/assets/dashboard/assets/js/plugins/jquery.validate.min.js"></script>
<!-- Plugin for the Wizard, full documentation here: https://github.com/VinceG/twitter-bootstrap-wizard -->
<script src="/assets/dashboard/assets/js/plugins/jquery.bootstrap-wizard.js"></script>
<!--  DataTables.net Plugin, full documentation here: https://datatables.net/  -->
<script src="/assets/dashboard/assets/js/plugins/jquery.dataTables.min.js"></script>
<!-- Plugin for Fileupload, full documentation here: http://www.jasny.net/bootstrap/javascript/#fileinput -->
<script src="/assets/dashboard/assets/js/plugins/jasny-bootstrap.min.js"></script>
<!-- Vector Map plugin, full documentation here: http://jvectormap.com/documentation/ -->
<script src="/assets/dashboard/assets/js/plugins/jquery-jvectormap.js"></script>
<!-- Include a polyfill for ES6 Promises (optional) for IE11, UC Browser and Android browser support SweetAlert -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/core-js/2.4.1/core.js"></script>
<!--  Notifications Plugin    -->
<script src="/assets/dashboard/assets/js/plugins/bootstrap-notify.js"></script>
<!-- Control Center for Material Dashboard: parallax effects, scripts for the example pages etc -->
<script src="/assets/dashboard/assets/js/material-dashboard.js?v=2.1.0" type="text/javascript"></script>
<script src="{{ mix('/js/reactjs/axios.js') }}"></script>
<script src="{{ mix('/js/vuejs/app.js') }}"></script>

@if(config('app.env') != 'local')
@endif

@section('script')

@show
