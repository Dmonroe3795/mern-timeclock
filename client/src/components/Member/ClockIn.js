import React, { useState, useEffect } from "react";
import Input from "@material-ui/core/Input";

function ClockIn() {
  return <Input type="file" accept="image/*" capture="camera" tabindex="-1" />;
}

export default ClockIn;
