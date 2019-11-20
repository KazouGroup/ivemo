
<script src="/assets/dashboard/assets/vendor/jquery/dist/jquery.min.js"></script>
<script src="/assets/dashboard/assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
<script src="/assets/dashboard/assets/vendor/js-cookie/js.cookie.js"></script>
<script src="/assets/dashboard/assets/vendor/jquery.scrollbar/jquery.scrollbar.min.js"></script>
<script src="/assets/dashboard/assets/vendor/jquery-scroll-lock/dist/jquery-scrollLock.min.js"></script>
<!-- Optional JS -->
<script src="/assets/dashboard/assets/vendor/chart.js/dist/Chart.min.js"></script>
<script src="/assets/dashboard/assets/vendor/chart.js/dist/Chart.extension.js"></script>
<script src="/assets/dashboard/assets/vendor/sweetalert2/dist/sweetalert2.min.js"></script>
<script src="/assets/dashboard/assets/vendor/bootstrap-notify/bootstrap-notify.min.js"></script>
<!-- Argon JS -->
<script src="/assets/dashboard/assets/js/argon.js?v=1.1.0"></script>
<script src="{{ mix('/js/app.js') }}"></script>

@include('notify::messages')
@notifyJs

@if(config('app.env') != 'local')
@endif

@section('script')

@show
