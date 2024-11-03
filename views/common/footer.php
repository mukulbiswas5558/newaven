


<!-- footer.php -->
<footer style="background: -webkit-linear-gradient(left, #3931af, #00c6ff); color: #e4d6d6;">
    <div class="container">
        <div class="row">
            <div class="col-sm-6 col-md-4">
                <h4>Contact Us</h4>
                <p>Email: support@seramporehospital.com</p>
                <p>Phone: +91-9876543210</p>
            </div>
            <div class="col-sm-6 col-md-4">
                <h4>Location</h4>
                <p>123 Serampore, West Bengal, India</p>
            </div>
            <div class="col-sm-6 col-md-4">
                <h4>Follow Us</h4>
                <p>
                    <i class="fa fa-facebook"></i> Facebook <br>
                    <i class="fa fa-twitter"></i> Twitter
                </p>
            </div>
        </div>
    </div>
</footer>
<script>
    const LOGIN_URL = "<?= url('auth/login') ?>";
    const DASHBOARD_URL = "<?= url('dashboard') ?>";
    const FORM_SUBMIT_URL = "<?= url('dashboard/submit') ?>";
    const USER_FORM_SUBMIT_URL = "<?= url('forms/user_form_submit') ?>";
    const PAGE_ID = "<?= $page_id ?? null; ?>
";

</script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="<?= static_url('js/custom.js') ?>"></script>


    </html>

  
