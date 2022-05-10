
import { helper } from "../utils/Helper";
import { selectors } from "../utils/Selectors";


class Login{

    async loginWithCredentials (username, password) {
        await  selectors.loginPage.username.setValue(username);
        await  selectors.loginPage.password.setValue(password);
        await  helper.click(selectors.loginPage.submit);
    }

  }

const loginPage = new Login();
export {loginPage};