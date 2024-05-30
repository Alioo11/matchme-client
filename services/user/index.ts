import getUsersList from "./list";
import markUserAsViewed from "./view";

class UserService {
  static list = getUsersList;
  static view = markUserAsViewed;
}

export default UserService;
