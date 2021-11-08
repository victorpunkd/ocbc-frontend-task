import React from "react";
import renderer from "react-test-renderer";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TransactionLine from "../Components/TransactionLine/TransactionLine";

configure({ adapter: new Adapter() });

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("TransactionLine", () => {
  it("snapshot renders", () => {
    const component = renderer.create(<TransactionLine />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
