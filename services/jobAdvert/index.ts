import applyForJobAdvert from "./apply";
import deleteJobadvert from "./delete";
import promptWithJobadvert from "./prompt";
import getJobadvertReport from "./report";
import retrieveJobadvert from "./retrieve";

class JobAdvertService {
  static apply = applyForJobAdvert;
  static retrieve = retrieveJobadvert;
  static prompt = promptWithJobadvert;
  static delete = deleteJobadvert
  static report = getJobadvertReport
}

export default JobAdvertService;
