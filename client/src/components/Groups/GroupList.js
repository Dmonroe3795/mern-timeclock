import React from "react";
import GroupPanel from "./GroupPanel";

export default function GroupList({ groups }) {
  return groups.map(currentGroup => (
    <GroupPanel key={currentGroup.id} group={currentGroup} />
  ));
}
