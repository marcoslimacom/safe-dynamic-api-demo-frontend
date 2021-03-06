import React, { useEffect } from "react";
import {
  Icon,
  Badge,
  MuiThemeProvider,
  Card,
  Button,
  IconButton,
  Drawer,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { getTimeDifference } from "utils.js";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import {
  getNotification,
  deleteAllNotification,
  deleteNotification,
  setNotificationTotalCount,
} from "../../redux/actions/NotificationActions";
import notificationService from "../../services/notificationService";

function NotificationBar(props) {
  const {
    container,
    theme,
    settings,
    notification: notificationState = { data: [] },
    getNotification,
    deleteAllNotification,
    deleteNotification,
  } = props;

  const [panelOpen, setPanelOpen] = React.useState(false);

  useEffect(() => {
    if (props.user) {
      notificationService.getNotificationsCount().then((totalCount) => {
        props.setNotificationTotalCount(totalCount);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleDrawerToggle() {
    if (!panelOpen) {
      getNotification();
    }
    setPanelOpen(!panelOpen);
  }
  const parentThemePalette = theme.palette;

  return (
    <MuiThemeProvider theme={settings.themes[settings.activeTheme]}>
      <IconButton
        onClick={handleDrawerToggle}
        style={{
          color:
            parentThemePalette.type === "light"
              ? parentThemePalette.text.secondary
              : parentThemePalette.text.primary,
        }}
      >
        <Badge color="secondary" badgeContent={props.notification.totalCount}>
          <Icon>notifications</Icon>
        </Badge>
      </IconButton>

      <Drawer
        width={"100px"}
        container={container}
        variant="temporary"
        anchor={"right"}
        open={panelOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div className="notification">
          <div className="notification__topbar flex flex-middle p-16 mb-24">
            <Icon color="primary">notifications</Icon>
            <h5 className="ml-8 my-0 font-weight-500">Notifications</h5>
          </div>

          {notificationState.data.map((notification, i) => (
            <div key={i} className="notification__card position-relative">
              <IconButton
                size="small"
                className="delete-button bg-light-gray mr-24"
                onClick={() => deleteNotification(notification.id)}
              >
                <Icon className="text-muted" fontSize="small">
                  clear
                </Icon>
              </IconButton>
              <Card className="mx-16 mb-24" elevation={3}>
                <div className="card__topbar flex flex-middle flex-space-between p-8 bg-light-gray">
                  <div className="flex">
                    <div className="card__topbar__button">
                      <Icon
                        className="card__topbar__icon"
                        fontSize="small"
                        style={{
                          color:
                            notification.type === "alert"
                              ? "#FF3D57"
                              : "#1976d2",
                        }}
                      >
                        {notification.type === "alert"
                          ? "notifications"
                          : "chat"}
                      </Icon>
                    </div>
                    <span className="ml-4 font-weight-500 text-muted">
                      {notification.title}
                    </span>
                  </div>
                  <small className="card__topbar__time text-muted">
                    {getTimeDifference(new Date(notification.timestamp))} ago
                  </small>
                </div>
                <div className="px-16 pt-8 pb-16">
                  <p className="m-0">{notification.title}</p>
                  <small className="text-muted">{notification.message}</small>
                </div>
              </Card>
            </div>
          ))}

          <div className="text-center">
            <Button onClick={deleteAllNotification}>Clear Notifications</Button>
          </div>
        </div>
      </Drawer>
    </MuiThemeProvider>
  );
}

NotificationBar.propTypes = {
  settings: PropTypes.object.isRequired,
  notification: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  getNotification: PropTypes.func.isRequired,
  deleteNotification: PropTypes.func.isRequired,
  deleteAllNotification: PropTypes.func.isRequired,
  setNotificationTotalCount: PropTypes.func.isRequired,
  notification: state.notification,
  settings: state.layout.settings,
  user: state.user,
});

export default withStyles(
  {},
  { withTheme: true }
)(
  connect(mapStateToProps, {
    getNotification,
    deleteNotification,
    deleteAllNotification,
    setNotificationTotalCount,
  })(NotificationBar)
);
