import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase.utils";
import AuthorMaterialItem from "./AuthorMaterialItem";

// MUI
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ padding: "10px 0" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AuthorMaterialsList() {
  const { currentUser } = useContext(UserContext);
  //   const [changeDetails, setChangeDetails] = useState(false);
  const [userMaterials, setUserMaterials] = useState([]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const q = query(
          collection(db, "materials"),
          where("authorId", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          list.push({ id: doc.id, ...doc.data() });
        });
        setUserMaterials(list);
        console.log("category", userMaterials.category);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [currentUser.uid, userMaterials.category]);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor={"inherit"}
        >
          <Tab label="Opowiadania" {...a11yProps(0)} />
          <Tab label="Bajki" {...a11yProps(1)} />
          <Tab label="Piosenki" {...a11yProps(2)} />
          <Tab label="Inne" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <table width={"100%"} style={{ borderCollapse: "collapse" }}>
          <tbody>
            {userMaterials.map((material) =>
              material.category === "stories" ? (
                <AuthorMaterialItem key={material.id} material={material} />
              ) : (
                ""
              )
            )}
          </tbody>
        </table>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <table width={"100%"} style={{ borderCollapse: "collapse" }}>
          <tbody>
            {userMaterials.map((material) =>
              material.category === "cartoons" ? (
                <AuthorMaterialItem key={material.id} material={material} />
              ) : (
                ""
              )
            )}
          </tbody>
        </table>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <table width={"100%"} style={{ borderCollapse: "collapse" }}>
          <tbody>
            {userMaterials.map((material) =>
              material.category === "songs" ? (
                <AuthorMaterialItem key={material.id} material={material} />
              ) : (
                ""
              )
            )}
          </tbody>
        </table>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <table width={"100%"} style={{ borderCollapse: "collapse" }}>
          <tbody>
            {userMaterials.map((material) =>
              material.category === "other" ? (
                <AuthorMaterialItem key={material.id} material={material} />
              ) : (
                ""
              )
            )}
          </tbody>
        </table>
      </TabPanel>
    </>
  );
}
