import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";

const list = [
  {
    primaryText: "My Files",
    path: "/",
    icon: "folder"
  },
  {
    primaryText: "Traceability",
    path: "/Traceability",
    icon: "people"
  },
  {
    primaryText: "Operação Entrada",
    path: "/InputOperation",
    icon: "people"
  },
  {
    primaryText: "Protocolo Sanitário",
    path: "/SanitaryProtocol",
    icon: "people"
  },
  {
    primaryText: "Area",
    path: "/Area",
    icon: "star"
  },
  {
    primaryText: "Fazenda",
    path: "/Farm",
    icon: "star"
  },
  {
    primaryText: "Produtor",
    path: "/Grower",
    icon: "star"
  },
  {
    primaryText: "Animal",
    path: "/Animal",
    icon: "star"
  },
  {
    primaryText: "Solicitação Sisbov",
    path: "/SisbovRequest",
    icon: "people"
  }
];

const NavContentEx = (props) => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleMenuItemClick = (index, props, path) => {
    setSelectedIndex(index);
    props.navigation(path);
  };
  
  return (
    <List>
    {list.map(({ primaryText, icon, path }, index) => (
      <ListItem key={primaryText} selected={index === selectedIndex} button onClick={(event) => handleMenuItemClick(index, props, path)}>
        <ListItemIcon>
          <Icon>{icon}</Icon>
        </ListItemIcon>
        <ListItemText
          primary={primaryText}
          primaryTypographyProps={{ noWrap: true }}
        />
      </ListItem>
      ))}
      <Divider style={{ margin: "12px 0" }} />
      <ListItem button>
        <ListItemIcon>
          <Icon>settings</Icon>
        </ListItemIcon>
        <ListItemText
          primary={"Settings & account"}
          primaryTypographyProps={{ noWrap: true }}
        />
      </ListItem>
    </List>
  );
}

NavContentEx.propTypes = {};
NavContentEx.defaultProps = {};

export default NavContentEx;
