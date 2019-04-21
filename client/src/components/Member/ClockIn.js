import React, { useState, useEffect } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  custom_file_upload: {
    display: "inline-block",
    padding: "6px 12px",
    cursor: "pointer"
  }
});

function ClockIn({ classes }) {
  return (
    <div>
        <Button style={{ padding: 0 }} >
      <label for="file-upload" className={classes.custom_file_upload}>
        Custom Upload
      </label>
      <input id="file-upload" type="file" style={{ display: "none" }} />
       </Button>
    </div>
  );
}

export default withStyles(styles)(ClockIn);
