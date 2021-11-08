import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Dashboard from "../Components/Dashboard/Dashboard";

configure({ adapter: new Adapter() });

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Dashboard", () => {
  it("snapshot renders", () => {
    const component = renderer.create(<Dashboard />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should call navigate when Make Transaction button is clicked", () => {
    const wrapper = shallow(<Dashboard />);
    wrapper.find("#makeTransferButton").props().buttonClick();
    expect(mockedUsedNavigate).toBeCalled();
  });
});
