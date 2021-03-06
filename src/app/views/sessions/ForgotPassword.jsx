import React, { Component } from "react";
import {
  Card,
  Grid,
  Button,
  withStyles,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { withRouter } from "react-router-dom";

import jwtAuthService from "app/services/jwtAuthService";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const styles = (theme) => ({
  wrapper: {
    position: "relative",
  },

  colorWhite: {
    color: "#fff !important",
  },

  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
});

class ForgotPassword extends Component {
  state = {
    email: "",
    loading: false,
    openMessageSuccess: false,
    openMessageError: false,
  };
  handleChange = (event) => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleFormSubmit = () => {
    this.setState({ loading: true });

    jwtAuthService
      .forgotPassword(this.state.email)
      .then((data) => {
        this.setState({ loading: false, openMessageSuccess: true, email: "" });
      })
      .catch((error) => {
        this.setState({ loading: false, openMessageError: true });
      });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openMessageSuccess: false });
    this.setState({ openMessageError: false });
  };

  render() {
    let { email, loading } = this.state;

    return (
      <div className="signup flex flex-center w-100 h-100vh">
        <Snackbar
          open={this.state.openMessageSuccess}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <Alert
            onClose={this.handleClose}
            severity="success"
            className={this.props.classes.colorWhite}
          >
            We have e-mailed your password reset link!
          </Alert>
        </Snackbar>

        <Snackbar
          open={this.state.openMessageError}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <Alert
            onClose={this.handleClose}
            severity="error"
            className={this.props.classes.colorWhite}
          >
            The given data was invalid.
          </Alert>
        </Snackbar>

        <div className="p-8">
          <Card className="signup-card position-relative y-center">
            <Grid container>
              <Grid item lg={5} md={5} sm={5} xs={12}>
                <div className="p-32 flex flex-center flex-middle h-100">
                  <img src="/assets/images/illustrations/dreamer.svg" alt="" />
                </div>
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={12}>
                <div className="p-36 h-100 bg-light-gray position-relative">
                  <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                    <TextValidator
                      className="mb-24 w-100"
                      variant="outlined"
                      label="Email"
                      onChange={this.handleChange}
                      type="email"
                      name="email"
                      value={email}
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "this field is required",
                        "email is not valid",
                      ]}
                    />
                    <div className="flex flex-middle">
                      <div className={this.props.classes.wrapper}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={loading}
                        >
                          Reset Password
                        </Button>
                        {loading && (
                          <CircularProgress
                            size={24}
                            className={this.props.classes.buttonProgress}
                          />
                        )}

                        <span className="ml-16 mr-8">or</span>
                        <Button
                          className="capitalize"
                          onClick={() =>
                            this.props.history.push("/session/signin")
                          }
                        >
                          Sign in
                        </Button>
                      </div>
                    </div>
                  </ValidatorForm>
                </div>
              </Grid>
            </Grid>
          </Card>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(
  withRouter(ForgotPassword)
);
