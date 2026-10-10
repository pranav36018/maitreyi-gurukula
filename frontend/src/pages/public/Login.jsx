function Login({ onLogin }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    if (onLogin) {
      onLogin();
    }
  };

  return (
    <div className="maitreyi-login">

      <div className="maitreyi-login-brand">

        <div className="maitreyi-login-brand-top">
          <div className="maitreyi-login-mark">
            M
          </div>

          <div>
            <strong>
              MAITREYI
            </strong>

            <span>
              GURUKULA
            </span>
          </div>
        </div>


        <div className="maitreyi-login-story">

          <p className="maitreyi-login-eyebrow">
            SHUBHAM KAROTI MAITREYI GURUKULA
          </p>

          <h1>
            A Journey of
            <br />
            Values.
            <br />
            <em>A Journey of Growth.</em>
          </h1>

          <p className="maitreyi-login-description">
            Child Journey Tracking System
            for learning, growth, wellbeing
            and lifelong development.
          </p>

        </div>


        <div className="maitreyi-login-footer">
          <span>
            EST. 30+ YEARS
          </span>

          <span>
            BENGALURU
          </span>
        </div>

      </div>


      <div className="maitreyi-login-panel">

        <div className="maitreyi-login-card">

          <div className="maitreyi-login-card-heading">

            <span>
              GURUKULA SYSTEM
            </span>

            <h2>
              Welcome back.
            </h2>

            <p>
              Sign in to continue to the
              Child Journey Tracking System.
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="maitreyi-login-field">

              <label>
                Username
              </label>

              <input
                type="text"
                placeholder="Enter your username"
              />

            </div>


            <div className="maitreyi-login-field">

              <label>
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
              />

            </div>


            <button
              type="submit"
              className="maitreyi-login-submit"
            >
              Sign In
              <span>→</span>
            </button>

          </form>


          <div className="maitreyi-login-note">

            <span></span>

            <p>
              Secure access for authorised
              Gurukula users.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;