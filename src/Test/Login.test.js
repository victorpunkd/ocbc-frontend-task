import React from "react";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Login from "../Components/Login/Login";

configure({ adapter: new Adapter() });

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Login", () => {
  it("snapshot renders", () => {
    const component = renderer.create(<Login />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should render a username, password, input tag and loginButton button", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find("#username").exists()).toBe(true);
    expect(wrapper.find("#password").exists()).toBe(true);
    expect(wrapper.find("#loginButton").exists()).toBe(true);
  });

  it("Should simulate username onChange event", () => {
    const wrapper = shallow(<Login />);
    expect(
      wrapper.find("#username").simulate("change", {
        target: {
          value: "test",
        },
      })
    );

    expect(wrapper.find("#username").prop("value")).toBe("test");
  });

  it("Should simulate password onChange event", () => {
    const wrapper = shallow(<Login />);
    expect(
      wrapper.find("#password").simulate("change", {
        target: {
          value: "test",
        },
      })
    );

    expect(wrapper.find("#password").prop("value")).toBe("test");
  });

  it("Should simulate password onChange event", () => {
    const wrapper = shallow(<Login />);
    expect(
      wrapper.find("#password").simulate("change", {
        target: {
          value: "test",
        },
      })
    );

    expect(wrapper.find("#password").prop("value")).toBe("test");
  });

  it("Should simulate login onClick event", () => {
    const wrapper = shallow(<Login />);
    wrapper.find("#password").simulate("change", {
      target: {
        value: "test",
      },
    });
    wrapper.find("#username").simulate("change", {
      target: {
        value: "test",
      },
    });
    wrapper.find("#loginButton").props().buttonClick("");
    expect(wrapper.find("#loginButton").prop("buttonText")).toBe("Login");
  });
});
