<div class="container login-container">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header text-center">
                    <h4>Login</h4>
                </div>
                <div class="card-body">
                    <form id="loginForm" method="post">
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" class="form-control" id="username" name="username">
                            <div class="invalid-feedback">Please enter a valid username.</div>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" name="password">
                            <div class="invalid-feedback">Please enter a valid password.</div>
                        </div>
                        <div class="d-flex justify-content-center"> <!-- Center button container using flex -->
                            <button type="submit" class="btn btn-primary login-btn">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
