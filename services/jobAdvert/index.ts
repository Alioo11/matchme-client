import applyForJobAdvert from "./apply";
import deleteJobadvert from "./delete";
import promptWithJobadvert from "./prompt";
import getJobadvertReport from "./report";
import {
  generateResumePDF,
  getResumePropertiesByJobadvert,
  getResumePropertiesByJobadvertPDF,
} from "./resume";
import retrieveJobadvert from "./retrieve";

class JobAdvertService {
  static apply = applyForJobAdvert;
  static retrieve = retrieveJobadvert;
  static prompt = promptWithJobadvert;
  static delete = deleteJobadvert;
  static report = getJobadvertReport;

  static createResumePDFFromJobadvert = getResumePropertiesByJobadvertPDF;
  static getResumePropertiesFrom = getResumePropertiesByJobadvert;
  static generateResumePDF = generateResumePDF;
}

export default JobAdvertService;
