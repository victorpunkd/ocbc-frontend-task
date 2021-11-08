import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavBar from "../Components/NavBar/NavBar";

configure({ adapter: new Adapter() });

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("NavBar", () => {
  it("snapshot renders", () => {
    const component = renderer.create(<NavBar />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should render logoutButton div", () => {
    const wrapper = shallow(<NavBar />);
    expect(wrapper.find(".logoutButton").exists()).toBe(true);
  });

  it("Should simulate logout onClick event", () => {
    const wrapper = shallow(<NavBar />);
    wrapper.find(".logoutButton").simulate("click");

    expect(mockedUsedNavigate).toHaveBeenCalled();
  });
});
