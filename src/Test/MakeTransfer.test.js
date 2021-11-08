import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MakeTransfer from "../Components/MakeTransfer/MakeTransfer";

configure({ adapter: new Adapter() });

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("MakeTransfer", () => {
  it("snapshot renders", () => {
    const component = renderer.create(<MakeTransfer />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should simulate demo-simple-select-helper onChange event", () => {
    const wrapper = shallow(<MakeTransfer />);
    expect(
      wrapper.find("#demo-simple-select-helper").simulate("change", {
        target: {
          value: "test",
        },
      })
    );

    expect(wrapper.find("#demo-simple-select-helper").prop("value")).toBe(
      "test"
    );
  });

  it("Should simulate description onChange event", () => {
    const wrapper = shallow(<MakeTransfer />);
    expect(
      wrapper.find("#description").simulate("change", {
        target: {
          value: "test",
        },
      })
    );

    expect(wrapper.find("#description").prop("value")).toBe("test");
  });

  it("Should simulate amount onChange event", () => {
    const wrapper = shallow(<MakeTransfer />);
    expect(
      wrapper.find("#amount").simulate("change", {
        target: {
          value: "test",
        },
      })
    );

    expect(wrapper.find("#amount").prop("value")).toBe("test");
  });

  it("Should simulate Cancel onClick event", () => {
    const wrapper = shallow(<MakeTransfer />);

    wrapper.find("#cancel").props().buttonClick("");
    expect(mockedUsedNavigate).toHaveBeenCalled();
  });

  it("Should simulate Submit onClick event", () => {
    const wrapper = shallow(<MakeTransfer />);

    wrapper.find("#description").simulate("change", {
      target: {
        value: "test",
      },
    });

    wrapper.find("#amount").simulate("change", {
      target: {
        value: "test",
      },
    });

    wrapper.find("#demo-simple-select-helper").simulate("change", {
      target: {
        value: "test",
      },
    });

    wrapper.find("#submit").props().buttonClick("");
    expect(wrapper.find("#submit").prop("id")).toBe("submit");
  });
});
