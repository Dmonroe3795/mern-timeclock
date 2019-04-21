import React, { Fragment, useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import SaveIcon from "@material-ui/icons/Save";
import ListItemIcon from "@material-ui/core/ListItemIcon";

var _colorManipulator = require("@material-ui/core/styles/colorManipulator");

const styles = theme => ({
  inset: {
    marginLeft: 10
  },
  editable: {
    paddingLeft: 5,
    paddingRight: 5,
    "&:hover": {
      backgroundColor: (0, _colorManipulator.fade)(
        theme.palette.text.primary,
        theme.palette.action.hoverOpacity
      ),
      borderRadius: 4
    }
  }
});

function FetchingInput({ classes, apiCall, initialValue }) {
  const [value, setValue] = useState(initialValue);
  const [edited, setEdited] = useState(false);
  const [focused, setFocused] = useState(false);

  function handleChange(event) {
    setValue(event.target.value);
    setEdited(true);
  }
  function unfocusOnEnter(event) {
    if (event.key == "Enter") {
      switchBetweenTextBox();
      saveChanges();
    }
  }

  function saveChanges() {
    setEdited(false);
    switchBetweenTextBox();
    apiCall(value);
  }

  function switchBetweenTextBox() {
    setFocused(!focused);
  }

  return (
    <Fragment>
      {focused ? (
        <InputBase
          autoFocus="true"
          className={(classes.margin, classes.editable)}
          onKeyDown={unfocusOnEnter}
          onChange={handleChange}
          onBlur={saveChanges}
          placeholder={value}
        />
      ) : (
        <Tooltip title="edit" placement="right">
          <Typography
            style={{ paddingBottom: 4, paddingTop: 4 }}
            onClick={switchBetweenTextBox}
            variant="subheading"
            className={classes.editable}
          >
            {value}
          </Typography>
        </Tooltip>
      )}

      {edited ? (
        <ListItemIcon style={{ cursor: "pointer" }}>
          <SaveIcon />
        </ListItemIcon>
      ) : null}
    </Fragment>
  );
}
export default withStyles(styles)(FetchingInput);
