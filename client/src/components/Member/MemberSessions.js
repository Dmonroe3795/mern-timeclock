import React, { useState, useEffect } from "react";
import RecentSessionCard from "../RecentActivity/RecentSessionCard";
import MemberRecentSessionCard from "./MemberRecentSessionCard";

function MemberSessions({ member }) {
  console.log(member);
  const [sessions, setSessions] = useState([]);
  const [loaded, setLoaded] = useState(false);
  function requestSessions(member) {
    fetch(`/sessions/member/${member._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
        // "Content-Type": "application/x-www-form-urlencoded",
      }
    })
      .then(response => response.json())
      .then(data => {
        setSessions(data);
      })
      .catch(err => {});
  }
  useEffect(() => {
    if (!loaded) {
      requestSessions(member);
      setLoaded(!loaded);
    }
  });
  console.log("hello world");
  return (
    <div>
      {sessions.map(ses => (
        <div>
          <MemberRecentSessionCard style={{ width: "100%" }} session={ses} />
        </div>
      ))}
    </div>
  );
}
export default MemberSessions;
