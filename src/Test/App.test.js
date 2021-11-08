import React from "react";
import { shallow, mount } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "../App";
import Login from "../Components/Login/Login";
import Dashboard from "../Components/Dashboard/Dashboard";
import NoAccess from "../CommonComponents/NoAccess/NoAccess";
import MakeTransfer from "../Components/MakeTransfer/MakeTransfer";
import { Route } from "react-router-dom";

configure({ adapter: new Adapter() });
let pathMap = {};

describe("routes using array of routers", () => {
  beforeAll(() => {
    const component = shallow(<App />);
    pathMap = component.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props();
      pathMap[routeProps.path] = routeProps.element.type;
      return pathMap;
    }, {});
  });

  it("should show Login component for / router (getting array of routes)", () => {
    expect(pathMap["/"]).toBe(Login);
  });

  it("should show Dashboard component for /dashboard router (getting array of routes)", () => {
    expect(pathMap["/dashboard"]).toBe(Dashboard);
  });

  it("should show NoAccess component for /no-access router (getting array of routes)", () => {
    expect(pathMap["/no-access"]).toBe(NoAccess);
  });

  it("should show NoAccess component for /make-transfer router (getting array of routes)", () => {
    expect(pathMap["/make-transfer"]).toBe(MakeTransfer);
  });
});
