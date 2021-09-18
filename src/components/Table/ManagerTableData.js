// Module imports
import React from "react";
import PropTypes from "prop-types";
import { Radio } from "@material-ui/core";
import { FiberManualRecord } from "@material-ui/icons";

// Asset imports
import HR from "assets/data/HR";

export default function ManagerTableData(classes, dept, setDept) {
  return HR.departments.map(
    (
      {
        department,
        location,
        manager: {
          name: { first, last },
        },
      },
      i
    ) =>
      [
        [
          i + 1 + "",
          department.replace(department[0], department[0].toUpperCase()),
          location,
          `${first} ${last}`,
          <Radio
            key={`manager-radio-${i}`}
            checked={dept === department}
            onChange={() => setDept(department)}
            value={department}
            name="radio button demo"
            aria-label="A"
            icon={<FiberManualRecord className={classes.radioUnchecked} />}
            checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
            classes={{
              checked: classes.radio,
            }}
          />,
        ].map((it) => (
          <p
            className={
              dept === department
                ? classes.managerInfoSelected
                : classes.managerInfo
            }
            key={`manager-sn-${i}`}
          >
            {it}
          </p>
        )),
      ].flat()
  );
}

ManagerTableData.propTypes = {
  classes: PropTypes.object,
};
