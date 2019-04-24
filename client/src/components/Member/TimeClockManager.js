import React, { useState, useEffect } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  custom_file_upload: {
    display: "inline-block",
    padding: "6px 12px",
    cursor: "pointer"
  }
});

function ClockOutButton({ clockOutF }) {
  return (
    <Button
      style={{ color: "white", width: "100%", fontSize: "1.5em" }}
      variant="contained"
      color="secondary"
      onClick={clockOutF}
    >
      {" "}
      Clock Out{" "}
    </Button>
  );
}
function ClockInButton({ clockInF }) {
  return (
    <Button
      style={{ color: "white", width: "100%", fontSize: "1.5em" }}
      variant="contained"
      color="secondary"
      onClick={clockInF}
    >
      {" "}
      Clock In{" "}
    </Button>
  );
}
function DurationClock({ clockedIn }) {
  return (
    <div>
      {clockedIn ? <Typography variant="h6">Clocked in for</Typography> : null}
    </div>
  );
}
function TimeClockManager({ mem, classes }) {
  console.log(mem);
  const [session, setSession] = useState({
    member: mem,
    partner: {}
  });
  const [clockedIn, setClockedIn] = useState(false);

  function clockInRequest(memberId, partnerId, groupId) {
    fetch("/members/clockin", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({ mId: memberId, pId: partnerId, gId: groupId })
    })
      .then(response => response.json())
      .then(data => {
        setSession(data.createdSession);
        setClockedIn(true);
      })
      .catch(err => {});
  }
  function clockOutRequest(memberId) {
    fetch("/members/clockout", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({ mId: memberId })
    })
      .then(response => response.json())
      .then(data => {
        setClockedIn(false);
        setSession(data);
      })
      .catch(err => {});
  }

  return (
    <div style={{ marginTop: 30 }}>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{}}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 10,
          paddingBottom: 10,
          textAlign: "center"
        }}
      >
        <Grid item xs="12">
          <Typography
            variant="h3"
            color="secondary"
            style={{ paddingTop: 30, marginBottom: 0 }}
          >
            {mem.name}
          </Typography>
          <DurationClock clockedIn={clockedIn} />
          <Typography
            variant="h5"
            style={{ paddingTop: 10, paddingBottom: 20 }}
          >
            {session.partner.name}
          </Typography>
        </Grid>
        <Grid item xs="12">
          {clockedIn ? (
            <ClockOutButton
              style={{ width: "100" }}
              clockOutF={() => clockOutRequest("5cb0ece43e522a95dd4c5390")}
            />
          ) : (
            <ClockInButton
              clockInF={() =>
                clockInRequest(
                  "5cb0ece43e522a95dd4c5390",
                  "5cb399201c9d440000294b06",
                  "5cb543e7e096455bccad619b"
                )
              }
            />
          )}
        </Grid>
      </Grid>

      {
        // <Button style={{ padding: 0 }}>
        //   <label for="file-upload" className={classes.custom_file_upload}>
        //     Custom Upload
        //   </label>
        //   <input id="file-upload" type="file" style={{ display: "none" }} />
        // </Button>
      }
    </div>
  );
}

export default withStyles(styles)(TimeClockManager);
