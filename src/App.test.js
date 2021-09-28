import fs from "fs";
import constants from "./constants";
import "./setupTests";

/**
 *
 * @param {String} file
 * @returns true if file exists
 */
function fileExistsSync(file) {
  try {
    fs.accessSync(file, fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (err) {
    return false;
  }
}

function create() {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  };
  const next = jest.fn();

  const invoke = (action) => thunk(store)(next)(action);

  return { store, next, invoke };
}

const thunk =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }

    return next(action);
  };

describe("Main Animation SVG Should Be There", () => {
  it("should render my component", () => {
    let file = "src/assets/time-management-animate.svg";
    const ifFileExists = fileExistsSync(file);
    expect(ifFileExists).toBe(true);
  });
});

describe("Graphic Two SVG Should Be There", () => {
  it("should render my component", () => {
    let file = "src/assets/graphic2.svg";
    const ifFileExists = fileExistsSync(file);
    expect(ifFileExists).toBe(true);
  });
});

describe("Passes through non-function action", () => {
  it("passes through non-function action", () => {
    const { next, invoke } = create();
    const action = { type: "TEST" };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });
});

describe("Calls the function", () => {
  it("calls the function", () => {
    const { invoke } = create();
    const fn = jest.fn();
    invoke(fn);
    expect(fn).toHaveBeenCalled();
  });
});

describe("Passes dispatch and getState", () => {
  it("passes dispatch and getState", () => {
    const { store, invoke } = create();
    invoke((dispatch, getState) => {
      dispatch("TEST DISPATCH");
      getState();
    });
    expect(store.dispatch).toHaveBeenCalledWith("TEST DISPATCH");
    expect(store.getState).toHaveBeenCalled();
  });
});

describe("Check Constants", () => {
  it("ACCESS TOKEN", () => {
    expect(constants.ACCESS_TOKEN).toEqual("TASKLY_ACCESS_TOKEN");
  });

  it("SAVED USER", () => {
    expect(constants.SAVED_USER).toEqual("TASKLY_SAVED_USER");
  });

  it("ROOT PERSIST KEY", () => {
    expect(constants.ROOT_PERSIST_KEY).toEqual("TASKLY_ROOT_PERSIST_KEY");
  });

  it("COLUMNS", () => {
    expect(constants.COLUMNS).toEqual({
      open: "open",
      todo: "todo",
      doing: "doing",
      testing: "testing",
      completed: "completed",
    });
  });
});
