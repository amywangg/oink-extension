import React from "react";
import ReactDOM from "react-dom";
import App from "./views/Popup/App";
import { ThemeProvider } from "@material-ui/styles";
import { createStore } from "redux";
import rootReducer from "./redux/reducers";
import storeCreatorFactory from "reduxed-chrome-storage";

import { Provider } from "react-redux";
import { muiTheme } from "./theme";

(async () => {
  const store = await storeCreatorFactory({ createStore })(rootReducer);
  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={muiTheme}>
        <App />
      </ThemeProvider>
    </Provider>,

    document.getElementById("root")
  );
})();
