import React, { createContext, useState } from "react";
import { useNavigate } from "react-router";
import { Routes, Route } from "react-router-dom";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import { Root, Header, Nav, Content, presets } from "mui-layout";

import NavContentEx from "../components/NavContentEx";
import NavHeaderEx from "../components/NavHeaderEx";
import HeaderEx from "../components/HeaderEx";
import ContentEx from "../components/ContentEx";

import { Area } from "../pages/Area/area";
import { AreaAddEdit } from "../pages/Area/addedit/area-addedit";
import { Animal } from "../pages/Animal/animal";
import { AnimalAddEdit } from "../pages/Animal/addedit/animal-addedit";
import { SanitaryProtocol } from "../pages/SanitaryProtocol/sanitaryProtocol";
import { Grower } from "../pages/Grower/grower";
import { GrowerAddEdit } from "../pages/Grower/addedit/grower-addedit";
import { Farm } from "../pages/Farm/farm";
import { FarmAddEdit } from "../pages/Farm/addedit/farm-addedit";
import { SanitaryProtocolAddEdit } from "../pages/SanitaryProtocol/addedit/sanitaryProtocol-addedit";
import { SisbovRequest } from "../pages/SisbovRequest/sisbovRequest";
import { SisbovRequestAddEdit } from "../pages/SisbovRequest/addedit/sisbovRequest-addedit";
import { InputOperation } from "../pages/Operation/inputOperation";
import { Traceability } from "../pages/Traceability/traceability";
import { TraceabilityAddEdit } from "../pages/Traceability/addedit/traceability-addedit";
import { InputOperationAddEdit } from "../pages/Operation/addedit/inputOperation-addedit";

// add presets.create{}() to config props in Root to change the behavior, looking and layout
// <Root config={presets.createCozyLayout()}> ...

const ContentBody = () => {
  return(    
    <Routes>
        <Route exact path="/Traceability" element={<Traceability/>}/>
        <Route exact path="/TraceabilityAddEdit" element={<TraceabilityAddEdit/>}/> 
        <Route exact path="/InputOperation" element={<InputOperation/>}/>
        <Route exact path="/InputOperationAddEdit" element={<InputOperationAddEdit/>}/> 
        <Route exact path="/SanitaryProtocol" element={<SanitaryProtocol/>}/>
        <Route exact path="/SanitaryProtocolAddEdit" element={<SanitaryProtocolAddEdit/>}/>
        <Route exact path="/SisbovRequest" element={<SisbovRequest/>}/>
        <Route exact path="/SisbovRequestAddEdit" element={<SisbovRequestAddEdit/>}/>        
        <Route exact path="/Grower" element={<Grower/>}/>
        <Route exact path="/GrowerAddEdit" element={<GrowerAddEdit/>}/>                
        <Route exact path="/Farm" element={<Farm/>}/>
        <Route exact path="/FarmAddEdit" element={<FarmAddEdit/>}/>                        
        <Route exact path="/Area" element={<Area/>}/>
        <Route exact path="/AreaAddEdit" element={<AreaAddEdit/>}/>                                
        <Route exact path="/Animal" element={<Animal/>}/>
        <Route exact path="/AnimalAddEdit" element={<AnimalAddEdit/>}/>                                        
        <Route exact path="/" element={<ContentEx />} />                
    </Routes>    
  );
}

const ComponentNav = (props) => {

  const navigate = useNavigate();

  return(
    <Nav
      renderIcon={collapsed =>
        collapsed ? <Icon>chevron_right</Icon> : <Icon>chevron_left</Icon>
      }
      header={({ collapsed }) =>
        props.data.nav && <NavHeaderEx collapsed={collapsed} />
      }
    >
      {props.data.nav && <NavContentEx navigation={navigate}/>}
    </Nav>
  );
}

export default function App() {
  const [loading, setLoading] = useState(false);
  const [preset, setPreset] = useState("createStandardLayout");
  const [data, setData] = useState({
    header: true,
    nav: true,
    content: true,
    footer: true
  });
  return (
    <MuiThemeProvider theme={createTheme()}>
      {loading ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Typography variant={"h2"}>Changing Preset...</Typography>
        </div>
      ) : (
        <Root
          config={presets[preset]({ headerPosition: "relative" })}
          style={{ minHeight: "100vh" }}
        >
          <CssBaseline />
          <Header
            renderMenuIcon={opened =>
              opened ? <Icon>chevron_left</Icon> : <Icon>menu_rounded</Icon>
            }
          >
            {({ screen, collapsed }) =>
              data.header && <HeaderEx screen={screen} collapsed={collapsed} />
            }
          </Header>
          <ComponentNav data={data}/>
          <Content>
            <ContentBody/>
          </Content>          
        </Root>
      )}
    </MuiThemeProvider>
  );
}