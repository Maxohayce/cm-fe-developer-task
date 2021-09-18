import React from "react";
import { useSessionstorage } from "rooks";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import ManagerTableData from "components/Table/ManagerTableData.js";
import UsersTableData from "components/Table/UsersTableData";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  managerInfo: {
    color: "#a0a0a0",
  },
  managerInfoSelected: {
    color: "unset",
    fontWeight: "bold",
  },
  userImage: {
    borderRadius: "50%",
  },
};

const useStyles = makeStyles(styles);

const usePrevious = (value) => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default function TableList() {
  const classes = useStyles();
  const [department, setDepartment] = useSessionstorage(
    "department",
    undefined
  );
  const [users, setUsers] = React.useState(undefined);
  const prevDepartment = usePrevious(department);

  React.useEffect(() => {
    if (
      prevDepartment !== department &&
      department !== undefined &&
      department !== null
    ) {
      setUsers(null);
      fetch(`https://randomuser.me/api/?seed=${department}&results=10`)
        .then((response) => response.json())
        .then(({ results }) => setUsers(UsersTableData(classes, results)));
    }
  });
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Department Managers</h4>
            <p className={classes.cardCategoryWhite}>
              A list of department managers and their departments.
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["S/N", "Department", "Location", "Manager", "Select"]}
              tableData={ManagerTableData(classes, department, setDepartment)}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>Users Table</h4>
            <p className={classes.cardCategoryWhite}>
              {{
                undefined: "Select a manager to see users in their department",
                null: `Loading users from ${department}...`,
              }[users] || `Showing users from ${department}`}
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={[
                "Image",
                "Name",
                "Email",
                "Phone Number",
                "Location",
                "Age",
              ]}
              tableData={users ? users : []}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
