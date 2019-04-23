import React, { useState, useEffect } from "react";
import RecentSessionCard from "../RecentActivity/RecentSessionCard"



function MemberSessions({ member }){
    console.log(member)
    const [sessions, setSessions] = useState([])
    function requestSessions(member){
        fetch(`/sessions/member/${member._id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
              // "Content-Type": "application/x-www-form-urlencoded",
            },
          })
            .then(response => response.json())
            .then(data => {
              setSessions(data);
            })
            .catch(err => {});
    }
    useEffect(() => {
        requestSessions(member)
        
    })
   console.log("hello world")
    return(
        <div>
            Hello world
        {sessions.map(ses => ( 
            <RecentSessionCard sesssion={ses} />
        ))}
        </div>

    )
}
export default MemberSessions;