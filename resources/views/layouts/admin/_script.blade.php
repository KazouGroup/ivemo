
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
<script src="/assets/dashboard/assets/vendor/list.js/dist/list.min.js"></script>
<script src="/assets/dashboard/assets/vendor/datatables.net/js/jquery.dataTables.min.js"></script>
<script src="/assets/dashboard/assets/vendor/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
<script src="/assets/dashboard/assets/vendor/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
<script src="/assets/dashboard/assets/vendor/datatables.net-buttons-bs4/js/buttons.bootstrap4.min.js"></script>
<script src="/assets/dashboard/assets/vendor/datatables.net-buttons/js/buttons.html5.min.js"></script>
<script src="/assets/dashboard/assets/vendor/datatables.net-buttons/js/buttons.flash.min.js"></script>
<script src="/assets/dashboard/assets/vendor/datatables.net-buttons/js/buttons.print.min.js"></script>
<script src="/assets/dashboard/assets/vendor/datatables.net-select/js/dataTables.select.min.js"></script>

<script src="/assets/dashboard/assets/vendor/select2/dist/js/select2.min.js"></script>
<script src="/assets/dashboard/assets/vendor/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>
<script src="/assets/dashboard/assets/vendor/nouislider/distribute/nouislider.min.js"></script>
<script src="/assets/dashboard/assets/vendor/quill/dist/quill.min.js"></script>
<script src="/assets/dashboard/assets/vendor/dropzone/dist/min/dropzone.min.js"></script>
<script src="/assets/dashboard/assets/vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js"></script>
<!-- Argon JS -->
<script src="/assets/dashboard/assets/js/argon.js?v=1.1.0"></script>
<script src="{{ mix('/js/app.js') }}"></script>

@include('notify::messages')
@notifyJs

@if(config('app.env') != 'local')
@endif

@section('script')

@show
