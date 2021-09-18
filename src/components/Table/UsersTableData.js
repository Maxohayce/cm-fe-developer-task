// Module imports
import React from "react";

export default function UsersTableData(classes, results) {
  return results.map(({ dob, email, location, name, phone, picture }, i) => [
    <img
      className={classes.userImage}
      key={`person-${i}`}
      src={picture?.thumbnail}
    />,
    `${name?.title} ${name?.first} ${name?.last}`,
    email,
    phone,
    `${location?.street?.number} ${location?.street?.name}, ${location?.city}, ${location?.state}, ${location?.country}`,
    dob?.age,
  ]);
}
