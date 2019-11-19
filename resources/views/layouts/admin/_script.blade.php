
<!--   Core JS Files   -->
<!-- BEGIN: Vendor JS-->
<script src="/assets/dashboard/app-assets/vendors/js/vendors.min.js"></script>
<!-- BEGIN Vendor JS-->

<!-- BEGIN: Page Vendor JS-->
<script src="/assets/dashboard/app-assets/vendors/js/ui/jquery.sticky.js"></script>
<script src="/assets/dashboard/app-assets/vendors/js/charts/apexcharts.min.js"></script>
<script src="/assets/dashboard/app-assets/vendors/js/extensions/tether.min.js"></script>
<script src="/assets/dashboard/app-assets/vendors/js/extensions/shepherd.min.js"></script>
<!-- END: Page Vendor JS-->

<!-- BEGIN: Theme JS-->
<script src="/assets/dashboard/app-assets/js/core/app-menu.js"></script>
<script src="/assets/dashboard/app-assets/js/core/app.js"></script>
<script src="/assets/dashboard/app-assets/js/scripts/components.js"></script>
<!-- END: Theme JS-->

<!-- BEGIN: Page JS-->
<script src="/assets/dashboard/app-assets/js/scripts/pages/dashboard-analytics.js"></script>
<script src="{{ mix('/js/app.js') }}"></script>

@include('notify::messages')
@notifyJs

@if(config('app.env') != 'local')
@endif

@section('script')

@show
